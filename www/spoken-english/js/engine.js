/* PleasantLearn — Practical Spoken English: course player (engine).
   You normally never edit this file to add lessons. Lesson content lives in days/day-NN.js. */
(function () {
  "use strict";

  var BASE_TITLE = document.title;
  var CFG = { homeUrl: "index.html", key: "learnwell.spokenEnglish.v1", prefKey: "learnwell.spokenEnglish.prefs.v1" };

  var CHARS = {
    panda: { emoji: "🐼", name: "Panda", role: "Your teacher",    color: "#0D6EFD" },
    polly: { emoji: "🦜", name: "Polly", role: "Practice guide",  color: "#198754" },
    foxy:  { emoji: "🦊", name: "Foxy",  role: "Bonus guide",     color: "#E0A800" }
  };

  var COURSE = window.LW.course;
  COURSE.days.sort(function (a, b) { return a.day - b.day; });   /* day files may load in any order */

  /* ---------------- 2. ENGINE ---------------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function ga(n, p) { try { if (window.PL && PL.track) PL.track(n, p); } catch (e) { /* analytics must never break a lesson */ } }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function getDay(n) { return COURSE.days.filter(function (d) { return d.day === n; })[0] || null; }

  var hubEl = $("#hub"), hubBody = $("#hubBody"), lessonEl = $("#lesson"), toastEl = $("#toast"), toastT;
  function toast(m) { toastEl.textContent = m; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 3200); }

  /* ---- Progress (localStorage only, no backend). Safe against missing, invalid or old data. ---- */
  var canSave = true, prog = load();
  function blank() { return { completed: [], xp: 0, streak: 0, last: "", scores: {}, resume: {} }; }
  function load() {
    var raw = null, p = null, sc = {}, rs = {}, done = [], k, v, rv;
    try { raw = localStorage.getItem(CFG.key); } catch (e) { canSave = false; }   /* storage blocked: lessons still work, progress cannot be kept */
    try { p = raw ? JSON.parse(raw) : null; } catch (e) { p = null; }             /* damaged data: start fresh; the next save repairs it */
    if (!p || typeof p !== "object" || Array.isArray(p)) return blank();
    if (p.scores && typeof p.scores === "object") for (k in p.scores) {
      v = p.scores[k];
      if (v && +v.total > 0 && +v.score >= 0 && +v.score <= +v.total) sc[k] = { score: +v.score, total: +v.total, pct: Math.round(100 * v.score / v.total), date: String(v.date || ""), weak: Array.isArray(v.weak) ? v.weak.slice(0, 8).map(String) : [] };
    }
    if (p.resume && typeof p.resume === "object") for (k in p.resume) {   /* where the learner stopped, per unfinished day */
      rv = p.resume[k];
      if (rv && typeof rv === "object" && typeof rv.sid === "string" && getDay(+k) && +k >= 1 && +k <= COURSE.totalDays) rs[+k] = rv;
    }
    done = (Array.isArray(p.completed) ? p.completed : []).map(Number).filter(function (n, i, a) { return n >= 1 && n <= COURSE.totalDays && n === Math.floor(n) && a.indexOf(n) === i; });
    /* XP is earned only by finishing a day, so it is always rebuilt from the finished days. This repairs a damaged or edited value
       and means XP can never be counted twice. */
    return {
      resume: rs, completed: done, xp: done.length * COURSE.xpPerDay,
      streak: /^\d{4}-\d{2}-\d{2}$/.test(String(p.last || "")) ? Math.min(Math.max(0, Math.floor(+p.streak || 0)), 9999) : 0,
      last: /^\d{4}-\d{2}-\d{2}$/.test(String(p.last || "")) ? String(p.last) : "", scores: sc
    };
  }
  function save() { try { localStorage.setItem(CFG.key, JSON.stringify(prog)); canSave = true; } catch (e) { canSave = false; } }
  function ymd(d) { return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function streakNow() {
    var n = new Date(), y = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 1);
    return (prog.last === ymd(n) || prog.last === ymd(y)) ? prog.streak : 0;
  }
  /* A day opens only when the day before it is finished AND its Final Check was passed with at least 80%. */
  function passNeed(total) { return Math.ceil(+total * 4 / 5); }   /* 80%: the single rule for the pass mark */
  function isPass(sc) { return !!sc && +sc.total > 0 && +sc.score >= passNeed(sc.total); }
  function passedDay(n) {
    var d = getDay(n);
    if (prog.completed.indexOf(n) < 0) return false;
    return !d || !d.sections.some(function (s) { return s.type === "assess"; }) || isPass(prog.scores[n]);
  }
  function unlocked(n) { return n === 1 || passedDay(n - 1); }
  /* A weekly-test day (Day 7) scores in points: its "assess" section sets  points: 5  (points per question). 0 = a normal lesson day. */
  function dayPoints(n) { var d = getDay(n), s = d && d.sections.filter(function (x) { return x.points; })[0]; return s ? s.points : 0; }
  /* XP is given once per day (first completion). The check score is stored separately (best attempt) so progress shows understanding, not just clicks. */
  function completeDay(n, res) {
    var wasOpen = !!getDay(n + 1) && unlocked(n + 1);
    var first = prog.completed.indexOf(n) < 0, now = new Date(), today = ymd(now), yest = ymd(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    if (first) { prog.completed.push(n); prog.xp += COURSE.xpPerDay; }
    delete prog.resume[n];   /* the day is finished: nothing left to resume */
    if (res && res.total > 0 && res.score >= 0 && res.score <= res.total) {
      var old = prog.scores[n], pct = Math.round(100 * res.score / res.total);
      if (!old || pct >= old.pct) prog.scores[n] = { score: res.score, total: res.total, pct: pct, date: today, weak: (res.weak || []).slice(0, 8) };
    }
    if (prog.last !== today) prog.streak = (prog.last === yest) ? prog.streak + 1 : 1;
    if (prog.streak < 1) prog.streak = 1;
    prog.last = today; save();
    if (!canSave) toast("Progress can't be saved in this browser.");
    if (getDay(n + 1) && !wasOpen && unlocked(n + 1)) ga("day_unlock", { course: "spoken_english", day: n + 1 });
    return { first: first };
  }

  /* ---- TTS (Web Speech API · English + Hindi). Learner-controlled; fails gracefully. ---- */
  var TTS = ("speechSynthesis" in window) && ("SpeechSynthesisUtterance" in window), voices = { en: null, hi: null }, warnedHi = false, warnedSound = false, qTok = 0, pagePlaying = false, voiceTries = 0;
  var PLAY_HTML = '<span aria-hidden="true">▶</span> Play this page · पूरा पेज सुनें', STOP_HTML = '<span aria-hidden="true">⏹</span> Stop · रोकें';
  function loadPrefs() {
    var d = { en: false, hi: false };   /* learner-controlled by default: tap 🔊 to listen */
    try { var p = JSON.parse(localStorage.getItem(CFG.prefKey)); if (p && typeof p === "object") { d.en = p.en === true; d.hi = p.hi === true; } } catch (e) { /* ignore */ }
    return d;
  }
  var prefs = loadPrefs();
  function savePrefs() { try { localStorage.setItem(CFG.prefKey, JSON.stringify(prefs)); } catch (e) { /* ignore */ } }
  function pickVoice() {
    if (!TTS) return;
    var v = [];
    try { v = speechSynthesis.getVoices() || []; } catch (e) { /* ignore */ }
    function best(re) { var m = v.filter(function (x) { return re.test(x.lang); }); return m.filter(function (x) { return x.localService; })[0] || m[0] || null; }
    voices.en = best(/^en[-_]IN/i); if (!voices.en || !voices.en.localService) voices.en = v.filter(function (x) { return /^en/i.test(x.lang) && x.localService; })[0] || voices.en || best(/^en/i);
    voices.hi = best(/^hi([-_]|$)/i);
  }
  /* Android WebView often reports voices late, so check a few times. */
  function pollVoices() { pickVoice(); updAudioStatus(); if (TTS && (!voices.en || !voices.hi) && voiceTries++ < 12) setTimeout(pollVoices, 500); }
  if (TTS) { try { if ("onvoiceschanged" in speechSynthesis) speechSynthesis.onvoiceschanged = function () { pickVoice(); updAudioStatus(); }; } catch (e) { /* ignore */ } pollVoices(); }
  function audioStatusText() {
    if (!TTS) return "Audio is not supported in this browser. You can still read each sentence and say it aloud. · इस ब्राउज़र में आवाज़ उपलब्ध नहीं है।";
    return "English voice: " + (voices.en ? "found" : "not reported") + " · हिंदी voice: " + (voices.hi ? "found" : "not reported") + ". " +
      (voices.hi ? "" : "If you cannot hear Hindi, install Hindi in your device's text-to-speech settings. ") + "If there is no sound, check your volume.";
  }
  function updAudioStatus() { [].forEach.call(document.querySelectorAll("[data-astatus]"), function (e) { e.textContent = audioStatusText(); }); }
  function isHi(t) { return /[\u0900-\u097F]/.test(t); }
  function setPlayBtn(on) { var b = document.querySelector("[data-play]"); if (b) b.innerHTML = on ? STOP_HTML : PLAY_HTML; }
  var guardT;
  function stopSpeech() { qTok++; clearTimeout(guardT); pagePlaying = false; setPlayBtn(false); if (TTS) { try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } } }
  function noteHi(l) {
    if (l !== "hi" || warnedHi) return;
    var v = []; try { v = speechSynthesis.getVoices() || []; } catch (e) { /* ignore */ }
    if (v.length && !voices.hi) { warnedHi = true; toast("No Hindi voice reported on this device. Install Hindi text-to-speech in your device settings. · हिंदी आवाज़ नहीं मिली।"); }
  }
  /* Spoken text: only words are read. Symbols a voice would say out loud ("dot", "plus", "slash", "bullet", "equals"),
     list numbers like "1.", arrows, emoji and quote marks are removed or turned into a pause. */
  function cleanSpeech(t) {
    return String(t)
      .replace(/[←-⇿☀-➿⬀-⯿]|[\uD83C-\uD83E][\uDC00-\uDFFF]|[\uFE0F\u200D]/g, " ")
      .replace(/^\s*\d{1,2}[.)]\s+/, "")                              /* list numbering: "1. Learn…" */
      .replace(/([A-Za-z])[’'](?=[A-Za-z])/g, "$1\u0001")             /* keep the apostrophe in isn't, it's */
      .replace(/[“”"‘’'`´]/g, " ").replace(/\u0001/g, "'")
      .replace(/[।॥]/g, ".")
      .replace(/\s*[·•∙●▪◦|]\s*/g, function (m, o, str) { return /[.?!,;:]\s*$/.test(str.slice(0, o)) ? " " : ", "; })
      .replace(/\s*[+=×÷~^*_#@<>{}\[\]()\\]+\s*/g, " ")
      .replace(/\s*\/\s*/g, ", ")
      .replace(/\.{2,}/g, "…").replace(/…\s*(?=[?!.]|$)/g, "").replace(/…/g, ",")
      .replace(/\s+([,.?!;:])/g, "$1").replace(/([,;:])\s*(?=[.?!])/g, "").replace(/([?!])\.+/g, "$1")
      .replace(/([,;:.])(?:\s*[,;:])+/g, "$1")
      .replace(/(^|[\s])[.,;:]+(?=\s|$)/g, "$1")                      /* a lone dot or comma is never spoken */
      .replace(/\s+/g, " ").trim();
  }
  /* ---- Numbers are spoken as words. A bare "1" or "80%" handed to a voice (or to a different voice from the words
         around it) is what made the audio stall after "Welcome to Day …". ---- */
  var EN1 = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" "),
      EN10 = "  twenty thirty forty fifty sixty seventy eighty ninety".split(" "),
      HI100 = "शून्य एक दो तीन चार पाँच छह सात आठ नौ दस ग्यारह बारह तेरह चौदह पंद्रह सोलह सत्रह अठारह उन्नीस बीस इक्कीस बाईस तेईस चौबीस पच्चीस छब्बीस सत्ताईस अट्ठाईस उनतीस तीस इकतीस बत्तीस तैंतीस चौंतीस पैंतीस छत्तीस सैंतीस अड़तीस उनतालीस चालीस इकतालीस बयालीस तैंतालीस चौवालीस पैंतालीस छियालीस सैंतालीस अड़तालीस उनचास पचास इक्यावन बावन तिरपन चौवन पचपन छप्पन सत्तावन अट्ठावन उनसठ साठ इकसठ बासठ तिरसठ चौंसठ पैंसठ छियासठ सड़सठ अड़सठ उनहत्तर सत्तर इकहत्तर बहत्तर तिहत्तर चौहत्तर पचहत्तर छिहत्तर सतहत्तर अठहत्तर उन्यासी अस्सी इक्यासी बयासी तिरासी चौरासी पचासी छियासी सतासी अठासी नवासी नब्बे इक्यानवे बानवे तिरानवे चौरानवे पचानवे छियानवे सत्तानवे अट्ठानवे निन्यानवे सौ".split(" ");
  function enNum(n) {
    if (n < 20) return EN1[n];
    if (n < 100) return EN10[Math.floor(n / 10)] + (n % 10 ? " " + EN1[n % 10] : "");
    return EN1[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + enNum(n % 100) : "");
  }
  function numWords(t, lang) {
    return t.replace(/(\d+)\s*%/g, lang === "hi" ? "$1 प्रतिशत" : "$1 percent").replace(/(^|[^A-Za-z0-9])(\d{1,3})(?![A-Za-z0-9])/g, function (m, pre, d) {
      var n = +d; return pre + (lang === "hi" ? (n <= 100 ? HI100[n] : enNum(n)) : enNum(n));
    });
  }
  /* Split a line by script. Longer English words inside a Hindi sentence always go to the ENGLISH voice (they keep their English
     pronunciation). A number is never sent on its own: it is spoken as a word, in the language of the words next to it. */
  var LATIN = /([A-Za-z0-9][A-Za-z0-9'\-]*(?:[ ,]+[A-Za-z0-9][A-Za-z0-9'\-]*)*[.?!%]*)/;
  function pieces(t, l) {
    var str = cleanSpeech(t), segs = str.split(LATIN), a = [], out = [], k, p, i;
    for (k = 0; k < segs.length; k++) {
      p = segs[k].replace(/^[\s,.\-:;]+/, "").replace(/[\s,\-:;]+$/, "");
      if (!p) continue;
      if (k % 2) a.push({ t: p, l: /[A-Za-z]/.test(p) ? "en" : "", n: !/[A-Za-z]/.test(p) });
      else if (/[ऀ-ॣ०-ॿ]/.test(p)) a.push({ t: p, l: "hi" });
    }
    if (!a.length && /[A-Za-z0-9ऀ-ॿ]/.test(str)) a.push({ t: str, l: l || "en" });
    function join(list) {
      var r = [];
      list.forEach(function (y) { if (r.length && r[r.length - 1].l === y.l) r[r.length - 1].t += " " + y.t; else r.push({ t: y.t, l: y.l }); });
      return r;
    }
    for (i = 0; i < a.length; i++) {            /* a bare number takes the language of its neighbour */
      if (!a[i].n) continue;
      if (i > 0) { a[i].l = a[i - 1].l; continue; }
      for (k = 1; k < a.length && a[k].n; k++) { /* look ahead */ }
      a[i].l = k < a.length ? a[k].l : (l || "en");
    }
    a = join(a);
    a.forEach(function (y) { y.t = numWords(y.t, y.l).replace(/\s+/g, " ").replace(y.l === "hi" ? /[\s.,;:]+$/ : /[\s,;:]+$/, "").trim(); if (/[A-Za-z0-9ऀ-ॿ]/.test(y.t)) out.push(y); });
    if (out.length && /\?\s*$/.test(str)) { p = out[out.length - 1]; if (!/\?$/.test(p.t)) p.t += "?"; }
    return out;
  }
  /* items: [{t: text, l: "en" | "hi"}]. A new call always replaces the old audio. All pieces are queued at once, so the voice
     moves from English to Hindi immediately instead of waiting for a JavaScript "end" event. */
  function speakSeq(items, page) {
    if (!TTS || !items || !items.length) return;
    stopSpeech();
    var tok = ++qTok, parts = [], st = { started: false, err: false }, est = 0;
    items.forEach(function (it) { pieces(it.t, it.l).forEach(function (p) { parts.push(p); }); });
    if (!parts.length) return;
    pagePlaying = !!page; if (page) setPlayBtn(true);
    parts.forEach(function (p) { est += 700 + p.t.length * 110; });
    function endAll() { if (tok !== qTok) return; clearTimeout(guardT); pagePlaying = false; setPlayBtn(false); }
    guardT = setTimeout(endAll, est + 3000);           /* some WebViews never fire "end" */
    setTimeout(function () {
      if (tok !== qTok) return;
      try {
        speechSynthesis.resume();
        parts.forEach(function (p, k) {
          var hi = p.l === "hi", vo = hi ? voices.hi : voices.en, u = new SpeechSynthesisUtterance(p.t), lastOne = k === parts.length - 1;
          u.lang = vo ? vo.lang : (hi ? "hi-IN" : "en-IN"); if (vo) u.voice = vo;
          u.rate = hi ? 0.9 : 1; u.pitch = 1;
          u.onstart = function () { st.started = true; };
          u.onend = function () { if (lastOne) endAll(); };
          u.onerror = function (e) {
            if (lastOne) endAll();
            if (!e || !e.error || e.error === "interrupted" || e.error === "canceled" || st.err || tok !== qTok) return;
            st.err = true;
            toast(e.error === "not-allowed" ? "Tap a sentence to hear it. · सुनने के लिए वाक्य पर टैप कीजिए।" : "Sound isn't available right now. Check your volume and text-to-speech settings.");
          };
          noteHi(p.l);
          speechSynthesis.speak(u);
        });
      } catch (e) { endAll(); }
    }, 40);
    setTimeout(function () { if (!st.started && tok === qTok && !warnedSound) { warnedSound = true; toast("No sound yet? Check your volume and your device's text-to-speech settings."); } }, 3500);
  }
  function speak(t, l) { if (t) speakSeq([{ t: t, l: l || (isHi(t) ? "hi" : "en") }]); }
  function autoSeq(items, page) { speakSeq((items || []).filter(function (x) { return prefs[x.l]; }), page); }
  function autoSay(t, l) { if (t) autoSeq([{ t: t, l: l || (isHi(t) ? "hi" : "en") }]); }
  function pair(en, hi) { var o = []; if (en) o.push({ t: en, l: "en" }); if (hi) o.push({ t: hi, l: "hi" }); return o; }
  /* A sentence the learner can tap to hear (English or Hindi). Falls back to plain text when audio is unsupported. */
  function tapEl(tag, t, lang, cls, html) {
    var hi = lang === "hi", c = (hi ? "hi" : "en") + (cls ? " " + cls : "");
    if (!TTS) return '<' + tag + ' class="' + c + '"' + (hi ? ' lang="hi"' : "") + '>' + (html || esc(t)) + '</' + tag + '>';
    return '<' + tag + ' class="' + c + ' tap"' + (hi ? ' lang="hi"' : "") + ' data-say="' + esc(t) + '" data-lang="' + lang + '" role="button" tabindex="0" aria-label="' + (hi ? "सुनिए: " : "Listen: ") + esc(t) + '">' + (html || esc(t)) + '</' + tag + '>';
  }
  function hiP(t, cls) { return tapEl("p", t, "hi", cls); }
  function enP(t, cls) { return tapEl("p", t, "en", cls); }
  /* A button for audio whose text is hidden on screen (listening questions). */
  function lbtn(t, lang, label, cls) {
    return TTS ? '<button class="say' + (cls ? " " + cls : "") + '" type="button" data-say="' + esc(t) + '" data-lang="' + lang + '" aria-label="Listen"><span aria-hidden="true">🔊</span> ' + label + '</button>' : "";
  }
  function prefLabel(k) { return "🔊 " + (k === "en" ? "English" : "हिंदी") + " auto-play: " + (prefs[k] ? "On" : "Off"); }
  function prefsHtml(open) {
    if (!TTS) return '<p class="muted" data-astatus>' + esc(audioStatusText()) + '</p>';
    return '<details class="audioset"' + (open ? " open" : "") + '><summary>🔊 Audio settings · आवाज़</summary><p class="muted">Tap any English or Hindi sentence to hear it. · किसी भी वाक्य पर टैप करके सुनिए।</p><div class="prefs" role="group" aria-label="Audio settings">' + ["en", "hi"].map(function (k) {
      return '<button class="tog" type="button" data-pref="' + k + '" aria-pressed="' + prefs[k] + '">' + prefLabel(k) + '</button>';
    }).join("") + '</div><p class="muted" data-astatus>' + esc(audioStatusText()) + '</p></details>';
  }
  function updPrefs() {
    [].forEach.call(document.querySelectorAll("[data-pref]"), function (b) { var k = b.getAttribute("data-pref"); b.setAttribute("aria-pressed", String(prefs[k])); b.textContent = prefLabel(k); });
  }

  /* ---- Lesson state ---- */
  function newState(d) { return { day: d, step: 0, cleared: {}, timer: null, results: {}, missed: [], extra: false, assess: null, pageSeq: [], sub: {}, reviewing: false }; }
  /* ---- Resume: a checkpoint is saved after every step change, every cleared step and every answered question,
         so a learner who leaves can continue exactly where they stopped. ---- */
  function plain(o) { return (o && typeof o === "object" && !Array.isArray(o)) ? o : {}; }
  function ckpt() {
    if (!S.day || !S.day.sections || !lessonEl || lessonEl.hidden || prog.completed.indexOf(S.day.day) > -1) return;
    var sec = cur(); if (!sec) return;
    prog.resume[S.day.day] = { sid: sec.id, cleared: S.cleared, extra: S.extra, results: S.results, missed: S.missed.slice(0, 40), assess: S.assess, sub: S.sub, reviewing: !!S.reviewing, at: Date.now() };
    save();
  }
  function subGet(id) { var v = S.sub[id]; return (v && typeof v === "object") ? v : null; }
  function subSet(id, v) { S.sub[id] = v; ckpt(); }
  function subDrop(id) { delete S.sub[id]; ckpt(); }
  function restoreState(st) {
    var r = prog.resume[st.day.day], vs, i, a;
    if (!r || prog.completed.indexOf(st.day.day) > -1) return false;
    st.cleared = plain(r.cleared); st.results = plain(r.results); st.sub = plain(r.sub); st.extra = r.extra === true; st.reviewing = r.reviewing === true;
    st.missed = (Array.isArray(r.missed) ? r.missed : []).filter(function (m) { return m && typeof m.t === "string"; }).map(function (m) { return { t: m.t, s: String(m.s || "") }; });
    a = r.assess; st.assess = (a && +a.total > 0 && +a.score >= 0 && +a.score <= +a.total) ? { score: +a.score, total: +a.total, weak: Array.isArray(a.weak) ? a.weak.map(String) : [] } : null;
    vs = st.day.sections.filter(function (s) { return !s.opt || st.extra; });
    for (i = 0; i < vs.length; i++) { if (vs[i].id === r.sid) { st.step = i; return true; } }
    st.extra = false; st.step = 0; st.cleared = {}; st.sub = {}; return false;
  }
  /* Where would "Continue" take this learner? Used on the journey screen. */
  function resumeInfo(n) {
    var d = getDay(n), r = prog.resume[n], vs, i;
    if (!d || !r || prog.completed.indexOf(n) > -1) return null;
    vs = d.sections.filter(function (s) { return !s.opt || r.extra === true; });
    for (i = 0; i < vs.length; i++) { if (vs[i].id === r.sid) return (i > 0 || Object.keys(plain(r.sub)).length) ? { step: i + 1, total: vs.length } : null; }
    return null;
  }
  var S = newState(null), stage, nextBtn, backBtn, skipBtn, chipEl, R = {}, syncQ = 0;
  function stopAll() { clearInterval(S.timer); S.timer = null; stopSpeech(); }
  /* Visible steps: optional "extra" steps appear only after the learner chooses them at the gate. */
  function vis() { return S.day.sections.filter(function (s) { return !s.opt || S.extra; }); }
  function cur() { return vis()[S.step]; }
  function goStep(id) { var v = vis(), i; for (i = 0; i < v.length; i++) { if (v[i].id === id) { S.step = i; renderStep(); return; } } }
  function logMiss(t, skill) { var i; if (!t) return; for (i = 0; i < S.missed.length; i++) { if (S.missed[i].t === t) return; } S.missed.push({ t: t, s: skill || "" }); }
  function modelOf(it) {
    if (typeof it.answer === "string") return it.answer;
    if (it.options) return it.spot ? (it.fix || it.options[it.answer]) : (it.say || it.options[it.answer]);
    return it.model || "";
  }
  function isLatin(t) { return !/[ऀ-ॿ]/.test(t); }
  /* ---- Specific feedback ----
     diagnose(wrong, right) compares a wrong sentence with the correct one and names the ONE most useful problem
     (English + Hindi). It returns null when it cannot be sure, and the step's general rule is shown instead.
     mode "listen": the learner is matching a sound, so only the sentence type and the first word are explained. */
  var SUBJ = { it: 1, they: 1, this: 1, that: 1, these: 1, those: 1 }, BEV = { is: 1, are: 1, am: 1 }, NEAR = { this: 1, these: 1 }, MANY = { these: 1, those: 1 };
  function dTok(s) { return String(s).replace(/[.?!,;:]/g, " ").toLowerCase().split(/\s+/).filter(Boolean); }
  function dEnd(s) { var m = String(s).match(/[.?!]+$/); return m ? m[0].charAt(0) : ""; }
  function dBe(x) { return x === "isn't" ? "is" : x === "aren't" ? "are" : x; }
  function dFirst(t, set) { var i; for (i = 0; i < t.length; i++) { if (set[dBe(t[i])]) return dBe(t[i]); } return ""; }
  function dForm(s) {
    var t = dTok(s);
    if (dEnd(s) === "?" || t[0] === "is" || t[0] === "are") return "q";
    return (t.indexOf("not") > -1 || t.some(function (x) { return /n't$/.test(x); })) ? "n" : "s";
  }
  function sNeg(t) { return t.slice(1, 4).some(function (x) { return x === "not" || /n't$/.test(x); }); }   /* is the first clause of a short answer negative? */
  function dMsg(en, hi) { return { en: en, hi: hi }; }
  function diagnose(wrong, right, mode) {
    var wt = dTok(wrong), rt = dTok(right), rs = dFirst(rt, SUBJ), ws = dFirst(wt, SUBJ), rb = dFirst(rt, BEV), wb = dFirst(wt, BEV),
        i, d, nx, wn, rn, wNoArt, sameSet, LBL = { q: ["a question", "सवाल"], n: ["a “no” sentence (with “not”)", "“नहीं” वाला वाक्य"], s: ["a normal sentence", "सामान्य वाक्य"] };
    if (!wt.length || !rt.length || String(wrong).trim() === String(right).trim()) return null;
    if (mode === "listen") {
      if (dForm(wrong) !== dForm(right)) return dMsg("Listen for the type of sentence: you hear " + LBL[dForm(right)][0] + ".", "वाक्य का प्रकार सुनिए: यह " + LBL[dForm(right)][1] + " है।");
      if (rs && ws && rs !== ws) return dMsg("Listen to the first word: you hear “" + rs + "”.", "पहला शब्द ध्यान से सुनिए: “" + rs + "”।");
      return null;
    }
    /* 0. short answers: Yes / No, then the pronoun, then is / are */
    if (rt[0] === "yes" || rt[0] === "no") {
      if ((wt[0] === "yes" || wt[0] === "no") && wt[0] !== rt[0]) return dMsg("The answer should start with “" + cap(rt[0]) + "”, but this one starts with “" + cap(wt[0]) + "”.", "उत्तर “" + cap(rt[0]) + "” से शुरू होना चाहिए, पर यह “" + cap(wt[0]) + "” से शुरू होता है।");
      if (wt[0] === rt[0] && wt[1] !== rt[1] && (rt[1] === "it" || rt[1] === "they")) return dMsg("In the short answer, use “" + rt[1] + "”, not “" + wt[1] + "”.", "छोटे उत्तर में “" + rt[1] + "” लगाइए, “" + wt[1] + "” नहीं।");
      if (wt[0] === rt[0] && sNeg(wt) !== sNeg(rt)) return rt[0] === "yes" ? dMsg("After “Yes”, say “" + rt[1] + " " + dBe(rt[2]) + "” (no “not”).", "“Yes” के बाद “" + rt[1] + " " + dBe(rt[2]) + "” बोलिए (“not” नहीं)।")
                                                         : dMsg("After “No”, add “not”: “" + rt.slice(1, 3).join(" ") + "”.", "“No” के बाद “not” चाहिए: “" + rt.slice(1, 3).join(" ") + "”।");
    }
    /* 1. same words, only the ending mark is different */
    if (wt.join(" ") === rt.join(" ")) {
      if (dEnd(right) === "?") return dMsg("A question ends with a question mark (?).", "सवाल के अंत में प्रश्नचिह्न (?) आता है।");
      if (dEnd(wrong) === "?") return dMsg("A normal sentence ends with a full stop (.), not a question mark.", "सामान्य वाक्य के अंत में full stop (.) आता है, प्रश्नचिह्न नहीं।");
      return null;
    }
    /* 2. a / an */
    if (wt.length === rt.length) {
      d = []; for (i = 0; i < wt.length; i++) { if (wt[i] !== rt[i]) d.push(i); }
      if (d.length === 1 && ((wt[d[0]] === "a" && rt[d[0]] === "an") || (wt[d[0]] === "an" && rt[d[0]] === "a")) && rt[d[0] + 1]) {
        nx = rt[d[0] + 1];
        return rt[d[0]] === "an" ? dMsg("Use “an” before “" + nx + "”: it starts with a vowel sound.", "“" + nx + "” की पहली आवाज़ स्वर (vowel) की है, इसलिए “an” लगाइए।")
                                 : dMsg("Use “a” before “" + nx + "”: it does not start with a vowel sound.", "“" + nx + "” स्वर (vowel) की आवाज़ से शुरू नहीं होता, इसलिए “a” लगाइए।");
      }
      /* 3. one word is the plural / singular of the other (pen ↔ pens, bus ↔ buses) */
      if (d.length === 1) {
        wn = wt[d[0]]; rn = rt[d[0]];
        if (rn === wn + "s" || rn === wn + "es" || rn === wn.replace(/y$/, "ies") || rn === pluralize(wn)) return dMsg("More than one thing → use the plural: “" + rn + "”.", "एक से ज़्यादा चीज़ें → बहुवचन (plural) लगाइए: “" + rn + "”।");
        if (wn === rn + "s" || wn === rn + "es" || wn === rn.replace(/y$/, "ies") || wn === pluralize(rn)) return dMsg("Only one thing → use the singular: “" + rn + "”.", "सिर्फ एक चीज़ → एकवचन (singular) लगाइए: “" + rn + "”।");
      }
    }
    /* 4. the wrong form of “be” (is / are / am) */
    if (wb && rb && wb !== rb) {
      return rs ? dMsg("With “" + rs + "”, use “" + rb + "”, not “" + wb + "”.", "“" + rs + "” के साथ “" + rb + "” आता है, “" + wb + "” नहीं।")
                : dMsg("Use “" + rb + "” here, not “" + wb + "”.", "यहाँ “" + rb + "” लगाइए, “" + wb + "” नहीं।");
    }
    if (rb && !wb && rs) return dMsg("Do not forget “" + rb + "”: " + cap(rs) + " " + rb + "…", "“" + rb + "” मत भूलिए: " + cap(rs) + " " + rb + "…");
    /* 5. this / that / these / those / it */
    if (rs && ws && rs !== ws) {
      if (rs === "it" || ws === "it") return dMsg("Use “" + rs + "” here, not “" + ws + "”.", "यहाँ “" + rs + "” लगाइए, “" + ws + "” नहीं।");
      if (!!MANY[rs] !== !!MANY[ws]) return MANY[rs] ? dMsg("More than one thing → “" + rs + "”, not “" + ws + "”.", "एक से ज़्यादा चीज़ें → “" + rs + "”, “" + ws + "” नहीं।")
                                                   : dMsg("Only one thing → “" + rs + "”, not “" + ws + "”.", "सिर्फ एक चीज़ → “" + rs + "”, “" + ws + "” नहीं।");
      return NEAR[rs] ? dMsg("Near you → say “" + rs + "”, not “" + ws + "”.", "पास में → “" + rs + "” बोलिए, “" + ws + "” नहीं।")
                      : dMsg("Far from you → say “" + rs + "”, not “" + ws + "”.", "दूर → “" + rs + "” बोलिए, “" + ws + "” नहीं।");
    }
    if (BEV[dBe(wt[0])] && !BEV[dBe(rt[0])]) return dMsg("A normal sentence starts with “" + cap(rt[0]) + "”, not “" + cap(wt[0]) + "”.", "सामान्य वाक्य “" + cap(rt[0]) + "” से शुरू होता है, “" + cap(wt[0]) + "” से नहीं।");
    /* 6. a / an with plurals, or missing before one thing */
    wNoArt = wt.filter(function (x) { return x !== "a" && x !== "an"; });
    if (wNoArt.length !== wt.length && wNoArt.join(" ") === rt.join(" ")) return dMsg("Do not use “a / an” here. It is only for one thing.", "यहाँ “a / an” मत लगाइए। यह सिर्फ एक चीज़ के लिए है।");
    if (wNoArt.length !== wt.length && wNoArt.length === rt.length) {
      d = []; for (i = 0; i < rt.length; i++) { if (wNoArt[i] !== rt[i]) d.push(i); }
      if (d.length === 1 && rt[d[0]] === pluralize(wNoArt[d[0]])) return dMsg("More than one thing → use the plural “" + rt[d[0]] + "”, and drop “a / an”.", "एक से ज़्यादा चीज़ें → बहुवचन “" + rt[d[0]] + "” लगाइए और “a / an” हटाइए।");
    }
    if (rt.filter(function (x) { return x === "a" || x === "an"; }).length > wt.filter(function (x) { return x === "a" || x === "an"; }).length && rt.filter(function (x) { return x !== "a" && x !== "an"; }).join(" ") === wt.join(" "))
      return dMsg("One thing needs “a / an” (or my / your) before it.", "एक चीज़ से पहले “a / an” (या my / your) चाहिए।");
    /* 7. “not” missing or extra */
    wn = wt.indexOf("not"); rn = rt.indexOf("not");
    if (rn > -1 && wn < 0) return dMsg("This sentence needs “not”" + (rb ? ": put it right after “" + rb + "”." : "."), "इस वाक्य में “not” चाहिए" + (rb ? ": इसे “" + rb + "” के ठीक बाद लगाइए।" : "।"));
    if (wn > -1 && rn < 0) return dMsg("Take out “not”. This is a normal sentence.", "“not” हटाइए। यह सामान्य वाक्य है।");
    /* 8. same words, different order */
    sameSet = wt.slice().sort().join("|") === rt.slice().sort().join("|");
    if (sameSet) {
      if (BEV[rt[0]] && !BEV[wt[0]]) return dMsg("A Yes/No question starts with “" + cap(rt[0]) + "”.", "हाँ/नहीं वाला सवाल “" + cap(rt[0]) + "” से शुरू होता है।");
      if (BEV[wt[0]] && !BEV[rt[0]]) return dMsg("A normal sentence starts with “" + cap(rt[0]) + "”, not “" + cap(wt[0]) + "”.", "सामान्य वाक्य “" + cap(rt[0]) + "” से शुरू होता है, “" + cap(wt[0]) + "” से नहीं।");
      if (rn > -1 && wn !== rn && rb) return dMsg("“not” goes right after “" + rb + "”.", "“not”, “" + rb + "” के ठीक बाद आता है।");
      if (SUBJ[rt[0]] && wt[0] !== rt[0]) return dMsg("Start the sentence with “" + cap(rt[0]) + "”.", "वाक्य “" + cap(rt[0]) + "” से शुरू कीजिए।");
      if (!BEV[dBe(rt[0])] && rb && rt[1] === rb && wt[1] !== rb) return dMsg("Put “" + rb + "” right after “" + rt[0] + "”: " + cap(rt[0]) + " " + rb + "…", "“" + rb + "” को “" + rt[0] + "” के ठीक बाद रखिए: " + cap(rt[0]) + " " + rb + "…");
      if (BEV[dBe(rt[0])] && wt[0] === rt[0] && SUBJ[rt[1]] && wt[1] !== rt[1]) return dMsg("After “" + cap(rt[0]) + "”, say “" + rt[1] + "”: " + cap(rt[0]) + " " + rt[1] + "…?", "“" + cap(rt[0]) + "” के बाद “" + rt[1] + "” बोलिए: " + cap(rt[0]) + " " + rt[1] + "…?");
    }
    return null;
  }
  /* Highlight the words of `wrong` that do not belong. A reordered sentence is compared place by place;
     otherwise the longest run of matching words is kept, so one extra or missing word does not mark the whole sentence red. */
  function markDiff(wrong, right) {
    var w = wrong.split(" "), r = right.split(" "), n = w.length, m = r.length, t = [], keep = {}, i, j;
    if (w.slice().sort().join("|") === r.slice().sort().join("|")) return w.map(function (x, k) { return x !== r[k] ? '<mark class="bad">' + esc(x) + '</mark>' : esc(x); }).join(" ");
    for (i = 0; i <= n; i++) { t[i] = []; for (j = 0; j <= m; j++) t[i][j] = 0; }
    for (i = n - 1; i >= 0; i--) { for (j = m - 1; j >= 0; j--) t[i][j] = w[i] === r[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1]); }
    i = 0; j = 0;
    while (i < n && j < m) { if (w[i] === r[j]) { keep[i] = 1; i++; j++; } else if (t[i + 1][j] >= t[i][j + 1]) i++; else j++; }
    return w.map(function (x, k) { return keep[k] ? esc(x) : '<mark class="bad">' + esc(x) + '</mark>'; }).join(" ");
  }
  /* Per-day data (day.skillSteps, day.tagWhy) tells the engine where to send a learner to review a skill. */
  function skillStep(n) { return ((S.day && S.day.skillSteps) || {})[n]; }
  function tagWhy(t) { return ((S.day && S.day.tagWhy) || {})[t]; }
  function goType(type) { var v = vis(), i; for (i = 0; i < v.length; i++) { if (v[i].type === type) { S.step = i; renderStep(); return; } } }

  /* ---- Info blocks ---- */
  function block(b) {
    switch (b.t) {
      case "bi": return '<div class="bi ' + (b.style || "") + '">' + enP(b.en) + (b.hi ? hiP(b.hi) : "") + '</div>';
      case "h": return '<h3 class="h">' + tapEl("span", b.text, "en") + '</h3>';
      case "pattern": return '<div class="pattern"><b>' + esc(b.en) + '</b><span lang="hi">' + esc(b.hi) + '</span></div>';
      case "cat": return '<div class="cat ' + b.cls + '"><h4>' + esc(b.name) + '</h4>' + enP(b.en) + hiP(b.hi) + '</div>';
      case "ex": return b.items.map(function (i) { return '<div class="bi">' + enP(i.en) + hiP(i.hi) + '</div>'; }).join("");
      case "fix": return '<div class="fix"><div class="bad"><small>✕ Wrong</small>' + tapEl("p", b.wrong, "en") + '</div><div class="good"><small>✓ Correct</small>' + tapEl("p", b.right, "en") + '</div></div>';
      case "form": return '<div class="cat ' + b.cls + '"><h4>' + esc(b.name) + '</h4><p class="pat">' + esc(b.pattern) + '</p>' + enP(b.example) + '</div>';
      case "pron": return '<div class="pron">' + tapEl("b", b.word, "en") + '<span class="sound" lang="hi">' + esc(b.sound) + '</span></div>';
      case "compare": return '<div class="cmp">' + b.rows.map(function (r) {
        var t = esc(r.en); if (r.mark) t = t.replace(new RegExp("\\b" + r.mark + "\\b"), "<mark>$&</mark>");
        return '<div class="cat ' + r.cls + '"><h4>' + esc(r.label) + '</h4>' + tapEl("p", r.en, "en", "", t) + hiP(r.hi) + '</div>';
      }).join("") + '</div>';
      case "lines": return '<ul class="lines card">' + b.items.map(function (i) { return '<li>' + tapEl("span", i, "en") + '</li>'; }).join("") + '</ul>';
    }
    return "";
  }
  function seqBlocks(blocks) {
    var out = [];
    blocks.forEach(function (b) {
      if (b.t === "bi" || b.t === "cat") out = out.concat(pair(b.en, b.hi));
      else if (b.t === "ex") b.items.forEach(function (i) { out = out.concat(pair(i.en, i.hi)); });
      else if (b.t === "compare") b.rows.forEach(function (r) { out = out.concat(pair(r.en, r.hi)); });
      else if (b.t === "form") out = out.concat(pair(b.example));
      else if (b.t === "fix") out = out.concat(pair(b.right));
      else if (b.t === "lines") b.items.forEach(function (i) { out = out.concat(pair(i)); });
    });
    return out;
  }
  /* Instruction line at the top of an activity: text only (tap the Hindi line to hear it), so there are fewer buttons. */
  function intro(sec) { return sec.intro ? block({ t: "bi", en: sec.intro.en, hi: sec.intro.hi, nobtn: true }) : ""; }
  /* Instruction line: tap it to hear the English and the Hindi. */
  function askHtml(a) {
    if (!a) return "";
    var en = typeof a === "string" ? a : a.en, hi = typeof a === "string" ? "" : (a.hi || ""), t = en + (hi ? " " + hi : ""),
        inner = '<b>' + esc(en) + '</b>' + (hi ? '<span lang="hi">' + esc(hi) + '</span>' : "");
    if (!TTS) return '<div class="ask">' + inner + '</div>';
    return '<div class="ask tap" data-say="' + esc(t) + '" data-lang="en" role="button" tabindex="0" aria-label="Listen: ' + esc(t) + '">' + inner + '</div>';
  }
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el, where) {
    if (!el || !el.scrollIntoView) return;
    setTimeout(function () { try { el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: where || "nearest" }); } catch (e) { /* ignore */ } }, 60);
  }
  function fbBox(cls, html) { return '<div class="fb ' + cls + '">' + html + '</div>'; }
  function whyHtml(w) { return (w && w.en) ? tapEl("p", w.en + (w.hi ? " " + w.hi : ""), "en", "", esc(w.en) + (w.hi ? '<br><span lang="hi">' + esc(w.hi) + '</span>' : "")) : ""; }

  /* ---- Feedback colours: a wrong answer sits in a RED box, the correct answer in a GREEN box ---- */
  function wrongBox(h, l) { return '<div class="ans ans-bad"><small>' + (l || "✕ Your answer · आपका उत्तर") + '</small><p class="yours">' + h + '</p></div>'; }
  function rightBox(t, lang, l) { return '<div class="ans ans-good"><small>' + (l || "✓ Correct answer · सही उत्तर") + '</small>' + tapEl("p", t, lang || "en", "yours") + '</div>'; }

  /* ---- “Write your own”: checks the pattern, the a / an rule, and that the chosen word is a NOUN ---- */
  function wset(s) { var o = {}; s.split(/\s+/).forEach(function (w) { if (w) o[w] = 1; }); return o; }
  var NOUNS = wset("pen pencil book notebook bag bottle box chair table desk bench bed sofa door window wall floor room kitchen garden gate fan light lamp clock watch phone mobile laptop computer tablet keyboard mouse screen television tv radio camera charger key lock bell mirror picture photo map board ruler eraser marker paper page letter card ticket envelope parcel gift toy ball bat kite doll game cup glass plate bowl spoon fork knife jug pot pan kettle bucket mug basket umbrella shoe sock shirt dress skirt coat jacket sweater cap hat scarf belt ring wallet purse suitcase towel blanket pillow curtain carpet broom brush comb soap candle cupboard shelf drawer stool ladder tap sink stove oven fridge bulb switch plug speaker headphone printer pocket button rope apple banana mango orange grape lemon melon papaya guava pear peach tomato potato onion carrot cucumber cabbage egg cake biscuit sandwich burger pizza samosa roti dosa sweet chocolate meal breakfast lunch dinner snack dish tea coffee juice soup salad fruit vegetable coconut drink tree flower leaf plant grass forest river lake sea mountain hill road street path bridge sun moon star sky cloud rain wind field farm island beach stone rock sand fire dog cat cow buffalo horse goat sheep pig hen chicken duck bird parrot crow fish snake frog lion tiger elephant monkey rabbit rat bear deer donkey camel ant bee butterfly insect boy girl man woman child baby friend teacher student doctor nurse driver farmer player singer actor artist engineer family father mother brother sister uncle aunt grandfather grandmother husband wife son daughter cousin kid person school college university office shop store market bank hospital hotel restaurant station airport park temple church mosque library museum cinema house home flat building city town village country place bus car bike bicycle scooter train plane aeroplane boat ship taxi truck van auto rickshaw tractor head face eye ear nose mouth tooth hand finger arm leg foot knee neck hair heart day hour minute week month year morning evening night name problem question answer idea word sentence lesson class test exam job price number colour color shape size sound song story movie film team match app website email message file walk play"),
      UNC = wset("water milk rice bread sugar salt money music homework furniture luggage butter cheese oil honey advice work"),
      PROPER = wset("monday tuesday wednesday thursday friday saturday sunday january february march april may june july august september october november december india delhi mumbai english hindi"),
      ADJ = wset("easy difficult hard good bad hot cold warm cool big small large little tiny huge long short tall new old young red blue green yellow black white pink brown grey gray purple golden silver beautiful pretty ugly nice great best better worse clean dirty fast slow heavy soft sweet sour fresh empty full open closed wet dry cheap expensive happy sad angry tired hungry thirsty sick healthy strong weak rich poor busy free quiet loud safe late early right wrong true false same different important useful special favourite favorite lovely wonderful terrible excellent perfect round square flat thick thin wide deep high low smart clever funny kind lazy brave famous popular strange real simple ready interesting boring delicious tasty comfortable broken wooden plastic"),
      VERBS = wset("go come run eat sleep sit stand read write speak say tell look see listen study learn teach buy sell make take give get put close use like love want need know think try help call ask sing dance swim jump wait stop start finish bring carry cook wash drive ride wear"),
      OTHERW = wset("i you he she we they me him us them it this that these those here there now then very too also not and or but so because if when where what who why how in on at to from with without under over near far up down inside outside much many some any all no yes please one two three four five six seven eight nine ten quickly slowly well always never"),
      DETW = wset("a an my your his her our their its the"), IRR = { men: "man", women: "woman", children: "child", feet: "foot", teeth: "tooth", mice: "mouse", people: "person", geese: "goose", oxen: "ox", policemen: "policeman", firemen: "fireman", postmen: "postman", businessmen: "businessman", watchmen: "watchman", milkmen: "milkman", salesmen: "salesman", fishermen: "fisherman", gentlemen: "gentleman", policewomen: "policewoman", ladies: "lady", loaves: "loaf", lives: "life", wolves: "wolf", thieves: "thief", halves: "half", calves: "calf", selves: "self", knives: "knife", wives: "wife", leaves: "leaf", shelves: "shelf" };
  "sleepy worried excited scared proud absent present ill surprised nervous upset lonely glad sorry sure ready".split(" ").forEach(function (w) { ADJ[w] = 1; });
  ADJ.fine = 1;   /* I am fine. */
  /* The big noun list (vocabulary/nouns.js → LW.nouns). Words already known here keep their old kind (an adjective stays an adjective). */
  var PLONLY = {}, MOD = {};
  (function () {
    var X = window.LW && window.LW.nouns;
    function each(str, fn) { String(str || "").split(" ").forEach(function (w) { if (w) fn(w); }); }
    if (!X) return;
    each(X.c, function (w) { if (!NOUNS[w] && !UNC[w] && !PROPER[w] && !ADJ[w] && !OTHERW[w] && !DETW[w]) NOUNS[w] = 1; });
    each(X.u, function (w) { if (!NOUNS[w] && !UNC[w] && !ADJ[w] && !OTHERW[w] && !DETW[w]) UNC[w] = 1; });
    each(X.n, function (w) { if (!NOUNS[w] && !UNC[w] && !ADJ[w] && !OTHERW[w]) PROPER[w] = 1; });
    each(X.p, function (w) { if (!OTHERW[w] && !DETW[w]) PLONLY[w] = 1; });
    each(X.m, function (w) { MOD[w] = 1; });
  })();
  /* The big verb list (vocabulary/verbs.js → LW.verbForms): every form (go, goes, went, gone, going …) is known as a verb */
  (function () {
    var V = window.LW && window.LW.verbForms;
    if (V) String(V).split(" ").forEach(function (w) { if (w && !OTHERW[w] && !DETW[w]) VERBS[w] = 1; });
  })();
  /* The big adjective list (vocabulary/adjectives.js → LW.adjForms) and adverb list (vocabulary/adverbs.js → LW.adverbForms) */
  (function () {
    var A = window.LW && window.LW.adjForms, D = window.LW && window.LW.adverbForms;
    if (A) String(A).split(" ").forEach(function (w) { if (w && !OTHERW[w] && !DETW[w]) ADJ[w] = 1; });
    var C = window.LW && window.LW.connForms;
    if (C) String(C).split(" ").forEach(function (w) { if (w && !NOUNS[w] && !UNC[w] && !PROPER[w] && !ADJ[w] && !VERBS[w] && !DETW[w]) OTHERW[w] = 1; });
    var PR = window.LW && window.LW.pronForms;
    if (PR) String(PR).split(" ").forEach(function (w) { if (w && !NOUNS[w] && !UNC[w] && !PROPER[w] && !ADJ[w] && !VERBS[w] && !DETW[w]) OTHERW[w] = 1; });
    if (D) String(D).split(" ").forEach(function (w) { if (w && !NOUNS[w] && !UNC[w] && !PROPER[w] && !ADJ[w] && !VERBS[w] && !DETW[w]) OTHERW[w] = 1; });
  })();
  var DEGW = wset("very really quite extremely rather fairly slightly incredibly terribly");   /* a very big bag */
  function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function needsAn(w) {
    if (/^(hour|honest|honou?r|heir)/.test(w)) return true;
    if (/^(x-?ray|ac|atm|sms|fm|mba|lpg|mri|nri|ngo|emi|fir|ias|ips|mla|mp|rti|html|hr|lcd|led|ssc|fridge-?x)$/.test(w)) return true;
    if (/^(uni(versity|versal|verse|form|on|t|te|ted|que|corn|cycle|fy)|use|user|used|useful|usual|usually|utensil|euro|one|once|ukulele)/.test(w)) return false;
    return /^[aeiou]/.test(w);
  }
  function pluralOf(w) {
    var c = [], i;
    if (IRR[w]) return IRR[w];
    if (/ies$/.test(w)) c.push(w.slice(0, -3) + "y");
    if (/zzes$/.test(w)) c.push(w.slice(0, -3));
    if (/ves$/.test(w)) { c.push(w.slice(0, -3) + "f"); c.push(w.slice(0, -3) + "fe"); }
    if (/es$/.test(w)) c.push(w.slice(0, -2));
    if (/s$/.test(w)) c.push(w.slice(0, -1));
    for (i = 0; i < c.length; i++) { if (NOUNS[c[i]]) return c[i]; }
    return "";
  }
  function possOK(raw) { var m = /^(.+)'s$/i.exec(raw), b; if (!m) return false; b = m[1].toLowerCase(); return !!(NOUNS[b] || UNC[b] || PROPER[b] || /^[A-Z]/.test(m[1])); }
  function posMsg(w) {
    var en = ADJ[w] ? "an adjective (a describing word), not a noun" : VERBS[w] ? "a verb (an action word), not a noun" : OTHERW[w] ? "not a noun" : "",
        hi = ADJ[w] ? "विशेषण (adjective) है, संज्ञा नहीं" : VERBS[w] ? "क्रिया (verb) है, संज्ञा नहीं" : "संज्ञा नहीं है";
    if (!en) return { en: "We could not find “" + w + "” in our noun list. Use the name of a thing, like pen, book or bag. Check your spelling too.", hi: "“" + w + "” हमारी noun list में नहीं मिला। किसी चीज़ का नाम लिखिए, जैसे pen, book या bag। Spelling भी जाँचिए।" };
    return { en: "“" + w + "” is " + en + ". Here we need a noun: the name of a thing, like pen, book or bag.", hi: "“" + w + "” " + hi + "। यहाँ संज्ञा (noun) चाहिए: किसी चीज़ का नाम, जैसे pen, book या bag।" };
  }
  /* raws = the words after the pattern (e.g. ["an","apple"]). Returns the problems, the words to mark red, and a fix when only a / an is wrong. */
  function nounCheck(raws) {
    var ws = raws.map(function (x) { return x.toLowerCase(); }), errs = [], bad = {}, i = 0, det = "", rest, h, hw, first, k, w, pl, proper = false, headOk = false, art = false, fx = null;
    if (DETW[ws[0]] || possOK(raws[0])) { det = ws[0]; i = 1; }
    rest = ws.slice(i);
    if (!rest.length) { bad[0] = 1; return { errs: [{ en: "Add a noun after “" + det + "”: the name of a thing, like pen or book.", hi: "“" + det + "” के बाद संज्ञा (noun) जोड़िए: किसी चीज़ का नाम, जैसे pen या book।" }], bad: bad, fix: null }; }
    h = rest.length - 1; hw = rest[h];
    if (NOUNS[hw] || UNC[hw] || PROPER[hw]) { headOk = true; proper = !!PROPER[hw]; }
    else if (PLONLY[hw] && !((pl = pluralOf(hw)) && pluralize(pl) === hw)) { errs.push({ en: "“" + hw + "” is always plural (more than one). Use “these / those … are”: These are my " + hw + ".", hi: "“" + hw + "” हमेशा बहुवचन में ही आता है। “these / those … are” लगाइए: These are my " + hw + "।" }); bad[i + h] = 1; }
    else if ((pl = pluralOf(hw))) { errs.push({ en: "“" + hw + "” means more than one. Here we talk about one thing, so use “" + pl + "”.", hi: "“" + hw + "” का मतलब एक से ज़्यादा है। यहाँ एक चीज़ की बात है, इसलिए “" + pl + "” लिखिए।" }); bad[i + h] = 1; }
    else if (!ADJ[hw] && !VERBS[hw] && !OTHERW[hw] && (/^[A-Z]/.test(raws[i + h]) || /(tion|sion|ment|ness|ity|ship|hood|ism|ist|ance|ence)$/.test(hw))) { headOk = true; proper = /^[A-Z]/.test(raws[i + h]); }
    else { errs.push(posMsg(hw)); bad[i + h] = 1; }
    for (k = 0; k < h; k++) {
      w = rest[k];
      if (DETW[w]) { errs.push({ en: "Use only one of a / an / my / your before the noun.", hi: "संज्ञा से पहले a / an / my / your में से सिर्फ एक लगाइए।" }); bad[i + k] = 1; }
      else if (!(ADJ[w] || DEGW[w] || NOUNS[w] || UNC[w] || MOD[w] || PLONLY[w] || possOK(raws[i + k]))) { errs.push({ en: "We could not find “" + w + "” in our word list. Try a simple describing word like big, new or red, or leave it out.", hi: "“" + w + "” हमारी word list में नहीं मिला। कोई आसान शब्द लिखिए, जैसे big, new या red, या उसे हटा दीजिए।" }); bad[i + k] = 1; }
    }
    first = rest[0];
    if (det === "a" || det === "an") {
      if (UNC[hw]) { errs.push({ en: "“" + hw + "” cannot be counted, so do not use “a / an” with it. Say “my " + hw + "”.", hi: "“" + hw + "” गिना नहीं जाता, इसलिए इसके साथ “a / an” नहीं लगता। “my " + hw + "” कहिए।" }); bad[0] = 1; }
      else if ((det === "a") === needsAn(first)) {
        art = true; bad[0] = 1;
        errs.push(needsAn(first) ? { en: "Use “an” before “" + first + "”: it starts with a vowel sound (a, e, i, o, u).", hi: "“" + first + "” की पहली आवाज़ स्वर (vowel) की है, इसलिए “an” लगाइए: an " + first + "।" } : { en: "Use “a” before “" + first + "”: it starts with a consonant sound.", hi: "“" + first + "” की पहली आवाज़ व्यंजन (consonant) की है, इसलिए “a” लगाइए: a " + first + "।" });
      }
    } else if (!det && headOk && !proper && !UNC[hw]) {
      errs.push({ en: "One thing needs a word before it: a, an, my or your. Example: a pen.", hi: "एक चीज़ से पहले a, an, my या your लगाइए। जैसे: a pen।" }); bad[0] = 1;
    }
    if (art && errs.length === 1) { fx = raws.slice(); fx[0] = det === "a" ? "an" : "a"; if (/^[A-Z]/.test(raws[0])) fx[0] = cap(fx[0]); fx = fx.join(" "); }
    return { errs: errs, bad: bad, fix: fx };
  }
  /* Runs after the pattern is right. Returns null if the noun and a / an are fine, otherwise a "not ok" result with red-marked words. */
  function nounGate(form, s) {
    var re = form === "aff" ? /^(?:it|this|that)(?:'s| is) /i : form === "neg" ? /^(?:it|this|that)(?:'s not| is not| isn't) /i : /^(?:is|isn't) (?:it|this|that) /i,
        m = s.match(re), end = form === "q" ? "?" : ".", raws, r;
    if (!m) return null;
    raws = s.slice(m[0].length).split(" ").filter(Boolean);
    if (!raws.length) return null;
    r = nounCheck(raws);
    if (!r.errs.length) return null;
    return { ok: false, msg: r.errs[0], msgs: r.errs, fix: r.fix ? cap(m[0] + r.fix) + end : "",
      html: esc(m[0]) + raws.map(function (w, k) { return r.bad[k] ? '<mark class="bad">' + esc(w) + '</mark>' : esc(w); }).join(" ") + esc(end) };
  }
  /* ---- Plural nouns (Day 3: these / those + are). A day opts in with write.plural = true. ---- */
  var DETP = wset("my your his her our their its the some any two three four five six seven eight nine ten many few"),
      SAMEPL = wset("fish sheep deer aircraft species series"), ALTPL = wset("mangos mosquitos volcanos buffalos heros zeros photos pianos"), REVIRR = {};
  Object.keys(IRR).forEach(function (k) { REVIRR[IRR[k]] = k; });
  function pluralize(w) {
    if (REVIRR[w]) return REVIRR[w];
    if (SAMEPL[w]) return w;
    if (/(leaf|shelf|loaf|wolf|thief|half|calf|self)$/.test(w)) return w.slice(0, -1) + "ves";
    if (/(knife|wife|life)$/.test(w)) return w.slice(0, -2) + "ves";
    if (/quiz$/.test(w)) return w + "zes";
    if (/(policeman|fireman|postman|businessman|watchman|milkman|salesman|fisherman|gentleman|policewoman)$/.test(w)) return w.replace(/man$/, "men").replace(/woman$/, "women");
    if (/[^aeiou]y$/.test(w)) return w.slice(0, -1) + "ies";
    if (/(s|x|z|ch|sh)$/.test(w) || /(tomato|potato|mango|hero|echo|volcano|buffalo|mosquito|torpedo|domino)$/.test(w)) return w + "es";
    return w + "s";
  }
  /* raws = the words after the pattern (e.g. ["my","pens"]). Same result shape as nounCheck(). */
  function nounCheckPl(raws) {
    var ws = raws.map(function (x) { return x.toLowerCase(); }), errs = [], bad = {}, i = 0, rest, h, hw, k, w, sg, art = false, fixHead = "", out;
    if (ws[0] === "a" || ws[0] === "an") {
      art = true; bad[0] = 1; i = 1;
      errs.push({ en: "Do not use “a / an” with more than one thing. Say “pens”, not “a pens”.", hi: "एक से ज़्यादा चीज़ों के साथ “a / an” नहीं लगता। “a pens” नहीं, “pens” कहिए।" });
    } else if (DETP[ws[0]] || possOK(raws[0])) i = 1;
    rest = ws.slice(i);
    if (!rest.length) { bad[0] = 1; return { errs: [{ en: "Add a plural noun after “" + ws[0] + "”: more than one thing, like pens or books.", hi: "“" + ws[0] + "” के बाद बहुवचन संज्ञा जोड़िए: एक से ज़्यादा चीज़ें, जैसे pens या books।" }], bad: bad, fix: null }; }
    h = rest.length - 1; hw = rest[h];
    if (SAMEPL[hw] || PLONLY[hw]) { /* fish, sheep, deer: same word for one or many · clothes, scissors: always plural */ }
    else if (NOUNS[hw]) {
      fixHead = pluralize(hw); bad[i + h] = 1;
      errs.push({ en: "“" + hw + "” means one thing. Here we talk about more than one thing, so use “" + fixHead + "”.", hi: "“" + hw + "” का मतलब एक चीज़ है। यहाँ एक से ज़्यादा चीज़ों की बात है, इसलिए “" + fixHead + "” लिखिए।" });
    } else if (UNC[hw]) {
      bad[i + h] = 1;
      errs.push({ en: "“" + hw + "” cannot be counted, so it has no plural. Use a thing you can count, like pens or books.", hi: "“" + hw + "” गिना नहीं जाता, इसलिए इसका plural नहीं बनता। गिनी जा सकने वाली चीज़ लिखिए, जैसे pens या books।" });
    } else if ((sg = pluralOf(hw))) {
      if (pluralize(sg) !== hw && !ALTPL[hw]) {
        fixHead = pluralize(sg); bad[i + h] = 1;
        errs.push({ en: "Check the spelling: the plural of “" + sg + "” is “" + fixHead + "”.", hi: "Spelling जाँचिए: “" + sg + "” का plural “" + fixHead + "” है।" });
      }
    } else { bad[i + h] = 1; errs.push(posMsg(hw)); }
    for (k = 0; k < h; k++) {
      w = rest[k];
      if (DETW[w] || DETP[w]) { errs.push({ en: "Use only one word like my / your / the before the noun.", hi: "संज्ञा से पहले my / your / the जैसा सिर्फ एक शब्द लगाइए।" }); bad[i + k] = 1; }
      else if (!(ADJ[w] || DEGW[w] || NOUNS[w] || UNC[w] || MOD[w] || PLONLY[w] || possOK(raws[i + k]))) { errs.push({ en: "We could not find “" + w + "” in our word list. Try a simple describing word like big, new or red, or leave it out.", hi: "“" + w + "” हमारी word list में नहीं मिला। कोई आसान शब्द लिखिए, जैसे big, new या red, या उसे हटा दीजिए।" }); bad[i + k] = 1; }
    }
    /* a corrected sentence is offered only when every problem is “remove a / an” or “fix the plural word” */
    out = null;
    if (errs.length && errs.length === (art ? 1 : 0) + (fixHead ? 1 : 0)) {
      out = (art ? raws.slice(1) : raws.slice()); if (fixHead) out[out.length - 1] = fixHead; out = out.join(" ");
    }
    return { errs: errs, bad: bad, fix: out };
  }
  function nounGatePl(form, s) {
    var re = form === "aff" ? /^(?:these|those) are / : form === "neg" ? /^(?:these|those) (?:are not|aren't) / : /^(?:are|aren't) (?:these|those) /,
        m = s.toLowerCase().match(re), end = form === "q" ? "?" : ".", raws, r, pre;
    if (!m) return null;
    pre = s.slice(0, m[0].length);
    raws = s.slice(m[0].length).split(" ").filter(Boolean);
    if (!raws.length) return null;
    r = nounCheckPl(raws);
    if (!r.errs.length) return null;
    return { ok: false, msg: r.errs[0], msgs: r.errs, fix: r.fix ? cap(pre + r.fix) + end : "",
      html: esc(pre) + raws.map(function (w, k) { return r.bad[k] ? '<mark class="bad">' + esc(w) + '</mark>' : esc(w); }).join(" ") + esc(end) };
  }
  /* A day may define write:{subs, contr, msg:{aff,neg,q}, isMsg} for its own pattern (Day 2: this/that).
     Optional extras (Day 3: these/those): be ("are"), nt ("aren't"), badBe ("is|am"), badQ ("is"), qMsg, plural:true, okTags, okLine. */
  /* Day 4 (Here / There + is / are): write.mixed = true. The verb may be is or are; the noun after it must agree
     (is → one thing, are → more than one). write.subs = words for statements, write.qSubs = words for questions. */
  function checkMixed(cfg, form, t, l, q, s) {
    var sb = cfg.subs.join("|"), qb = (cfg.qSubs || cfg.subs).join("|"), m, pre, raws, r, are, end = form === "q" ? "?" : ".", msg, rest;
    if (form === "aff") m = l.match(new RegExp("^((?:" + sb + ")(?: (?:is|are)|'s)) (?!not\\b)(.+)$"));
    else if (form === "neg") m = l.match(new RegExp("^((?:" + (cfg.negSubs || cfg.subs).join("|") + ")(?: (?:is|are) not| isn't| aren't|'s not)) (.+)$"));
    else m = l.match(new RegExp("^((?:is|are|isn't|aren't) (?:" + qb + ")) (.+)$"));
    if (m && !(form !== "q" && q)) {
      pre = s.slice(0, m[1].length); raws = s.slice(m[1].length).split(" ").filter(Boolean);
      are = /\bare\b|aren't/.test(m[1]);
      r = are ? nounCheckPl(raws) : nounCheck(raws);
      if (!r.errs.length) return { ok: true, clean: s.charAt(0).toUpperCase() + s.slice(1) + end, note: "" };
      if (!are && !NOUNS[raws[raws.length - 1].toLowerCase()] && pluralOf(raws[raws.length - 1].toLowerCase())) r.errs.unshift({ en: "“is” is for one thing. For more than one thing, use “are”: There are two buses.", hi: "“is” एक चीज़ के लिए है। एक से ज़्यादा चीज़ों के लिए “are” लगाइए: There are two buses." });
      return { ok: false, msg: r.errs[0], msgs: r.errs, fix: r.fix ? cap(pre + " " + r.fix) + end : "",
        html: esc(pre) + " " + raws.map(function (w, k) { return r.bad[k] ? '<mark class="bad">' + esc(w) + '</mark>' : esc(w); }).join(" ") + esc(end) };
    }
    if (form === "aff" && /\bnot\b/.test(l)) msg = { en: "For a normal statement, don't use “not”.", hi: "सामान्य वाक्य में “not” नहीं लगता।" };
    else if (form !== "q" && q) msg = { en: "A statement ends with a full stop (.), not a question mark.", hi: "सामान्य वाक्य के अंत में full stop (.) आता है।" };
    else if (form === "neg" && /^here\b/.test(l)) msg = { en: "We do not make “not” sentences with “here”. Use “There is not…”: There is not a bus.", hi: "“here” के साथ “not” वाला वाक्य नहीं बनता। “There is not…” लगाइए: There is not a bus." };
    else if (form === "q" && /^(is|are|isn't|aren't) here\b/.test(l)) msg = { en: "We ask with “there”: Is there a pen? (not “Is here…”).", hi: "सवाल “there” के साथ पूछते हैं: Is there a pen? (“Is here…” नहीं)।" };
    else if (form === "q" && /^(there|here) (is|are)\b/.test(l)) msg = { en: "For a question, put “Is” or “Are” first: Is there a bus?", hi: "सवाल में “Is” या “Are” पहले लगाइए: Is there a bus?" };
    else msg = cfg.msg[form];
    return { ok: false, msg: msg };
  }

  /* Rule-based “Write your own” (Days 5–7). A day sets write.rx = { aff: [spec], neg: [spec], q: [spec] }; each spec = { re, c, k? }:
       re = regex on the lower-case sentence; group 1 (at the END of the sentence) = the words to check;
       c  = "s" one thing · "p" more than one · "e" either · "-" nothing to check (the pattern alone is enough: What is this?)
            · "b1" / "b2" one bare noun, one thing / more than one (Whose bag is this? · Whose books are these?);   k = "c" also accepts a place (at home) or a describing word (happy).
     Optional: write.strip = words allowed at the end and ignored (yesterday, last night …),
               write.hints = [[regex, {en,hi}], …] tried when no spec matches, write.cMsg = message for an unknown complement.
     Specs are tried in order, so put the specific one first. Working examples: days/day-05.js and days/day-06.js. */
  function shiftBad(r, n) { var b = {}; Object.keys(r.bad || {}).forEach(function (k) { b[+k + n] = 1; }); return { errs: r.errs, bad: b, fix: null }; }
  function complCheck(raws, c, k, cfg) {
    var ws = raws.map(function (x) { return x.toLowerCase(); }), last = ws[ws.length - 1], r, r2, rest;
    if (c === "b1" || c === "b2") {   /* one bare noun after “Whose”: b1 = one thing (is / was), b2 = more than one (are / were) */
      var bw = ws[0], one = !!NOUNS[bw], many = !one && (!!pluralOf(bw) || !!PLONLY[bw]), badIx = {}; badIx[raws.length - 1] = 1;
      if (ws.length === 1 && (c === "b1" ? one : many)) return { errs: [], bad: {} };
      return { errs: [ws.length === 1 && c === "b1" && many ? { en: "With “is / was”, use one thing: “" + pluralOf(bw) + "”.", hi: "“is / was” के साथ एक चीज़ आती है: “" + pluralOf(bw) + "”।" }
                    : ws.length === 1 && c === "b2" && one ? { en: "With “are / were”, use more than one thing (the plural): books, pens, bags.", hi: "“are / were” के साथ एक से ज़्यादा चीज़ें (बहुवचन) आती हैं: books, pens, bags।" }
                    : posMsg(bw)], bad: badIx, fix: null };
    }
    if (k === "c") {
      if (ws.length === 1 && ADJ[ws[0]]) return { errs: [], bad: {} };
      if (ws.length === 2 && ws[0] === "very" && ADJ[ws[1]]) return { errs: [], bad: {} };
      if (/^(at|in|on)$/.test(ws[0]) && ws.length > 1) {
        rest = raws.slice(1);
        if (rest.length === 1 && (NOUNS[ws[1]] || PROPER[ws[1]])) return { errs: [], bad: {} };   /* at home, at school, in Delhi */
        r = nounCheck(rest);   /* a place can be one or many whatever the subject is: They were at the market. */
        if (r.errs.length) { r2 = nounCheckPl(rest); if (!r2.errs.length || (/s$/.test(last) && !NOUNS[last] && !UNC[last])) r = r2; }
        if (r.errs.length && cfg.cMsg && !NOUNS[last] && !UNC[last] && !PROPER[last] && !pluralOf(last)) return { errs: [cfg.cMsg], bad: (function () { var b = {}; b[raws.length - 1] = 1; return b; })(), fix: null };
        return shiftBad(r, 1);
      }
    }
    r = c === "p" ? nounCheckPl(raws) : nounCheck(raws);
    if (c === "e" && r.errs.length) { r2 = nounCheckPl(raws); if (!r2.errs.length || (/s$/.test(last) && !NOUNS[last] && !UNC[last])) r = r2; }
    if (k === "c" && r.errs.length && !DETW[ws[0]] && !DETP[ws[0]] && !ADJ[last] && !NOUNS[last] && !pluralOf(last) && cfg.cMsg) return { errs: [cfg.cMsg], bad: (function () { var b = {}; b[raws.length - 1] = 1; return b; })(), fix: null };
    return r;
  }
  function checkRx(cfg, form, t, l, q, s) {
    var end = form === "q" ? "?" : ".", core = l, sc = s, specs = (cfg.rx && cfg.rx[form]) || [], i, m, tail, raws, r, pre, post, ix, hs = cfg.hints || [];
    if (cfg.strip) { core = l.replace(new RegExp("\\s+(?:" + cfg.strip + ")$"), ""); sc = s.slice(0, core.length); }
    if (form !== "q" && q) return { ok: false, msg: { en: "A statement ends with a full stop (.), not a question mark.", hi: "सामान्य वाक्य के अंत में full stop (.) आता है।" } };
    for (i = 0; i < specs.length; i++) {
      m = core.match(new RegExp(specs[i].re));
      if (!m) continue;
      if (specs[i].c === "-") return { ok: true, clean: cap(s) + end, note: "" };   /* the pattern alone is enough */
      tail = m[1]; post = "";
      if (/^b[12]$/.test(specs[i].c)) { ix = core.indexOf(tail, m[0].indexOf(" ") + 1); pre = sc.slice(0, ix); raws = [sc.slice(ix, ix + tail.length)]; post = sc.slice(ix + tail.length, core.length); }   /* the word is in the middle: Whose bag is this? */
      else { pre = sc.slice(0, core.length - tail.length); raws = sc.slice(pre.length).split(" ").filter(Boolean); }
      r = complCheck(raws, specs[i].c, specs[i].k, cfg);
      if (!r.errs.length) return { ok: true, clean: cap(s) + end, note: "" };
      return { ok: false, msg: r.errs[0], msgs: r.errs, fix: r.fix ? cap(pre + r.fix) + s.slice(core.length) + end : "",
        html: esc(pre) + raws.map(function (w, j) { return r.bad[j] ? '<mark class="bad">' + esc(w) + '</mark>' : esc(w); }).join(" ") + esc(post) + esc(s.slice(core.length)) + esc(end) };
    }
    for (i = 0; i < hs.length; i++) { if (new RegExp(hs[i][0]).test(core)) return { ok: false, msg: hs[i][1] }; }
    if (form === "aff" && /\bnot\b|n't\b/.test(core)) return { ok: false, msg: { en: "For a normal statement, don't use “not”.", hi: "सामान्य वाक्य में “not” नहीं लगता।" } };
    return { ok: false, msg: cfg.msg[form] };
  }
  function checkWriteCfg(cfg, form, t, l, q) {
    if (cfg.rx) return checkRx(cfg, form, t, l, q, t.replace(/[.?!]+$/, "").trim());
    if (cfg.mixed) return checkMixed(cfg, form, t, l, q, t.replace(/[.?!]+$/, "").trim());
    var be = cfg.be || "is", nt = cfg.nt || "isn't", badBe = cfg.badBe || "are|am", badQ = cfg.badQ || "are",
        sb = "(" + cfg.subs.join("|") + ")", sc = (cfg.contr && cfg.contr.length) ? "(" + cfg.contr.join("|") + ")" : "", ok, msg, s = t.replace(/[.?!]+$/, "").trim(), g;
    function re(x) { return new RegExp(x).test(l); }
    if (form === "aff") ok = re("^" + sb + " " + be + " (?!not\\b)\\S+") || (sc && re("^" + sc + "'s (?!not\\b)\\S+"));
    else if (form === "neg") ok = re("^" + sb + " (" + be + " not|" + nt + ") \\S+") || (sc && re("^" + sc + "'s not \\S+"));
    else ok = re("^" + be + " " + sb + " \\S+");
    if (ok && form !== "q" && q) ok = false;
    if (ok) { g = cfg.plural ? nounGatePl(form, s) : nounGate(form, s); return g || { ok: true, clean: s.charAt(0).toUpperCase() + s.slice(1) + (form === "q" ? "?" : "."), note: "" }; }
    if (re("^" + sb + " (" + badBe + ")\\b")) msg = cfg.isMsg;
    else if (re("^" + badQ + " " + sb + "\\b")) msg = cfg.qMsg || { en: "With “this” or “that”, ask with “Is”, not “Are”.", hi: "“this” या “that” के साथ “Is” से पूछिए, “Are” से नहीं।" };
    else if (form === "aff" && /\bnot\b/.test(l)) msg = { en: "For a normal statement, don't use “not”.", hi: "सामान्य वाक्य में “not” नहीं लगता।" };
    else if (form !== "q" && q) msg = { en: "A statement ends with a full stop (.), not a question mark.", hi: "सामान्य वाक्य के अंत में full stop (.) आता है।" };
    else msg = cfg.msg[form];
    return { ok: false, msg: msg };
  }
  function checkWrite(form, raw) {
    var t = String(raw || "").replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, " ").trim(), s, l, q, ok = false, msg, note = "", clean, g;
    if (!t) return { empty: true, msg: { en: "Write a sentence first.", hi: "पहले एक वाक्य लिखिए।" } };
    if (/[\u0900-\u097F]/.test(t)) return { msg: { en: "Please write in English.", hi: "कृपया अंग्रेज़ी में लिखिए।" } };
    s = t.replace(/[.?!]+$/, "").trim(); l = s.toLowerCase(); q = /\?\s*$/.test(t);
    if (S && S.day && S.day.write) return checkWriteCfg(S.day.write, form, t, l, q);
    /* Today's pattern is "It is…", but "This/That is…" are also correct English, so we accept them. */
    if (form === "aff") ok = /^(it|this|that) is (?!not\b)\S+/.test(l) || /^(it|that)'s (?!not\b)\S+/.test(l);
    else if (form === "neg") ok = /^(it|this|that) is not \S+/.test(l) || /^(it|this|that) isn't \S+/.test(l) || /^(it|that)'s not \S+/.test(l);
    else ok = /^is (it|this|that) \S+/.test(l) || /^isn't (it|this|that) \S+/.test(l);
    if (ok && form !== "q" && q) ok = false;
    if (ok) { g = nounGate(form, s); if (g) return g; }
    if (ok && /^(this|that)\b|^(this|that)'s/.test(l)) note = "“This / That” is correct English too. Today's pattern uses “It”. · “This/That” भी सही है; आज का pattern “It” वाला है।";
    clean = s.charAt(0).toUpperCase() + s.slice(1) + (form === "q" ? "?" : ".");
    if (ok) return { ok: true, clean: clean, note: note };
    if (/^it (are|am)\b/.test(l)) msg = IS;
    else if (/^it not is\b/.test(l) || /^it is \S+ not$/.test(l)) msg = LW.P.NEG;
    else if (/^are it\b/.test(l)) msg = { en: "Ask with “Is it…?”, not “Are it…?”.", hi: "“Is it…?” से पूछिए, “Are it…?” से नहीं।" };
    else if (form === "q") msg = /^it is\b/.test(l) ? QW : { en: "Start your question with “Is it”. Example: Is it my pen?", hi: "सवाल “Is it” से शुरू कीजिए। जैसे: Is it my pen?" };
    else if (form === "neg") msg = /^it is\b/.test(l) && !/\bnot\b/.test(l) ? { en: "Add “not” after “is”.", hi: "“is” के बाद “not” लगाइए।" } : { en: "Start with “It is not” and add a noun. Example: It is not my bag.", hi: "“It is not” से शुरू कीजिए और एक संज्ञा (noun) जोड़िए। जैसे: It is not my bag." };
    else msg = /\bnot\b/.test(l) ? { en: "For a normal statement, don't use “not”.", hi: "सामान्य वाक्य में “not” नहीं लगता।" } : q ? { en: "A statement ends with a full stop (.), not a question mark.", hi: "सामान्य वाक्य के अंत में full stop (.) आता है, प्रश्नचिह्न नहीं।" } : { en: "Start with “It is” and add a noun. Example: It is my pen.", hi: "“It is” से शुरू कीजिए और एक संज्ञा (noun) जोड़िए। जैसे: It is my pen." };
    return { ok: false, msg: msg };
  }

  /* ---- Activity cards (shared by practice steps and the final check) ----
     Each card draws ONE question into `host` and calls done(correctOnFirstTry) when it is resolved.
     o.single = true → one attempt only (final check). Otherwise a wrong answer gets one more try,
     and the correct answer is revealed only after that second attempt. */
  function mcCard(host, it, o, done) {
    var L = { o: it.optLang || o.optLang || "", p: it.hiPrompt ? "hi" : (it.promptLang || o.promptLang || "") },
        canSay = it.prompt && it.prompt.indexOf("___") < 0, spot = !!(it.spot || o.spot), why = it.why || o.why || {}, ask = it.ask || o.ask,
        opts = shuffle(it.options.map(function (t, i) { return { t: t, ok: i === it.answer }; })), good = opts.filter(function (x) { return x.ok; })[0],
        say = it.say || (spot ? it.fix : ""), tries = 0, over = false, wrongs = [], fb;
    host.innerHTML = askHtml(ask) +
      (it.visual ? '<div class="q-visual" role="img" aria-label="' + esc(it.word || "") + '">' + it.visual + '</div>' : "") +
      (it.word ? '<p class="q-word">' + esc(it.word) + '</p>' : "") +
      (it.listen ? '<div class="listen">' + lbtn(it.listen, it.listenLang || "en", "Tap to listen · सुनिए", "big") + '<p class="muted">Listen, then choose. · सुनिए, फिर चुनिए।</p></div>' : "") +
      (it.prompt ? ((L.p && canSay) ? tapEl("p", it.prompt, L.p, "q-prompt") : '<p class="q-prompt"' + (L.p === "hi" ? ' lang="hi"' : "") + '>' + esc(it.prompt) + '</p>') : "") +
      '<div role="group" aria-label="Answer options">' + opts.map(function (x, i) {
        return '<button class="opt" type="button" data-i="' + i + '"><span class="key" aria-hidden="true">' + "ABCD".charAt(i) + '</span><span class="ot"' + (L.o ? ' lang="' + L.o + '"' : "") + '>' + esc(x.t) + '</span></button>';
      }).join("") + '</div><div id="fb" role="status" aria-live="polite"></div>';
    fb = $("#fb", host);
    if (!it.listen && L.p && canSay) autoSay(it.prompt, L.p);   /* listening items: the learner taps to listen */
    if (it.listen && (it.autoListen || o.autoListen)) {         /* listening practice: plays once by itself, 0.6 s after the sentence appears */
      var t0 = qTok;
      setTimeout(function () { if (t0 === qTok && !over && host.isConnected !== false) speak(it.listen, it.listenLang || "en"); }, 600);
    }

    function spotFix() { return '<p class="yours"><span class="bad-t">' + markDiff(good.t, it.fix) + '</span> → <span class="good-t">' + esc(it.fix) + '</span></p>'; }
    function diffable(x) { return !it.listen && isLatin(x.t) && isLatin(good.t); }
    function diag(x) { return (spot || !isLatin(x.t) || !isLatin(good.t)) ? null : diagnose(x.t, good.t, it.listen ? "listen" : ""); }
    function wrongLine(x) { return wrongBox(diffable(x) ? markDiff(x.t, good.t) : esc(x.t)); }
    function hint(x) {
      var h = spot ? "" : wrongLine(x) + (diffable(x) ? '<p class="muted">The highlighted part needs changing. · रंगीन हिस्से को बदलना है।</p>' : "");
      fb.innerHTML = fbBox("no", '<p><b>Not quite — try again. · फिर से कोशिश कीजिए।</b></p>' + h +
        (spot ? '<p>That sentence is correct. Find the one with a mistake. · यह वाक्य सही है। गलती वाला वाक्य ढूँढिए।</p>' : "") +
        (it.listen ? '<p>Listen again, then choose.</p>' + lbtn(it.listen, it.listenLang || "en", "Listen again") : "") + whyHtml(diag(x) || why));
      show(fb);
    }
    function reveal(isOk, wrongOpt) {
      var body, extra = "", gl = isLatin(good.t) ? "en" : "hi";
      function sl(t, l) { return t ? tapEl("p", t, l, "yours good-t") : ""; }
      [].forEach.call(host.querySelectorAll(".opt"), function (x, i) {
        x.disabled = true;
        if (opts[i].ok) { var m = x.querySelector(".mk"); if (m) x.removeChild(m); x.classList.remove("no"); x.classList.add("ok"); x.insertAdjacentHTML("beforeend", '<span class="mk">✓ Correct</span>'); }
      });
      if (isOk) body = '<p><b>' + (tries === 1 ? "Correct! 🎉 सही!" : "Correct — well done for trying again! 👏 सही!") + '</b></p>' + (spot ? spotFix() : "");
      else body = '<p><b>Not quite. · सही उत्तर यह है:</b></p>' + (spot ? wrongBox(markDiff(good.t, it.fix), "✕ This sentence has the mistake · इसमें गलती है") + rightBox(it.fix, "en", "✓ Correct sentence · सही वाक्य") : wrongs.map(wrongLine).join("") + rightBox(good.t, gl));
      /* tap-to-hear lines for the sentences shown above */
      if (say && (isOk || (!spot && say !== good.t))) extra += sl(say, "en");
      if (isOk && L.o === "hi") extra += sl(good.t, "hi");
      if (it.listen && !say && L.o !== "hi" && (isOk || it.listen !== good.t)) extra += sl(it.listen, it.listenLang || "en");
      var dg = isOk ? null : (spot ? ((it.fix && isLatin(good.t)) ? diagnose(good.t, it.fix) : null) : (wrongOpt ? diag(wrongOpt) : null));
      fb.innerHTML = fbBox(isOk ? "ok" : "no", body + extra + whyHtml(dg) + whyHtml(why));
      autoSeq((say ? pair(say) : []).concat(L.o === "hi" ? pair(null, good.t) : []));
      show(fb);
      done(isOk && tries === 1);
    }
    host.onclick = function (e) {
      var ob = e.target.closest ? e.target.closest(".opt") : null, x;
      if (!ob || over || ob.disabled || Date.now() < (host._t || 0)) return;
      x = opts[+ob.getAttribute("data-i")]; tries++;
      if (x.ok) { over = true; reveal(true); return; }
      wrongs.push(x); ob.disabled = true; ob.classList.add("no"); ob.insertAdjacentHTML("beforeend", '<span class="mk">✕ Not this one</span>');
      if (o.single || tries >= 2) { over = true; reveal(false, x); } else hint(x);
    };
  }

  function buildCard(host, it, o, done) {
    var tokens = it.answer.replace(/[.?!]$/, "").split(" "), placed = [], locked = false, attempts = 0, wrong = [], lastDg = null, why = it.why || tagWhy(it.tag) || {}, ask = it.ask || o.ask;
    function wordBtn(i, pos) { return '<button class="word' + (wrong[pos] ? " wrong" : "") + '" type="button" data-w="' + i + '"' + (locked ? " disabled" : "") + '>' + esc(it.words[i]) + '</button>'; }
    function paint(msg) {
      host.innerHTML = askHtml(ask) + (it.hi ? tapEl("p", it.hi, "hi", "q-prompt") : "") +
        '<div class="tray" role="group" aria-label="Your sentence">' + placed.map(function (i, p) { return wordBtn(i, p); }).join("") + '</div>' +
        '<div class="bank" role="group" aria-label="Available words">' + it.words.map(function (w, i) { return placed.indexOf(i) < 0 ? wordBtn(i, -1) : ""; }).join("") + '</div>' +
        '<div id="bf" role="status" aria-live="polite">' + (msg || "") + '</div>' +
        (!locked && placed.length ? '<button class="btn btn-ghost btn-block" id="bReset" type="button">Clear ↺</button>' : "");
    }
    function order() { var used = {}; return tokens.map(function (t) { for (var i = 0; i < it.words.length; i++) { if (!used[i] && it.words[i] === t) { used[i] = 1; return i; } } return 0; }); }
    function check() {
      var got = placed.map(function (i) { return it.words[i]; });
      if (got.join(" ") === tokens.join(" ")) {
        locked = true; paint(fbBox("ok", tapEl("p", it.answer, "en", "good-t", '<b>✓ ' + esc(it.answer) + '</b>') + '<p>' + (attempts ? "Correct — well done for trying again! 👏 सही!" : "Correct! 🎉 सही! बहुत अच्छा।") + '</p>' + whyHtml(why)));
        autoSay(it.answer, "en"); show($("#bf", host)); done(attempts === 0); return;
      }
      attempts++; wrong = got.map(function (w, p) { return w !== tokens[p]; });
      lastDg = diagnose(got.join(" ") + (/[.?!]$/.test(it.answer) ? it.answer.slice(-1) : ""), it.answer);
      if (o.single) {
        var mine = got.map(function (w, p) { return wrong[p] ? '<mark class="bad">' + esc(w) + '</mark>' : esc(w); }).join(" ") + esc(/[.?!]$/.test(it.answer) ? it.answer.slice(-1) : "");
        locked = true; placed = order(); wrong = [];
        paint(fbBox("no", '<p><b>Not quite. · सही उत्तर यह है:</b></p>' + wrongBox(mine, "✕ Your sentence · आपका वाक्य") + rightBox(it.answer, "en", "✓ Correct sentence · सही वाक्य") + whyHtml(lastDg) + whyHtml(why))); show($("#bf", host)); done(false); return;
      }
      paint(fbBox("no", '<p><b>Not yet — the red words are in the wrong place. · लाल शब्द गलत जगह पर हैं।</b></p><p class="muted">Tap a word to move it, then try again.</p>' + whyHtml(lastDg || why) +
        (attempts >= 2 ? '<button class="btn btn-outline btn-block" id="bShow" type="button">Show me the sentence</button>' : "")));
      show($("#bf", host));
    }
    host.onclick = function (e) {
      var t = e.target, wb = t.closest ? t.closest(".word") : null, i, pos, again;
      if (locked) return;
      if (wb) {
        if (Date.now() < (host._t || 0)) return;
        i = +wb.getAttribute("data-w"); pos = placed.indexOf(i);
        if (pos < 0) placed.push(i); else placed.splice(pos, 1);
        wrong = []; paint();
        again = host.querySelector('[data-w="' + i + '"]'); if (again) again.focus({ preventScroll: true });
        if (placed.length === it.words.length) check();
      } else if (t.closest && t.closest("#bReset")) { placed = []; wrong = []; paint(); }
      else if (t.closest && t.closest("#bShow")) {
        locked = true; placed = order(); wrong = [];
        paint(fbBox("mid", '<p><b>Here is the correct sentence:</b></p>' + rightBox(it.answer, "en", "✓ Correct sentence · सही वाक्य") + whyHtml(lastDg) + whyHtml(why))); show($("#bf", host)); done(false);
      }
    };
    paint();
    if (it.hi) autoSay(it.hi, "hi");
  }

  function writeCard(host, it, o, done) {
    var tries = 0, over = false, ask = it.ask || o.ask, fb, inp;
    host.innerHTML = askHtml(ask) + (it.hint ? tapEl("p", it.hint + (it.hintHi ? " " + it.hintHi : ""), "en", "muted", "💡 " + esc(it.hint) + (it.hintHi ? '<br><span lang="hi">' + esc(it.hintHi) + '</span>' : "")) : "") +
      '<label class="sr" for="wIn">Your sentence</label><input class="wrin" id="wIn" type="text" maxlength="80" autocomplete="off" autocapitalize="sentences" spellcheck="false" enterkeyhint="done" placeholder="Type your sentence here…">' +
      '<button class="btn btn-primary btn-block" id="wGo" type="button">Check answer</button><div id="fb" role="status" aria-live="polite"></div>';
    fb = $("#fb", host); inp = $("#wIn", host);
    function finish(ok, html) { over = true; inp.readOnly = true; $("#wGo", host).hidden = true; fb.innerHTML = html; show(fb); done(ok); }
    function typed() { return esc(String(inp.value || "").replace(/\s+/g, " ").trim()); }
    function msgs(r) { return (r.msgs || [r.msg]).map(whyHtml).join(""); }
    function exampleBox(label) { return '<p class="muted">' + label + '</p>' + rightBox(it.model, "en", "✓ Example · उदाहरण"); }
    function check() {
      var r;
      if (over) return;
      r = checkWrite(it.form, inp.value);
      if (r.empty) { fb.innerHTML = fbBox("mid", '<p>' + esc(r.msg.en) + '<br><span lang="hi">' + esc(r.msg.hi) + '</span></p>'); inp.focus(); return; }
      tries++;
      if (r.ok) { finish(tries === 1, fbBox("ok", '<p><b>Good! Your sentence is correct. 🎉 बहुत अच्छा!</b></p><p class="muted">' + esc((S.day && S.day.write && S.day.write.okTags) || "✓ Pattern · ✓ a / an · ✓ Noun") + '</p>' + tapEl("p", r.clean, "en", "yours good-t") + '<p class="muted">' + esc((S.day && S.day.write && S.day.write.okLine) || "PleasantLearn checks the pattern, a / an and whether your word is a noun. Say your sentence aloud too.") + '</p>' + (r.note ? '<p class="muted">' + esc(r.note) + '</p>' : ""))); autoSay(r.clean, "en"); return; }
      if (o.single) { finish(false, fbBox("no", '<p><b>Not quite.</b></p>' + wrongBox(r.html || typed(), "✕ Your sentence · आपका वाक्य") + msgs(r) + (r.fix ? rightBox(r.fix, "en", "✓ Corrected · सही वाक्य") : exampleBox("Example sentence:")))); return; }
      fb.innerHTML = fbBox("no", '<p><b>Not quite — edit your sentence and check again. · अपना वाक्य ठीक करके फिर जाँचिए।</b></p>' + wrongBox(r.html || typed(), "✕ Your sentence · आपका वाक्य") + msgs(r) + (r.fix ? rightBox(r.fix, "en", "✓ Corrected · सही वाक्य") : "") +
        '<button class="btn btn-outline btn-block" id="wShow" type="button">Show me an example</button>'); show(fb); inp.focus();
    }
    host.onclick = function (e) {
      var t = e.target;
      if (t.closest && t.closest("#wGo")) check();
      else if (t.closest && t.closest("#wShow") && !over) finish(false, fbBox("mid", exampleBox("Here is an example. Say it aloud, then continue:")));
    };
    inp.onkeydown = function (e) { if (e.key === "Enter") { e.preventDefault(); check(); } };
  }

  /* Runs a list of cards one by one (quiz / builder / write), then shows a result and lets the learner retry only the missed ones. */
  function runCards(sec, b, c, cardFn, label) {
    b.innerHTML = intro(sec) + '<div id="meta" class="qmeta"></div><div id="card" tabindex="-1"></div><div id="nxt"></div>';
    var meta = $("#meta", b), card = $("#card", b), nxt = $("#nxt", b), N = sec.items.length, order = [], pos = 0, first = {}, fixed = {}, retry = false, i;
    for (i = 0; i < N; i++) order.push(i);
    var sv = subGet(sec.id);
    if (sv && sv.pos > 0 && sv.pos < N) { pos = Math.floor(sv.pos); first = plain(sv.first); }   /* resume at the question the learner had reached */
    var o = { ask: sec.ask, why: sec.why, spot: sec.spot, promptLang: sec.promptLang, optLang: sec.optLang, skill: sec.skill, autoListen: sec.autoListen };
    function one() {
      var idx = order[pos], it = sec.items[idx];
      nxt.innerHTML = ""; card._t = Date.now() + 400;
      meta.innerHTML = '<span>' + (retry ? "Retry " : label + " ") + (pos + 1) + ' of ' + order.length + '</span>' + (it.tag ? '<span class="tagp">' + esc(it.tag) + '</span>' : "");
      cardFn(card, it, o, function (ok) {
        var last = pos === order.length - 1, g;
        if (!retry) { first[idx] = ok; if (!ok) logMiss(modelOf(it), sec.skill); } else if (ok) fixed[idx] = true;
        nxt.innerHTML = '<button class="btn btn-primary btn-block" id="goNext" type="button">' + (last ? "See result →" : "Continue →") + '</button>';
        g = $("#goNext", nxt);
        g.onclick = function () { if (last) finish(); else { pos++; if (!retry) subSet(sec.id, { pos: pos, first: first }); one(); show(card, "start"); } };
        g.focus({ preventScroll: true }); show(g);
      });
    }
    function finish() {
      var c1 = 0, missed = [], k, html, again;
      for (k = 0; k < N; k++) { if (first[k]) c1++; else if (fixed[k] !== true) missed.push(k); }
      if (!retry) { S.results[sec.id] = { skill: sec.skill || "", c: c1, t: N }; delete S.sub[sec.id]; c.done(); }
      meta.innerHTML = ""; nxt.innerHTML = "";
      html = fbBox(missed.length ? "mid" : "ok", '<p><b>' + (missed.length ? "You got " + c1 + " of " + N + " right on the first try." : (c1 === N ? "Perfect! " + N + " of " + N + " 🎉 बहुत बढ़िया!" : "All fixed! 🎉 सब ठीक हो गया!")) + '</b></p>' +
        '<p>' + (missed.length ? "Mistakes are how we learn. Practise the ones you missed. · गलतियों से ही सीखते हैं। जो छूटे उन्हें दोबारा कीजिए।" : "Well done. Continue when you are ready. · शाबाश! तैयार हों तो आगे बढ़िए।") + '</p>');
      if (missed.length) {
        html += '<h3 class="h">Review · दोहराइए</h3>' + missed.map(function (m) { var t = modelOf(sec.items[m]); return '<div class="miss">' + tapEl("p", t, isLatin(t) ? "en" : "hi") + '</div>'; }).join("") +
          '<button class="btn btn-outline btn-block" id="reTry" type="button">Try the ones I missed again ↻</button>';
      }
      card.innerHTML = html; card.onclick = null;
      again = $("#reTry", card);
      if (again) again.onclick = function () { order = missed; pos = 0; retry = true; card.innerHTML = ""; one(); show(card, "start"); };
      card.focus({ preventScroll: true }); show(card, "start");
    }
    one();
  }
  R.quiz = function (sec, b, c) { runCards(sec, b, c, mcCard, "Question"); };
  R.builder = function (sec, b, c) { runCards(sec, b, c, buildCard, "Sentence"); };
  R.write = function (sec, b, c) { var c2 = { done: function () { if (!S.gaOwn) S.gaOwn = {}; if (!S.gaOwn[sec.id]) { S.gaOwn[sec.id] = 1; ga("own_sentences_complete", { source: "lesson", course: "spoken_english", day: S.day.day }); } c.done(); } }; runCards(sec, b, c2, writeCard, "Task"); };
  R.transform = function (sec, b, c) {
    b.innerHTML = intro(sec) + sec.pairs.map(function (p) {
      return '<div class="xf">' + tapEl("p", p.from, "en") + '<p class="arr"><span aria-hidden="true">↓</span> <span>' + esc(sec.arrow || "is moves before it") + '</span></p>' + tapEl("p", p.to, "en", "to") + '</div>';
    }).join("") + block({ t: "bi", style: "quote", en: sec.note.en, hi: sec.note.hi, nobtn: true }) + '<h3 class="h">Now you try</h3><div id="tq"></div>';
    R.quiz({ id: sec.id, skill: sec.skill, ask: sec.ask, items: sec.items, why: sec.why, promptLang: sec.promptLang }, $("#tq", b), c);
  };

  R.info = function (sec, b, c) {
    S.pageSeq = seqBlocks(sec.blocks);
    b.innerHTML = (TTS && S.pageSeq.length ? '<button class="say pageplay" type="button" data-play>' + PLAY_HTML + '</button>' : "") + sec.blocks.map(block).join("");
    c.done();
  };

  R.examples = function (sec, b, c) {
    b.innerHTML = (sec.pre ? sec.pre.map(block).join("") : "") + '<p class="muted" id="exCount"></p><p class="muted" id="exHint"></p><div id="exList"></div><button class="btn btn-primary btn-block" id="exNext" type="button"></button>';
    var list = $("#exList", b), btn = $("#exNext", b), cnt = $("#exCount", b), i = 0, N = sec.items.length, need = Math.min(5, N);
    $("#exHint", b).textContent = "Tap any sentence to hear it. You can continue after " + need + " examples. · किसी भी वाक्य पर टैप करके सुनिए। " + need + " उदाहरणों के बाद आगे बढ़ सकते हैं।";
    function add(auto, quiet) {
      var it = sec.items[i++], d = document.createElement("div");
      d.className = "exc"; d.tabIndex = -1;
      d.innerHTML = '<span class="n" aria-hidden="true">' + i + '</span><div class="tx">' + enP(it.en) + hiP(it.hi) + '</div>';
      list.appendChild(d); cnt.textContent = "Example " + i + " of " + N;
      if (i >= need) c.done();
      if (i >= N) btn.hidden = true; else btn.textContent = "Next example (" + (i + 1) + " of " + N + ") →";
      if (auto) { d.focus({ preventScroll: true }); show(i >= N ? d : btn); }
      if (!quiet) autoSeq(pair(it.en, it.hi));
      if (!quiet) subSet(sec.id, { i: i });
    }
    var sx = subGet(sec.id), k0;
    add(false, !!(sx && sx.i > 1));
    if (sx && sx.i > 1 && sx.i <= N) { for (k0 = 1; k0 < sx.i; k0++) add(false, true); }   /* show the examples already seen */
    btn.addEventListener("click", function () { add(true); });
  };

  R.dialogue = function (sec, b, c) {
    b.innerHTML = '<div id="dl"></div><button class="btn btn-primary btn-block" id="dlNext" type="button"></button>' +
      '<div class="yt" id="rpBox" hidden><p><b>🎤 Your turn: be Polly.</b> Hide Polly\'s lines and say them aloud. Then show them to check. <span lang="hi">अब आप Polly बनिए। उसकी लाइनें छिपाकर बोलिए, फिर देखकर जाँचिए।</span></p><button class="btn btn-accent btn-block" id="rpBtn" type="button" aria-pressed="false">Hide Polly\'s lines</button></div>';
    var dl = $("#dl", b), btn = $("#dlNext", b), i = 0, N = sec.lines.length, rp = $("#rpBtn", b);
    function add(auto, quiet) {
      var l = sec.lines[i++], ch = CHARS[l.who], d = document.createElement("div");
      d.className = "bub" + (l.who === "polly" ? " r" : ""); d.style.setProperty("--c", ch.color); d.tabIndex = -1;
      d.innerHTML = '<div class="av" aria-hidden="true">' + ch.emoji + '</div><div class="msg"><small>' + ch.name + '</small>' + enP(l.en) + hiP(l.hi) + '</div>';
      dl.appendChild(d);
      if (i >= N) { btn.hidden = true; if (sec.note && !$("#dlNote", b)) { var nt = document.createElement("div"); nt.id = "dlNote"; nt.innerHTML = block({ t: "bi", style: "quote", en: sec.note.en, hi: sec.note.hi }); b.insertBefore(nt, $("#rpBox", b)); } $("#rpBox", b).hidden = false; c.done(); } else btn.textContent = "Next line → (" + (i + 1) + "/" + N + ")";
      if (auto) { d.focus({ preventScroll: true }); show(i >= N ? d : btn); }
      if (!quiet) autoSeq(pair(l.en, l.hi));
      if (!quiet) subSet(sec.id, { i: i });
    }
    var sd = subGet(sec.id), k1;
    add(false, !!(sd && sd.i > 1));
    if (sd && sd.i > 1 && sd.i <= N) { for (k1 = 1; k1 < sd.i; k1++) add(false, true); }
    btn.addEventListener("click", function () { add(true); });
    rp.addEventListener("click", function () {
      var on = rp.getAttribute("aria-pressed") !== "true";
      rp.setAttribute("aria-pressed", String(on)); dl.className = on ? "hideP" : "";
      rp.textContent = on ? "Show Polly's lines" : "Hide Polly's lines"; stopSpeech();
    });
  };

  R.checklist = function (sec, b, c) {
    b.innerHTML = intro(sec) + '<div id="ck">' + sec.items.map(function (it, k) {
      return '<div class="chk"><span class="num" aria-hidden="true">' + (k + 1) + '</span><div class="t">' + enP(it.en) + hiP(it.hi) + '</div>' +
        '<button class="tog" type="button" aria-pressed="false" data-k="' + k + '">🎤 I said it</button></div>';
    }).join("") + '</div><p class="muted center" id="ckCount"></p><div id="ckEnd" role="status" aria-live="polite"></div>';
    var N = sec.items.length, count = $("#ckCount", b);
    function upd() {
      var n = b.querySelectorAll('.tog[aria-pressed="true"]').length;
      count.textContent = n + " of " + N + " spoken aloud";
      if (n === N) { $("#ckEnd", b).innerHTML = block({ t: "bi", style: "quote", say: true, en: sec.finish.en, hi: sec.finish.hi }); show($("#ckEnd", b)); c.done(); }
    }
    function saveCk() { var on = []; [].forEach.call(b.querySelectorAll(".tog"), function (x) { if (x.getAttribute("aria-pressed") === "true") on.push(+x.getAttribute("data-k")); }); subSet(sec.id, { on: on }); }
    var csv = subGet(sec.id);
    if (csv && Array.isArray(csv.on)) csv.on.forEach(function (k) { var x = b.querySelector('.tog[data-k="' + (+k) + '"]'); if (x) { x.setAttribute("aria-pressed", "true"); x.textContent = "✓ Said it!"; } });
    b.addEventListener("click", function (e) {
      var t = e.target.closest(".tog"); if (!t) return;
      var on = t.getAttribute("aria-pressed") !== "true";
      t.setAttribute("aria-pressed", String(on)); t.textContent = on ? "✓ Said it!" : "🎤 I said it";
      upd(); saveCk();
    });
    upd();
  };

  /* ---- Speaking routine: 1 listen & repeat → 2 say it from memory (sentence hidden) → 3 reveal & self-check.
         PleasantLearn does not listen to the learner, and says so. ---- */
  R.speak = function (sec, b, c) {
    b.innerHTML = intro(sec) + '<p class="muted">PleasantLearn cannot hear you, so listen carefully to your own voice. · PleasantLearn आपकी आवाज़ नहीं सुन सकता, इसलिए अपनी आवाज़ ध्यान से सुनिए।</p><div id="sp"></div>';
    var sp = $("#sp", b), N = sec.items.length, i = 0, ph = 1, ssv = subGet(sec.id), STEPS = ["1 Listen & repeat", "2 Say it from memory", "3 Check"];
    if (ssv && ssv.i > 0 && ssv.i < N) i = Math.floor(ssv.i);   /* resume at the sentence the learner had reached */
    function mask(t) { return t.replace(/[A-Za-z]/g, "•"); }
    function paint() {
      var it = sec.items[i], last = i === N - 1, h;
      h = '<div class="qmeta"><span>Sentence ' + (i + 1) + ' of ' + N + '</span>' + (it.tag ? '<span class="tagp">' + esc(it.tag) + '</span>' : "") + '</div>' +
        '<ol class="rsteps" aria-label="Speaking steps">' + STEPS.map(function (s, k) { return '<li' + (k + 1 === ph ? ' class="on" aria-current="step"' : "") + '>' + s + '</li>'; }).join("") + '</ol>';
      if (ph === 1) {
        h += tapEl("p", it.en, "en", "big-sentence") + hiP(it.hi, "center muted") +
          (it.tip ? '<div class="bi quote">' + tapEl("p", it.tip + (it.tipHi ? " " + it.tipHi : ""), "en", "", "💡 " + esc(it.tip) + (it.tipHi ? '<br><span lang="hi" class="hi">' + esc(it.tipHi) + '</span>' : "")) + '</div>' : "") +
          '<div class="yt"><p><b>🎤 Listen, then say it aloud.</b> Listen again as often as you like. <span lang="hi">सुनिए, फिर ज़ोर से बोलिए। जितनी बार चाहें दोबारा सुनिए।</span></p></div>' +
          '<button class="btn btn-primary btn-block" id="spNext" type="button">I repeated it — next →</button>';
      } else if (ph === 2) {
        h += '<p class="big-sentence mask" aria-label="The sentence is hidden">' + esc(mask(it.en)) + '</p>' + hiP(it.hi, "center muted") +
          '<div class="yt"><p><b>🎤 Say it without looking.</b> The sentence is hidden. <span lang="hi">देखे बिना बोलिए। वाक्य छिपा है।</span></p></div>' +
          '<button class="btn btn-primary btn-block" id="spNext" type="button">I said it — show the sentence</button>';
      } else {
        h += tapEl("p", it.en, "en", "big-sentence") + hiP(it.hi, "center muted") +
          '<p class="center"><b>Did you say it the same way?</b><br><span class="muted" lang="hi">क्या आपने इसे इसी तरह बोला?</span></p>' +
          '<div class="drill-btns"><button class="btn btn-outline" id="spAgain" type="button">↻ Practise again</button><button class="btn btn-primary" id="spNext" type="button">' + (last ? "✓ Finish" : "✓ Yes — next") + '</button></div>';
      }
      sp.innerHTML = h; sp._t = Date.now() + 450;
      if (ph === 1) autoSeq(pair(it.en, it.hi)); else stopSpeech();
    }
    sp.addEventListener("click", function (e) {
      if (Date.now() < (sp._t || 0)) return;
      if (e.target.closest("#spAgain")) { ph = 1; paint(); show(sp, "start"); }
      else if (e.target.closest("#spNext")) {
        if (ph < 3) { ph++; paint(); show(sp, "start"); }
        else if (i < N - 1) { i++; ph = 1; subSet(sec.id, { i: i }); paint(); show(sp, "start"); }
        else { stopSpeech(); delete S.sub[sec.id]; sp.innerHTML = fbBox("ok", '<p><b>You practised ' + N + ' sentences aloud! 🎉</b></p><p lang="hi">आपने ' + N + ' वाक्यों का ज़ोर से अभ्यास किया!</p>'); show(sp, "start"); c.done(); }
      }
    });
    paint();
  };

  R.drill = function (sec, b, c) {
    b.innerHTML = intro(sec) + '<p class="muted">PleasantLearn cannot hear you. Say your answer aloud, then check it yourself. · अपना उत्तर ज़ोर से बोलिए, फिर खुद जाँचिए।</p><div id="dr"></div>';
    var dr = $("#dr", b), N = sec.items.length, queue = sec.items.map(function (x, k) { return k; }), done = 0, retries = 0, dsv = subGet(sec.id);
    if (dsv && Array.isArray(dsv.queue) && dsv.queue.length && dsv.queue.length <= N && dsv.queue.every(function (q) { return q >= 0 && q < N; })) { queue = dsv.queue.slice(); done = Math.max(0, Math.min(N - 1, +dsv.done || 0)); retries = Math.max(0, +dsv.retries || 0); }
    function paint() {
      if (!queue.length) {
        dr.innerHTML = fbBox("ok", '<p><b>Drill complete! 🎉</b> ' + N + ' sentences' + (retries ? ' · ' + retries + ' repeated' : '') + '</p><p lang="hi">ड्रिल पूरी हुई! शाबाश!</p>');
        show(dr, "start"); c.done(); return;
      }
      var it = sec.items[queue[0]], fl = it.fromLang || "en";
      dr.innerHTML = '<div class="qmeta"><span>Drill ' + (done + 1) + ' of ' + N + '</span>' + (it.tag ? '<span class="tagp">' + esc(it.tag) + '</span>' : "") + '</div>' +
        askHtml(it.ask || sec.ask) +
        '<div class="drill-card">' + tapEl("p", it.from, fl, "from") + '</div>' +
        '<div class="yt"><p><b>🎤 Say your answer aloud first.</b> <span lang="hi">पहले ज़ोर से बोलिए।</span></p><button class="btn btn-accent btn-block" id="drShow" type="button">I said it — show the answer</button></div><div id="drAns" role="status" aria-live="polite"></div>';
      dr._t = Date.now() + 450; autoSay(it.from, fl);
    }
    dr.addEventListener("click", function (e) {
      var it = sec.items[queue[0]];
      if (Date.now() < (dr._t || 0)) return;
      if (e.target.closest("#drShow")) {
        var tl = it.toLang || "en";
        $("#drShow", dr).hidden = true;
        $("#drAns", dr).innerHTML = '<div class="drill-ans"><small class="muted">Answer · उत्तर</small>' + tapEl("p", it.to, tl, "to") + '</div>' +
          '<p class="center muted">Did you say it correctly? · क्या आपने सही बोला?</p><div class="drill-btns"><button class="btn btn-outline" id="drAgain" type="button">↻ Again later</button><button class="btn btn-primary" id="drGot" type="button">✓ Got it</button></div>';
        dr._t = Date.now() + 450; autoSay(it.to, tl); $("#drGot", dr).focus({ preventScroll: true }); show($("#drGot", dr));
      } else if (e.target.closest("#drGot")) { queue.shift(); done++; if (queue.length) subSet(sec.id, { queue: queue, done: done, retries: retries }); else subDrop(sec.id); paint(); show(dr, "start"); }
      else if (e.target.closest("#drAgain")) { retries++; queue.push(queue.shift()); subSet(sec.id, { queue: queue, done: done, retries: retries }); paint(); show(dr, "start"); }
    });
    paint();
  };

  /* ---- Gate: the main path is short; extra practice is optional ---- */
  R.gate = function (sec, b, c) {
    var extras = S.day.sections.filter(function (s) { return s.opt && s.type !== "info"; }).length;
    b.innerHTML = block({ t: "bi", style: "big", en: sec.en, hi: sec.hi, nobtn: true }) + block({ t: "bi", en: sec.text.en, hi: sec.text.hi, nobtn: true }) +
      '<button class="btn btn-primary btn-block" id="gFinal" type="button">' + (sec.goLabel || "Go to the Final Check →") + '</button>' +
      (S.extra ? '<p class="muted center">Extra practice is on. Use “Continue” below to go on with it.</p>' : '<button class="btn btn-outline btn-block" id="gMore" type="button">' + (sec.moreLabel || "More practice first (optional)") + '</button><p class="muted center">' + (sec.moreNote || "Optional: translation, more transformations, a bonus fact and more speaking.") + '</p>');
    c.done();
    $("#gFinal", b).addEventListener("click", function () { goType("assess"); });
    var more = $("#gMore", b);
    if (more) more.addEventListener("click", function () { S.extra = true; S.step++; renderStep(); });
  };

  /* ---- Final check: one attempt per question, then a clear, supportive result and the option to retry only what was missed ---- */
  R.assess = function (sec, b, c) {
    var items = sec.items, N = items.length, res = [], fixed = {}, firstDone = false, gaStarted = false, nd = S.day.day + 1, pt = sec.points || 0;
    sec.intro = { en: N + " short questions. You need at least " + passNeed(N) + " correct (80%) to go to Day " + nd + ". Don't worry — you can retake it.",
                  hi: N + " छोटे सवाल। Day " + nd + " पर जाने के लिए कम से कम " + passNeed(N) + " सही (80%) चाहिए। चिंता मत कीजिए — आप दोबारा दे सकते हैं।" };
    if (pt) sec.intro = { en: N + " questions · " + pt + " points each · " + (N * pt) + " points in total. You need " + (passNeed(N) * pt) + " points (80%) to pass and open Day " + nd + ". One try per question, and you see the answer after each one. Don't worry — you can retake it.",
                          hi: N + " सवाल · हर सवाल " + pt + " अंक का · कुल " + (N * pt) + " अंक। पास होकर Day " + nd + " खोलने के लिए " + (passNeed(N) * pt) + " अंक (80%) चाहिए। हर सवाल पर एक कोशिश; हर जवाब के बाद सही उत्तर दिखेगा। चिंता मत कीजिए — आप दोबारा दे सकते हैं।" };
    b.innerHTML = intro(sec) + '<div id="meta" class="qmeta"></div><div id="card" tabindex="-1"></div><div id="nxt"></div><div id="res"></div>';
    var meta = $("#meta", b), card = $("#card", b), nxt = $("#nxt", b), resEl = $("#res", b);
    function cardFor(it) { return it.kind === "build" ? buildCard : it.kind === "write" ? writeCard : mcCard; }
    function runList(list, single, label, onEnd) {
      var p = 0, out = [];
      resEl.innerHTML = "";
      function one() {
        var it = list[p];
        nxt.innerHTML = ""; card._t = Date.now() + 400;
        meta.innerHTML = '<span>' + label + ' ' + (p + 1) + ' of ' + list.length + (pt && label === "Question" ? ' · ⭐ ' + (out.filter(Boolean).length * pt) + ' points so far' : '') + '</span><span class="tagp">' + esc(it.skill) + '</span>';
        cardFor(it)(card, it, { single: single, skill: it.skill }, function (ok) {
          var last = p === list.length - 1, g;
          out[p] = ok;
          if (label === "Question" && !gaStarted) { gaStarted = true; ga("test_start", { course: "spoken_english", day: S.day.day, test_type: pt ? "weekly_challenge" : "final_check" }); }   /* analytics: first answer of this attempt */
          nxt.innerHTML = '<button class="btn btn-primary btn-block" id="goNext" type="button">' + (last ? "See my result →" : "Continue →") + '</button>';
          g = $("#goNext", nxt);
          g.onclick = function () { if (last) { nxt.innerHTML = ""; card.innerHTML = ""; card.onclick = null; meta.innerHTML = ""; onEnd(out); } else { p++; one(); show(card, "start"); } };
          g.focus({ preventScroll: true }); show(g);
        });
      }
      one();
    }
    function missedIdx() { var m = [], k; for (k = 0; k < N; k++) { if (!res[k] && !fixed[k]) m.push(k); } return m; }
    function result(note) {
      var score = 0, sk = {}, names = [], k, s, pct, ok, need = passNeed(N), T, miss = missedIdx(), weak = [], rows, html, A, earlier;
      for (k = 0; k < N; k++) {
        s = items[k].skill; if (!sk[s]) { sk[s] = { c: 0, t: 0 }; names.push(s); }
        sk[s].t++; if (res[k]) { sk[s].c++; score++; }
      }
      names.forEach(function (n) { if (sk[n].c < sk[n].t) weak.push(n); });
      A = { score: score, total: N, weak: weak.slice(0, 8) }; ok = isPass(A);
      /* the next step opens only after a full Final Check with at least 80% (a day already passed before stays open) */
      if (!firstDone) { firstDone = true; ga("test_submit", { course: "spoken_english", day: S.day.day, test_type: pt ? "weekly_challenge" : "final_check", score: score, total: N, pct: Math.round(100 * score / N), passed: ok }); if (!S.assess || A.score >= S.assess.score) S.assess = A; if (ok || passedDay(S.day.day)) c.done(); }
      earlier = !ok && isPass(S.assess);
      pct = Math.round(100 * score / N);
      T = ok ? { cls: "ok", en: "Passed! You scored " + score + " of " + N + ". 🎉", hi: "पास! आपने " + N + " में से " + score + " सही किए।" }
             : { cls: "no", en: "Not yet. You need at least " + need + " of " + N + " (80%) to go to the next day.", hi: "अभी नहीं। अगले दिन जाने के लिए " + N + " में से कम से कम " + need + " (80%) सही चाहिए।" };
      if (pt) T = ok ? { cls: "ok", en: "Passed! You scored " + (score * pt) + " of " + (N * pt) + " points. 🎉", hi: "पास! आपने " + (N * pt) + " में से " + (score * pt) + " अंक पाए।" }
                     : { cls: "no", en: "Not yet. You need at least " + (need * pt) + " of " + (N * pt) + " points (80%) to open the next day.", hi: "अभी नहीं। अगला दिन खोलने के लिए " + (N * pt) + " में से कम से कम " + (need * pt) + " अंक (80%) चाहिए।" };
      rows = names.map(function (n) { var good = sk[n].c === sk[n].t; return '<div class="skillrow ' + (good ? "ok" : "low") + '"><span>' + esc(n) + '</span><span>' + sk[n].c + '/' + sk[n].t + (good ? " ✓" : " · review") + '</span></div>'; }).join("");
      html = '<div class="card"><p class="scorebig">' + (pt ? (score * pt) + ' / ' + (N * pt) + ' points' : score + ' / ' + N) + '</p><p class="center muted">' + (pt ? 'Weekly Challenge · ' + pct + '% · ✅ ' + score + ' correct · ❌ ' + (N - score) + ' incorrect · first attempt' : 'Final Check · ' + pct + '% · first attempt') + '</p>' + fbBox(T.cls, '<p><b>' + T.en + '</b><br><span lang="hi">' + T.hi + '</span></p><p>' + (ok ? "The next day is open. · अगला दिन खुल गया है।" : "Review the skills marked below, then retake the Final Check. · नीचे बताए skills दोहराइए, फिर Final Check दोबारा दीजिए।") + '</p>') +
        (earlier ? '<p class="center muted">You passed this check earlier, so you can still continue. · आप पहले पास हो चुके हैं, इसलिए आगे बढ़ सकते हैं।</p>' : "") +
        (note ? '<p class="center"><b>' + esc(note) + '</b></p>' : "") + '<h3 class="h">Your skills</h3>' + rows + '</div>';
      if (!ok) html += '<div class="card"><button class="btn btn-primary btn-block" type="button" data-retake>' + (pt ? "Retake the Weekly Challenge ↻" : "Retake the Final Check ↻") + '</button><p class="muted">Retrying only the missed questions is practice. To pass, you need ' + (pt ? (need * pt) + " of " + (N * pt) + " points" : need + " of " + N + " correct") + ' in a full ' + (pt ? "Weekly Challenge" : "Final Check") + '. · पास होने के लिए पूरा ' + (pt ? "Weekly Challenge" : "Final Check") + ' दोबारा देना होगा।</p></div>';
      if (miss.length) {
        html += '<div class="card"><h3>Review · दोहराइए</h3><button class="btn btn-outline btn-block" id="reAss" type="button">Practise the ' + miss.length + ' I missed ↻</button>' + miss.map(function (m) { var t = modelOf(items[m]); return '<div class="miss">' + tapEl("p", t, isLatin(t) ? "en" : "hi") + '</div>'; }).join("") + '</div>';
      }
      html += '<div class="card"><h3>What next?</h3>' + weak.slice(0, 3).map(function (n) { var st = skillStep(n), dm = /^day:(\d+)$/.exec(st || ""); return !st ? "" : dm ? '<button class="btn btn-outline btn-block" type="button" data-goday="' + dm[1] + '">Review: ' + esc(n) + '</button>' : '<button class="btn btn-outline btn-block" type="button" data-goid="' + st + '">Review: ' + esc(n) + '</button>'; }).join("") +
        (pt ? "" : '<button class="btn btn-outline btn-block" type="button" data-gotype="speak">🎤 Practise speaking once more</button>') +
        '<p class="muted">A quiz score shows what you can recognise and write today. It does not prove you can speak fluently — keep saying sentences aloud. Your score is saved only on this device.</p></div>';
      resEl.innerHTML = html;
      resEl.onclick = function (e) {
        var g = e.target.closest ? e.target.closest("[data-goid],[data-gotype]") : null, r = e.target.closest ? e.target.closest("#reAss") : null, rt = e.target.closest ? e.target.closest("[data-retake]") : null;
        if (rt) { goType("assess"); return; }
        var gd = e.target.closest ? e.target.closest("[data-goday]") : null;
        if (gd) { navTo("#day-" + gd.getAttribute("data-goday")); return; }
        if (g) { S.reviewing = true; if (g.hasAttribute("data-gotype")) goType(g.getAttribute("data-gotype")); else goStep(g.getAttribute("data-goid")); }
        else if (r) { var list = miss.map(function (m) { return items[m]; }); runList(list, false, "Practice", function (out) { var n = 0; out.forEach(function (ok2, j) { if (ok2) { fixed[miss[j]] = true; n++; } }); result("Fixed in practice: " + n + " of " + out.length); }); show(card, "start"); }
      };
      resEl.setAttribute("tabindex", "-1"); resEl.focus({ preventScroll: true }); show(resEl, "start");
    }
    runList(items, true, "Question", function (out) {
      var k; res = out;
      for (k = 0; k < N; k++) { if (!out[k]) logMiss(modelOf(items[k]), items[k].skill); }
      result();
    });
  };

  /* ---- Apply: final speaking task. The learner says original sentences and ticks them honestly. ---- */
  R.task = function (sec, b, c) {
    var total = 0; sec.items.forEach(function (it) { total += it.count; });
    b.innerHTML = intro(sec) + '<div class="notice">' + esc(sec.note.en) + '<br><span lang="hi">' + esc(sec.note.hi) + '</span></div>' +
      sec.items.map(function (it, k) {
        var tg = "", n;
        for (n = 1; n <= it.count; n++) tg += '<button class="tog" type="button" aria-pressed="false" data-t="' + k + '" data-n="' + n + '">🎤 Sentence ' + n + ' — I said it</button>';
        return '<section class="card"><span class="tagp">' + esc(it.tag) + '</span>' + askHtml(it.ask) + '<p class="muted">Pattern: <b>' + esc(it.frame) + '</b></p>' +
          '<details class="ex"><summary>Need an idea? · आइडिया चाहिए?</summary>' + it.ex.map(function (x) { return '<div class="bi">' + enP(x.en) + hiP(x.hi) + '</div>'; }).join("") + '</details>' +
          '<div class="btnrow">' + tg + '</div></section>';
      }).join("") + '<p class="muted center" id="tCount"></p><div id="tEnd" role="status" aria-live="polite"></div>';
    var count = $("#tCount", b);
    function upd() {
      var n = b.querySelectorAll('.tog[aria-pressed="true"]').length;
      count.textContent = n + " of " + total + " sentences spoken";
      if (n === total) { $("#tEnd", b).innerHTML = block({ t: "bi", style: "quote", en: "Great speaking! You used statements, “no” sentences, questions and short answers.", hi: "बहुत बढ़िया! आपने सामान्य वाक्य, “नहीं” वाले वाक्य, सवाल और छोटे उत्तर बोले।", nobtn: true }); show($("#tEnd", b)); c.done(); }
    }
    function saveTk() { var on = []; [].forEach.call(b.querySelectorAll(".tog"), function (x) { if (x.getAttribute("aria-pressed") === "true") on.push(x.getAttribute("data-t") + "-" + x.getAttribute("data-n")); }); subSet(sec.id, { on: on }); }
    var tsv = subGet(sec.id);
    if (tsv && Array.isArray(tsv.on)) tsv.on.forEach(function (key) { var m = /^(\d+)-(\d+)$/.exec(String(key)), x = m ? b.querySelector('.tog[data-t="' + m[1] + '"][data-n="' + m[2] + '"]') : null; if (x) { x.setAttribute("aria-pressed", "true"); x.textContent = "✓ Sentence " + m[2] + " said"; } });
    b.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest(".tog") : null; if (!t) return;
      var on = t.getAttribute("aria-pressed") !== "true";
      t.setAttribute("aria-pressed", String(on)); t.textContent = on ? "✓ Sentence " + t.getAttribute("data-n") + " said" : "🎤 Sentence " + t.getAttribute("data-n") + " — I said it";
      upd(); saveTk();
    });
    upd();
  };

  /* ---- Day completion: XP once per day; understanding is shown separately by the Final Check score ---- */
  R.complete = function (sec, b, c) {
    var n = S.day.day, nextN = n + 1;
    function skillRows() {
      var by = {}, names = [], id, r;
      for (id in S.results) { r = S.results[id]; if (!r.skill) continue; if (!by[r.skill]) { by[r.skill] = { c: 0, t: 0 }; names.push(r.skill); } by[r.skill].c += r.c; by[r.skill].t += r.t; }
      return names.map(function (k) { var v = by[k], ok = v.c / v.t >= 0.8; return '<div class="skillrow ' + (ok ? "ok" : "low") + '"><span>' + esc(k) + '</span><span>' + v.c + '/' + v.t + (ok ? " ✓" : " · practise again") + '</span></div>'; }).join("");
    }
    function showDone() {
      var A = S.assess, r = completeDay(n, A ? { score: A.score, total: A.total, weak: A.weak } : null), st = streakNow(), pct = A ? Math.round(100 * A.score / A.total) : null, rows = skillRows(), advice;
      if (!S.gaDone) { S.gaDone = true; ga("lesson_complete", { course: "spoken_english", day: n, first_time: r.first, score: A ? A.score : undefined, total: A ? A.total : undefined }); }
      if (A) advice = isPass(A) ? "Your Final Check shows you are ready for Day " + nextN + "." : "Your earlier pass already opened Day " + nextN + ".";
      b.innerHTML = '<div class="card done-card"><div class="burst" aria-hidden="true">🎉</div><h3>DAY ' + n + ' COMPLETE!</h3>' +
        (A ? '<p class="scorebig">' + (dayPoints(n) ? (A.score * dayPoints(n)) + ' / ' + (A.total * dayPoints(n)) + ' points' : A.score + ' / ' + A.total) + '</p><p class="muted">' + (dayPoints(n) ? 'Weekly Challenge' : 'Final Check') + ' · ' + pct + '%</p>' : "") + (advice ? '<p>' + esc(advice) + '</p>' : "") +
        '<p><b>You learned:</b></p><ul class="ach">' + sec.achievements.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join("") + '</ul>' +
        '<div class="rewards"><span class="rw">' + (r.first ? "⭐ +" + COURSE.xpPerDay + " XP" : "⭐ XP already earned") + '</span><span class="rw">🔥 Streak: ' + st + ' day' + (st === 1 ? "" : "s") + '</span></div>' +
        (r.first ? '<p class="muted">XP is for finishing the day. Your Final Check score shows what you understood.</p>' : '<p class="muted">You have completed this day before, so XP is counted only once.</p>') +
        (nextN <= COURSE.totalDays ? '<p class="muted">Day ' + nextN + ' is now unlocked' + (getDay(nextN) ? "." : ' — this lesson is coming soon (it will be free).') + '</p>' : "") +
        '<p class="muted">Progress is saved only on this device.</p></div>' +
        (rows ? '<div class="card"><h3>Skills you practised</h3>' + rows + '</div>' : "") +
        (S.missed.length ? '<div class="card"><h3>Sentences to review</h3>' + S.missed.slice(0, 8).map(function (m) { return '<div class="miss">' + tapEl("p", m.t, isLatin(m.t) ? "en" : "hi") + '</div>'; }).join("") + '</div>' : "") +
        '<h3 class="h">Remember · याद रखिए</h3>' + sec.remember.map(block).join("") +
        block({ t: "bi", style: "big", en: sec.farewell.en, hi: sec.farewell.hi, nobtn: true }) +
        '<button class="btn btn-outline btn-block" type="button" id="reCheck">' + (dayPoints(n) ? "Retake the Weekly Challenge" : "Retake the Final Check") + '</button>';
      $("#reCheck", b).addEventListener("click", function () { goType("assess"); });
      updChip(); c.done(); $("#stepTitle").focus({ preventScroll: true }); show($("#stepTitle"), "start");
    }
    function canFinish() { return isPass(S.assess) || passedDay(n); }
    if (!canFinish()) {
      b.innerHTML = fbBox("no", '<p><b>Day ' + n + ' is not complete yet.</b></p><p>You need at least 80% in the Final Check to finish this day and open Day ' + nextN + '. · दिन पूरा करने और Day ' + nextN + ' खोलने के लिए Final Check में कम से कम 80% चाहिए।</p>') + '<button class="btn btn-primary btn-block" type="button" id="toFC">Go to the Final Check →</button>';
      $("#toFC", b).addEventListener("click", function () { goType("assess"); });
      return;
    }
    b.innerHTML = '<div class="card center"><p><b>You have finished every step of Day ' + n + '.</b></p><p class="muted">Tap the button to complete the day and save your progress on this device.</p><button class="btn btn-primary btn-block" id="finishDay" type="button">Complete Day ' + n + ' ✓</button></div>';
    $("#finishDay", b).addEventListener("click", function () { if (!this.disabled && canFinish()) { this.disabled = true; showDone(); } });
  };

  /* ---- Lesson shell / navigation ---- */
  function updChip() { if (chipEl) chipEl.textContent = "⭐ " + prog.xp + " XP"; }
  function buildShell() {
    var d = S.day;
    lessonEl.innerHTML =
      '<header class="topbar"><div class="wrap"><button class="back" type="button" data-go="hub" aria-label="Back to the ' + COURSE.totalDays + '-day journey">← Journey</button>' +
      '<div class="ltitle"><small>' + esc(COURSE.title) + '</small><strong>Day ' + d.day + '</strong></div><span class="chip" id="xpChip"></span></div></header>' +
      '<div class="prog"><div class="wrap"><div class="bar" aria-hidden="true"><i id="bar"></i></div><span id="stepTxt"></span>' + prefsHtml() + '</div></div>' +
      '<main class="wrap stage" id="stage"></main>' +
      '<footer class="lnav"><div class="wrap"><button class="btn btn-outline skip" id="skipX" type="button" hidden>Skip to Final Check · छोड़ें ⏭</button><button class="btn btn-ghost" id="bk" type="button">← Back</button><button class="btn btn-primary" id="nx" type="button">Continue →</button></div></footer>';
    stage = $("#stage"); nextBtn = $("#nx"); backBtn = $("#bk"); skipBtn = $("#skipX"); chipEl = $("#xpChip"); updChip();
    if (window.MutationObserver) { try { new MutationObserver(schedSync).observe(stage, { childList: true, subtree: true }); } catch (er) { /* ignore */ } }
    nextBtn.addEventListener("click", function () {
      var s = cur();
      if (nextBtn.disabled || nextBtn.classList.contains("wait")) return;
      if (s.type === "gate" && !S.extra) { goType("assess"); return; }
      if (S.step >= vis().length - 1) { navTo(""); }
      else { S.step++; renderStep(); }
    });
    skipBtn.addEventListener("click", function () { goType("assess"); });
    backBtn.addEventListener("click", function () { if (S.step > 0) { S.step--; renderStep(); } });
  }
  /* When the page is longer than the screen, Continue stays hidden until the learner has scrolled to the bottom.
     (Once reached, it stays available unless a lot of new content is added below.) */
  function syncNav() {
    syncQ = 0;
    if (!nextBtn || !S.day || lessonEl.hidden) return;
    var de = document.documentElement, h = Math.max(de.scrollHeight, document.body.scrollHeight), vh = window.innerHeight || de.clientHeight,
        y = window.pageYOffset || de.scrollTop || 0, hold = false;
    if (!nextBtn.disabled && h - vh > 80) {            /* only when there is a real amount of page left to scroll */
      if (y + vh >= h - 80) S.latch = h;
      hold = !(S.latch && h <= S.latch + 80);
    }
    nextBtn.classList.toggle("wait", hold); nextBtn.setAttribute("aria-disabled", String(hold)); nextBtn.tabIndex = hold ? -1 : 0;
  }
  function schedSync() { if (syncQ) return; syncQ = 1; (window.requestAnimationFrame || setTimeout)(syncNav); }
  window.addEventListener("scroll", schedSync, { passive: true });
  window.addEventListener("resize", schedSync);
  function setNext() {
    var v = vis(), s = v[S.step], last = S.step >= v.length - 1;
    nextBtn.disabled = !S.cleared[s.id];
    nextBtn.textContent = last ? "Back to journey" : (s.type === "gate" && !S.extra ? (s.goShort || "Final Check →") : "Continue →");
    backBtn.hidden = S.step === 0;
    syncNav();
  }
  function renderStep() {
    stopAll(); S.latch = 0;
    var secs = vis(), sec = secs[S.step], ch = CHARS[sec.char] || CHARS.panda, N = secs.length;
    stage.style.setProperty("--c", ch.color);
    stage.innerHTML = (TTS ? "" : '<p class="notice">Audio isn’t supported in this browser. You can still read each sentence and say it aloud yourself. · इस ब्राउज़र में आवाज़ उपलब्ध नहीं है।</p>') +
      '<div class="who"><span class="av" aria-hidden="true">' + ch.emoji + '</span><div><strong>' + ch.name + '</strong><small>' + ch.role + '</small></div></div>' +
      '<span class="pill' + (sec.opt ? " pill-opt" : "") + '">' + esc(sec.label) + '</span><h2 id="stepTitle" tabindex="-1">' + esc(sec.title) + '</h2><div id="body"></div>';
    $("#bar").style.width = Math.round(((S.step + 1) / N) * 100) + "%";
    $("#stepTxt").textContent = "Step " + (S.step + 1) + " of " + N + (sec.opt ? " · optional" : "");
    if (sec.type === "assess") S.reviewing = false;
    /* extra-practice steps and “Review” visits always have a shortcut to the Final Check */
    skipBtn.hidden = !(sec.opt || S.reviewing);
    skipBtn.textContent = S.day.test ? (S.reviewing ? "↩ Back to the Challenge · वापस जाएँ" : "Skip to the Challenge · छोड़ें ⏭") : (S.reviewing ? "↩ Back to Final Check · वापस जाएँ" : "Skip to Final Check · छोड़ें ⏭");
    setNext();
    var ctl = { done: function () { S.cleared[sec.id] = true; if (cur() === sec) { setNext(); ckpt(); } } };
    (R[sec.type] || R.info)(sec, $("#body"), ctl);
    window.scrollTo(0, 0);
    $("#stepTitle").focus({ preventScroll: true });
    setTimeout(syncNav, 120); setTimeout(syncNav, 700);
    ckpt();
  }

  /* ---- Hub ---- */
  function renderHub() {
    var done = 0, T = COURSE.totalDays, FREE = COURSE.freeDays || T, nextN = 1, i, tiles = "", curr = "", built = 0, st = streakNow();
    while (nextN <= T && passedDay(nextN)) nextN++;
    for (i = 1; i <= T; i++) {
      var isDone = passedDay(i), un = unlocked(i), has = !!getDay(i), cls, lab, aria;
      if (i > FREE) { cls = "is-premium"; lab = "Coming soon"; aria = "Premium lesson, coming soon"; }
      else if (isDone) { done++; cls = "is-done"; lab = "Done"; aria = "completed"; }
      else if (un && has) { cls = "is-open"; lab = resumeInfo(i) ? "Resume" : (prog.completed.indexOf(i) > -1 ? "Retake" : "Start"); aria = resumeInfo(i) ? "in progress, continue lesson" : "unlocked, start lesson"; }
      else if (un) { cls = "is-soon"; lab = "Coming soon"; aria = "unlocked, lesson coming soon"; }
      else { cls = "is-lock"; lab = "Locked"; aria = "locked"; }
      tiles += '<button class="day ' + cls + '" type="button" data-day="' + i + '" aria-label="Day ' + i + ', ' + aria + '"><b>' + i + '</b><span>' + lab + '</span></button>';
      if (has) {   /* curriculum row: the day's own title, so it updates by itself when a day file is added */
        built++;
        curr += '<li><button class="cday ' + cls + '" type="button" data-day="' + i + '" aria-label="Day ' + i + ', ' + esc(getDay(i).title) + ', ' + aria + '"><span class="cn">' + i + '</span><span class="cb">' + esc(getDay(i).title) + '</span><span class="cs">' + lab + '</span></button></li>';
      }
    }
    if (built < T) curr += '<li class="cmore">Lessons ' + (built + 1) + '–' + T + ' · free · coming soon</li>';
    /* rv = the latest finished day that has a lesson (for the score line and the "Review" link) */
    var rv = 1, k, sc1;
    for (k = 1; k <= T; k++) { if (prog.completed.indexOf(k) > -1 && getDay(k)) rv = k; }
    sc1 = prog.completed.indexOf(rv) > -1 ? prog.scores[rv] : null;
    var cd = getDay(nextN) || getDay(rv), scoreLine = sc1 ? '<p class="muted"><b>Day ' + rv + (dayPoints(rv) ? ' Weekly Challenge (best): ' + (sc1.score * dayPoints(rv)) + ' / ' + (sc1.total * dayPoints(rv)) + ' points' : ' Final Check (best): ' + sc1.score + ' / ' + sc1.total) + '</b>' + (isPass(sc1) ? " · Ready for the next day" : " · You need 80% to unlock the next day" + (sc1.weak.length ? ". Revise: " + esc(sc1.weak.slice(0, 3).join(", ")) : "")) + '</p>' : "";
    var ri = resumeInfo(nextN);
    var cta = getDay(nextN)
      ? (ri ? '<button class="btn btn-primary btn-block" type="button" data-day="' + nextN + '">Continue Day ' + nextN + ' · Step ' + ri.step + ' of ' + ri.total + ' →</button><p class="muted center">You left off here. Your place is saved. · आप यहाँ रुके थे। आपकी प्रगति सुरक्षित है।</p><button class="btn btn-ghost btn-block" type="button" data-restart="' + nextN + '">Start Day ' + nextN + ' from the beginning</button>'
        : '<button class="btn btn-primary btn-block" type="button" data-day="' + nextN + '">' + (done ? "Continue with Day " + nextN : "Start Day " + nextN) + ' →</button>')
      
      : '<p class="fb ok">🎉 You have finished all the lessons that are ready! More lessons are coming soon, and they will all be free. · आपने अभी तक के सभी पाठ पूरे कर लिए! और पाठ जल्द आ रहे हैं, और सब मुफ़्त होंगे।</p><button class="btn btn-outline btn-block" type="button" data-day="' + rv + '">Review Day ' + rv + '</button>';
    hubBody.innerHTML =
      '<section class="hero"><span class="pill">🌱 ' + T + '-Day Journey</span><h1>' + esc(COURSE.title) + '</h1>' +
      '<p class="muted">Learn the pattern. Practise it. Say it aloud. · पैटर्न सीखिए, अभ्यास कीजिए, बोलिए।</p>' +
      '<ul class="stats"><li><b>' + done + ' / ' + T + '</b><span>Days completed</span></li><li><b>' + prog.xp + '</b><span>⭐ XP</span></li><li><b>' + st + '</b><span>🔥 Day streak</span></li></ul></section>' +
      '<section class="card"><span class="pill pill-blue">Day ' + cd.day + ' · ' + cd.sections.filter(function (x) { return !x.opt; }).length + ' short steps' + (cd.sections.some(function (x) { return x.opt; }) ? ' + optional extras' : '') + '</span><h2>' + esc(cd.title) + '</h2><p>' + esc(cd.outcome) + '</p>' + scoreLine + cta + '</section>' +
      '<section class="card free-note"><h3>🎁 The full ' + T + '-day course is free · पूरा ' + T + ' दिन का कोर्स मुफ़्त है</h3><p>Every lesson is free. ' + built + ' lessons are ready now, and new lessons are added regularly.</p><p class="muted" lang="hi">हर पाठ मुफ़्त है। अभी ' + built + ' पाठ तैयार हैं, और नए पाठ लगातार जोड़े जा रहे हैं।</p></section>' +
      '<section class="card"><h3>🔊 Audio · आवाज़</h3><p class="muted">Tap any English or Hindi sentence, instruction or hint (it has a 🔈 next to it) to hear it. Auto-play is OFF by default; you can switch it on below. · सुनने के लिए 🔊 दबाइए। ऑटो-प्ले शुरू में बंद है; आप इसे नीचे से चालू कर सकते हैं।</p>' + prefsHtml() + '</section>' +
      '<h2>Your ' + T + '-day path</h2><p class="muted">Score at least 80% in a day\'s Final Check to unlock the next day. · अगला दिन खोलने के लिए Final Check में कम से कम 80% सही कीजिए।</p><p class="legend"><span><i style="background:var(--primary)"></i>Ready</span><span><i style="background:var(--success)"></i>Done</span><span><i style="background:var(--accent)"></i>Unlocked · coming soon</span><span><i style="background:#D5DAE2"></i>Locked</span></p>' +
      '<div class="days">' + tiles + '</div>' +
      '<h2>Day-by-day curriculum · दिन-दिन का पाठ्यक्रम</h2><p class="muted">What you will learn, in order. Tap a day to open it. · आप क्या सीखेंगे, क्रम से। किसी दिन पर टैप कीजिए।</p><ul class="curr">' + curr + '</ul>' +
      (canSave ? '' : '<p class="fb no"><b>This browser is blocking storage, so your progress cannot be saved. · यह ब्राउज़र स्टोरेज रोक रहा है, इसलिए आपकी प्रगति सेव नहीं हो पाएगी।</b></p>') +
      '<p class="muted center">Your progress is saved only on this device (no account or cloud sync yet).</p>' +
      '<div class="reset"><button type="button" data-reset>Reset progress on this device</button></div>';
  }

  /* Change the page hash AND make sure the screen updates, even if a wrapper app does not fire "hashchange". */
  function navTo(hash) {
    var before = location.hash;
    if (before === hash) { route(); return; }
    location.hash = hash;
    setTimeout(function () { if (location.hash === hash && (hash ? lessonEl.hidden : !lessonEl.hidden)) route(); }, 200);
  }
  var gaOpen = 0;   /* analytics: the lesson already counted on this page visit */
  function route() {
    if (!hubEl || !lessonEl) return;   /* practice pages borrow this file but have no lesson screen */
    var m = /^#day-(\d+)$/.exec(location.hash), n = m ? +m[1] : 0, d = n ? getDay(n) : null;
    stopAll();
    if (d && unlocked(n)) {
      var fresh = (gaOpen !== n), noProg = !prog.completed.length && !Object.keys(prog.resume || {}).length;
      S = newState(d);
      var back = restoreState(S);
      hubEl.hidden = true; lessonEl.hidden = false; buildShell(); renderStep();
      if (fresh) {
        gaOpen = n;
        if (n === 1 && noProg) { try { if (!localStorage.getItem("pl.ga.cs.spoken")) { localStorage.setItem("pl.ga.cs.spoken", "1"); ga("course_start", { course: "spoken_english" }); } } catch (e) { ga("course_start", { course: "spoken_english" }); } }
        if (back && (S.step > 0 || Object.keys(S.sub).length)) ga("course_resume", { course: "spoken_english", day: n, step: S.step + 1 });
        else ga("lesson_start", { course: "spoken_english", day: n });
      }
      document.title = "Day " + n + " — " + COURSE.title + " | PleasantLearn";
      if (back && (S.step > 0 || Object.keys(S.sub).length)) toast("Welcome back! Continuing from Step " + (S.step + 1) + ". · वापसी पर स्वागत है! जहाँ छोड़ा था, वहीं से आगे बढ़िए।");
    } else {
      if (n && !d) toast("This lesson is coming soon, and it will be free. · यह पाठ जल्द आएगा और मुफ़्त होगा।");
      else if (n && !unlocked(n)) toast("Day " + n + " is locked. Pass the Day " + (n - 1) + " Final Check with 80% first.");
      document.title = BASE_TITLE; gaOpen = 0;
      lessonEl.hidden = true; lessonEl.innerHTML = ""; hubEl.hidden = false; renderHub(); window.scrollTo(0, 0);
    }
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-say],[data-day],[data-go],[data-reset],[data-pref],[data-play],[data-restart]"), g;
    if (!t) {
      g = TTS && e.target.closest ? e.target.closest("#stage .yt, #stage .notice, #stage .fb, #stage .muted") : null;
      if (g && !e.target.closest("button,a,input,summary,label") && (g.className.indexOf("muted") < 0 || !isLatin(g.textContent))) speak(g.textContent, "en");
      return;
    }
    if (t.hasAttribute("data-restart")) { var rn = +t.getAttribute("data-restart"); delete prog.resume[rn]; save(); navTo("#day-" + rn); return; }
    if (t.hasAttribute("data-say")) { ga("sentence_audio_play", { source: "lesson", course: "spoken_english", day: S.day ? S.day.day : undefined, lang: t.getAttribute("data-lang") || undefined }); speak(t.getAttribute("data-say"), t.getAttribute("data-lang")); return; }
    if (t.hasAttribute("data-pref")) { var k = t.getAttribute("data-pref"); prefs[k] = !prefs[k]; savePrefs(); updPrefs(); toast((k === "en" ? "English" : "हिंदी") + " auto-play " + (prefs[k] ? "on" : "off")); return; }
    if (t.hasAttribute("data-play")) { if (pagePlaying) stopSpeech(); else speakSeq(S.pageSeq || [], true); return; }
    if (t.hasAttribute("data-go")) { navTo(""); return; }
    if (t.hasAttribute("data-reset")) {
      if (t.getAttribute("data-armed") !== "1") {
        t.setAttribute("data-armed", "1"); t.textContent = "Tap again to erase progress on this device";
        setTimeout(function () { t.removeAttribute("data-armed"); t.textContent = "Reset progress on this device"; }, 4000);
        return;
      }
      prog = blank(); try { localStorage.removeItem(CFG.key); } catch (er) { /* ignore */ } renderHub(); toast("Progress reset.");
      return;
    }
    var n = +t.getAttribute("data-day");
    if (!unlocked(n)) toast("Day " + n + " is locked. Pass the Day " + (n - 1) + " Final Check with 80% first.");
    else if (getDay(n)) navTo("#day-" + n);
    else toast("Day " + n + " is unlocked. Its lesson is coming soon.");
  });
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if ((e.key === "Enter" || e.key === " ") && t && t.getAttribute && t.getAttribute("role") === "button" && t.hasAttribute("data-say")) { e.preventDefault(); speak(t.getAttribute("data-say"), t.getAttribute("data-lang")); }
  });
  /* While typing, hide the sticky Back/Continue bar so the keyboard has room. Un-hide after a short delay so a tap on "Check answer" is never lost to a layout shift. */
  var typingT;
  document.addEventListener("focusin", function (e) { if (e.target && e.target.tagName === "INPUT") { clearTimeout(typingT); document.body.classList.add("typing"); } });
  document.addEventListener("focusout", function (e) { if (e.target && e.target.tagName === "INPUT") { clearTimeout(typingT); typingT = setTimeout(function () { document.body.classList.remove("typing"); }, 350); } });
  /* Authoring check for lesson data: warns in the console only; never blocks the lesson. */
  function validateCourse() {
    var W = [];
    COURSE.days.forEach(function (d) {
      var ids = {}, complete = 0;
      d.sections.forEach(function (sec) {
        var tag = "Day " + d.day + " · " + (sec.id || "(no id)") + ": ";
        if (!sec.id) W.push(tag + "missing id"); else if (ids[sec.id]) W.push(tag + "duplicate id"); ids[sec.id] = 1;
        if (!R[sec.type]) W.push(tag + "unknown type “" + sec.type + "”");
        if (!CHARS[sec.char]) W.push(tag + "unknown character");
        if (sec.type === "complete") complete++;
        (sec.items || []).forEach(function (it, i) {
          var t = tag + "item " + (i + 1) + ": ", ws;
          if (it.options) {
            if (!(it.answer >= 0 && it.answer < it.options.length)) W.push(t + "answer index is outside options");
            if (it.options.filter(function (x, k) { return it.options.indexOf(x) !== k; }).length) W.push(t + "duplicate options");
            if (!(it.ask || sec.ask)) W.push(t + "no instruction (ask)");
          }
          if (it.words && typeof it.answer === "string") {
            ws = it.answer.replace(/[.?!]$/, "").split(" ");
            if (ws.slice().sort().join("|") !== it.words.slice().sort().join("|")) W.push(t + "words do not match the answer");
          }
          if (it.form && ["aff", "neg", "q"].indexOf(it.form) < 0) W.push(t + "unknown write form");
          if (it.form && it.model) { var keep = S, rr; S = newState(d); try { rr = checkWrite(it.form, it.model); } finally { S = keep; } if (!rr.ok) W.push(t + "model answer is rejected by the checker: " + it.model); }
          if (sec.type === "assess" && !it.skill) W.push(t + "final-check question has no skill");
        });
        if ((sec.type === "quiz" || sec.type === "builder" || sec.type === "assess") && !(sec.items && sec.items.length)) W.push(tag + "no items");
      });
      if (d.day !== COURSE.days.indexOf(d) + 1) W.push("Day " + d.day + ": days must be numbered 1, 2, 3… in order");
      if (complete !== 1) W.push("Day " + d.day + ": needs exactly one “complete” section (has " + complete + ")");
      (d.test ? ["goal", "assess", "complete"] : ["goal", "pattern", "examples", "compare", "natural", "l1", "p1", "p2", "speak", "d2", "gate", "assess", "convo", "task", "complete"]).forEach(function (id) {
        if (!ids[id]) W.push("Day " + d.day + ": standard lesson step “" + id + "” is missing (see the lesson plan in days/_template.js)");
      });
      d.sections.forEach(function (sec) {
        if (sec.type === "assess") (sec.items || []).forEach(function (it) {
          if (it.skill && !(d.skillSteps || {})[it.skill]) W.push("Day " + d.day + ": Final Check skill “" + it.skill + "” has no review step in skillSteps");
        });
      });
      Object.keys(d.skillSteps || {}).forEach(function (k) { var tg = d.skillSteps[k], dm = /^day:(\d+)$/.exec(tg); if (dm ? !(+dm[1] >= 1 && +dm[1] < d.day && getDay(+dm[1])) : !ids[tg]) W.push("Day " + d.day + ": skillSteps “" + k + "” points to a missing step"); });
    });
    if (W.length && window.console && console.warn) console.warn("PleasantLearn lesson data check:\n- " + W.join("\n- "));
    return W;
  }
  window.addEventListener("hashchange", route);
  window.addEventListener("pagehide", function () { stopAll(); ckpt(); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) { stopSpeech(); ckpt(); } });   /* WebView: stop audio when the app goes to the background */
  /* Used by sentence-practice.html (“Build your own sentences”): check one learner sentence against a day's “Write your own” rules.
     LW.checkOwn(day, form, text) → { ok, clean, msg:{en,hi}, msgs, fix, html, note, empty } ; form = "aff" | "neg" | "q". Same rules as the lesson. */
  window.LW.checkOwn = function (day, form, raw) {
    var keep = S; S = newState(day);
    try { return checkWrite(form, raw); } finally { S = keep; }
  };
  /* Extra step types (for example the “Name 10 things” word task in wordtask.js). Each is registered as LW.stepTypes[name] = function (api) { return function (sec, body, ctl) {…}; };
     api gives the helpers a step needs; the word sets are the same ones the sentence checker uses. */
  (function () {
    var T = window.LW.stepTypes, api;
    if (!T) return;
    api = { $: $, esc: esc, tapEl: tapEl, fbBox: fbBox, show: show, speak: speak, intro: intro, askHtml: askHtml, subGet: subGet, subSet: subSet, toast: toast, TTS: function () { return TTS; },
      sets: { NOUNS: NOUNS, UNC: UNC, PLONLY: PLONLY, PROPER: PROPER, ADJ: ADJ, VERBS: VERBS, OTHERW: OTHERW }, pluralOf: pluralOf, pluralize: pluralize, day: function () { return S && S.day ? S.day.day : 0; } };
    Object.keys(T).forEach(function (k) { try { R[k] = T[k](api); } catch (er) { /* ignore */ } });
  })();
  if (hubEl) { validateCourse(); route(); }   /* the lesson page only; other pages just borrow the checker */
})();
