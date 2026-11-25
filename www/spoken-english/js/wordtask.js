/* PleasantLearn — "Word task" lesson step: the learner writes words from memory BEFORE the grammar starts.
   A Help button shows a bilingual word list (with "More words" and "Back to lesson"). The words are checked and
   the learner needs a pass mark (for example 6 correct words out of 10) to continue. After a few tries a
   "Continue anyway" button appears, so nobody gets stuck.

   HOW TO USE IT IN A DAY FILE — add this one section near the start of the day:
     { id: "words", label: "Warm-up · Naming words", title: "Name 10 Things", char: "panda", type: "words",
       kind: "noun",            // "noun" (things), "verb" (actions) or "adj" (describing words)
       need: 10,                // how many words the learner writes
       pass: 6,                 // how many must be correct
       intro: { en: "…", hi: "…" },                       // optional: the short introduction
       examples: [["apple", "सेब", "🍎"], ["pen", "पेन", "🖊️"]],   // optional: example words shown as tap-to-hear chips
       ask: { en: "…", hi: "…" },                          // optional: the instruction line
       helpGroups: ["fruits", "school", "home"] }          // optional: which word groups the Help screen shows first

   Words for the checking and for the Help screen come from the word files loaded on the page
   (nouns.js, verbs.js, adjectives.js, lists.js …). Load this file BEFORE engine.js. */
(function () {
  "use strict";
  window.LW = window.LW || {};
  window.LW.stepTypes = window.LW.stepTypes || {};

  /* ---------- small style sheet (kept here so the step works with any page) ---------- */
  function addCss() {
    if (document.getElementById("wt-css")) return;
    var st = document.createElement("style"); st.id = "wt-css";
    st.textContent =
      ".wt-ex{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 4px}" +
      ".wt-pill{display:inline-flex;align-items:center;gap:6px;border:1.5px solid var(--line,#E4E9F2);background:#fff;border-radius:999px;padding:6px 12px;font:inherit;font-weight:700;cursor:pointer;color:inherit}" +
      ".wt-pill.ok{background:#E6F4EC;border-color:#198754;color:#146c43}.wt-pill.ok small{color:#146c43}" +
      ".wt-pill small{font-weight:600;color:var(--text-2,#6C757D);font-size:.78rem}" +
      ".wt-task{background:#fff;border:1.5px solid var(--line,#E4E9F2);border-radius:18px;padding:14px;margin:14px 0}" +
      ".wt-row{display:flex;gap:8px;margin-top:10px}" +
      ".wt-in{flex:1;min-width:0;padding:12px 14px;border:2px solid var(--line,#E4E9F2);border-radius:12px;font:inherit;font-size:1.05rem;background:#fff;color:inherit}" +
      ".wt-in:focus{outline:none;border-color:var(--c,#0D6EFD)}" +
      ".wt-add{flex:0 0 auto;padding:0 16px;border-radius:12px;border:0;background:var(--c,#0D6EFD);color:#fff;font:inherit;font-weight:800;cursor:pointer;min-height:46px}" +
      ".wt-count{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:12px 0 6px;font-weight:700}" +
      ".wt-bar{height:8px;background:#E7F0FF;border-radius:99px;overflow:hidden;margin-bottom:10px}" +
      ".wt-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#198754,#3ddc84);transition:width .25s}" +
      ".wt-list{display:flex;flex-wrap:wrap;gap:8px;min-height:36px}" +
      ".wt-chip{display:inline-flex;align-items:center;gap:6px;border:1.5px solid var(--line,#E4E9F2);background:var(--bg,#F8F9FA);border-radius:999px;padding:6px 8px 6px 12px;font-weight:700}" +
      ".wt-chip button{border:0;background:none;color:#8a94a6;font-size:1.05rem;line-height:1;padding:2px 6px;cursor:pointer}" +
      ".wt-chip.ok{background:#E6F4EC;border-color:#198754;color:#146c43}.wt-chip.no{background:#FDECEE;border-color:#DC3545;color:#b02a37}" +
      ".wt-btns{display:grid;gap:10px;margin-top:14px}.wt-btns .btn{width:100%;flex-direction:column;gap:0;line-height:1.25;padding:10px 18px}.wt-btns .btn small{display:block;font-size:.8rem;font-weight:500;opacity:.9}" +
      ".wt-res{margin-top:14px}.wt-res h4{margin:12px 0 6px;font-size:1rem}" +
      ".wt-w{display:flex;align-items:center;gap:10px;border:1px solid var(--line,#E4E9F2);background:#fff;border-radius:14px;padding:8px 12px;margin:6px 0}" +
      ".wt-w .em{flex:0 0 28px;text-align:center;font-size:1.3rem}.wt-w .tx{flex:1;min-width:0}.wt-w b{display:block;font-size:1.02rem}" +
      ".wt-w .hi{color:var(--primary-dark,#0B5ED7);font-size:.92rem}" +
      ".wt-w.no{border-color:#f1b0b7;background:#FFF7F8}.wt-w.ok{border-color:#a8d5b9;background:#F4FBF7}" +
      ".wt-w .why{font-size:.88rem;color:#b02a37}.wt-w .why span{display:block;color:#6C757D}" +
      ".wt-use{margin-top:6px;border:1.5px solid var(--c,#0D6EFD);background:#fff;color:var(--c,#0D6EFD);border-radius:999px;padding:5px 12px;font:inherit;font-weight:700;font-size:.85rem;cursor:pointer}" +
      ".wt-say{border:0;background:#E7F0FF;color:#0D6EFD;border-radius:50%;width:34px;height:34px;cursor:pointer;flex:0 0 auto}" +
      ".wt-help{position:relative}.wt-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}" +
      ".wt-tab{border:1.5px solid var(--line,#E4E9F2);background:#fff;border-radius:999px;padding:7px 12px;font:inherit;font-weight:700;font-size:.85rem;cursor:pointer;color:inherit}" +
      ".wt-tab.on{background:var(--c,#0D6EFD);border-color:var(--c,#0D6EFD);color:#fff}" +
      ".wt-link{display:block;text-decoration:none;color:inherit;background:#EAF3FF;border:1px solid #bcd6fb;border-radius:12px;padding:10px 12px;margin:12px 0;font-size:.93rem;line-height:1.45}.wt-link b{display:block;color:#1d4ed8}.wt-link span{color:#475569}" +
      ".wt-note{background:#FFF8E1;border:1px solid #ffe08a;border-radius:12px;padding:10px 12px;margin:10px 0;font-size:.95rem}" +
      ".wt-note span{display:block;color:#6C757D;font-size:.9rem}";
    document.head.appendChild(st);
  }

  /* ---------- the three kinds of task ---------- */
  var KIND = {
    noun: { en: "naming words (names of things)", hi: "नाम वाले शब्द (चीज़ों के नाम)", one: "a thing's name", oneHi: "किसी चीज़ का नाम",
      title: "Name 10 Things", ask: { en: "Write the names of things you can see or use. Write at least {n} different words in English.", hi: "जो चीज़ें आप देखते या इस्तेमाल करते हैं उनके नाम लिखिए। अंग्रेज़ी में कम से कम {n} अलग शब्द लिखिए।" },
      ph: "Type here · यहाँ लिखिए", groups: ["fruits", "school", "home", "kitchen", "animals", "clothes", "food", "vegetables", "vehicles", "body", "family", "nature"] },
    verb: { en: "action words (verbs)", hi: "काम वाले शब्द (क्रियाएँ)", one: "an action word", oneHi: "काम बताने वाला शब्द",
      title: "Write Action Words", ask: { en: "Write words for things you do. Write at least {n} different action words in English.", hi: "आप जो काम करते हैं उनके शब्द लिखिए। अंग्रेज़ी में कम से कम {n} अलग क्रियाएँ लिखिए।" },
      ph: "Type here · यहाँ लिखिए", groups: ["daily", "movement", "kitchen", "talk", "play", "work"] },
    adj: { en: "describing words (adjectives)", hi: "बताने वाले शब्द (विशेषण)", one: "a describing word", oneHi: "विशेषता बताने वाला शब्द",
      title: "Write Describing Words", ask: { en: "Write words that describe things, people or feelings. Write at least {n} different words in English.", hi: "चीज़ों, लोगों या भावनाओं का वर्णन करने वाले शब्द लिखिए। अंग्रेज़ी में कम से कम {n} अलग शब्द लिखिए।" },
      ph: "Type here · यहाँ लिखिए", groups: ["basic", "feel", "look", "size", "people", "quality"] }
  };
  /* words that are both a noun and a verb: accepted as names of things (watch, drink, walk…) */
  var DUALN = {}; "watch drink walk call cook dance dream drive guide help jump kiss laugh light love paint park plan play post rain ride shower sleep smile snow start stop study swim talk test trip visit wash wish answer work rest show sign step tour track train turn race rule sail shop".split(" ").forEach(function (x) { DUALN[x] = 1; });
  var PH = ["Type a word in English · अंग्रेज़ी में शब्द लिखिए"];

  /* common Hindi words written in English letters → the English word (so the learner gets a kind hint, not just "wrong") */
  var HINGLISH = { kitab: "book", kitaab: "book", kalam: "pen", qalam: "pen", kursi: "chair", mez: "table", ghar: "house", makan: "house", billi: "cat", kutta: "dog", gai: "cow", gaay: "cow", bhains: "buffalo", ghoda: "horse", bakri: "goat", murgi: "hen", machhli: "fish", machli: "fish", topi: "cap", joota: "shoe", juta: "shoe", chappal: "slipper", kamiz: "shirt", kameez: "shirt", dost: "friend", bhai: "brother", behan: "sister", bahan: "sister", maa: "mother", mummy: "mother", papa: "father", pita: "father", gaadi: "car", gadi: "car", ped: "tree", phool: "flower", patta: "leaf", suraj: "sun", sooraj: "sun", chand: "moon", tara: "star", badal: "cloud", baadal: "cloud", barish: "rain", baarish: "rain", haath: "hand", hath: "hand", aankh: "eye", ankh: "eye", naak: "nose", kaan: "ear", munh: "mouth", daant: "tooth", baal: "hair", pair: "foot", paon: "foot", sir: "head", dil: "heart", kapda: "cloth", kapde: "clothes", thali: "plate", thaali: "plate", chammach: "spoon", chamach: "spoon", katori: "bowl", ghadi: "clock", darwaza: "door", khidki: "window", deewar: "wall", diwar: "wall", chhat: "roof", bistar: "bed", palang: "bed", takiya: "pillow", kambal: "blanket", jhadu: "broom", jhaadu: "broom", tala: "lock", chabi: "key", paisa: "money", paise: "money", pani: "water", doodh: "milk", dudh: "milk", chawal: "rice", chaval: "rice", aam: "mango", kela: "banana", seb: "apple", santra: "orange", angoor: "grapes", nimbu: "lemon", aloo: "potato", pyaz: "onion", pyaaj: "onion", tamatar: "tomato", gajar: "carrot", anda: "egg", chai: "tea", mithai: "sweets", namak: "salt", cheeni: "sugar", chini: "sugar", tel: "oil", ghee: "ghee", dal: "lentils", sabzi: "vegetable", phal: "fruit", bachcha: "child", baccha: "child", ladka: "boy", ladki: "girl", aadmi: "man", admi: "man", aurat: "woman", log: "people", shahar: "city", gaon: "village", sadak: "road", pul: "bridge", dukaan: "shop", dukan: "shop", bazaar: "market", bazar: "market", mandir: "temple", school: "school", kaksha: "class", chhatri: "umbrella", bag: "bag", thaila: "bag", dabba: "box", batua: "wallet", ghanta: "bell", pankha: "fan", batti: "light", bijli: "electricity", cycle: "cycle", ped: "tree", pahad: "mountain", nadi: "river", samundar: "sea", aag: "fire", mitti: "soil", pathar: "stone", ret: "sand", ghas: "grass", sher: "lion", hathi: "elephant", bandar: "monkey", khargosh: "rabbit", chuha: "rat", saanp: "snake", sanp: "snake", tota: "parrot", kauwa: "crow", chidiya: "bird", makkhi: "fly", machhar: "mosquito", cheenti: "ant", titli: "butterfly", gudiya: "doll", khilauna: "toy", gend: "ball", patang: "kite", carrom: "carrom", kamra: "room", rasoi: "kitchen", bagicha: "garden", bageecha: "garden" };

  function lev(a, b) {
    var m = a.length, n = b.length, i, j, d = [], cost;
    if (Math.abs(m - n) > 2) return 9;
    for (i = 0; i <= m; i++) { d[i] = [i]; }
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) {
      cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);   /* swapped letters: tabel → table */
    }
    return d[m][n];
  }
  /* consonant skeleton: kitab → ktb, किताब → ktb, so a Hindi word typed in English letters can be matched with the Hindi meaning in the word lists */
  function skelRoman(s) {
    s = String(s).toLowerCase().replace(/chh|ch/g, "c").replace(/kh/g, "k").replace(/gh/g, "g").replace(/jh/g, "j").replace(/th/g, "t").replace(/dh/g, "d").replace(/ph/g, "p").replace(/bh/g, "b").replace(/sh/g, "s");
    return skelFin(s.replace(/x/g, "ks").replace(/[fq]/g, function (c) { return c === "f" ? "p" : "k"; }).replace(/z/g, "j").replace(/w/g, "v").replace(/[^a-z]/g, "").replace(/[aeiouh]/g, ""));
  }
  var DV = { "क": "k", "ख": "k", "ग": "g", "घ": "g", "ङ": "n", "च": "c", "छ": "c", "ज": "j", "झ": "j", "ञ": "n", "ट": "t", "ठ": "t", "ड": "d", "ढ": "d", "ण": "n", "त": "t", "थ": "t", "द": "d", "ध": "d", "न": "n", "प": "p", "फ": "p", "ब": "b", "भ": "b", "म": "m", "य": "y", "र": "r", "ल": "l", "व": "v", "श": "s", "ष": "s", "स": "s", "ं": "n" };
  function skelHindi(s) { var o = "", i, ch, d = String(s).normalize("NFD"); for (i = 0; i < d.length; i++) { ch = d.charAt(i); if (DV[ch]) o += DV[ch]; } return skelFin(o); }
  function skelFin(s) { return s.replace(/(.)\1+/g, "$1"); }
  function hasDev(s) { return /[ऀ-ॿ]/.test(s); }

  window.LW.stepTypes.words = function (api) {
    var esc = api.esc, $ = api.$, S = api.sets;
    addCss();

    /* ---------- word knowledge (built once, from the word files on the page) ---------- */
    var K = null;
    function know() {
      if (K) return K;
      var L = (window.LW.vocab && window.LW.vocab.lists) || [], hi = {}, em = {}, rev = {}, cand = [], seen = {}, nl = {}, vb = {}, NONNOUN = { verbs: 1, adjectives: 1, adverbs: 1, connectors: 1, interjections: 1, pronouns: 1, determiners: 1, greetings: 1 };
      L = L.filter(function (l) { return !NONNOUN[l.id]; }).concat(L.filter(function (l) { return NONNOUN[l.id]; }));
      L.forEach(function (l) {
        l.words.forEach(function (w) {
          if (!NONNOUN[l.id]) nl[String(w[0]).toLowerCase()] = 1;
          var en = String(w[0]).toLowerCase();
          if (!hi[en]) { hi[en] = w[1]; if (w[2]) em[en] = w[2]; }
          if (/^[a-z][a-z'-]*$/.test(en) && w[1]) {
            var h = String(w[1]).split(" / ")[0].trim(), k = skelHindi(h);
            if (k.length >= 2) { (rev[k] = rev[k] || []); if (rev[k].indexOf(en) < 0 && rev[k].length < 3) rev[k].push(en); }
            (rev["H:" + h] = rev["H:" + h] || []); if (rev["H:" + h].indexOf(en) < 0 && rev["H:" + h].length < 3) rev["H:" + h].push(en);
          }
        });
      });
      (window.LW.verbs || []).forEach(function (v) { if (!hi[v.b]) hi[v.b] = v.hi; });
      (window.LW.adjectives || []).forEach(function (v) { if (!hi[v.b]) hi[v.b] = v.hi; });
      Object.keys(S.NOUNS).concat(Object.keys(S.UNC)).forEach(function (w) { if (!seen[w] && w.length >= 3) { seen[w] = 1; cand.push(w); } });
      String(window.LW.verbBases || "").split(" ").forEach(function (x) { if (x) vb[x] = 1; });
      K = { hi: hi, em: em, rev: rev, cand: cand, nl: nl, vb: vb };
      return K;
    }
    function hiOf(w) { var k = know(); return k.hi[w] || (S.NOUNS[w] ? "" : ""); }

    /* ---------- check one word ---------- */
    var PLURAL = false;
    function singular(w) { return (api.pluralOf && api.pluralOf(w)) || ""; }
    function pluralTail() { return PLURAL ? { en: " Write it in the plural (more than one).", hi: " इसे बहुवचन (plural) में लिखिए।" } : null; }
    function isKind(w, kind) {
      if (kind === "noun") { var k = know(); if (k.vb[w] && !k.nl[w] && !(DUALN[w] && (S.NOUNS[w] || S.UNC[w]))) return false; return !!(S.NOUNS[w] || S.UNC[w] || S.PLONLY[w] || singular(w)); }
      if (kind === "verb") return !!S.VERBS[w];
      return !!S.ADJ[w];
    }
    function suggestSpelling(w, kind) {
      var k = know(), best = [], d, i, c, pool = kind === "noun" ? k.cand : (kind === "verb" ? String(window.LW.verbBases || "").split(" ") : String(window.LW.adjForms || "").split(" "));
      if (w.length < 4) return [];
      for (i = 0; i < pool.length; i++) { c = pool[i]; if (!c || c.charAt(0) !== w.charAt(0)) continue; d = lev(w, c); if (d <= (w.length >= 7 ? 2 : 1) && d > 0) best.push([d, c]); }
      best.sort(function (a, b) { return a[0] - b[0]; });
      return best.slice(0, 2).map(function (x) { return x[1]; });
    }
    function classify(raw, kind) {
      var w = raw, K = KIND[kind], k = know(), r, sing, s, hs, sk, sug;
      if (hasDev(w)) {
        hs = k.rev["H:" + w.trim()] || k.rev[skelHindi(w)] || [];
        return { ok: false, w: raw, why: { en: "Please write in English letters, not Hindi.", hi: "कृपया अंग्रेज़ी अक्षरों में लिखिए, हिंदी में नहीं।" }, sug: hs.filter(function (x) { return isKind(x, kind); }).slice(0, 2), hindi: true };
      }
      if (!/^[a-z][a-z' -]*$/.test(w)) return { ok: false, w: raw, why: { en: "Use only English letters.", hi: "सिर्फ़ अंग्रेज़ी अक्षर लिखिए।" }, sug: [] };
      if (isKind(w, kind)) {
        sing = singular(w);
        if (PLURAL && kind === "noun" && !sing && !S.PLONLY[w]) {
          var pl = api.pluralize ? api.pluralize(w) : "";
          if (pl === w) return { ok: true, w: w, hi: k.hi[w] || "", em: k.em[w] || "" };
          if (S.UNC[w] && !S.NOUNS[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” cannot be counted, so it has no plural. Choose a thing you can count, like pens.", hi: "“" + raw + "” गिना नहीं जा सकता, इसलिए इसका बहुवचन नहीं होता। कोई गिनी जाने वाली चीज़ चुनिए, जैसे pens।" }, sug: [] };
          return { ok: false, w: raw, why: { en: "“" + raw + "” is one thing. We need more than one: add -s or -es.", hi: "“" + raw + "” एक चीज़ है। हमें एक से ज़्यादा चाहिए: -s या -es लगाइए।" }, sug: pl && pl !== w && singular(pl) === w ? [pl] : [], one: true };
        }
        return { ok: true, w: w, hi: k.hi[w] || k.hi[sing] || "", em: k.em[w] || k.em[sing] || "" };
      }
      /* wrong kind of word */
      if (kind === "noun") {
        if (S.PROPER[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” is a special name (a day, month or place). Write the name of an ordinary thing.", hi: "“" + raw + "” एक ख़ास नाम है (दिन, महीना या जगह)। किसी आम चीज़ का नाम लिखिए।" }, sug: [] };
        if (S.ADJ[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” describes something. It is not the name of a thing.", hi: "“" + raw + "” किसी की विशेषता बताता है। यह किसी चीज़ का नाम नहीं है।" }, sug: [] };
        if (S.VERBS[w] || k.vb[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” is an action word. Write the name of a thing.", hi: "“" + raw + "” एक क्रिया है। किसी चीज़ का नाम लिखिए।" }, sug: [] };
        if (S.OTHERW[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” is not the name of a thing.", hi: "“" + raw + "” किसी चीज़ का नाम नहीं है।" }, sug: [] };
      } else if (kind === "verb") {
        if (S.NOUNS[w] || S.UNC[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” is the name of a thing. Write an action word, like eat or go.", hi: "“" + raw + "” किसी चीज़ का नाम है। कोई क्रिया लिखिए, जैसे eat या go।" }, sug: [] };
        if (S.ADJ[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” describes something. Write an action word.", hi: "“" + raw + "” विशेषता बताता है। कोई क्रिया लिखिए।" }, sug: [] };
      } else {
        if (S.NOUNS[w] || S.UNC[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” is the name of a thing. Write a word that describes, like big or happy.", hi: "“" + raw + "” किसी चीज़ का नाम है। कोई बताने वाला शब्द लिखिए, जैसे big या happy।" }, sug: [] };
        if (S.VERBS[w]) return { ok: false, w: raw, why: { en: "“" + raw + "” is an action word. Write a describing word.", hi: "“" + raw + "” एक क्रिया है। कोई विशेषण लिखिए।" }, sug: [] };
      }
      /* a Hindi word written in English letters? */
      if (HINGLISH[w] && isKind(HINGLISH[w], kind)) return { ok: false, w: raw, hindi: true, why: { en: "“" + raw + "” is a Hindi word written in English letters. In English it is “" + HINGLISH[w] + "”.", hi: "“" + raw + "” हिंदी शब्द है जो अंग्रेज़ी अक्षरों में लिखा है। अंग्रेज़ी में इसे “" + HINGLISH[w] + "” कहते हैं।" }, sug: [HINGLISH[w]] };
      sug = suggestSpelling(w, kind);
      if (sug.length) return { ok: false, w: raw, why: { en: "Check the spelling.", hi: "Spelling जाँचिए।" }, sug: sug, spell: true };
      sk = skelRoman(w); hs = sk.length >= 2 ? (k.rev[sk] || []).filter(function (x) { return isKind(x, kind); }) : [];
      if (hs.length) return { ok: false, w: raw, hindi: true, why: { en: "“" + raw + "” looks like a Hindi word written in English letters. Write the English word.", hi: "“" + raw + "” हिंदी शब्द जैसा लगता है जो अंग्रेज़ी अक्षरों में लिखा है। अंग्रेज़ी शब्द लिखिए।" }, sug: hs.slice(0, 2) };
      return { ok: false, w: raw, why: { en: "We could not find “" + raw + "” in our word list. Check the spelling or try another word.", hi: "“" + raw + "” हमारी सूची में नहीं मिला। Spelling जाँचिए या कोई दूसरा शब्द लिखिए।" }, sug: [] };
    }

    /* ---------- word lists for the Help screen ---------- */
    function groupsFor(kind, ids) {
      var out = [];
      if (kind === "noun") {
        var L = (window.LW.vocab && window.LW.vocab.lists) || [];
        ids.forEach(function (id) { var l = L.filter(function (x) { return x.id === id; })[0]; if (l) out.push({ id: id, icon: l.icon, title: l.title, words: clean(l.words.map(function (w) { return { en: w[0], hi: w[1], em: w[2] || "" }; })) }); });
      } else {
        var G = (kind === "verb" ? window.LW.verbGroups : window.LW.adjGroups) || [], A = (kind === "verb" ? window.LW.verbs : window.LW.adjectives) || [];
        ids.forEach(function (id) { var g = G.filter(function (x) { return x.id === id; })[0]; if (g) out.push({ id: id, icon: g.icon, title: g.title, words: clean(A.filter(function (v) { return v.g === id && !v.note; }).map(function (v) { return { en: v.b, hi: v.hi, em: "" }; })) }); });
      }
      return out.filter(function (g) { return g.words.length; });
    }
    function clean(ws) { return ws.filter(function (w) { return /^[a-z][a-z'-]*$/i.test(w.en) && w.hi; }); }

    return function (sec, b, c) {
      var kind = KIND[sec.kind] ? sec.kind : "noun", K0 = KIND[kind];
      PLURAL = !!sec.plural;
      var need = sec.need || 10, pass = sec.pass || Math.ceil(need * .6);
      var groups = groupsFor(kind, sec.helpGroups || K0.groups);
      var saved = api.subGet(sec.id) || {};
      var st = { words: Array.isArray(saved.w) ? saved.w.filter(function (x) { return typeof x === "string"; }).slice(0, 60) : [], tries: +saved.k || 0, helps: +saved.h || 0, res: null, shown: !!saved.s, passed: !!saved.p, view: "main", tab: "pop", per: 4, more: 12 };
      var ask = sec.ask || { en: K0.ask.en.replace("{n}", need), hi: K0.ask.hi.replace("{n}", need) };

      function persist() { api.subSet(sec.id, { w: st.words, k: st.tries, h: st.helps, s: st.shown, p: st.passed }); }
      function remember() {      /* keep the learner's good words (for later revision pages) */
        try {
          var key = "learnwell.mywords.v1", all = JSON.parse(localStorage.getItem(key) || "{}") || {}; all[kind] = all[kind] || {};
          (st.res || []).forEach(function (r) { if (r.ok) all[kind][r.w] = r.hi || ""; });
          localStorage.setItem(key, JSON.stringify(all));
        } catch (e) { /* storage blocked: not needed for the lesson */ }
      }
      function norm(t) { return String(t || "").toLowerCase().replace(/[.,;:!?"“”()]/g, " ").replace(/\s+/g, " ").trim().replace(/^(a|an|the) /, "").slice(0, 30); }
      function sayBtn(t) { return api.TTS() ? '<button class="wt-say" type="button" data-say="' + esc(t) + '" data-lang="en" aria-label="Listen · सुनिए">🔊</button>' : ""; }

      /* ---------- main screen ---------- */
      function main() {
        var n = st.words.length, h = api.intro(sec);
        if (sec.examples && sec.examples.length) {
          h += '<p class="muted"><b>For example · जैसे:</b></p><div class="wt-ex">' + sec.examples.map(function (e) {
            return '<button class="wt-pill" type="button" data-say="' + esc(e[0]) + '" data-lang="en">' + (e[2] ? '<span aria-hidden="true">' + e[2] + "</span> " : "") + esc(e[0]) + (e[1] ? " <small>" + esc(e[1]) + "</small>" : "") + "</button>";
          }).join("") + "</div>";
        }
        h += '<div class="wt-task">' + api.askHtml(ask) +
          '<div class="wt-row"><label class="sr" for="wtIn" style="position:absolute;left:-9999px">Your word</label><input class="wt-in" id="wtIn" type="text" maxlength="30" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="' + esc(K0.ph) + '">' +
          '<button class="wt-add" id="wtAdd" type="button">Add · जोड़ें</button></div>' +
          '<div class="wt-count"><span id="wtCnt"></span><span class="muted" id="wtNeed"></span></div><div class="wt-bar" aria-hidden="true"><i id="wtBar"></i></div>' +
          '<div class="wt-list" id="wtList" aria-live="polite"></div>' +
          linkHtml() + '<div class="wt-btns"><button class="btn btn-outline" id="wtHelp" type="button">🆘 Help<small>मदद</small></button><button class="btn btn-primary" id="wtCheck" type="button">Check my words<small>मेरे शब्द जाँचें</small></button></div>' +
          '<div id="wtMsg" role="status" aria-live="polite"></div></div><div class="wt-res" id="wtRes" role="status" aria-live="polite"></div>';
        b.innerHTML = h; paintList(); if (st.shown) { st.res = st.words.map(function (w) { return classify(w, kind); }); paintResult(false); }
        var inp = $("#wtIn", b);
        $("#wtAdd", b).onclick = add; $("#wtHelp", b).onclick = function () { openHelp(); }; $("#wtCheck", b).onclick = check;
        inp.onkeydown = function (e) { if (e.key === "Enter") { e.preventDefault(); add(); } };
      }
      function msg(html) { var m = $("#wtMsg", b); if (m) m.innerHTML = html || ""; }
      function paintList() {
        var n = st.words.length, bar = $("#wtBar", b), list = $("#wtList", b), res = st.shown && st.res;
        $("#wtCnt", b).innerHTML = n + " / " + need + ' <small class="muted">words · शब्द</small>';
        $("#wtNeed", b).textContent = n >= need ? "✓ Ready · तैयार" : (need - n) + " more · " + (need - n) + " और";
        bar.style.width = Math.min(100, Math.round(n * 100 / need)) + "%";
        list.innerHTML = st.words.length ? st.words.map(function (w, i) {
          var r = res && res[i], cls = r ? (r.ok ? " ok" : " no") : "";
          return '<span class="wt-chip' + cls + '">' + esc(w) + '<button type="button" data-rm="' + i + '" aria-label="Remove ' + esc(w) + ' · हटाइए">×</button></span>';
        }).join("") : '<span class="muted">Your words will appear here. · आपके शब्द यहाँ दिखेंगे।</span>';
        [].forEach.call(list.querySelectorAll("[data-rm]"), function (x) { x.onclick = function () { st.words.splice(+x.getAttribute("data-rm"), 1); st.shown = false; st.res = null; $("#wtRes", b).innerHTML = ""; paintList(); persist(); msg(""); }; });
      }
      function add() {
        var inp = $("#wtIn", b), parts = String(inp.value || "").split(/[,\n;]+/).map(norm).filter(Boolean), added = 0, dup = [];
        if (!parts.length) { msg(api.fbBox("mid", '<p>Type a word first. · पहले कोई शब्द लिखिए।</p>')); inp.focus(); return; }
        parts.forEach(function (w) { if (st.words.indexOf(w) >= 0) dup.push(w); else if (st.words.length < 40) { st.words.push(w); added++; } });
        inp.value = ""; st.shown = false; st.res = null; $("#wtRes", b).innerHTML = ""; paintList(); persist();
        msg(dup.length ? api.fbBox("mid", '<p>“' + esc(dup[0]) + '” is already in your list. · यह शब्द पहले से सूची में है।</p>') : "");
        inp.focus({ preventScroll: true });
      }

      /* ---------- check ---------- */
      function check() {
        if (st.words.length < need) { msg(api.fbBox("mid", '<p><b>Write ' + (need - st.words.length) + ' more word' + (need - st.words.length > 1 ? "s" : "") + ' first. · पहले ' + (need - st.words.length) + ' शब्द और लिखिए।</b></p><p class="muted">Stuck? Tap <b>Help</b> to see useful words. · अटक गए? उपयोगी शब्द देखने के लिए <b>Help</b> दबाइए।</p>')); return; }
        msg(""); st.res = st.words.map(function (w) { return classify(w, kind); });
        var good = st.res.filter(function (r) { return r.ok; }).length;
        st.shown = true; st.tries++; if (good >= pass) { st.passed = true; remember(); }
        persist(); paintList(); paintResult(true);
        if (good >= pass) c.done();
      }
      function paintResult(scroll) {
        var res = st.res, good = res.filter(function (r) { return r.ok; }), bad = res.filter(function (r) { return !r.ok; }), ok = good.length >= pass, h = "", i, anyway;
        if (ok) h += api.fbBox("ok", '<p><b>🎉 Great! ' + good.length + ' correct words. बहुत बढ़िया! ' + good.length + ' शब्द सही हैं।</b></p><p>You can continue now. You may also add more words. · अब आप आगे बढ़ सकते हैं। चाहें तो और शब्द भी जोड़ सकते हैं।</p>');
        else h += api.fbBox("mid", '<p><b>You need at least ' + pass + ' correct words. You have ' + good.length + '. · कम से कम ' + pass + ' शब्द सही चाहिए। आपके ' + good.length + ' सही हैं।</b></p><p>Fix the red words, add new ones, or tap <b>Help</b>. · लाल शब्द ठीक कीजिए, नए जोड़िए, या <b>Help</b> दबाइए।</p>');
        if (good.length) h += '<h4>✓ Correct words · सही शब्द</h4><div class="wt-ex">' + good.map(function (r) { return '<button class="wt-pill ok" type="button" data-say="' + esc(r.w) + '" data-lang="en">' + (r.em ? '<span aria-hidden="true">' + r.em + "</span> " : "") + esc(r.w) + (r.hi ? ' <small lang="hi">' + esc(String(r.hi).split(" / ")[0]) + "</small>" : "") + "</button>"; }).join("") + "</div>";
        if (bad.length) h += '<h4>✕ Check these · इन्हें जाँचिए</h4>' + bad.map(function (r) {
          i = res.indexOf(r);
          return '<div class="wt-w no"><span class="em">✕</span><div class="tx"><b>' + esc(r.w) + '</b><div class="why">' + esc(r.why.en) + '<span lang="hi">' + esc(r.why.hi) + "</span></div>" +
            (r.sug && r.sug.length ? r.sug.map(function (s) { return '<button class="wt-use" type="button" data-use="' + i + '" data-to="' + esc(s) + '">Use “' + esc(s) + '” · “' + esc(s) + '” लगाइए</button> '; }).join("") : "") + "</div></div>";
        }).join("");
        anyway = !ok && (st.tries >= 3 || st.helps >= 4);
        if (anyway) h += '<div class="wt-note">Having trouble? You can still go on with the lesson. · दिक़्क़त हो रही है? आप फिर भी पाठ आगे बढ़ा सकते हैं।</div><button class="btn btn-outline btn-block" id="wtAny" type="button">Continue anyway · फिर भी आगे बढ़ें</button>';
        var box = $("#wtRes", b); box.innerHTML = h;
        [].forEach.call(box.querySelectorAll("[data-use]"), function (x) { x.onclick = function () { var j = +x.getAttribute("data-use"), to = x.getAttribute("data-to"); if (st.words.indexOf(to) >= 0) st.words.splice(j, 1); else st.words[j] = to; st.shown = false; st.res = null; box.innerHTML = ""; paintList(); persist(); check_ifFull(); }; });
        var a = $("#wtAny", box); if (a) a.onclick = function () { st.passed = true; persist(); c.done(); api.toast("OK, let's go on. · ठीक है, आगे चलते हैं।"); a.hidden = true; };
        if (scroll) api.show(box, "start");
      }
      function check_ifFull() { if (st.words.length >= need) check(); }

      /* ---------- Help screen ---------- */
      function openHelp() { st.helps++; st.view = "help"; persist(); helpScreen(); window.scrollTo(0, 0); }
      function helpWords() {
        var out = [], g;
        if (st.tab === "pop") {
          groups.forEach(function (gr) { gr.words.slice(0, st.per).forEach(function (w) { out.push(w); }); });
          return { list: out, more: groups.some(function (gr) { return gr.words.length > st.per; }) };
        }
        g = groups.filter(function (x) { return x.id === st.tab; })[0] || groups[0];
        return { list: g.words.slice(0, st.more), more: g.words.length > st.more };
      }
      function linkHtml() {
        var L = sec.link; if (!L) return "";
        return '<a class="wt-link" href="' + esc(L.href) + '"><b>' + esc(L.en) + ' →</b><span>' + esc(L.hi) + "</span></a>";
      }
      function helpScreen() {
        var hw = helpWords(), inList = {}, h;
        st.words.forEach(function (w) { inList[w] = 1; });
        h = '<div class="wt-help"><div class="wt-note"><b>Memorise ' + K0.en + ' like these. · इस तरह के ' + K0.hi + ' याद कीजिए।</b><span>Tap a word to hear it. Then go back and write the ones you remember. · शब्द सुनने के लिए उस पर टैप कीजिए। फिर वापस जाकर जो याद रहें उन्हें लिखिए।' + (sec.plural ? '<br><b>Write them in the plural: pen → pens. · बहुवचन में लिखिए: pen → pens।</b>' : '') + '</span></div>' +
          '<div class="wt-tabs" role="tablist"><button class="wt-tab' + (st.tab === "pop" ? " on" : "") + '" type="button" data-tab="pop">⭐ Popular · लोकप्रिय</button>' +
          groups.map(function (g) { return '<button class="wt-tab' + (st.tab === g.id ? " on" : "") + '" type="button" data-tab="' + esc(g.id) + '">' + g.icon + " " + esc(g.title.replace(/ \(.*\)/, "")) + "</button>"; }).join("") + "</div>" +
          hw.list.map(function (w) {
            return '<div class="wt-w"><span class="em">' + (w.em || "•") + '</span><div class="tx"><b>' + esc(w.en) + '</b><span class="hi" lang="hi">' + esc(w.hi) + "</span></div>" + sayBtn(w.en) + "</div>";
          }).join("") +
          linkHtml() + '<div class="wt-btns">' + (hw.more ? '<button class="btn btn-outline" id="wtMore" type="button">➕ More words<small>और शब्द</small></button>' : '<button class="btn btn-outline" id="wtMore" type="button" disabled>That is all for this group<small>इस समूह में बस इतने ही</small></button>') +
          '<button class="btn btn-primary" id="wtBack" type="button">← Back to lesson<small>पाठ पर वापस</small></button></div></div>';
        b.innerHTML = h;
        [].forEach.call(b.querySelectorAll("[data-tab]"), function (x) { x.onclick = function () { st.tab = x.getAttribute("data-tab"); st.per = 4; st.more = 12; helpScreen(); }; });
        $("#wtMore", b).onclick = function () { if (st.tab === "pop") st.per += 4; else st.more += 12; helpScreen(); };
        $("#wtBack", b).onclick = function () { st.view = "main"; main(); window.scrollTo(0, 0); var i = $("#wtIn", b); if (i) i.focus({ preventScroll: true }); };
      }

      if (st.passed) c.done();
      main();
    };
  };
})();
