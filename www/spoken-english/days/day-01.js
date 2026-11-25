/* Day 1 — content only. See days/_template.js for the structure. */
(function () {
  "use strict";
  /* Day 1 uses only the shared phrases in js/phrases.js */

  LW.course.days.push(
{
      day: 1, title: "“It is…” — Your First English Sentence Pattern",
      /* Where "Review: <skill>" buttons in the Final Check send the learner, and the rule shown for each sentence type. */
      skillSteps: { "Three forms": "compare", "Word order": "p2", "Negative sentences": "p6", "Questions": "p4", "Short answers": "p11", "Fixing mistakes": "p10", "Translation": "p3", "Writing your own sentences": "wr", "Real-life use": "convo" },
      tagWhy: { Affirmative: ORDER, Negative: NEG, Question: QW },
      outcome: "By the end of Day 1 you can understand and use simple sentences like It is easy. It is not hot. Is it my book? You will also practise short answers and speak your own sentences.",
      sections: [
        /* ===== UNDERSTAND ===== */
        { id: "goal", label: "Welcome · Today's Goal", title: "Welcome to Day 1!", char: "panda", type: "info", blocks: [
          { t: "bi", style: "big", say: true, en: "Welcome to Day 1!", hi: "Day 1 में आपका स्वागत है!" },
          { t: "bi", en: "Today you will learn one very useful English pattern: “It is…”.", hi: "आज आप अंग्रेज़ी का एक बहुत उपयोगी pattern सीखेंगे: “It is…”।" },
          { t: "h", text: "Three simple forms · तीन आसान रूप" },
          { t: "form", name: "Say it · बोलिए", cls: "c-blue", pattern: "It is + ...", example: "It is good." },
          { t: "form", name: "Say “no” · “नहीं” बोलिए", cls: "c-red", pattern: "It is + not + ...", example: "It is not good." },
          { t: "form", name: "Ask · पूछिए", cls: "c-yellow", pattern: "Is + it + ...?", example: "Is it good?" },
          { t: "bi", en: "Teacher words: Affirmative = a normal statement · Negative = a “no” sentence · Interrogative = a Yes/No question.", hi: "सामान्य वाक्य = Affirmative · “नहीं” वाला वाक्य = Negative · हाँ/नहीं वाला सवाल = Interrogative" },
          { t: "h", text: "Today's path · आज का रास्ता" },
          { t: "lines", items: ["1. Learn the pattern · पैटर्न सीखिए", "2. Listen and practise · सुनिए और अभ्यास कीजिए", "3. Speak aloud · ज़ोर से बोलिए", "4. Take a short check · छोटी जाँच दीजिए", "5. Use it in real life · असल ज़िंदगी में इस्तेमाल कीजिए"] },
          { t: "bi", style: "quote", say: true, en: "Are you ready? Let's learn English!", hi: "क्या आप तैयार हैं? चलिए अंग्रेज़ी सीखते हैं!" }
        ] },
        /* ===== WARM-UP: write naming words from memory (Help button gives a word list) ===== */
        { id: "words", label: "Warm-up · Naming Words", title: "Name 10 Things", char: "panda", type: "words", kind: "noun", need: 10, pass: 6,
          intro: { en: "In this lesson you will use naming words, the names of things. For example: apple, mango, pen, book, mobile, table, cat, dog.", hi: "इस पाठ में आप चीज़ों के नाम वाले शब्दों का इस्तेमाल करेंगे। जैसे: apple, mango, pen, book, mobile, table, cat, dog।" },
          examples: [ ["apple", "सेब", "🍎"], ["mango", "आम", "🥭"], ["pen", "पेन", "🖊️"], ["book", "किताब", "📖"], ["mobile", "मोबाइल", "📱"], ["table", "मेज़", "🪑"], ["cat", "बिल्ली", "🐈"], ["dog", "कुत्ता", "🐕"] ],
          helpGroups: ["school", "home", "fruits", "food", "animals", "clothes", "kitchen", "vehicles"] },
        { id: "pattern", label: "Learn · The Pattern", title: "Meet the Pattern", char: "panda", type: "info", blocks: [
          { t: "pattern", en: "IT IS...", hi: "यह ... है" },
          { t: "cat", cls: "c-blue", name: "“it” = यह / वह", en: "“it” means one thing or one situation.", hi: "“it” का मतलब एक चीज़ या एक स्थिति है।" },
          { t: "cat", cls: "c-green", name: "“is” = है", en: "“is” joins “it” to the word after it.", hi: "“is” “it” को अगले शब्द से जोड़ता है।" },
          { t: "bi", style: "quote", say: true, en: "We use “it” for a thing we are already talking about. “What is this?” — “It is a book.”", hi: "जिस चीज़ के बारे में बात हो रही हो, उसके लिए हम “it” लगाते हैं। “What is this?” — “It is a book.”" },
          { t: "bi", style: "quote", say: true, en: "“It is” is a very common way to start a simple English sentence.", hi: "“It is” एक बहुत सामान्य तरीका है जिससे हम एक सरल अंग्रेज़ी वाक्य शुरू कर सकते हैं।" }
        ] },
        /* ===== LEARN ===== */
        { id: "examples", label: "Learn · A. Say it", title: "A. Say it: It is…", char: "panda", type: "examples", items: [
          { en: "It is easy.", hi: "यह आसान है।" }, { en: "It is difficult.", hi: "यह मुश्किल है।" },
          { en: "It is good.", hi: "यह अच्छा है।" }, { en: "It is bad.", hi: "यह खराब है।" },
          { en: "It is hot.", hi: "गर्मी है।" }, { en: "It is cold.", hi: "ठंड है।" },
          { en: "It is a book.", hi: "यह एक किताब है।" }, { en: "It is an apple.", hi: "यह एक सेब है।" },
          { en: "It is my phone.", hi: "यह मेरा फ़ोन है।" }, { en: "It is my bag.", hi: "यह मेरा बैग है।" }
        ] },
        { id: "aan", label: "Learn · a or an?", title: "a or an?", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "“a” and “an” both mean one. We use them before one thing: a book, an apple.", hi: "“a” और “an” दोनों का मतलब “एक” है। हम इन्हें एक चीज़ से पहले लगाते हैं: a book, an apple।" },
          { t: "cat", cls: "c-blue", name: "a + other sounds", en: "It is a book.", hi: "यह एक किताब है।" },
          { t: "cat", cls: "c-green", name: "an + a vowel sound (like a, e, i, o, u)", en: "It is an apple.", hi: "यह एक सेब है।" },
          { t: "bi", en: "Listen to the first SOUND of the word, not just the letter.", hi: "शब्द की पहली आवाज़ सुनिए, सिर्फ अक्षर नहीं।" },
          { t: "bi", en: "Careful: “a university” (it starts with a “y” sound) and “an hour” (the “h” is silent).", hi: "ध्यान दीजिए: “a university” (शुरू में “y” की आवाज़) और “an hour” (“h” की आवाज़ नहीं आती)।" },
          { t: "ex", items: [ { en: "It is an egg.", hi: "यह एक अंडा है।" }, { en: "It is a bag.", hi: "यह एक बैग है।" } ] }
        ] },
        { id: "neg", label: "Learn · B. Say “no”", title: "B. Say “no”: It is not…", char: "panda", type: "examples",
          pre: [ { t: "pattern", en: "IT IS NOT...", hi: "यह ... नहीं है" },
                 { t: "bi", style: "quote", say: true, en: "To say “no”, put “not” after “is”.", hi: "“नहीं” कहने के लिए “is” के बाद “not” लगाइए।" } ],
          items: [
          { en: "It is not easy.", hi: "यह आसान नहीं है।" }, { en: "It is not difficult.", hi: "यह मुश्किल नहीं है।" },
          { en: "It is not good.", hi: "यह अच्छा नहीं है।" }, { en: "It is not hot.", hi: "गर्मी नहीं है।" },
          { en: "It is not cold.", hi: "ठंड नहीं है।" }, { en: "It is not a book.", hi: "यह किताब नहीं है।" },
          { en: "It is not my phone.", hi: "यह मेरा फ़ोन नहीं है।" }
        ] },
        { id: "ques", label: "Learn · C. Ask", title: "C. Ask: Is it…?", char: "panda", type: "examples",
          pre: [ { t: "pattern", en: "IS IT...?", hi: "क्या यह ... है?" },
                 { t: "bi", style: "quote", say: true, en: "To ask a Yes/No question, put “Is” first.", hi: "“हाँ/नहीं” वाला सवाल पूछने के लिए “Is” को पहले रखिए।" },
                 { t: "bi", en: "A Yes/No question can be answered with Yes or No. Questions that begin with What, Where or Who come later.", hi: "हाँ/नहीं वाले सवाल का उत्तर “हाँ” या “नहीं” हो सकता है। What, Where, Who से शुरू होने वाले सवाल आगे सीखेंगे।" } ],
          items: [
          { en: "Is it easy?", hi: "क्या यह आसान है?" }, { en: "Is it difficult?", hi: "क्या यह मुश्किल है?" },
          { en: "Is it good?", hi: "क्या यह अच्छा है?" }, { en: "Is it hot?", hi: "क्या गर्मी है?" },
          { en: "Is it cold?", hi: "क्या ठंड है?" }, { en: "Is it a book?", hi: "क्या यह एक किताब है?" },
          { en: "Is it your phone?", hi: "क्या यह आपका फ़ोन है?" }
        ] },
        { id: "short", label: "Learn · Short Answers", title: "Short Answers", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "Is it good?", hi: "क्या यह अच्छा है?" },
          { t: "cat", cls: "c-green", name: "Yes", en: "Yes, it is.", hi: "हाँ, यह है।" },
          { t: "cat", cls: "c-red", name: "No", en: "No, it isn't.", hi: "नहीं, यह नहीं है।" },
          { t: "bi", en: "Also correct: “No, it's not.”", hi: "यह भी सही है: “No, it's not.”" },
          { t: "bi", style: "quote", en: "Remember: say “Yes, it is.” Do not say “Yes, it's.”", hi: "याद रखिए: “Yes, it is.” कहिए। “Yes, it's.” नहीं।" }
        ] },
        /* ===== COMPARE ===== */
        { id: "compare", label: "Compare · Three Forms", title: "Compare the Three Forms", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", en: "Look at what changes in each form.", hi: "देखिए हर रूप में क्या बदलता है।" },
          { t: "h", text: "good · अच्छा" },
          { t: "compare", rows: [ { label: "Affirmative", cls: "c-blue", en: "It is good.", hi: "यह अच्छा है।" }, { label: "Negative", cls: "c-red", en: "It is not good.", hi: "यह अच्छा नहीं है।", mark: "not" }, { label: "Question", cls: "c-yellow", en: "Is it good?", hi: "क्या यह अच्छा है?", mark: "Is" } ] },
          { t: "h", text: "hot · गर्मी / गर्म" },
          { t: "compare", rows: [ { label: "Affirmative", cls: "c-blue", en: "It is hot.", hi: "गर्मी है।" }, { label: "Negative", cls: "c-red", en: "It is not hot.", hi: "गर्मी नहीं है।", mark: "not" }, { label: "Question", cls: "c-yellow", en: "Is it hot?", hi: "क्या गर्मी है?", mark: "Is" } ] },
          { t: "h", text: "a book · एक किताब" },
          { t: "compare", rows: [ { label: "Affirmative", cls: "c-blue", en: "It is a book.", hi: "यह एक किताब है।" }, { label: "Negative", cls: "c-red", en: "It is not a book.", hi: "यह किताब नहीं है।", mark: "not" }, { label: "Question", cls: "c-yellow", en: "Is it a book?", hi: "क्या यह एक किताब है?", mark: "Is" } ] }
        ] },
        { id: "natural", label: "Compare · Sound Natural", title: "Speaking Naturally", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "When we speak, we often join two words. This is called a contraction.", hi: "बोलते समय हम अक्सर दो शब्दों को जोड़ देते हैं। इसे contraction कहते हैं।" },
          { t: "cat", cls: "c-blue", name: "it is → it's", en: "It's my phone.", hi: "यह मेरा फ़ोन है।" },
          { t: "cat", cls: "c-red", name: "is not → isn't", en: "It isn't good.", hi: "यह अच्छा नहीं है।" },
          { t: "cat", cls: "c-red", name: "Also correct: it's not", en: "It's not good.", hi: "यह अच्छा नहीं है।" },
          { t: "bi", style: "quote", say: true, en: "Short “Yes” answers stay full: Yes, it is.", hi: "छोटे “Yes” उत्तर में “it is” पूरा बोलते हैं: Yes, it is." },
          { t: "h", text: "Say it clearly · साफ़ बोलिए" },
          { t: "pron", word: "is", sound: "इज़" }, { t: "pron", word: "isn't", sound: "इज़्-न्ट" }, { t: "pron", word: "it's", sound: "इट्स" },
          { t: "pron", word: "book", sound: "बुक" }, { t: "pron", word: "difficult", sound: "डिफ़िकल्ट" },
          { t: "bi", style: "quote", en: "Tip: in a question, your voice goes up a little at the end ↗", hi: "सवाल के अंत में आवाज़ थोड़ी ऊपर जाती है ↗" }
        ] },
        /* ===== LISTEN ===== */
        { id: "l1", label: "Listen · Hear It", title: "Listen & Choose", char: "polly", type: "quiz", skill: "Listening", autoListen: true,
          intro: { en: "Listen to the sentence. The text is hidden — use your ears!", hi: "वाक्य सुनिए। लिखा हुआ वाक्य छिपा है — ध्यान से सुनिए!" }, ask: A_LISTEN, why: W_MIX, items: [
            { listen: "It is not good.", options: ["It is good.", "It is not good.", "Is it good?"], answer: 1 },
            { listen: "Is it a book?", options: ["It is a book.", "Is it a book?", "It is not a book."], answer: 1 },
            { listen: "It is my phone.", options: ["It is my bag.", "It is my phone.", "Is it my phone?"], answer: 1 },
            { listen: "It is not hot.", options: ["It is hot.", "Is it hot?", "It is not hot."], answer: 2 },
            { listen: "Is it your bag?", options: ["Is it your bag?", "It is your bag.", "It is not your bag."], answer: 0 }
        ] },
        /* ===== PRACTISE (easy → harder) ===== */
        { id: "p1", label: "Practise · 1 Recognise", title: "Choose the Correct Sentence", char: "polly", type: "quiz", skill: "Recognising correct sentences",
          intro: { en: "Choose the correct sentence.", hi: "सही वाक्य चुनिए।" }, ask: A_SENT, why: IS, items: [
            { visual: "🥶", word: "cold", options: ["It are cold.", "It is cold.", "It am cold."], answer: 1, say: "It is cold." },
            { visual: "📕", word: "book", options: ["It is a book.", "It are book.", "It am a book."], answer: 0, say: "It is a book." },
            { visual: "🍎", word: "apple", options: ["It is an apple.", "It is a apple.", "It are an apple."], answer: 0, say: "It is an apple.", why: AAN },
            { ask: A_NEG, options: ["It are not good.", "It is not good.", "It not is good."], answer: 1, say: "It is not good.", why: NEG },
            { ask: A_NEG, options: ["It is not hot.", "It not is hot.", "It are not hot."], answer: 0, say: "It is not hot.", why: NEG },
            { ask: A_NEG, options: ["It is my not phone.", "It am not my phone.", "It is not my phone."], answer: 2, say: "It is not my phone.", why: NEG },
            { ask: A_Q, options: ["Is it good?", "It is good?", "Is good it?"], answer: 0, say: "Is it good?", why: QW },
            { ask: A_Q, options: ["Is it a book?", "It a book is?", "Are it a book?"], answer: 0, say: "Is it a book?", why: QW },
            { ask: A_Q, options: ["Is my it pen?", "It is my pen?", "Is it my pen?"], answer: 2, say: "Is it my pen?", why: QW }
        ] },
        { id: "p2", label: "Practise · 2 Word order", title: "Build the Sentence", char: "polly", type: "builder", skill: "Word order",
          intro: { en: "Tap the words in the correct order. Your answer is checked when you have used all the words.", hi: "शब्दों को सही क्रम में टैप कीजिए। सारे शब्द लगाते ही आपका उत्तर जाँचा जाएगा।" }, items: [
            { tag: "Affirmative", ask: B_AFF, words: ["easy", "is", "It"], answer: "It is easy." },
            { tag: "Affirmative", ask: B_AFF, words: ["a", "book", "is", "It"], answer: "It is a book." },
            { tag: "Affirmative", ask: B_AFF, words: ["my", "phone", "is", "It"], answer: "It is my phone." },
            { tag: "Negative", ask: B_NEG, words: ["not", "good", "is", "It"], answer: "It is not good." },
            { tag: "Negative", ask: B_NEG, words: ["not", "a", "book", "is", "It"], answer: "It is not a book." },
            { tag: "Negative", ask: B_NEG, words: ["my", "not", "bag", "is", "It"], answer: "It is not my bag." },
            { tag: "Question", ask: B_Q, words: ["it", "good", "Is"], answer: "Is it good?" },
            { tag: "Question", ask: B_Q, words: ["a", "it", "book", "Is"], answer: "Is it a book?" },
            { tag: "Question", ask: B_Q, words: ["my", "it", "phone", "Is"], answer: "Is it my phone?" }
        ] },
        { id: "p6", label: "Practise · 4 Make it negative", title: "Say “No”: add not", char: "polly", type: "transform", skill: "Negative sentences",
          intro: { en: "Make the sentence negative.", hi: "वाक्य को नकारात्मक बनाइए।" }, arrow: "add not after is", promptLang: "en",
          pairs: [ { from: "It is good.", to: "It is not good." }, { from: "It is a book.", to: "It is not a book." } ],
          note: { en: "Look: “not” comes after “is”.", hi: "देखिए: “not”, “is” के बाद आता है।" }, ask: A_NEGT, why: NEG, items: [
            { prompt: "It is easy.", options: ["It is not easy.", "It not is easy.", "It are not easy."], answer: 0, say: "It is not easy." },
            { prompt: "It is cold.", options: ["It is cold not.", "It is not cold.", "Is it not cold."], answer: 1, say: "It is not cold." },
            { prompt: "It is my bag.", options: ["It is not my bag.", "It not my bag is.", "It is my not bag."], answer: 0, say: "It is not my bag." },
            { prompt: "It is a chair.", options: ["It not a chair is.", "It is not a chair.", "It are not a chair."], answer: 1, say: "It is not a chair." }
        ] },
        { id: "p4", label: "Practise · 5 Make a question", title: "Statement → Question", char: "polly", type: "transform", skill: "Questions",
          intro: { en: "Make the sentence a question.", hi: "वाक्य को सवाल बनाइए।" }, promptLang: "en",
          pairs: [ { from: "It is good.", to: "Is it good?" }, { from: "It is a book.", to: "Is it a book?" } ],
          note: { en: "Look: “is” moves before “it”.", hi: "देखिए: “is”, “it” से पहले आ जाता है।" }, ask: A_MAKEQ, why: QW, items: [
            { prompt: "It is hot.", options: ["Is it hot?", "It is hot?", "Is hot it?"], answer: 0, say: "Is it hot?" },
            { prompt: "It is my phone.", options: ["Is it my phone?", "It is my phone?", "Is my phone it?"], answer: 0, say: "Is it my phone?" },
            { prompt: "It is a chair.", options: ["Is it a chair?", "It a chair is?", "Are it a chair?"], answer: 0, say: "Is it a chair?" }
        ] },
        { id: "p11", label: "Practise · 6 Answer", title: "Yes, it is. / No, it isn't.", char: "polly", type: "quiz", skill: "Short answers",
          intro: { en: "Read the question. Choose the correct short answer.", hi: "सवाल पढ़िए। सही छोटा उत्तर चुनिए।" }, ask: A_SHORT, why: W_SHORT, promptLang: "en", items: [
            { prompt: "Is it good? (Say YES)", options: ["Yes, it is.", "Yes, it isn't.", "No, it is."], answer: 0, say: "Yes, it is." },
            { prompt: "Is it hot? (Say NO)", options: ["No, it is.", "No, it isn't.", "No, it are."], answer: 1, say: "No, it isn't." },
            { prompt: "Is it your book? (Say YES)", options: ["Yes, it are.", "Yes, it is.", "Yes, it isn't."], answer: 1, say: "Yes, it is." },
            { prompt: "Is it easy? (Say NO)", options: ["No, it isn't.", "No, it aren't.", "No, I isn't."], answer: 0, say: "No, it isn't." }
        ] },
        { id: "p10", label: "Practise · 7 Fix the mistake", title: "Find the Mistake", char: "foxy", type: "quiz", skill: "Fixing mistakes", spot: true,
          intro: { en: "Two sentences are correct. One has a mistake. Find it!", hi: "दो वाक्य सही हैं। एक में गलती है। उसे ढूँढिए!" }, ask: A_WRONG, why: W_WRONG, items: [
            { options: ["It is cold.", "It are cold.", "It is a book."], answer: 1, fix: "It is cold.", say: "It is cold.", why: IS },
            { options: ["Is it good?", "It is not good.", "It not is good."], answer: 2, fix: "It is not good.", say: "It is not good.", why: NEG },
            { options: ["Is it a chair?", "It is good?", "It is my bag."], answer: 1, fix: "Is it good?", say: "Is it good?", why: QW },
            { options: ["It is not my phone.", "It is not easy.", "It not my book is."], answer: 2, fix: "It is not my book.", say: "It is not my book.", why: NEG },
            { options: ["Is it hot?", "Is it your book?", "Are it easy?"], answer: 2, fix: "Is it easy?", say: "Is it easy?", why: { en: "Ask with “Is it…?”, not “Are it…?”.", hi: "“Is it…?” से पूछिए, “Are it…?” से नहीं।" } }
        ] },
        { id: "p3", label: "Practise · 8 Hindi → English", title: "Hindi → English", char: "polly", type: "quiz", skill: "Translation (Hindi → English)",
          intro: { en: "Translate into English.", hi: "अंग्रेज़ी में अनुवाद कीजिए।" }, ask: T_AFF, why: ORDER, items: [
            { prompt: "यह आसान है।", hiPrompt: true, options: ["It is easy.", "It easy is.", "It are easy."], answer: 0, say: "It is easy." },
            { prompt: "यह मेरी किताब है।", hiPrompt: true, options: ["It is my book.", "It my book is.", "It are my book."], answer: 0, say: "It is my book." },
            { prompt: "ठंड है।", hiPrompt: true, options: ["It is cold.", "It cold is.", "It are cold."], answer: 0, say: "It is cold." },
            { ask: T_NEG, prompt: "यह आसान नहीं है।", hiPrompt: true, options: ["It is not easy.", "It not easy is.", "It are not easy."], answer: 0, say: "It is not easy.", why: NEG },
            { ask: T_Q, prompt: "क्या यह आसान है?", hiPrompt: true, options: ["Is it easy?", "It is easy?", "Is easy it?"], answer: 0, say: "Is it easy?", why: QW },
            { ask: T_NEG, prompt: "यह मेरी किताब नहीं है।", hiPrompt: true, options: ["It is not my book.", "It not my book is.", "It are not my book."], answer: 0, say: "It is not my book.", why: NEG },
            { ask: T_Q, prompt: "क्या यह आपकी किताब है?", hiPrompt: true, options: ["Is it your book?", "It is your book?", "Is your book it?"], answer: 0, say: "Is it your book?", why: QW }
        ] },
        { id: "wr", label: "Practise · 9 Write your own", title: "Your Turn: Write", char: "polly", type: "write", skill: "Writing your own sentences",
          intro: { en: "Look around you. Write your own sentences.", hi: "अपने आस-पास देखिए। अपने खुद के वाक्य लिखिए।" }, items: [
            { tag: "Affirmative", form: "aff", ask: { en: "Write a sentence about something near you. Start with “It is” and use a noun (a thing).", hi: "अपने पास की किसी चीज़ के बारे में वाक्य लिखिए। “It is” से शुरू कीजिए और संज्ञा (noun) का इस्तेमाल कीजिए।" }, hint: "Pattern: It is + a / an / my + noun (pen, book, bag…).", hintHi: "पैटर्न: It is + a / an / my + संज्ञा (pen, book, bag…)।", model: "It is my pen." },
            { tag: "Negative", form: "neg", ask: { en: "Now write a negative sentence. Use “It is not” and a noun.", hi: "अब नकारात्मक वाक्य लिखिए। “It is not” और एक संज्ञा (noun) का इस्तेमाल कीजिए।" }, hint: "Pattern: It is not + a / an / my + noun.", hintHi: "पैटर्न: It is not + a / an / my + संज्ञा।", model: "It is not my bag." },
            { tag: "Question", form: "q", ask: { en: "Write a question. Start with “Is it” and use a noun.", hi: "एक सवाल लिखिए। “Is it” से शुरू कीजिए और संज्ञा (noun) का इस्तेमाल कीजिए।" }, hint: "Pattern: Is it + a / an / your + noun?", hintHi: "पैटर्न: Is it + a / an / your + संज्ञा?", model: "Is it your book?" }
        ] },
        /* ===== SPEAK ===== */
        { id: "speak", label: "Speak · Listen, Repeat, Say", title: "Speak It", char: "panda", type: "speak",
          intro: { en: "Now it's your turn. Don't just read. Speak!", hi: "अब आपकी बारी है। सिर्फ पढ़िए मत। बोलिए!" }, items: [
            { tag: "Statement", en: "It is my book.", hi: "यह मेरी किताब है।", tip: "Say “It is” smoothly. Or say “It's my book.”", tipHi: "“It is” को साथ-साथ बोलिए। या “It's my book.” बोलिए।" },
            { tag: "Statement", en: "It is an apple.", hi: "यह एक सेब है।", tip: "“an apple” — join the sounds: a-napple.", tipHi: "“an apple” — आवाज़ें जोड़िए: a-napple।" },
            { tag: "Negative", en: "It isn't my phone.", hi: "यह मेरा फ़ोन नहीं है।", tip: "isn't = इज़्-न्ट. Say it as one word.", tipHi: "isn't = इज़्-न्ट। इसे एक शब्द की तरह बोलिए।" },
            { tag: "Question", en: "Is it good?", hi: "क्या यह अच्छा है?", tip: "Let your voice go up a little at the end ↗", tipHi: "अंत में आवाज़ थोड़ी ऊपर उठाइए ↗" },
            { tag: "Short answer", en: "Yes, it is.", hi: "हाँ, यह है।", tip: "Say “Yes, it is.” Do not join it as “Yes, it's.”", tipHi: "“Yes, it is.” बोलिए। इसे “Yes, it's.” की तरह मत जोड़िए।" },
            { tag: "Short answer", en: "No, it isn't.", hi: "नहीं, यह नहीं है।" }
        ] },
        { id: "d2", label: "Speak · Change it and say it", title: "Change It and Say It", char: "panda", type: "drill",
          intro: { en: "Change the sentence as asked. Say your answer aloud. Then check.", hi: "निर्देश के अनुसार वाक्य बदलिए। अपना उत्तर ज़ोर से बोलिए। फिर जाँचिए।" }, items: [
            { ask: D_NEG, tag: "Statement → Negative", from: "It is good.", to: "It is not good." },
            { ask: D_NEG, tag: "Statement → Negative", from: "It is a book.", to: "It is not a book." },
            { ask: D_NEG, tag: "Statement → Negative", from: "It is easy.", to: "It is not easy." },
            { ask: D_Q, tag: "Statement → Question", from: "It is hot.", to: "Is it hot?" },
            { ask: D_Q, tag: "Statement → Question", from: "It is my phone.", to: "Is it my phone?" },
            { ask: D_Q, tag: "Statement → Question", from: "It is difficult.", to: "Is it difficult?" },
            { ask: D_STAT, tag: "Question → Statement", from: "Is it easy?", to: "It is easy." },
            { ask: D_STAT, tag: "Question → Statement", from: "Is it a bag?", to: "It is a bag." },
            { ask: D_STAT, tag: "Question → Statement", from: "Is it cold?", to: "It is cold." },
            { ask: D_STAT, tag: "Negative → Statement", from: "It is not my bag.", to: "It is my bag." },
            { ask: D_STAT, tag: "Negative → Statement", from: "It is not good.", to: "It is good." },
            { ask: D_STAT, tag: "Negative → Statement", from: "It is not a book.", to: "It is a book." },
            { ask: D_YES, tag: "Short answer", from: "Is it cold?", to: "Yes, it is." },
            { ask: D_NO, tag: "Short answer", from: "Is it a chair?", to: "No, it isn't." },
            { ask: D_YES, tag: "Short answer", from: "Is it your phone?", to: "Yes, it is." }
        ] },
        { id: "gate", label: "Optional Extra Practice", title: "Want More Practice?", char: "foxy", type: "gate",
          en: "Core practice done! 🎉", hi: "मुख्य अभ्यास पूरा हुआ! 🎉",
          text: { en: "The extra steps below are optional. They give more practice before your final check.", hi: "नीचे के अतिरिक्त चरण वैकल्पिक हैं। ये आपकी अंतिम जाँच से पहले और अभ्यास देते हैं।" } },
        /* ----- optional extra practice (only shown if the learner chooses it) ----- */
        { id: "explain", opt: true, label: "Extra · Three uses of “It is”", title: "Panda's Mini Explanation", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "Look! We can use “It is” in different ways.", hi: "देखिए! हम “It is” का इस्तेमाल अलग-अलग तरह से कर सकते हैं।" },
          { t: "cat", cls: "c-blue", name: "Description", en: "It is easy.", hi: "यह आसान है।" },
          { t: "cat", cls: "c-green", name: "Things", en: "It is a book.", hi: "यह एक किताब है।" },
          { t: "cat", cls: "c-yellow", name: "Conditions", en: "It is hot.", hi: "गर्मी है।" },
          { t: "bi", style: "big", say: true, en: "You don't need to memorize the rules. Learn the pattern and use it.", hi: "आपको नियम याद करने की ज़रूरत नहीं है। Pattern सीखिए और इसका इस्तेमाल कीजिए।" }
        ] },
        { id: "mistakes", opt: true, label: "Extra · Common mistakes", title: "⚠️ Watch out!", char: "foxy", type: "info", blocks: [
          { t: "fix", wrong: "It are good.", right: "It is good." },
          { t: "bi", style: "big", en: "With “it”, use “is”, not “are”.", hi: "“It” के साथ “is” का इस्तेमाल करें, “are” का नहीं।" },
          { t: "fix", wrong: "It not is good.", right: "It is not good." },
          { t: "bi", style: "big", en: "Put “not” after “is”.", hi: "“not” को “is” के बाद रखिए।" },
          { t: "fix", wrong: "It is good?", right: "Is it good?" },
          { t: "bi", style: "big", en: "For a Yes/No question, start with “Is”.", hi: "“हाँ/नहीं” वाले सवाल में “Is” से शुरू कीजिए।" }
        ] },
        { id: "fill", opt: true, label: "Extra · Complete the sentence", title: "Complete the Sentence", char: "polly", type: "quiz", skill: "Completing sentences",
          intro: { en: "Choose the missing word.", hi: "छूटा हुआ शब्द चुनिए।" }, why: IS, items: [
            { ask: A_FILL, prompt: "It ___ easy.", options: ["am", "is", "are"], answer: 1, say: "It is easy." },
            { ask: A_FILL, prompt: "It ___ my bag.", options: ["is", "are", "am"], answer: 0, say: "It is my bag." },
            { ask: A_FILL, prompt: "It ___ not good.", options: ["is", "are", "am"], answer: 0, say: "It is not good.", why: NEG },
            { ask: A_FILLQ, prompt: "___ it cold?", options: ["Is", "Are", "Am"], answer: 0, say: "Is it cold?", why: QW }
        ] },
        { id: "p5", opt: true, label: "Extra · English → Hindi", title: "Understand the Meaning", char: "polly", type: "quiz", skill: "Meaning (English → Hindi)",
          intro: { en: "Read the English sentence. Choose its Hindi meaning.", hi: "अंग्रेज़ी वाक्य पढ़िए। उसका हिंदी अर्थ चुनिए।" }, ask: A_MEAN, why: W_MEAN, optLang: "hi", promptLang: "en", items: [
            { prompt: "It is easy.", options: ["यह आसान है।", "यह आसान नहीं है।", "क्या यह आसान है?"], answer: 0, say: "It is easy." },
            { prompt: "It is not hot.", options: ["गर्मी है।", "गर्मी नहीं है।", "क्या गर्मी है?"], answer: 1, say: "It is not hot." },
            { prompt: "Is it cold?", options: ["ठंड नहीं है।", "ठंड है।", "क्या ठंड है?"], answer: 2, say: "Is it cold?" },
            { prompt: "It is my phone.", options: ["यह मेरा फ़ोन नहीं है।", "यह मेरा फ़ोन है।", "क्या यह मेरा फ़ोन है?"], answer: 1, say: "It is my phone." },
            { prompt: "It is not a book.", options: ["यह किताब नहीं है।", "क्या यह एक किताब है?", "यह एक किताब है।"], answer: 0, say: "It is not a book." },
            { prompt: "Is it your bag?", options: ["यह आपका बैग है।", "क्या यह आपका बैग है?", "यह आपका बैग नहीं है।"], answer: 1, say: "Is it your bag?" }
        ] },
        { id: "p12", opt: true, label: "Extra · Build from Hindi", title: "Hindi → Build the Sentence", char: "polly", type: "builder", skill: "Word order (from Hindi)",
          intro: { en: "Read the Hindi. Tap the English words in the correct order.", hi: "हिंदी पढ़िए। अंग्रेज़ी शब्दों को सही क्रम में टैप कीजिए।" }, ask: A_BUILDHI, items: [
            { tag: "Affirmative", hi: "यह मेरा फ़ोन है।", words: ["phone", "It", "my", "is"], answer: "It is my phone." },
            { tag: "Negative", hi: "यह आसान नहीं है।", words: ["easy", "not", "It", "is"], answer: "It is not easy." },
            { tag: "Question", hi: "क्या यह आपकी किताब है?", words: ["your", "it", "book", "Is"], answer: "Is it your book?" },
            { tag: "Negative", hi: "यह मेरा बैग नहीं है।", words: ["bag", "my", "is", "It", "not"], answer: "It is not my bag." },
            { tag: "Question", hi: "क्या ठंड है?", words: ["cold", "Is", "it"], answer: "Is it cold?" }
        ] },
        { id: "d1", opt: true, label: "Extra · Speak Hindi → English", title: "Say It in English", char: "panda", type: "drill",
          intro: { en: "Hear the Hindi. Say the English sentence aloud. Then check.", hi: "हिंदी सुनिए। अंग्रेज़ी वाक्य ज़ोर से बोलिए। फिर जाँचिए।" }, ask: D_SAYEN, items: [
            { tag: "Affirmative", from: "यह आसान है।", fromLang: "hi", to: "It is easy." },
            { tag: "Negative", from: "यह मेरी किताब नहीं है।", fromLang: "hi", to: "It is not my book." },
            { tag: "Question", from: "क्या यह आपका फ़ोन है?", fromLang: "hi", to: "Is it your phone?" },
            { tag: "Negative", from: "गर्मी नहीं है।", fromLang: "hi", to: "It is not hot." },
            { tag: "Question", from: "क्या ठंड है?", fromLang: "hi", to: "Is it cold?" },
            { tag: "Affirmative", from: "यह एक किताब है।", fromLang: "hi", to: "It is a book." }
        ] },
        { id: "p7", opt: true, label: "Extra · Remove “not”", title: "Negative → Statement", char: "polly", type: "transform", skill: "Negative → statement",
          intro: { en: "Take out “not” to make a normal sentence.", hi: "“not” हटाकर सामान्य वाक्य बनाइए।" }, arrow: "remove not", promptLang: "en",
          pairs: [ { from: "It is not good.", to: "It is good." }, { from: "It is not my phone.", to: "It is my phone." } ],
          note: { en: "Look: take “not” out.", hi: "देखिए: “not” हटा दीजिए।" }, ask: A_POS, why: W_POS, items: [
            { prompt: "It is not hot.", options: ["It is hot.", "It not is hot.", "It is hot not."], answer: 0, say: "It is hot." },
            { prompt: "It is not difficult.", options: ["It are difficult.", "It is difficult.", "Is it difficult."], answer: 1, say: "It is difficult." },
            { prompt: "It is not my book.", options: ["It my book is.", "It is my book.", "It is not book."], answer: 1, say: "It is my book." },
            { prompt: "It is not a bag.", options: ["It is a bag.", "It a bag is.", "It are a bag."], answer: 0, say: "It is a bag." }
        ] },
        { id: "p8", opt: true, label: "Extra · Question → Statement", title: "Question → Statement", char: "polly", type: "transform", skill: "Question → statement",
          intro: { en: "Turn the question back into a statement.", hi: "सवाल को वापस सामान्य वाक्य बनाइए।" }, arrow: "is moves after it", promptLang: "en",
          pairs: [ { from: "Is it good?", to: "It is good." }, { from: "Is it a book?", to: "It is a book." } ],
          note: { en: "Look: “is” goes back after “it”.", hi: "देखिए: “is”, “it” के बाद वापस आ जाता है।" }, ask: A_QSTAT, why: W_QSTAT, items: [
            { prompt: "Is it easy?", options: ["It is easy.", "Is it easy.", "It easy is."], answer: 0, say: "It is easy." },
            { prompt: "Is it my phone?", options: ["It my phone is.", "It is my phone.", "Is my phone it."], answer: 1, say: "It is my phone." },
            { prompt: "Is it cold?", options: ["It is cold.", "It are cold.", "Is cold it."], answer: 0, say: "It is cold." },
            { prompt: "Is it your bag?", options: ["Is it your bag.", "It your bag is.", "It is your bag."], answer: 2, say: "It is your bag." }
        ] },
        { id: "p9", opt: true, label: "Extra · Mix & Transform", title: "Mix & Transform", char: "foxy", type: "quiz", skill: "Mixed transformations",
          intro: { en: "Different tasks. Read each instruction carefully!", hi: "अलग-अलग काम। हर निर्देश ध्यान से पढ़िए!" }, why: W_MIX, promptLang: "en", items: [
            { ask: A_NEGQ, prompt: "It is not easy.", options: ["Is it easy?", "It is not easy?", "Is easy it?"], answer: 0, say: "Is it easy?" },
            { ask: A_QNEG, prompt: "Is it good?", options: ["It is not good.", "It not is good.", "Is it not good."], answer: 0, say: "It is not good." },
            { ask: A_QNEG, prompt: "Is it a book?", options: ["Is it not a book?", "It is not a book.", "It not a book is."], answer: 1, say: "It is not a book." },
            { ask: A_NEGQ, prompt: "It is not my phone.", options: ["It is my phone?", "Is my phone it?", "Is it my phone?"], answer: 2, say: "Is it my phone?" },
            { ask: A_NEGT, prompt: "It is hot.", options: ["It is not hot.", "Is it hot?", "It not hot is."], answer: 0, say: "It is not hot." },
            { ask: A_QSTAT, prompt: "Is it cold?", options: ["It is cold.", "Is it cold.", "It are cold."], answer: 0, say: "It is cold." }
        ] },
        { id: "l2", opt: true, label: "Extra · Listen हिंदी ↔ English", title: "Listen & Understand", char: "polly", type: "quiz", skill: "Listening (Hindi ↔ English)",
          intro: { en: "Listen in Hindi or English. Choose the matching sentence.", hi: "हिंदी या अंग्रेज़ी में सुनिए। सही वाक्य चुनिए।" }, ask: A_LISTENM, why: W_MEAN, items: [
            { listen: "यह मेरा बैग नहीं है।", listenLang: "hi", options: ["It is not my bag.", "It is my bag.", "Is it my bag?"], answer: 0, say: "It is not my bag." },
            { listen: "क्या यह आसान है?", listenLang: "hi", options: ["It is easy.", "Is it easy?", "It is not easy."], answer: 1, say: "Is it easy?" },
            { listen: "गर्मी है।", listenLang: "hi", options: ["It is not hot.", "Is it hot?", "It is hot."], answer: 2, say: "It is hot." },
            { listen: "It is not easy.", optLang: "hi", options: ["यह आसान नहीं है।", "यह आसान है।", "क्या यह आसान है?"], answer: 0 },
            { listen: "Is it cold?", optLang: "hi", options: ["ठंड नहीं है।", "क्या ठंड है?", "ठंड है।"], answer: 1 },
            { listen: "It is my book.", optLang: "hi", options: ["यह मेरी किताब नहीं है।", "क्या यह मेरी किताब है?", "यह मेरी किताब है।"], answer: 2 }
        ] },
        { id: "quick", opt: true, label: "Extra · Quick Translation", title: "Quick Challenge", char: "foxy", type: "quiz", skill: "Translation (more practice)",
          intro: { en: "Ready for the challenge?", hi: "क्या आप चैलेंज के लिए तैयार हैं?" }, why: IS, items: [
            { ask: T_NEG, prompt: "यह मेरी किताब नहीं है।", hiPrompt: true, options: ["It is not my book.", "It not my book is.", "It are not my book."], answer: 0, say: "It is not my book.", why: NEG },
            { ask: T_Q, prompt: "क्या यह आपका बैग है?", hiPrompt: true, options: ["Is it your bag?", "It is your bag?", "Is your bag it?"], answer: 0, say: "Is it your bag?", why: QW },
            { ask: T_AFF, prompt: "यह एक कुर्सी है।", hiPrompt: true, options: ["It is a chair.", "It are a chair.", "It chair is."], answer: 0, say: "It is a chair.", why: ORDER }
        ] },
        { id: "d3", opt: true, label: "Extra · Speak English → Hindi", title: "Say the Hindi Meaning", char: "panda", type: "drill",
          intro: { en: "Hear the English. Say the Hindi meaning aloud. Then check.", hi: "अंग्रेज़ी सुनिए। हिंदी अर्थ ज़ोर से बोलिए। फिर जाँचिए।" }, ask: D_SAYHI, items: [
            { from: "It is difficult.", fromLang: "en", to: "यह मुश्किल है।", toLang: "hi" },
            { from: "It is not cold.", fromLang: "en", to: "ठंड नहीं है।", toLang: "hi" },
            { from: "Is it good?", fromLang: "en", to: "क्या यह अच्छा है?", toLang: "hi" },
            { from: "It is my bag.", fromLang: "en", to: "यह मेरा बैग है।", toLang: "hi" },
            { from: "Is it your book?", fromLang: "en", to: "क्या यह आपकी किताब है?", toLang: "hi" }
        ] },
        { id: "bonus1", opt: true, label: "Extra · Foxy's Bonus", title: "💡 Foxy's Bonus", char: "foxy", type: "info", blocks: [
          { t: "bi", style: "big", say: true, en: "Did you know?", hi: "क्या आप जानते हैं?" },
          { t: "bi", en: "In English, “it” is often used for things, situations, weather, time and conditions.", hi: "अंग्रेज़ी में “it” का इस्तेमाल चीज़ों, मौसम, समय और हालात के बारे में बात करने के लिए अक्सर किया जाता है।" },
          { t: "ex", items: [ { en: "It is hot.", hi: "गर्मी है।" }, { en: "It is late.", hi: "देर हो गई है।" }, { en: "It is Monday.", hi: "आज सोमवार है।" } ] },
          { t: "bi", style: "quote", say: true, en: "You will learn more about “it” later. For now, remember: It is... is very useful!", hi: "“it” के बारे में आप आगे और सीखेंगे। अभी बस याद रखिए: It is... बहुत काम का है!" }
        ] },
        { id: "final", opt: true, label: "Extra · Say the 6 key sentences", title: "🎤 Key Sentences", char: "panda", type: "checklist",
          intro: { en: "Say these 6 sentences aloud:", hi: "इन 6 वाक्यों को ज़ोर से बोलिए:" },
          items: [ { en: "It is easy.", hi: "यह आसान है।" }, { en: "It is not difficult.", hi: "यह मुश्किल नहीं है।" }, { en: "It is good.", hi: "यह अच्छा है।" }, { en: "Is it good?", hi: "क्या यह अच्छा है?" }, { en: "It is my book.", hi: "यह मेरी किताब है।" }, { en: "Is it your book?", hi: "क्या यह आपकी किताब है?" } ],
          finish: { en: "Great! You have learned your first sentence pattern.", hi: "बहुत बढ़िया! आपने अपना पहला sentence pattern सीख लिया है।" } },
        /* ===== REVIEW ===== */
        { id: "assess", label: "Review · Final Check", title: "Final Check", char: "panda", type: "assess",
          items: [
            { kind: "mc", skill: "Three forms", ask: { en: "Which sentence is a question?", hi: "कौन-सा वाक्य सवाल है?" }, options: ["It is a book.", "Is it a book?", "It is not a book."], answer: 1, say: "Is it a book?" },
            { kind: "build", skill: "Word order", ask: B_AFF, hi: "यह मेरा फ़ोन है।", words: ["phone", "It", "my", "is"], answer: "It is my phone." },
            { kind: "mc", skill: "Negative sentences", ask: A_NEGT, prompt: "It is hot.", options: ["It is not hot.", "It not is hot.", "It is hot not."], answer: 0, say: "It is not hot." },
            { kind: "mc", skill: "Questions", ask: A_MAKEQ, prompt: "It is easy.", options: ["It is easy?", "Is it easy?", "Is easy it?"], answer: 1, say: "Is it easy?" },
            { kind: "mc", skill: "Short answers", ask: A_SHORT, prompt: "Is it your book? (Say YES)", options: ["Yes, it isn't.", "Yes, it is.", "Yes, it are."], answer: 1, say: "Yes, it is." },
            { kind: "mc", skill: "Fixing mistakes", spot: true, ask: A_WRONG, options: ["It is not good.", "It not is good.", "Is it good?"], answer: 1, fix: "It is not good.", say: "It is not good.", why: NEG },
            { kind: "mc", skill: "Translation", ask: T_NEG, prompt: "यह मेरी किताब नहीं है।", hiPrompt: true, options: ["It is not my book.", "It not my book is.", "It are not my book."], answer: 0, say: "It is not my book." },
            { kind: "build", skill: "Word order", ask: B_Q, hi: "क्या यह आपका बैग है?", words: ["bag", "your", "Is", "it"], answer: "Is it your bag?" },
            { kind: "write", skill: "Writing your own sentences", form: "q", ask: { en: "Write a question about something near you.", hi: "अपने पास की किसी चीज़ के बारे में एक सवाल लिखिए।" }, hint: "Start with “Is it” and use a noun with a / an / your.", hintHi: "“Is it” से शुरू कीजिए और a / an / your के साथ कोई संज्ञा लगाइए।", model: "Is it your pen?" },
            { kind: "write", skill: "Writing your own sentences", form: "neg", ask: { en: "Write a negative sentence about something near you.", hi: "अपने पास की किसी चीज़ के बारे में नकारात्मक वाक्य लिखिए।" }, hint: "Use “It is not” and a noun with a / an / my.", hintHi: "“It is not” लगाइए और a / an / my के साथ कोई संज्ञा लगाइए।", model: "It is not my bag." },
            { kind: "mc", skill: "Real-life use", ask: { en: "A friend points at a bag and asks: “Is it a book?” What do you say?", hi: "दोस्त बैग की ओर इशारा करके पूछता है: “Is it a book?” आप क्या कहेंगे?" }, options: ["No, it isn't. It is a bag.", "Yes, it isn't. It is a bag.", "No, it is. It is a bag."], answer: 0, say: "No, it isn't. It is a bag.", why: { en: "Say “No, it isn't.” when the answer is no. Then add the real answer.", hi: "जवाब “नहीं” हो तो “No, it isn't.” कहिए। फिर सही जवाब जोड़िए।" } }
        ] },
        /* ===== APPLY ===== */
        { id: "convo", label: "Apply · Real Conversation", title: "Mini Conversation", char: "panda", type: "dialogue",
          note: { en: "New word form: “brother's” means “of my brother”. my brother's phone = मेरे भाई का फ़ोन.", hi: "नया रूप: “brother's” का मतलब “भाई का” है। my brother's phone = मेरे भाई का फ़ोन।" }, lines: [
          { who: "panda", en: "What is this?", hi: "यह क्या है?" },
          { who: "polly", en: "It is a book.", hi: "यह एक किताब है।" },
          { who: "panda", en: "Is it your book?", hi: "क्या यह आपकी किताब है?" },
          { who: "polly", en: "Yes, it is. It is my book.", hi: "हाँ, यह मेरी किताब है।" },
          { who: "panda", en: "Is it your phone?", hi: "क्या यह आपका फ़ोन है?" },
          { who: "polly", en: "No, it isn't. It's my brother's phone.", hi: "नहीं। यह मेरे भाई का फ़ोन है।" }
        ] },
        { id: "task", label: "Apply · Your Speaking Task", title: "🎤 Use It in Real Life", char: "panda", type: "task",
          intro: { en: "Look around you. Say your own sentences about things near you.", hi: "अपने आस-पास देखिए। अपने पास की चीज़ों के बारे में अपने खुद के वाक्य बोलिए।" },
          note: { en: "Pick things like a phone, bag, book, chair or bottle. Say each sentence aloud, then tap its button. PleasantLearn cannot hear you, so listen to yourself carefully.", hi: "फ़ोन, बैग, किताब, कुर्सी या बोतल जैसी चीज़ें चुनिए। हर वाक्य ज़ोर से बोलिए, फिर उसका बटन दबाइए। PleasantLearn आपकी आवाज़ नहीं सुन सकता, इसलिए खुद ध्यान से सुनिए।" },
          items: [
            { tag: "Statement", count: 2, frame: "It is my ____. / It is a ____.", ask: { en: "Say 2 sentences with “It is…”.", hi: "“It is…” से 2 वाक्य बोलिए।" }, ex: [ { en: "It is my phone.", hi: "यह मेरा फ़ोन है।" }, { en: "It is a chair.", hi: "यह एक कुर्सी है।" } ] },
            { tag: "Negative", count: 2, frame: "It is not my ____. / It isn't a ____.", ask: { en: "Say 2 sentences with “It is not…”.", hi: "“It is not…” से 2 वाक्य बोलिए।" }, ex: [ { en: "It is not my bag.", hi: "यह मेरा बैग नहीं है।" }, { en: "It isn't a book.", hi: "यह किताब नहीं है।" } ] },
            { tag: "Question", count: 2, frame: "Is it your ____? / Is it ____?", ask: { en: "Ask 2 questions with “Is it…?”.", hi: "“Is it…?” से 2 सवाल पूछिए।" }, ex: [ { en: "Is it your book?", hi: "क्या यह आपकी किताब है?" }, { en: "Is it cold?", hi: "क्या ठंड है?" } ] },
            { tag: "Short answer", count: 2, frame: "Yes, it is. / No, it isn't.", ask: { en: "Answer your own questions.", hi: "अपने ही सवालों का जवाब दीजिए।" }, ex: [ { en: "Yes, it is.", hi: "हाँ, यह है।" }, { en: "No, it isn't.", hi: "नहीं, यह नहीं है।" } ] }
          ] },
        { id: "complete", label: "Day Completion", title: "Day Completion", char: "panda", type: "complete",
          achievements: ["The pattern “It is…”", "Statements, “no” sentences and questions", "Short answers", "a / an", "a / an", "Contractions: it's, isn't", "Hindi ↔ English meaning", "Listening and speaking practice"],
          remember: [
            { t: "form", name: "Affirmative · statement · सामान्य वाक्य", cls: "c-blue", pattern: "It is + ...", example: "It is good." },
            { t: "form", name: "Negative · “no” sentence · नकारात्मक वाक्य", cls: "c-red", pattern: "It is + not + ...", example: "It is not good." },
            { t: "form", name: "Interrogative · Yes/No question · सवाल", cls: "c-yellow", pattern: "Is + it + ...?", example: "Is it good?" },
            { t: "bi", style: "quote", en: "Short answers: Yes, it is. · No, it isn't.", hi: "छोटे उत्तर: हाँ, यह है। · नहीं, यह नहीं है।" },
            { t: "bi", style: "quote", en: "Keep practising: say 3 sentences aloud every day.", hi: "रोज़ अभ्यास कीजिए: हर दिन 3 वाक्य ज़ोर से बोलिए।" }
          ],
          farewell: { en: "See you in Day 2!", hi: "अगले दिन मिलते हैं!" } }
      ]
    }
  );
})();
