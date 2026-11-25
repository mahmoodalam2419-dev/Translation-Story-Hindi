/* Day 3 — content only. See days/_template.js for the structure. */
(function () {
  "use strict";
  /* ---- Day 3 rule texts (these / those + are) ---- */
  var TARE = { en: "With “these” and “those”, use “are”.", hi: "“these” और “those” के साथ “are” आता है।" };
  var NEG3 = { en: "Put “not” after “are”: These are not my pens.", hi: "“are” के बाद “not” आता है: These are not my pens." };
  var QW3 = { en: "For a Yes/No question, start with “Are”: Are these your pens?", hi: "“हाँ/नहीं” वाले सवाल में “Are” पहले आता है: Are these your pens?" };
  var WSH3 = { en: "We usually answer with “they”: Yes, they are. · No, they aren't.", hi: "उत्तर में आमतौर पर “they” आता है: Yes, they are. · No, they aren't." };
  var ORDER3 = { en: "The order is: These / Those + are + word.", hi: "क्रम है: These / Those + are + शब्द।" };
  var PLU = { en: "More than one thing? Make it plural: add -s (pens, books). Do not use a / an.", hi: "एक से ज़्यादा चीज़ें? बहुवचन (plural) बनाइए: -s लगाइए (pens, books)। a / an मत लगाइए।" };
  var B3_AFF = { en: "Build the statement (These / Those are…).", hi: "सामान्य वाक्य बनाइए (These / Those are…)।" };
  var B3_NEG = { en: "Build the negative sentence (…are not…).", hi: "नकारात्मक वाक्य बनाइए (…are not…)।" };
  var B3_Q = { en: "Build the question (Are these / those…?).", hi: "सवाल बनाइए (Are these / those…?)।" };
  var W_MEAN3 = { en: "“not” means ‘नहीं’. A Yes/No question that starts with “Are” means ‘क्या…?’", hi: "“not” का मतलब ‘नहीं’ है। “Are” से शुरू होने वाला हाँ/नहीं वाला सवाल ‘क्या…?’ से शुरू होता है।" };
  var W_MIX3 = { en: "Yes/No questions: “Are” goes first. “No” sentences: “not” goes after “are”.", hi: "हाँ/नहीं वाले सवाल में “Are” पहले आता है। “नहीं” वाले वाक्य में “are” के बाद “not” आता है।" };
  var W_WRONG3 = { en: "Remember: These / Those + are + word. “not” comes after “are”. A Yes/No question starts with “Are”.", hi: "याद रखिए: These / Those + are + शब्द। “not”, “are” के बाद आता है। हाँ/नहीं वाला सवाल “Are” से शुरू होता है।" };
  var W_POS3 = { en: "Take “not” out: These are not pens → These are pens.", hi: "“not” हटाइए: These are not pens → These are pens." };
  var W_QSTAT3 = { en: "For a normal sentence, start with “These” or “Those”: Are these pens? → These are pens.", hi: "सामान्य वाक्य “These” या “Those” से शुरू होता है: Are these pens? → These are pens." };
  var Q_ARE = { en: "With “these” or “those”, ask with “Are”, not “Is”.", hi: "“these” या “those” के साथ “Are” से पूछिए, “Is” से नहीं।" };
  var D_MANY_THESE = { en: "Say it for many things (these).", hi: "इसे कई चीज़ों के लिए (these) बोलिए।" };
  var D_MANY_THOSE = { en: "Say it for many things (those).", hi: "इसे कई चीज़ों के लिए (those) बोलिए।" };

  LW.course.days.push(
{
      day: 3, title: "“These are… / Those are…” — Pointing at Many Things",
      skillSteps: { "These or Those": "pattern", "Three forms": "compare", "Word order": "p2", "Negative sentences": "p6", "Questions": "p4", "Short answers": "p11", "Fixing mistakes": "p10", "Translation": "p3", "Writing your own sentences": "wr", "Real-life use": "convo" },
      tagWhy: { Affirmative: TARE, Negative: NEG3, Question: QW3 },
      write: { subs: ["these", "those"], contr: [], be: "are", nt: "aren't", badBe: "is|am", badQ: "is", plural: true, isMsg: TARE, qMsg: Q_ARE,
        okTags: "✓ Pattern · ✓ Plural noun (more than one)",
        okLine: "PleasantLearn checks the pattern and whether your word is a plural noun (more than one thing). Say your sentence aloud too.",
        msg: { aff: { en: "Start with “These are” or “Those are” and add a plural noun. Example: These are my pens.", hi: "“These are” या “Those are” से शुरू कीजिए और एक बहुवचन संज्ञा (plural noun) जोड़िए। जैसे: These are my pens." },
               neg: { en: "Use “These are not” or “Those are not” and add a plural noun. Example: Those are not my bags.", hi: "“These are not” या “Those are not” लगाइए और एक बहुवचन संज्ञा जोड़िए। जैसे: Those are not my bags." },
               q: { en: "Start with “Are these” or “Are those” and add a plural noun. Example: Are those your houses?", hi: "“Are these” या “Are those” से शुरू कीजिए और एक बहुवचन संज्ञा जोड़िए। जैसे: Are those your houses?" } } },
      outcome: "By the end of Day 3 you can talk about many things near you and far from you: These are my pens. Those are not my bags. Are those buses? You will also practise short answers and speak your own sentences.",
      sections: [
        /* ===== UNDERSTAND ===== */
        { id: "goal", label: "Welcome · Today's Goal", title: "Welcome to Day 3!", char: "panda", type: "info", blocks: [
          { t: "bi", style: "big", say: true, en: "Welcome to Day 3!", hi: "Day 3 में आपका स्वागत है!" },
          { t: "bi", en: "Today you will learn to talk about many things: “These are…” and “Those are…”.", hi: "आज आप कई चीज़ों के बारे में बात करना सीखेंगे: “These are…” और “Those are…”।" },
          { t: "h", text: "Three simple forms · तीन आसान रूप" },
          { t: "form", name: "Say it · बोलिए", cls: "c-blue", pattern: "These / Those are + ...", example: "These are my pens." },
          { t: "form", name: "Say “no” · “नहीं” बोलिए", cls: "c-red", pattern: "These / Those are + not + ...", example: "Those are not my bags." },
          { t: "form", name: "Ask · पूछिए", cls: "c-yellow", pattern: "Are + these / those + ...?", example: "Are those buses?" },
          { t: "h", text: "Today's path · आज का रास्ता" },
          { t: "lines", items: ["1. Learn these and those · these और those सीखिए", "2. Listen and practise · सुनिए और अभ्यास कीजिए", "3. Speak aloud · ज़ोर से बोलिए", "4. Take a short check · छोटी जाँच दीजिए", "5. Use it in real life · असल ज़िंदगी में इस्तेमाल कीजिए"] },
          { t: "bi", style: "quote", say: true, en: "Ready? Let's point at many things and speak!", hi: "तैयार हैं? चलिए कई चीज़ों की ओर इशारा करें और बोलें!" }
        ] },
      {"id": "words", "label": "Warm-up · Many Things", "title": "Name 10 Things (More Than One)", "char": "panda", "type": "words", "kind": "noun", "need": 10, "pass": 6, "intro": {"en": "Today you will talk about many things with “these” and “those”. For many things we usually add ‑s. For example: pens, books, bags, apples, buses, shoes.", "hi": "आज आप “these” और “those” से कई चीज़ों के बारे में बात करेंगे। कई चीज़ों के लिए आमतौर पर ‑s लगाते हैं। जैसे: pens, books, bags, apples, buses, shoes।"}, "examples": [["pens", "कई पेन", "🖊️"], ["books", "कई किताबें", "📚"], ["bags", "कई बैग", "🎒"], ["apples", "कई सेब", "🍎"], ["buses", "कई बसें", "🚌"], ["shoes", "जूते", "👟"]], "helpGroups": ["school", "home", "fruits", "vehicles", "clothes", "animals", "kitchen", "places"], "plural": true, "ask": {"en": "Write the names of 10 things in the plural (more than one). Example: pens, books.", "hi": "10 चीज़ों के नाम बहुवचन (plural) में लिखिए, यानी एक से ज़्यादा। जैसे: pens, books।"}},
        { id: "pattern", label: "Learn · These or Those?", title: "These or Those?", char: "panda", type: "info", blocks: [
          { t: "pattern", en: "THESE ARE... / THOSE ARE...", hi: "ये ... हैं / वे ... हैं" },
          { t: "cat", cls: "c-blue", name: "THESE = near you", en: "These are my pens.", hi: "ये मेरे पेन हैं।" },
          { t: "cat", cls: "c-yellow", name: "THOSE = far from you", en: "Those are buses.", hi: "वे बसें हैं।" },
          { t: "bi", style: "quote", say: true, en: "Near? Say “these”. Far? Say “those”.", hi: "पास में? “these” बोलिए। दूर? “those” बोलिए।" },
          { t: "bi", en: "Remember: this → these, that → those. One thing = this / that. Many things = these / those.", hi: "याद रखिए: this → these, that → those। एक चीज़ = this / that। कई चीज़ें = these / those।" }
        ] },
        /* ===== LEARN ===== */
        { id: "examples", label: "Learn · A. These are", title: "A. Near you: These are…", char: "panda", type: "examples", items: [
          { en: "These are pens.", hi: "ये पेन हैं।" }, { en: "These are my bags.", hi: "ये मेरे बैग हैं।" }, { en: "These are apples.", hi: "ये सेब हैं।" },
          { en: "These are my phones.", hi: "ये मेरे फ़ोन हैं।" }, { en: "These are chairs.", hi: "ये कुर्सियाँ हैं।" }, { en: "These are my books.", hi: "ये मेरी किताबें हैं।" },
          { en: "These are shoes.", hi: "ये जूते हैं।" }, { en: "These are easy.", hi: "ये आसान हैं।" }
        ] },
        { id: "plural", label: "Learn · One or many?", title: "One or Many? (Plural)", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "One thing: a pen. More than one thing: pens. We usually add -s.", hi: "एक चीज़: a pen। एक से ज़्यादा चीज़ें: pens। हम आमतौर पर -s लगाते हैं।" },
          { t: "cat", cls: "c-blue", name: "ONE · this / that + is", en: "This is a pen.", hi: "यह एक पेन है।" },
          { t: "cat", cls: "c-green", name: "MANY · these / those + are", en: "These are pens.", hi: "ये पेन हैं।" },
          { t: "bi", en: "With many things, do not use “a” or “an”. Say: These are pens. Do not say: These are a pens.", hi: "कई चीज़ों के साथ “a” या “an” नहीं लगता। बोलिए: These are pens। नहीं: These are a pens।" },
          { t: "h", text: "Making a plural · बहुवचन बनाना" },
          { t: "cat", cls: "c-blue", name: "Most words: add -s", en: "pen → pens, book → books", hi: "ज़्यादातर शब्दों के अंत में -s लगाइए।" },
          { t: "cat", cls: "c-yellow", name: "Words ending in s, x, z, ch or sh: add -es", en: "bus → buses, box → boxes", hi: "s, x, z, ch या sh पर खत्म होने वाले शब्दों में -es लगाइए।" },
          { t: "ex", items: [ { en: "These are buses.", hi: "ये बसें हैं।" }, { en: "Those are boxes.", hi: "वे बक्से हैं।" } ] }
        ] },
        { id: "those", label: "Learn · B. Those are", title: "B. Far from you: Those are…", char: "panda", type: "examples", items: [
          { en: "Those are buses.", hi: "वे बसें हैं।" }, { en: "Those are my houses.", hi: "वे मेरे घर हैं।" }, { en: "Those are trees.", hi: "वे पेड़ हैं।" },
          { en: "Those are your bags.", hi: "वे आपके बैग हैं।" }, { en: "Those are cars.", hi: "वे कारें हैं।" }, { en: "Those are my friends.", hi: "वे मेरे दोस्त हैं।" },
          { en: "Those are my shoes.", hi: "वे मेरे जूते हैं।" }, { en: "Those are good.", hi: "वे अच्छे हैं।" }
        ] },
        { id: "neg", label: "Learn · C. Say “no”", title: "C. Say “no”: These are not…", char: "panda", type: "examples",
          pre: [ { t: "pattern", en: "THESE / THOSE ARE NOT...", hi: "ये / वे ... नहीं हैं" },
                 { t: "bi", style: "quote", say: true, en: "To say “no”, put “not” after “are”.", hi: "“नहीं” कहने के लिए “are” के बाद “not” लगाइए।" } ],
          items: [
          { en: "These are not my pens.", hi: "ये मेरे पेन नहीं हैं।" }, { en: "These are not books.", hi: "ये किताबें नहीं हैं।" }, { en: "Those are not my bags.", hi: "वे मेरे बैग नहीं हैं।" },
          { en: "Those are not your phones.", hi: "वे आपके फ़ोन नहीं हैं।" }, { en: "Those are not cars.", hi: "वे कारें नहीं हैं।" }, { en: "These aren't my chairs.", hi: "ये मेरी कुर्सियाँ नहीं हैं।" },
          { en: "Those aren't buses.", hi: "वे बसें नहीं हैं।" }
        ] },
        { id: "ques", label: "Learn · D. Ask", title: "D. Ask: Are these…? Are those…?", char: "panda", type: "examples",
          pre: [ { t: "pattern", en: "ARE THESE...? / ARE THOSE...?", hi: "क्या ये ... हैं? / क्या वे ... हैं?" },
                 { t: "bi", style: "quote", say: true, en: "To ask a Yes/No question, put “Are” first.", hi: "“हाँ/नहीं” वाला सवाल पूछने के लिए “Are” को पहले रखिए।" } ],
          items: [
          { en: "Are these your pens?", hi: "क्या ये आपके पेन हैं?" }, { en: "Are these books?", hi: "क्या ये किताबें हैं?" }, { en: "Are those your bags?", hi: "क्या वे आपके बैग हैं?" },
          { en: "Are those buses?", hi: "क्या वे बसें हैं?" }, { en: "Are these my phones?", hi: "क्या ये मेरे फ़ोन हैं?" }, { en: "Are those your houses?", hi: "क्या वे आपके घर हैं?" },
          { en: "Are these apples?", hi: "क्या ये सेब हैं?" }
        ] },
        { id: "short", label: "Learn · Short Answers", title: "Short Answers", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "Are these your pens?", hi: "क्या ये आपके पेन हैं?" },
          { t: "cat", cls: "c-green", name: "Yes", en: "Yes, they are.", hi: "हाँ, ये हैं।" },
          { t: "cat", cls: "c-red", name: "No", en: "No, they aren't.", hi: "नहीं, ये नहीं हैं।" },
          { t: "bi", style: "quote", en: "In a short answer we usually say “they”, even when the question has “these” or “those”.", hi: "छोटे उत्तर में हम आमतौर पर “they” कहते हैं, चाहे सवाल में “these” या “those” हो।" },
          { t: "bi", en: "Remember: say “Yes, they are.” Do not say “Yes, they're.”", hi: "याद रखिए: “Yes, they are.” कहिए। “Yes, they're.” नहीं।" }
        ] },
        /* ===== COMPARE ===== */
        { id: "compare", label: "Compare · Three Forms", title: "Compare the Three Forms", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", en: "Look at what changes in each form.", hi: "देखिए हर रूप में क्या बदलता है।" },
          { t: "h", text: "my pens · मेरे पेन (near)" },
          { t: "compare", rows: [ { label: "Affirmative", cls: "c-blue", en: "These are my pens.", hi: "ये मेरे पेन हैं।" }, { label: "Negative", cls: "c-red", en: "These are not my pens.", hi: "ये मेरे पेन नहीं हैं।", mark: "not" }, { label: "Question", cls: "c-yellow", en: "Are these my pens?", hi: "क्या ये मेरे पेन हैं?", mark: "Are" } ] },
          { t: "h", text: "buses · बसें (far)" },
          { t: "compare", rows: [ { label: "Affirmative", cls: "c-blue", en: "Those are buses.", hi: "वे बसें हैं।" }, { label: "Negative", cls: "c-red", en: "Those are not buses.", hi: "वे बसें नहीं हैं।", mark: "not" }, { label: "Question", cls: "c-yellow", en: "Are those buses?", hi: "क्या वे बसें हैं?", mark: "Are" } ] }
        ] },
        { id: "natural", label: "Compare · Sound Natural", title: "Speaking Naturally", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "When we speak, we often join two words. This is called a contraction.", hi: "बोलते समय हम अक्सर दो शब्दों को जोड़ देते हैं। इसे contraction कहते हैं।" },
          { t: "cat", cls: "c-red", name: "are not → aren't", en: "These aren't my pens.", hi: "ये मेरे पेन नहीं हैं।" },
          { t: "cat", cls: "c-blue", name: "Full form is always correct too", en: "Those are not my bags.", hi: "वे मेरे बैग नहीं हैं।" },
          { t: "bi", style: "quote", say: true, en: "We do not shorten “these are” or “those are”. Say: These are my pens.", hi: "“these are” और “those are” को छोटा नहीं करते। बोलिए: These are my pens." },
          { t: "h", text: "Say it clearly · साफ़ बोलिए" },
          { t: "pron", word: "these", sound: "दीज़" }, { t: "pron", word: "those", sound: "दोज़" }, { t: "pron", word: "aren't", sound: "आर्न्ट" }, { t: "pron", word: "pens", sound: "पेन्ज़" }, { t: "pron", word: "books", sound: "बुक्स" }, { t: "pron", word: "buses", sound: "बसिज़" },
          { t: "bi", style: "quote", en: "Tip: for “th”, touch your tongue lightly to your front teeth.", hi: "“th” बोलते समय जीभ को आगे के दाँतों से हल्का छुआइए।" },
          { t: "bi", style: "quote", en: "Tip: the plural “s” can sound like s (books), z (pens) or iz (buses).", hi: "टिप: plural के “s” की आवाज़ s (books), z (pens) या iz (buses) हो सकती है।" }
        ] },
        /* ===== LISTEN ===== */
        { id: "l1", label: "Listen · Hear It", title: "Listen & Choose", char: "polly", type: "quiz", skill: "Listening", autoListen: true,
          intro: { en: "Listen to the sentence. The text is hidden — use your ears!", hi: "वाक्य सुनिए। लिखा हुआ वाक्य छिपा है — ध्यान से सुनिए!" }, ask: A_LISTEN, why: W_MIX3, items: [
            { listen: "Those are buses.", options: ["These are buses.", "Those are buses.", "Are those buses?"], answer: 1 },
            { listen: "Are these your books?", options: ["Are those your books?", "These are your books.", "Are these your books?"], answer: 2 },
            { listen: "These are not my bags.", options: ["These are my bags.", "These are not my bags.", "Those are not my bags."], answer: 1 },
            { listen: "Those aren't my phones.", options: ["Those aren't my phones.", "Those are my phones.", "Are those my phones?"], answer: 0 },
            { listen: "Are those your shoes?", options: ["Are these your shoes?", "Those are your shoes.", "Are those your shoes?"], answer: 2 }
        ] },
        /* ===== PRACTISE (easy → harder) ===== */
        { id: "p1", label: "Practise · 1 Recognise", title: "Choose the Correct Sentence", char: "polly", type: "quiz", skill: "Recognising correct sentences",
          intro: { en: "Choose the correct sentence.", hi: "सही वाक्य चुनिए।" }, ask: A_SENT, why: TARE, items: [
            { ask: { en: "The pens are in your hand. Choose the best sentence.", hi: "पेन आपके हाथ में हैं। सबसे सही वाक्य चुनिए।" }, options: ["Those are my pens.", "These are my pens.", "Are those my pens."], answer: 1, say: "These are my pens.", why: { en: "Near you → “these”.", hi: "पास में → “these”।" } },
            { ask: { en: "The buses are far away. Choose the best sentence.", hi: "बसें दूर हैं। सबसे सही वाक्य चुनिए।" }, options: ["These are buses.", "Those are buses.", "Are these buses."], answer: 1, say: "Those are buses.", why: { en: "Far from you → “those”.", hi: "दूर → “those”।" } },
            { visual: "📚", word: "books", options: ["These are books.", "These is books.", "This are books."], answer: 0, say: "These are books." },
            { visual: "🍎🍎", word: "apples", options: ["These are a apples.", "These are apples.", "These are an apples."], answer: 1, say: "These are apples.", why: PLU },
            { ask: A_NEG, options: ["These are not my pens.", "These not are my pens.", "These is not my pens."], answer: 0, say: "These are not my pens.", why: NEG3 },
            { ask: A_NEG, options: ["Those are my not bags.", "Those are not my bags.", "Those not are my bags."], answer: 1, say: "Those are not my bags.", why: NEG3 },
            { ask: A_Q, options: ["Are these your pens?", "These are your pens?", "Are your these pens?"], answer: 0, say: "Are these your pens?", why: QW3 },
            { ask: A_Q, options: ["Is those buses?", "Are those buses?", "Those are buses?"], answer: 1, say: "Are those buses?", why: QW3 }
        ] },
        { id: "p2", label: "Practise · 2 Word order", title: "Build the Sentence", char: "polly", type: "builder", skill: "Word order",
          intro: { en: "Tap the words in the correct order. Your answer is checked when you have used all the words.", hi: "शब्दों को सही क्रम में टैप कीजिए। सारे शब्द लगाते ही आपका उत्तर जाँचा जाएगा।" }, items: [
            { tag: "Affirmative", ask: B3_AFF, words: ["my", "pens", "are", "These"], answer: "These are my pens." },
            { tag: "Affirmative", ask: B3_AFF, words: ["bags", "are", "Those", "my"], answer: "Those are my bags." },
            { tag: "Affirmative", ask: B3_AFF, words: ["buses", "are", "Those"], answer: "Those are buses." },
            { tag: "Negative", ask: B3_NEG, words: ["not", "my", "are", "These", "pens"], answer: "These are not my pens." },
            { tag: "Negative", ask: B3_NEG, words: ["not", "are", "Those", "buses"], answer: "Those are not buses." },
            { tag: "Question", ask: B3_Q, words: ["these", "Are", "pens", "your"], answer: "Are these your pens?" },
            { tag: "Question", ask: B3_Q, words: ["those", "Are", "buses"], answer: "Are those buses?" },
            { tag: "Question", ask: B3_Q, words: ["those", "Are", "houses", "your"], answer: "Are those your houses?" }
        ] },
        { id: "p6", label: "Practise · 3 Make it negative", title: "Say “No”: add not", char: "polly", type: "transform", skill: "Negative sentences",
          intro: { en: "Make the sentence negative.", hi: "वाक्य को नकारात्मक बनाइए।" }, arrow: "add not after are", promptLang: "en",
          pairs: [ { from: "These are pens.", to: "These are not pens." }, { from: "Those are my bags.", to: "Those are not my bags." } ],
          note: { en: "Look: “not” comes after “are”.", hi: "देखिए: “not”, “are” के बाद आता है।" }, ask: A_NEGT, why: NEG3, items: [
            { prompt: "These are my phones.", options: ["These are not my phones.", "These not are my phones.", "These is not my phones."], answer: 0, say: "These are not my phones." },
            { prompt: "Those are cars.", options: ["Those are a not cars.", "Those are not cars.", "Those not cars are."], answer: 1, say: "Those are not cars." },
            { prompt: "These are easy.", options: ["These are not easy.", "These are easy not.", "Are these not easy."], answer: 0, say: "These are not easy." },
            { prompt: "Those are my houses.", options: ["Those not are my houses.", "Those are my not houses.", "Those are not my houses."], answer: 2, say: "Those are not my houses." }
        ] },
        { id: "p4", label: "Practise · 4 Make a question", title: "Statement → Question", char: "polly", type: "transform", skill: "Questions",
          intro: { en: "Make the sentence a question.", hi: "वाक्य को सवाल बनाइए।" }, promptLang: "en",
          pairs: [ { from: "These are my pens.", to: "Are these my pens?" }, { from: "Those are buses.", to: "Are those buses?" } ],
          note: { en: "Look: “are” moves before “these” or “those”.", hi: "देखिए: “are”, “these” या “those” से पहले आ जाता है।" }, ask: A_MAKEQ, why: QW3, items: [
            { prompt: "These are books.", options: ["Are these books?", "These are books?", "Are books these?"], answer: 0, say: "Are these books?" },
            { prompt: "Those are your bags.", options: ["Are your bags those?", "Are those your bags?", "Those are your bags?"], answer: 1, say: "Are those your bags?" },
            { prompt: "These are my phones.", options: ["Are these my phones?", "Is these my phones?", "These my phones are?"], answer: 0, say: "Are these my phones?" },
            { prompt: "Those are chairs.", options: ["Those are chairs?", "Are those chairs?", "Are chairs those?"], answer: 1, say: "Are those chairs?" }
        ] },
        { id: "p11", label: "Practise · 5 Answer", title: "Yes, they are. / No, they aren't.", char: "polly", type: "quiz", skill: "Short answers",
          intro: { en: "Read the question. Choose the correct short answer.", hi: "सवाल पढ़िए। सही छोटा उत्तर चुनिए।" }, ask: A_SHORT, why: WSH3, promptLang: "en", items: [
            { prompt: "Are these your pens? (Say YES)", options: ["Yes, they are.", "Yes, they aren't.", "No, they are."], answer: 0, say: "Yes, they are." },
            { prompt: "Are those buses? (Say NO)", options: ["No, they are.", "No, they aren't.", "No, they is."], answer: 1, say: "No, they aren't." },
            { prompt: "Are those your bags? (Say YES)", options: ["Yes, they is.", "Yes, they aren't.", "Yes, they are."], answer: 2, say: "Yes, they are." },
            { prompt: "Are these books? (Say NO)", options: ["No, they aren't.", "No, it isn't.", "No, I aren't."], answer: 0, say: "No, they aren't." }
        ] },
        { id: "p10", label: "Practise · 6 Fix the mistake", title: "Find the Mistake", char: "foxy", type: "quiz", skill: "Fixing mistakes", spot: true,
          intro: { en: "Two sentences are correct. One has a mistake. Find it!", hi: "दो वाक्य सही हैं। एक में गलती है। उसे ढूँढिए!" }, ask: A_WRONG, why: W_WRONG3, items: [
            { options: ["These are pens.", "These is pens.", "Those are buses."], answer: 1, fix: "These are pens.", say: "These are pens.", why: TARE },
            { options: ["Are these your books?", "These are not my bags.", "Those not are my bags."], answer: 2, fix: "Those are not my bags.", say: "Those are not my bags.", why: NEG3 },
            { options: ["Are those buses?", "Those are good?", "These are my pens."], answer: 1, fix: "Are those good?", say: "Are those good?", why: QW3 },
            { options: ["These are not my phones.", "Those are not cars.", "These not my books are."], answer: 2, fix: "These are not my books.", say: "These are not my books.", why: NEG3 },
            { options: ["Are these pens?", "Is those your houses?", "Those are my houses."], answer: 1, fix: "Are those your houses?", say: "Are those your houses?", why: Q_ARE },
            { options: ["These are my books.", "Those are a bus.", "Those are my bags."], answer: 1, fix: "Those are buses.", say: "Those are buses.", why: PLU }
        ] },
        { id: "p3", label: "Practise · 7 Hindi → English", title: "Hindi → English", char: "polly", type: "quiz", skill: "Translation (Hindi → English)",
          intro: { en: "Translate into English.", hi: "अंग्रेज़ी में अनुवाद कीजिए।" }, ask: T_AFF, why: ORDER3, items: [
            { prompt: "ये मेरी किताबें हैं।", hiPrompt: true, options: ["These are my books.", "These my books are.", "These is my books."], answer: 0, say: "These are my books." },
            { prompt: "वे मेरे जूते हैं।", hiPrompt: true, options: ["Those are my shoes.", "Those my shoes are.", "Those is my shoes."], answer: 0, say: "Those are my shoes." },
            { prompt: "ये सेब हैं।", hiPrompt: true, options: ["These are a apples.", "These are apples.", "These is apples."], answer: 1, say: "These are apples.", why: PLU },
            { ask: T_NEG, prompt: "ये मेरे पेन नहीं हैं।", hiPrompt: true, options: ["These are not my pens.", "These not my pens are.", "These is not my pens."], answer: 0, say: "These are not my pens.", why: NEG3 },
            { ask: T_NEG, prompt: "वे बसें नहीं हैं।", hiPrompt: true, options: ["Those are not buses.", "Those not buses are.", "Those is not buses."], answer: 0, say: "Those are not buses.", why: NEG3 },
            { ask: T_Q, prompt: "क्या वे आपके घर हैं?", hiPrompt: true, options: ["Are those your houses?", "Those are your houses?", "Are your houses those?"], answer: 0, say: "Are those your houses?", why: QW3 }
        ] },
        { id: "wr", label: "Practise · 8 Write your own", title: "Your Turn: Write", char: "polly", type: "write", skill: "Writing your own sentences",
          intro: { en: "Look around you. Write your own sentences.", hi: "अपने आस-पास देखिए। अपने खुद के वाक्य लिखिए।" }, items: [
            { tag: "Affirmative", form: "aff", ask: { en: "Look at things near you. Write a sentence with a plural noun. Start with “These are”.", hi: "अपने पास की चीज़ों को देखिए। बहुवचन संज्ञा (plural noun) के साथ वाक्य लिखिए। “These are” से शुरू कीजिए।" }, hint: "Pattern: These are + (my / your) + plural noun (pens, books, bags…).", hintHi: "पैटर्न: These are + (my / your) + बहुवचन संज्ञा (pens, books, bags…)।", model: "These are my pens." },
            { tag: "Negative", form: "neg", ask: { en: "Look at things far from you. Write with a plural noun: Those are not…", hi: "अपने से दूर की चीज़ों को देखिए। बहुवचन संज्ञा के साथ लिखिए: Those are not…" }, hint: "Pattern: Those are not + (my / your) + plural noun.", hintHi: "पैटर्न: Those are not + (my / your) + बहुवचन संज्ञा।", model: "Those are not my bags." },
            { tag: "Question", form: "q", ask: { en: "Write a question with a plural noun. Start with “Are these” or “Are those”.", hi: "बहुवचन संज्ञा के साथ एक सवाल लिखिए। “Are these” या “Are those” से शुरू कीजिए।" }, hint: "Pattern: Are those + (my / your) + plural noun?", hintHi: "पैटर्न: Are those + (my / your) + बहुवचन संज्ञा?", model: "Are those your houses?" }
        ] },
        /* ===== SPEAK ===== */
        { id: "speak", label: "Speak · Listen, Repeat, Say", title: "Speak It", char: "panda", type: "speak",
          intro: { en: "Now it's your turn. Don't just read. Speak!", hi: "अब आपकी बारी है। सिर्फ पढ़िए मत। बोलिए!" }, items: [
            { tag: "Statement", en: "These are my pens.", hi: "ये मेरे पेन हैं।", tip: "For “th”, touch your tongue to your front teeth: these. The end sounds like “z”.", tipHi: "“th” के लिए जीभ को आगे के दाँतों से छुआइए: these। अंत में “z” जैसी आवाज़ आती है।" },
            { tag: "Statement", en: "Those are my shoes.", hi: "वे मेरे जूते हैं।", tip: "“those” sounds like “nose”, with “th” at the start.", tipHi: "“those” की आवाज़ “nose” जैसी है, बस शुरू में “th” है।" },
            { tag: "Negative", en: "These aren't my bags.", hi: "ये मेरे बैग नहीं हैं।", tip: "aren't = आर्न्ट. Say it as one word.", tipHi: "aren't = आर्न्ट। इसे एक शब्द की तरह बोलिए।" },
            { tag: "Question", en: "Are those your books?", hi: "क्या वे आपकी किताबें हैं?", tip: "Let your voice go up a little at the end ↗", tipHi: "अंत में आवाज़ थोड़ी ऊपर उठाइए ↗" },
            { tag: "Short answer", en: "Yes, they are.", hi: "हाँ, ये हैं।", tip: "Say “they”, and say “they are” in full.", tipHi: "“they” बोलिए, और “they are” पूरा बोलिए।" },
            { tag: "Short answer", en: "No, they aren't.", hi: "नहीं, ये नहीं हैं।" }
        ] },
        { id: "d2", label: "Speak · Change it and say it", title: "Change It and Say It", char: "panda", type: "drill",
          intro: { en: "Change the sentence as asked. Say your answer aloud. Then check.", hi: "निर्देश के अनुसार वाक्य बदलिए। अपना उत्तर ज़ोर से बोलिए। फिर जाँचिए।" }, items: [
            { ask: D_MANY_THESE, tag: "One → Many", from: "This is a pen.", to: "These are pens." },
            { ask: D_MANY_THOSE, tag: "One → Many", from: "That is a bus.", to: "Those are buses." },
            { ask: D_MANY_THESE, tag: "One → Many", from: "This is my bag.", to: "These are my bags." },
            { ask: D_NEG, tag: "Statement → Negative", from: "These are pens.", to: "These are not pens." },
            { ask: D_NEG, tag: "Statement → Negative", from: "Those are my bags.", to: "Those are not my bags." },
            { ask: D_Q, tag: "Statement → Question", from: "These are my phones.", to: "Are these my phones?" },
            { ask: D_Q, tag: "Statement → Question", from: "Those are buses.", to: "Are those buses?" },
            { ask: D_STAT, tag: "Question → Statement", from: "Are these pens?", to: "These are pens." },
            { ask: D_STAT, tag: "Question → Statement", from: "Are those cars?", to: "Those are cars." },
            { ask: D_STAT, tag: "Negative → Statement", from: "Those are not my houses.", to: "Those are my houses." },
            { ask: D_YES, tag: "Short answer", from: "Are these your pens?", to: "Yes, they are." },
            { ask: D_NO, tag: "Short answer", from: "Are those buses?", to: "No, they aren't." }
        ] },
        { id: "gate", label: "Optional Extra Practice", title: "Want More Practice?", char: "foxy", type: "gate",
          en: "Core practice done! 🎉", hi: "मुख्य अभ्यास पूरा हुआ! 🎉",
          text: { en: "The extra steps below are optional. They give more practice before your final check.", hi: "नीचे के अतिरिक्त चरण वैकल्पिक हैं। ये आपकी अंतिम जाँच से पहले और अभ्यास देते हैं।" } },
        /* ----- optional extra practice (only shown if the learner chooses it) ----- */
        { id: "uses", opt: true, label: "Extra · Where we use these / those", title: "These and Those: More Uses", char: "panda", type: "info", blocks: [
          { t: "cat", cls: "c-blue", name: "Things", en: "These are my phones.", hi: "ये मेरे फ़ोन हैं।" },
          { t: "cat", cls: "c-green", name: "Places", en: "Those are hospitals.", hi: "वे अस्पताल हैं।" },
          { t: "cat", cls: "c-yellow", name: "People", en: "These are my friends.", hi: "ये मेरे दोस्त हैं।" },
          { t: "bi", style: "quote", say: true, en: "One thing: this / that + is. Many things: these / those + are.", hi: "एक चीज़: this / that + is। कई चीज़ें: these / those + are।" }
        ] },
        { id: "mistakes", opt: true, label: "Extra · Common mistakes", title: "⚠️ Watch out!", char: "foxy", type: "info", blocks: [
          { t: "fix", wrong: "These is my pens.", right: "These are my pens." },
          { t: "bi", style: "big", en: "With “these” and “those”, use “are”.", hi: "“these” और “those” के साथ “are” का इस्तेमाल करें।" },
          { t: "fix", wrong: "Those not are my bags.", right: "Those are not my bags." },
          { t: "bi", style: "big", en: "Put “not” after “are”.", hi: "“not” को “are” के बाद रखिए।" },
          { t: "fix", wrong: "Those are buses?", right: "Are those buses?" },
          { t: "bi", style: "big", en: "For a Yes/No question, start with “Are”.", hi: "“हाँ/नहीं” वाले सवाल में “Are” से शुरू कीजिए।" },
          { t: "fix", wrong: "These are my pen.", right: "These are my pens." },
          { t: "bi", style: "big", en: "Many things? Use the plural: pens.", hi: "कई चीज़ें? बहुवचन (plural) लगाइए: pens।" }
        ] },
        { id: "fill", opt: true, label: "Extra · Complete the sentence", title: "Complete the Sentence", char: "polly", type: "quiz", skill: "Completing sentences",
          intro: { en: "Choose the missing word.", hi: "छूटा हुआ शब्द चुनिए।" }, why: TARE, items: [
            { ask: A_FILL, prompt: "These ___ my pens.", options: ["am", "is", "are"], answer: 2, say: "These are my pens." },
            { ask: A_FILL, prompt: "Those ___ my bags.", options: ["is", "are", "am"], answer: 1, say: "Those are my bags." },
            { ask: A_FILL, prompt: "Those ___ not buses.", options: ["is", "are", "am"], answer: 1, say: "Those are not buses.", why: NEG3 },
            { ask: A_FILLQ, prompt: "___ these your books?", options: ["Is", "Are", "Am"], answer: 1, say: "Are these your books?", why: QW3 },
            { ask: A_FILL, prompt: "These are my ___.", options: ["pen", "pens", "a pen"], answer: 1, say: "These are my pens.", why: PLU }
        ] },
        { id: "p5", opt: true, label: "Extra · English → Hindi", title: "Understand the Meaning", char: "polly", type: "quiz", skill: "Meaning (English → Hindi)",
          intro: { en: "Read the English sentence. Choose its Hindi meaning.", hi: "अंग्रेज़ी वाक्य पढ़िए। उसका हिंदी अर्थ चुनिए।" }, ask: A_MEAN, why: W_MEAN3, optLang: "hi", promptLang: "en", items: [
            { prompt: "These are my pens.", options: ["ये मेरे पेन हैं।", "ये मेरे पेन नहीं हैं।", "क्या ये मेरे पेन हैं?"], answer: 0, say: "These are my pens." },
            { prompt: "Those are not buses.", options: ["वे बसें हैं।", "वे बसें नहीं हैं।", "क्या वे बसें हैं?"], answer: 1, say: "Those are not buses." },
            { prompt: "Are those your bags?", options: ["वे आपके बैग नहीं हैं।", "वे आपके बैग हैं।", "क्या वे आपके बैग हैं?"], answer: 2, say: "Are those your bags?" },
            { prompt: "Are these books?", options: ["क्या ये किताबें हैं?", "ये किताबें हैं।", "ये किताबें नहीं हैं।"], answer: 0, say: "Are these books?" }
        ] },
        { id: "p12", opt: true, label: "Extra · Build from Hindi", title: "Hindi → Build the Sentence", char: "polly", type: "builder", skill: "Word order (from Hindi)",
          intro: { en: "Read the Hindi. Tap the English words in the correct order.", hi: "हिंदी पढ़िए। अंग्रेज़ी शब्दों को सही क्रम में टैप कीजिए।" }, ask: A_BUILDHI, items: [
            { tag: "Affirmative", hi: "ये मेरे फ़ोन हैं।", words: ["phones", "These", "my", "are"], answer: "These are my phones." },
            { tag: "Negative", hi: "वे मेरे बैग नहीं हैं।", words: ["bags", "my", "are", "Those", "not"], answer: "Those are not my bags." },
            { tag: "Question", hi: "क्या ये आपकी किताबें हैं?", words: ["your", "these", "books", "Are"], answer: "Are these your books?" },
            { tag: "Negative", hi: "ये कुर्सियाँ नहीं हैं।", words: ["chairs", "not", "These", "are"], answer: "These are not chairs." },
            { tag: "Question", hi: "क्या वे बसें हैं?", words: ["buses", "Are", "those"], answer: "Are those buses?" }
        ] },
        { id: "d1", opt: true, label: "Extra · Speak Hindi → English", title: "Say It in English", char: "panda", type: "drill",
          intro: { en: "Hear the Hindi. Say the English sentence aloud. Then check.", hi: "हिंदी सुनिए। अंग्रेज़ी वाक्य ज़ोर से बोलिए। फिर जाँचिए।" }, ask: D_SAYEN, items: [
            { tag: "Affirmative", from: "ये आसान हैं।", fromLang: "hi", to: "These are easy." },
            { tag: "Negative", from: "वे मेरी किताबें नहीं हैं।", fromLang: "hi", to: "Those are not my books." },
            { tag: "Question", from: "क्या ये आपके फ़ोन हैं?", fromLang: "hi", to: "Are these your phones?" },
            { tag: "Negative", from: "ये मेरे बैग नहीं हैं।", fromLang: "hi", to: "These are not my bags." },
            { tag: "Question", from: "क्या वे बसें हैं?", fromLang: "hi", to: "Are those buses?" },
            { tag: "Affirmative", from: "ये किताबें हैं।", fromLang: "hi", to: "These are books." }
        ] },
        { id: "p7", opt: true, label: "Extra · Remove “not”", title: "Negative → Statement", char: "polly", type: "transform", skill: "Negative → statement",
          intro: { en: "Take out “not” to make a normal sentence.", hi: "“not” हटाकर सामान्य वाक्य बनाइए।" }, arrow: "remove not", promptLang: "en",
          pairs: [ { from: "These are not pens.", to: "These are pens." }, { from: "Those are not my phones.", to: "Those are my phones." } ],
          note: { en: "Look: take “not” out.", hi: "देखिए: “not” हटा दीजिए।" }, ask: A_POS, why: W_POS3, items: [
            { prompt: "These are not easy.", options: ["These are easy.", "These not are easy.", "These are easy not."], answer: 0, say: "These are easy." },
            { prompt: "Those are not difficult.", options: ["Those is difficult.", "Those are difficult.", "Are those difficult."], answer: 1, say: "Those are difficult." },
            { prompt: "These are not my books.", options: ["These my books are.", "These are my books.", "These are not books."], answer: 1, say: "These are my books." },
            { prompt: "Those are not buses.", options: ["Those are buses.", "Those buses are.", "Those is buses."], answer: 0, say: "Those are buses." }
        ] },
        { id: "p8", opt: true, label: "Extra · Question → Statement", title: "Question → Statement", char: "polly", type: "transform", skill: "Question → statement",
          intro: { en: "Turn the question back into a statement.", hi: "सवाल को वापस सामान्य वाक्य बनाइए।" }, arrow: "are moves after these / those", promptLang: "en",
          pairs: [ { from: "Are these pens?", to: "These are pens." }, { from: "Are those buses?", to: "Those are buses." } ],
          note: { en: "Look: “are” goes back after “these” or “those”.", hi: "देखिए: “are”, “these” या “those” के बाद वापस आ जाता है।" }, ask: A_QSTAT, why: W_QSTAT3, items: [
            { prompt: "Are these easy?", options: ["These are easy.", "Are these easy.", "These easy are."], answer: 0, say: "These are easy." },
            { prompt: "Are these my phones?", options: ["These my phones are.", "These are my phones.", "Are my phones these."], answer: 1, say: "These are my phones." },
            { prompt: "Are those cars?", options: ["Those are cars.", "Those is cars.", "Are cars those."], answer: 0, say: "Those are cars." },
            { prompt: "Are those your bags?", options: ["Are those your bags.", "Those your bags are.", "Those are your bags."], answer: 2, say: "Those are your bags." }
        ] },
        { id: "p9", opt: true, label: "Extra · Mix & Transform", title: "Mix & Transform", char: "foxy", type: "quiz", skill: "Mixed transformations",
          intro: { en: "Different tasks. Read each instruction carefully!", hi: "अलग-अलग काम। हर निर्देश ध्यान से पढ़िए!" }, why: W_MIX3, promptLang: "en", items: [
            { ask: A_NEGQ, prompt: "These are not easy.", options: ["Are these easy?", "These are not easy?", "Are easy these?"], answer: 0, say: "Are these easy?" },
            { ask: A_QNEG, prompt: "Are these pens?", options: ["These are not pens.", "These not are pens.", "Are these not pens."], answer: 0, say: "These are not pens." },
            { ask: A_QNEG, prompt: "Are those buses?", options: ["Are those not buses?", "Those are not buses.", "Those not buses are."], answer: 1, say: "Those are not buses." },
            { ask: A_NEGQ, prompt: "Those are not my bags.", options: ["Those are my bags?", "Are my bags those?", "Are those my bags?"], answer: 2, say: "Are those my bags?" },
            { ask: A_NEGT, prompt: "These are good.", options: ["These are not good.", "Are these good?", "These not good are."], answer: 0, say: "These are not good." },
            { ask: A_QSTAT, prompt: "Are those cars?", options: ["Those are cars.", "Are those cars.", "Those is cars."], answer: 0, say: "Those are cars." }
        ] },
        { id: "l2", opt: true, label: "Extra · Listen हिंदी ↔ English", title: "Listen & Understand", char: "polly", type: "quiz", skill: "Listening (Hindi ↔ English)",
          intro: { en: "Listen in Hindi or English. Choose the matching sentence.", hi: "हिंदी या अंग्रेज़ी में सुनिए। सही वाक्य चुनिए।" }, ask: A_LISTENM, why: W_MEAN3, items: [
            { listen: "ये मेरे बैग नहीं हैं।", listenLang: "hi", options: ["These are not my bags.", "These are my bags.", "Are these my bags?"], answer: 0, say: "These are not my bags." },
            { listen: "क्या ये आसान हैं?", listenLang: "hi", options: ["These are easy.", "Are these easy?", "These are not easy."], answer: 1, say: "Are these easy?" },
            { listen: "वे कारें हैं।", listenLang: "hi", options: ["Those are not cars.", "Are those cars?", "Those are cars."], answer: 2, say: "Those are cars." },
            { listen: "These are not easy.", optLang: "hi", options: ["ये आसान नहीं हैं।", "ये आसान हैं।", "क्या ये आसान हैं?"], answer: 0 },
            { listen: "Are those buses?", optLang: "hi", options: ["वे बसें नहीं हैं।", "क्या वे बसें हैं?", "वे बसें हैं।"], answer: 1 },
            { listen: "These are my books.", optLang: "hi", options: ["ये मेरी किताबें नहीं हैं।", "क्या ये मेरी किताबें हैं?", "ये मेरी किताबें हैं।"], answer: 2 }
        ] },
        { id: "quick", opt: true, label: "Extra · Quick Translation", title: "Quick Challenge", char: "foxy", type: "quiz", skill: "Translation (more practice)",
          intro: { en: "Ready for the challenge?", hi: "क्या आप चैलेंज के लिए तैयार हैं?" }, why: TARE, items: [
            { ask: T_NEG, prompt: "ये मेरी किताबें नहीं हैं।", hiPrompt: true, options: ["These are not my books.", "These not my books are.", "These is not my books."], answer: 0, say: "These are not my books.", why: NEG3 },
            { ask: T_Q, prompt: "क्या ये आपके बैग हैं?", hiPrompt: true, options: ["Are these your bags?", "These are your bags?", "Are your bags these?"], answer: 0, say: "Are these your bags?", why: QW3 },
            { ask: T_AFF, prompt: "वे कुर्सियाँ हैं।", hiPrompt: true, options: ["Those are chairs.", "Those is chairs.", "Those chairs are."], answer: 0, say: "Those are chairs.", why: ORDER3 }
        ] },
        { id: "d3", opt: true, label: "Extra · Speak English → Hindi", title: "Say the Hindi Meaning", char: "panda", type: "drill",
          intro: { en: "Hear the English. Say the Hindi meaning aloud. Then check.", hi: "अंग्रेज़ी सुनिए। हिंदी अर्थ ज़ोर से बोलिए। फिर जाँचिए।" }, ask: D_SAYHI, items: [
            { from: "These are difficult.", fromLang: "en", to: "ये मुश्किल हैं।", toLang: "hi" },
            { from: "Those are not my shoes.", fromLang: "en", to: "वे मेरे जूते नहीं हैं।", toLang: "hi" },
            { from: "Are these good?", fromLang: "en", to: "क्या ये अच्छे हैं?", toLang: "hi" },
            { from: "These are my bags.", fromLang: "en", to: "ये मेरे बैग हैं।", toLang: "hi" },
            { from: "Are those your books?", fromLang: "en", to: "क्या वे आपकी किताबें हैं?", toLang: "hi" }
        ] },
        { id: "bonus1", opt: true, label: "Extra · Foxy's Bonus", title: "💡 Foxy's Bonus", char: "foxy", type: "info", blocks: [
          { t: "bi", style: "big", say: true, en: "Did you know?", hi: "क्या आप जानते हैं?" },
          { t: "bi", en: "Some plurals are special. They do not just add -s.", hi: "कुछ बहुवचन खास होते हैं। उनमें सिर्फ -s नहीं लगता।" },
          { t: "ex", items: [ { en: "Those are men.", hi: "वे आदमी हैं।" }, { en: "These are children.", hi: "ये बच्चे हैं।" }, { en: "Those are women.", hi: "वे औरतें हैं।" } ] },
          { t: "bi", en: "Words ending in a consonant + y change to -ies: baby → babies, city → cities.", hi: "व्यंजन + y पर खत्म होने वाले शब्दों में y की जगह -ies लगता है: baby → babies, city → cities।" },
          { t: "bi", style: "quote", say: true, en: "You will learn more about plurals later. For now, remember: These are... / Those are... is very useful!", hi: "plural के बारे में आप आगे और सीखेंगे। अभी बस याद रखिए: These are... / Those are... बहुत काम का है!" }
        ] },
        { id: "final", opt: true, label: "Extra · Say the 6 key sentences", title: "🎤 Key Sentences", char: "panda", type: "checklist",
          intro: { en: "Say these 6 sentences aloud:", hi: "इन 6 वाक्यों को ज़ोर से बोलिए:" },
          items: [ { en: "These are my pens.", hi: "ये मेरे पेन हैं।" }, { en: "Those are buses.", hi: "वे बसें हैं।" }, { en: "These are not my bags.", hi: "ये मेरे बैग नहीं हैं।" }, { en: "Those are not cars.", hi: "वे कारें नहीं हैं।" }, { en: "Are these your books?", hi: "क्या ये आपकी किताबें हैं?" }, { en: "Are those your houses?", hi: "क्या वे आपके घर हैं?" } ],
          finish: { en: "Great! You can point at many things in English.", hi: "बहुत बढ़िया! आप अंग्रेज़ी में कई चीज़ों की ओर इशारा कर सकते हैं।" } },
        /* ===== REVIEW ===== */
        { id: "assess", label: "Review · Final Check", title: "Final Check", char: "panda", type: "assess",
          items: [
            { kind: "mc", skill: "These or Those", ask: { en: "The pens are in your hand. Which sentence is best?", hi: "पेन आपके हाथ में हैं। कौन-सा वाक्य सही है?" }, options: ["Those are my pens.", "These are my pens.", "Are those my pens."], answer: 1, say: "These are my pens.", why: { en: "Near you → “these”.", hi: "पास में → “these”।" } },
            { kind: "mc", skill: "These or Those", ask: { en: "The buses are far away. Which sentence is best?", hi: "बसें दूर हैं। कौन-सा वाक्य सही है?" }, options: ["These are buses.", "Those are buses.", "Are these buses."], answer: 1, say: "Those are buses.", why: { en: "Far from you → “those”.", hi: "दूर → “those”।" } },
            { kind: "build", skill: "Word order", ask: B3_AFF, hi: "वे मेरे बैग हैं।", words: ["bags", "Those", "my", "are"], answer: "Those are my bags." },
            { kind: "mc", skill: "Negative sentences", ask: A_NEGT, prompt: "These are my pens.", options: ["These are not my pens.", "These not are my pens.", "These are my pens not."], answer: 0, say: "These are not my pens." },
            { kind: "mc", skill: "Questions", ask: A_MAKEQ, prompt: "Those are buses.", options: ["Those are buses?", "Are those buses?", "Are buses those?"], answer: 1, say: "Are those buses?" },
            { kind: "mc", skill: "Short answers", ask: A_SHORT, prompt: "Are these your phones? (Say NO)", options: ["No, they aren't.", "No, it isn't.", "No, they isn't."], answer: 0, say: "No, they aren't." },
            { kind: "mc", skill: "Fixing mistakes", spot: true, ask: A_WRONG, options: ["Those are not my bags.", "Those not are my bags.", "Are those my bags?"], answer: 1, fix: "Those are not my bags.", say: "Those are not my bags.", why: NEG3 },
            { kind: "mc", skill: "Translation", ask: T_Q, prompt: "क्या ये आपके पेन हैं?", hiPrompt: true, options: ["Are these your pens?", "Are these your pen?", "Is these your pens?"], answer: 0, say: "Are these your pens?" },
            { kind: "build", skill: "Word order", ask: B3_Q, hi: "क्या वे आपके घर हैं?", words: ["houses", "your", "Are", "those"], answer: "Are those your houses?" },
            { kind: "write", skill: "Writing your own sentences", form: "neg", ask: { en: "Write a negative sentence about things far from you.", hi: "अपने से दूर की चीज़ों के बारे में नकारात्मक वाक्य लिखिए।" }, hint: "Use “Those are not” and a plural noun with my / your (no a / an).", hintHi: "“Those are not” लगाइए और my / your के साथ कोई बहुवचन संज्ञा लगाइए (a / an नहीं)।", model: "Those are not my bags." },
            { kind: "write", skill: "Writing your own sentences", form: "q", ask: { en: "Write a question about things near you.", hi: "अपने पास की चीज़ों के बारे में एक सवाल लिखिए।" }, hint: "Start with “Are these” and use a plural noun with my / your.", hintHi: "“Are these” से शुरू कीजिए और my / your के साथ कोई बहुवचन संज्ञा लगाइए।", model: "Are these your pens?" },
            { kind: "mc", skill: "Real-life use", ask: { en: "A friend asks: “Are these your pens?” They are your pens. What do you say?", hi: "दोस्त पूछता है: “Are these your pens?” वे आपके पेन हैं। आप क्या कहेंगे?" }, options: ["Yes, they are. They are my pens.", "Yes, they aren't. They are my pens.", "No, they are. They are my pens."], answer: 0, say: "Yes, they are. They are my pens.", why: WSH3 }
        ] },
        /* ===== APPLY ===== */
        { id: "convo", label: "Apply · Real Conversation", title: "Mini Conversation", char: "panda", type: "dialogue",
          note: { en: "“sister's” means “of my sister”. my sister's shoes = मेरी बहन के जूते.", hi: "“sister's” का मतलब “बहन का/की/के” है। my sister's shoes = मेरी बहन के जूते।" }, lines: [
          { who: "panda", en: "What are these?", hi: "ये क्या हैं?" },
          { who: "polly", en: "These are books.", hi: "ये किताबें हैं।" },
          { who: "panda", en: "Are these your books?", hi: "क्या ये आपकी किताबें हैं?" },
          { who: "polly", en: "Yes, they are. These are my books.", hi: "हाँ, ये मेरी किताबें हैं।" },
          { who: "panda", en: "Are those your shoes?", hi: "क्या वे आपके जूते हैं?" },
          { who: "polly", en: "No, they aren't. Those are my sister's shoes.", hi: "नहीं। वे मेरी बहन के जूते हैं।" }
        ] },
        { id: "task", label: "Apply · Your Speaking Task", title: "🎤 Use It in Real Life", char: "panda", type: "task",
          intro: { en: "Look around you. Say your own sentences about many things near you and far from you.", hi: "अपने आस-पास देखिए। पास की और दूर की कई चीज़ों के बारे में अपने खुद के वाक्य बोलिए।" },
          note: { en: "Pick things you can count, like pens, bags, books, chairs, trees or buses. Say each sentence aloud, then tap its button. PleasantLearn cannot hear you, so listen to yourself carefully.", hi: "गिनी जा सकने वाली चीज़ें चुनिए, जैसे पेन, बैग, किताबें, कुर्सियाँ, पेड़ या बसें। हर वाक्य ज़ोर से बोलिए, फिर उसका बटन दबाइए। PleasantLearn आपकी आवाज़ नहीं सुन सकता, इसलिए खुद ध्यान से सुनिए।" },
          items: [
            { tag: "These (near)", count: 2, frame: "These are my ____. / These are ____.", ask: { en: "Touch two or more things near you. Say 2 sentences with “These are…”.", hi: "पास की दो या ज़्यादा चीज़ों को छूकर “These are…” से 2 वाक्य बोलिए।" }, ex: [ { en: "These are my pens.", hi: "ये मेरे पेन हैं।" }, { en: "These are chairs.", hi: "ये कुर्सियाँ हैं।" } ] },
            { tag: "Those (far)", count: 2, frame: "Those are ____. / Those are my ____.", ask: { en: "Point at things far away. Say 2 sentences with “Those are…”.", hi: "दूर की चीज़ों की ओर इशारा करके “Those are…” से 2 वाक्य बोलिए।" }, ex: [ { en: "Those are trees.", hi: "वे पेड़ हैं।" }, { en: "Those are my shoes.", hi: "वे मेरे जूते हैं।" } ] },
            { tag: "Negative", count: 2, frame: "These are not my ____. / Those aren't ____.", ask: { en: "Say 2 sentences with “not”.", hi: "“not” से 2 वाक्य बोलिए।" }, ex: [ { en: "These are not my bags.", hi: "ये मेरे बैग नहीं हैं।" }, { en: "Those aren't buses.", hi: "वे बसें नहीं हैं।" } ] },
            { tag: "Question", count: 2, frame: "Are these your ____? / Are those ____?", ask: { en: "Ask 2 questions.", hi: "2 सवाल पूछिए।" }, ex: [ { en: "Are these your books?", hi: "क्या ये आपकी किताबें हैं?" }, { en: "Are those cars?", hi: "क्या वे कारें हैं?" } ] },
            { tag: "Short answer", count: 2, frame: "Yes, they are. / No, they aren't.", ask: { en: "Answer your own questions.", hi: "अपने ही सवालों का जवाब दीजिए।" }, ex: [ { en: "Yes, they are.", hi: "हाँ, ये हैं।" }, { en: "No, they aren't.", hi: "नहीं, ये नहीं हैं।" } ] }
          ] },
        { id: "complete", label: "Day Completion", title: "Day Completion", char: "panda", type: "complete",
          achievements: ["These are… (near) and Those are… (far)", "Plural nouns: pens, books, buses", "Statements, “no” sentences and questions", "Short answers with “they”", "Contraction: aren't", "Hindi ↔ English meaning", "Listening and speaking practice"],
          remember: [
            { t: "form", name: "Affirmative · statement · सामान्य वाक्य", cls: "c-blue", pattern: "These / Those are + ...", example: "Those are my shoes." },
            { t: "form", name: "Negative · “no” sentence · नकारात्मक वाक्य", cls: "c-red", pattern: "These / Those are + not + ...", example: "These are not my pens." },
            { t: "form", name: "Interrogative · Yes/No question · सवाल", cls: "c-yellow", pattern: "Are + these / those + ...?", example: "Are those buses?" },
            { t: "bi", style: "quote", en: "Short answers: Yes, they are. · No, they aren't.", hi: "छोटे उत्तर: हाँ, ये हैं। · नहीं, ये नहीं हैं।" },
            { t: "bi", style: "quote", en: "Keep practising: say 3 sentences aloud every day.", hi: "रोज़ अभ्यास कीजिए: हर दिन 3 वाक्य ज़ोर से बोलिए।" }
          ],
          farewell: { en: "See you in Day 4!", hi: "अगले दिन मिलते हैं!" } }
      ]
    }
  );
})();
