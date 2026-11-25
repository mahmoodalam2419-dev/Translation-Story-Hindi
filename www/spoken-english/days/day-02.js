/* Day 2 — content only. See days/_template.js for the structure. */
(function () {
  "use strict";
  /* ---- Day 2 rule texts (this / that + is) ---- */
  var TIS = { en: "With “this” and “that”, use “is”.", hi: "“this” और “that” के साथ “is” आता है।" };
  var NEG2 = { en: "Put “not” after “is”: This is not my pen.", hi: "“is” के बाद “not” आता है: This is not my pen." };
  var QW2 = { en: "For a Yes/No question, start with “Is”: Is this your pen?", hi: "“हाँ/नहीं” वाले सवाल में “Is” पहले आता है: Is this your pen?" };
  var WSH2 = { en: "We usually answer with “it”: Yes, it is. · No, it isn't.", hi: "उत्तर में आमतौर पर “it” आता है: Yes, it is. · No, it isn't." };

  LW.course.days.push(
{
      day: 2, title: "“This is… / That is…” — Pointing at Things",
      skillSteps: { "This or That": "pattern", "Three forms": "compare", "Word order": "p2", "Negative sentences": "p6", "Questions": "p4", "Short answers": "p11", "Fixing mistakes": "p10", "Translation": "p3", "Writing your own sentences": "wr", "Real-life use": "convo" },
      tagWhy: { Affirmative: TIS, Negative: NEG2, Question: QW2 },
      write: { subs: ["this", "that"], contr: ["that"], isMsg: TIS,
        msg: { aff: { en: "Start with “This is” or “That is” and add a noun. Example: This is my pen.", hi: "“This is” या “That is” से शुरू कीजिए और एक संज्ञा (noun) जोड़िए। जैसे: This is my pen." },
               neg: { en: "Use “This is not” or “That is not” and add a noun. Example: That is not my bag.", hi: "“This is not” या “That is not” लगाइए और एक संज्ञा (noun) जोड़िए। जैसे: That is not my bag." },
               q: { en: "Start with “Is this” or “Is that” and add a noun. Example: Is that your school?", hi: "“Is this” या “Is that” से शुरू कीजिए और एक संज्ञा (noun) जोड़िए। जैसे: Is that your school?" } } },
      outcome: "By the end of Day 2 you can point at things near you and far from you: This is my pen. That is not my bag. Is that a bus? You will also practise short answers and speak your own sentences.",
      sections: [
        { id: "goal", label: "Welcome · Today's Goal", title: "Welcome to Day 2!", char: "panda", type: "info", blocks: [
          { t: "bi", style: "big", say: true, en: "Welcome to Day 2!", hi: "Day 2 में आपका स्वागत है!" },
          { t: "bi", en: "Today you will learn to point at things: “This is…” and “That is…”.", hi: "आज आप चीज़ों की ओर इशारा करना सीखेंगे: “This is…” और “That is…”।" },
          { t: "h", text: "Three simple forms · तीन आसान रूप" },
          { t: "form", name: "Say it · बोलिए", cls: "c-blue", pattern: "This / That is + ...", example: "This is my pen." },
          { t: "form", name: "Say “no” · “नहीं” बोलिए", cls: "c-red", pattern: "This / That is + not + ...", example: "That is not my bag." },
          { t: "form", name: "Ask · पूछिए", cls: "c-yellow", pattern: "Is + this / that + ...?", example: "Is that a bus?" },
          { t: "h", text: "Today's path · आज का रास्ता" },
          { t: "lines", items: ["1. Learn this and that · this और that सीखिए", "2. Listen and practise · सुनिए और अभ्यास कीजिए", "3. Speak aloud · ज़ोर से बोलिए", "4. Take a short check · छोटी जाँच दीजिए", "5. Use it in real life · असल ज़िंदगी में इस्तेमाल कीजिए"] },
          { t: "bi", style: "quote", say: true, en: "Ready? Let's point and speak!", hi: "तैयार हैं? चलिए इशारा करें और बोलें!" }
        ] },
      {"id": "words", "label": "Warm-up · Things to Point At", "title": "Name 10 Things to Point At", "char": "panda", "type": "words", "kind": "noun", "need": 10, "pass": 6, "intro": {"en": "Today you will point at things with “this” and “that”. First, find the names of things near you and far from you. For example: pen, bag, bus, tree, car, house, school, chair.", "hi": "आज आप “this” और “that” से चीज़ों की ओर इशारा करेंगे। पहले अपने पास और दूर की चीज़ों के नाम खोजिए। जैसे: pen, bag, bus, tree, car, house, school, chair।"}, "examples": [["pen", "पेन", "🖊️"], ["bag", "बैग", "🎒"], ["bus", "बस", "🚌"], ["tree", "पेड़", "🌳"], ["car", "कार", "🚗"], ["house", "घर", "🏠"], ["school", "स्कूल", "🏫"], ["chair", "कुर्सी", "🪑"]], "helpGroups": ["school", "home", "vehicles", "trees", "places", "clothes", "kitchen", "nature"], "ask": {"en": "Look near you and far from you. Write at least 10 names of things in English.", "hi": "अपने पास और दूर देखिए। अंग्रेज़ी में कम से कम 10 चीज़ों के नाम लिखिए।"}},
        { id: "pattern", label: "Learn · This or That?", title: "This or That?", char: "panda", type: "info", blocks: [
          { t: "pattern", en: "THIS IS... / THAT IS...", hi: "यह ... है / वह ... है" },
          { t: "cat", cls: "c-blue", name: "THIS = near you", en: "This is my pen.", hi: "यह मेरा पेन है।" },
          { t: "cat", cls: "c-yellow", name: "THAT = far from you", en: "That is a bus.", hi: "वह एक बस है।" },
          { t: "bi", style: "quote", say: true, en: "Near? Say “this”. Far? Say “that”.", hi: "पास में? “this” बोलिए। दूर? “that” बोलिए।" }
        ] },
        { id: "examples", label: "Learn · A. This is", title: "A. Near you: This is…", char: "panda", type: "examples", items: [
          { en: "This is a pen.", hi: "यह एक पेन है।" }, { en: "This is my bag.", hi: "यह मेरा बैग है।" }, { en: "This is an apple.", hi: "यह एक सेब है।" },
          { en: "This is my phone.", hi: "यह मेरा फ़ोन है।" }, { en: "This is a chair.", hi: "यह एक कुर्सी है।" }, { en: "This is my book.", hi: "यह मेरी किताब है।" }, { en: "This is easy.", hi: "यह आसान है।" }
        ] },
        { id: "that", label: "Learn · B. That is", title: "B. Far from you: That is…", char: "panda", type: "examples", items: [
          { en: "That is a bus.", hi: "वह एक बस है।" }, { en: "That is my school.", hi: "वह मेरा स्कूल है।" }, { en: "That is a tree.", hi: "वह एक पेड़ है।" },
          { en: "That is your bag.", hi: "वह आपका बैग है।" }, { en: "That is a car.", hi: "वह एक कार है।" }, { en: "That is my house.", hi: "वह मेरा घर है।" }, { en: "That is good.", hi: "वह अच्छा है।" }
        ] },
        { id: "neg", label: "Learn · C. Say “no”", title: "C. Say “no”: This is not…", char: "panda", type: "examples",
          pre: [ { t: "pattern", en: "THIS / THAT IS NOT...", hi: "यह / वह ... नहीं है" },
                 { t: "bi", style: "quote", say: true, en: "To say “no”, put “not” after “is”.", hi: "“नहीं” कहने के लिए “is” के बाद “not” लगाइए।" } ],
          items: [
          { en: "This is not my pen.", hi: "यह मेरा पेन नहीं है।" }, { en: "This is not a book.", hi: "यह किताब नहीं है।" }, { en: "That is not my bag.", hi: "वह मेरा बैग नहीं है।" },
          { en: "That is not your phone.", hi: "वह आपका फ़ोन नहीं है।" }, { en: "That is not a car.", hi: "वह कार नहीं है।" }, { en: "This isn't my chair.", hi: "यह मेरी कुर्सी नहीं है।" }
        ] },
        { id: "ques", label: "Learn · D. Ask", title: "D. Ask: Is this…? Is that…?", char: "panda", type: "examples",
          pre: [ { t: "pattern", en: "IS THIS...? / IS THAT...?", hi: "क्या यह ... है? / क्या वह ... है?" },
                 { t: "bi", style: "quote", say: true, en: "To ask a Yes/No question, put “Is” first.", hi: "“हाँ/नहीं” वाला सवाल पूछने के लिए “Is” को पहले रखिए।" } ],
          items: [
          { en: "Is this your pen?", hi: "क्या यह आपका पेन है?" }, { en: "Is this a book?", hi: "क्या यह एक किताब है?" }, { en: "Is that your bag?", hi: "क्या वह आपका बैग है?" },
          { en: "Is that a bus?", hi: "क्या वह एक बस है?" }, { en: "Is this my phone?", hi: "क्या यह मेरा फ़ोन है?" }, { en: "Is that your house?", hi: "क्या वह आपका घर है?" }
        ] },
        { id: "short", label: "Learn · Short Answers", title: "Short Answers", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "Is this your pen?", hi: "क्या यह आपका पेन है?" },
          { t: "cat", cls: "c-green", name: "Yes", en: "Yes, it is.", hi: "हाँ, यह है।" },
          { t: "cat", cls: "c-red", name: "No", en: "No, it isn't.", hi: "नहीं, यह नहीं है।" },
          { t: "bi", style: "quote", en: "In a short answer we usually say “it”, even when the question has “this” or “that”.", hi: "छोटे उत्तर में हम आमतौर पर “it” कहते हैं, चाहे सवाल में “this” या “that” हो।" },
          { t: "bi", en: "Remember: say “Yes, it is.” Do not say “Yes, it's.”", hi: "याद रखिए: “Yes, it is.” कहिए। “Yes, it's.” नहीं।" }
        ] },
        { id: "compare", label: "Compare · Three Forms", title: "Compare the Three Forms", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", en: "Look at what changes in each form.", hi: "देखिए हर रूप में क्या बदलता है।" },
          { t: "h", text: "my pen · मेरा पेन (near)" },
          { t: "compare", rows: [ { label: "Affirmative", cls: "c-blue", en: "This is my pen.", hi: "यह मेरा पेन है।" }, { label: "Negative", cls: "c-red", en: "This is not my pen.", hi: "यह मेरा पेन नहीं है।", mark: "not" }, { label: "Question", cls: "c-yellow", en: "Is this my pen?", hi: "क्या यह मेरा पेन है?", mark: "Is" } ] },
          { t: "h", text: "a bus · एक बस (far)" },
          { t: "compare", rows: [ { label: "Affirmative", cls: "c-blue", en: "That is a bus.", hi: "वह एक बस है।" }, { label: "Negative", cls: "c-red", en: "That is not a bus.", hi: "वह बस नहीं है।", mark: "not" }, { label: "Question", cls: "c-yellow", en: "Is that a bus?", hi: "क्या वह एक बस है?", mark: "Is" } ] }
        ] },
        { id: "natural", label: "Compare · Sound Natural", title: "Speaking Naturally", char: "panda", type: "info", blocks: [
          { t: "bi", style: "quote", say: true, en: "When we speak, we often join two words. This is called a contraction.", hi: "बोलते समय हम अक्सर दो शब्दों को जोड़ देते हैं। इसे contraction कहते हैं।" },
          { t: "cat", cls: "c-blue", name: "that is → that's", en: "That's my school.", hi: "वह मेरा स्कूल है।" },
          { t: "cat", cls: "c-red", name: "is not → isn't", en: "This isn't my pen.", hi: "यह मेरा पेन नहीं है।" },
          { t: "cat", cls: "c-red", name: "Also correct: that's not", en: "That's not my bag.", hi: "वह मेरा बैग नहीं है।" },
          { t: "bi", style: "quote", say: true, en: "We do not shorten “this is”. Say: This is my pen.", hi: "“this is” को छोटा नहीं करते। बोलिए: This is my pen." },
          { t: "h", text: "Say it clearly · साफ़ बोलिए" },
          { t: "pron", word: "this", sound: "दिस" }, { t: "pron", word: "that", sound: "दैट" }, { t: "pron", word: "that's", sound: "दैट्स" }, { t: "pron", word: "isn't", sound: "इज़्-न्ट" }, { t: "pron", word: "school", sound: "स्कूल" },
          { t: "bi", style: "quote", en: "Tip: for “th”, touch your tongue lightly to your front teeth.", hi: "“th” बोलते समय जीभ को आगे के दाँतों से हल्का छुआइए।" }
        ] },
        { id: "l1", label: "Listen · Hear It", title: "Listen & Choose", char: "polly", type: "quiz", skill: "Listening", autoListen: true,
          intro: { en: "Listen to the sentence. The text is hidden — use your ears!", hi: "वाक्य सुनिए। लिखा हुआ वाक्य छिपा है — ध्यान से सुनिए!" }, ask: A_LISTEN, why: W_MIX, items: [
            { listen: "That is a bus.", options: ["This is a bus.", "That is a bus.", "Is that a bus?"], answer: 1 },
            { listen: "Is this your book?", options: ["Is that your book?", "This is your book.", "Is this your book?"], answer: 2 },
            { listen: "This is not my bag.", options: ["This is my bag.", "This is not my bag.", "That is not my bag."], answer: 1 },
            { listen: "That isn't my phone.", options: ["That isn't my phone.", "That is my phone.", "Is that my phone?"], answer: 0 },
            { listen: "Is that your school?", options: ["Is this your school?", "That is your school.", "Is that your school?"], answer: 2 }
        ] },
        { id: "p1", label: "Practise · 1 Recognise", title: "Choose the Correct Sentence", char: "polly", type: "quiz", skill: "Recognising correct sentences",
          intro: { en: "Choose the correct sentence.", hi: "सही वाक्य चुनिए।" }, ask: A_SENT, why: TIS, items: [
            { ask: { en: "The pen is in your hand. Choose the best sentence.", hi: "पेन आपके हाथ में है। सबसे सही वाक्य चुनिए।" }, options: ["That is my pen.", "This is my pen.", "Is that my pen."], answer: 1, say: "This is my pen.", why: { en: "Near you → “this”.", hi: "पास में → “this”।" } },
            { ask: { en: "The bus is far away. Choose the best sentence.", hi: "बस दूर है। सबसे सही वाक्य चुनिए।" }, options: ["This is a bus.", "That is a bus.", "Is this a bus."], answer: 1, say: "That is a bus.", why: { en: "Far from you → “that”.", hi: "दूर → “that”।" } },
            { visual: "📕", word: "book", options: ["This is a book.", "This are a book.", "This am a book."], answer: 0, say: "This is a book." },
            { visual: "🍎", word: "apple", options: ["This is a apple.", "This is an apple.", "This are an apple."], answer: 1, say: "This is an apple.", why: AAN },
            { ask: A_NEG, options: ["This is not my pen.", "This not is my pen.", "This are not my pen."], answer: 0, say: "This is not my pen.", why: NEG2 },
            { ask: A_NEG, options: ["That is my not bag.", "That is not my bag.", "That not is my bag."], answer: 1, say: "That is not my bag.", why: NEG2 },
            { ask: A_Q, options: ["Is this your pen?", "This is your pen?", "Is your this pen?"], answer: 0, say: "Is this your pen?", why: QW2 },
            { ask: A_Q, options: ["Are that a bus?", "Is that a bus?", "That is a bus?"], answer: 1, say: "Is that a bus?", why: QW2 }
        ] },
        { id: "p2", label: "Practise · 2 Word order", title: "Build the Sentence", char: "polly", type: "builder", skill: "Word order",
          intro: { en: "Tap the words in the correct order. Your answer is checked when you have used all the words.", hi: "शब्दों को सही क्रम में टैप कीजिए। सारे शब्द लगाते ही आपका उत्तर जाँचा जाएगा।" }, items: [
            { tag: "Affirmative", ask: B_AFF, words: ["pen", "a", "is", "This"], answer: "This is a pen." },
            { tag: "Affirmative", ask: B_AFF, words: ["my", "is", "That", "bag"], answer: "That is my bag." },
            { tag: "Affirmative", ask: B_AFF, words: ["school", "is", "That", "my"], answer: "That is my school." },
            { tag: "Negative", ask: B_NEG, words: ["not", "my", "is", "This", "pen"], answer: "This is not my pen." },
            { tag: "Negative", ask: B_NEG, words: ["not", "is", "a", "That", "bus"], answer: "That is not a bus." },
            { tag: "Question", ask: B_Q, words: ["this", "Is", "pen", "your"], answer: "Is this your pen?" },
            { tag: "Question", ask: B_Q, words: ["that", "Is", "a", "bus"], answer: "Is that a bus?" },
            { tag: "Question", ask: B_Q, words: ["that", "Is", "school", "your"], answer: "Is that your school?" }
        ] },
        { id: "p6", label: "Practise · 3 Make it negative", title: "Say “No”: add not", char: "polly", type: "transform", skill: "Negative sentences",
          intro: { en: "Make the sentence negative.", hi: "वाक्य को नकारात्मक बनाइए।" }, arrow: "add not after is", promptLang: "en",
          pairs: [ { from: "This is a pen.", to: "This is not a pen." }, { from: "That is my bag.", to: "That is not my bag." } ],
          note: { en: "Look: “not” comes after “is”.", hi: "देखिए: “not”, “is” के बाद आता है।" }, ask: A_NEGT, why: NEG2, items: [
            { prompt: "This is my phone.", options: ["This is not my phone.", "This not is my phone.", "This are not my phone."], answer: 0, say: "This is not my phone." },
            { prompt: "That is a car.", options: ["That is a not car.", "That is not a car.", "That not a car is."], answer: 1, say: "That is not a car." },
            { prompt: "This is easy.", options: ["This is not easy.", "This is easy not.", "Is this not easy."], answer: 0, say: "This is not easy." },
            { prompt: "That is my school.", options: ["That not is my school.", "That is my not school.", "That is not my school."], answer: 2, say: "That is not my school." }
        ] },
        { id: "p4", label: "Practise · 4 Make a question", title: "Statement → Question", char: "polly", type: "transform", skill: "Questions",
          intro: { en: "Make the sentence a question.", hi: "वाक्य को सवाल बनाइए।" }, promptLang: "en",
          pairs: [ { from: "This is my pen.", to: "Is this my pen?" }, { from: "That is a bus.", to: "Is that a bus?" } ],
          note: { en: "Look: “is” moves before “this” or “that”.", hi: "देखिए: “is”, “this” या “that” से पहले आ जाता है।" }, ask: A_MAKEQ, why: QW2, items: [
            { prompt: "This is a book.", options: ["Is this a book?", "This is a book?", "Is a book this?"], answer: 0, say: "Is this a book?" },
            { prompt: "That is your bag.", options: ["Is your bag that?", "Is that your bag?", "That is your bag?"], answer: 1, say: "Is that your bag?" },
            { prompt: "This is my phone.", options: ["Is this my phone?", "Are this my phone?", "This my phone is?"], answer: 0, say: "Is this my phone?" },
            { prompt: "That is a chair.", options: ["That is a chair?", "Is that a chair?", "Is a chair that?"], answer: 1, say: "Is that a chair?" }
        ] },
        { id: "p11", label: "Practise · 5 Answer", title: "Yes, it is. / No, it isn't.", char: "polly", type: "quiz", skill: "Short answers",
          intro: { en: "Read the question. Choose the correct short answer.", hi: "सवाल पढ़िए। सही छोटा उत्तर चुनिए।" }, ask: A_SHORT, why: WSH2, promptLang: "en", items: [
            { prompt: "Is this your pen? (Say YES)", options: ["Yes, it is.", "Yes, it isn't.", "No, it is."], answer: 0, say: "Yes, it is." },
            { prompt: "Is that a bus? (Say NO)", options: ["No, it is.", "No, it isn't.", "No, it are."], answer: 1, say: "No, it isn't." },
            { prompt: "Is that your bag? (Say YES)", options: ["Yes, it are.", "Yes, it isn't.", "Yes, it is."], answer: 2, say: "Yes, it is." },
            { prompt: "Is this a book? (Say NO)", options: ["No, it isn't.", "No, it aren't.", "No, I isn't."], answer: 0, say: "No, it isn't." }
        ] },
        { id: "p10", label: "Practise · 6 Fix the mistake", title: "Find the Mistake", char: "foxy", type: "quiz", skill: "Fixing mistakes", spot: true,
          intro: { en: "Two sentences are correct. One has a mistake. Find it!", hi: "दो वाक्य सही हैं। एक में गलती है। उसे ढूँढिए!" }, ask: A_WRONG, why: W_WRONG, items: [
            { options: ["This is a pen.", "This are a pen.", "That is a bus."], answer: 1, fix: "This is a pen.", say: "This is a pen.", why: TIS },
            { options: ["Is this your book?", "This is not my bag.", "That not is my bag."], answer: 2, fix: "That is not my bag.", say: "That is not my bag.", why: NEG2 },
            { options: ["Is that a bus?", "That is good?", "This is my pen."], answer: 1, fix: "Is that good?", say: "Is that good?", why: QW2 },
            { options: ["This is not my phone.", "That is not a car.", "This not my book is."], answer: 2, fix: "This is not my book.", say: "This is not my book.", why: NEG2 },
            { options: ["Is this a pen?", "Are that your school?", "That is my school."], answer: 1, fix: "Is that your school?", say: "Is that your school?", why: { en: "With “this” or “that”, ask with “Is”, not “Are”.", hi: "“this” या “that” के साथ “Is” से पूछिए, “Are” से नहीं।" } }
        ] },
        { id: "p3", label: "Practise · 7 Hindi → English", title: "Hindi → English", char: "polly", type: "quiz", skill: "Translation (Hindi → English)",
          intro: { en: "Translate into English.", hi: "अंग्रेज़ी में अनुवाद कीजिए।" }, ask: T_AFF, why: ORDER, items: [
            { prompt: "यह मेरी किताब है।", hiPrompt: true, options: ["This is my book.", "This my book is.", "This are my book."], answer: 0, say: "This is my book." },
            { prompt: "वह मेरा स्कूल है।", hiPrompt: true, options: ["That is my school.", "That my school is.", "That are my school."], answer: 0, say: "That is my school." },
            { prompt: "यह एक सेब है।", hiPrompt: true, options: ["This is a apple.", "This is an apple.", "This are an apple."], answer: 1, say: "This is an apple.", why: AAN },
            { ask: T_NEG, prompt: "यह मेरा पेन नहीं है।", hiPrompt: true, options: ["This is not my pen.", "This not my pen is.", "This are not my pen."], answer: 0, say: "This is not my pen.", why: NEG2 },
            { ask: T_NEG, prompt: "वह एक बस नहीं है।", hiPrompt: true, options: ["That is not a bus.", "That not a bus is.", "That are not a bus."], answer: 0, say: "That is not a bus.", why: NEG2 },
            { ask: T_Q, prompt: "क्या वह आपका घर है?", hiPrompt: true, options: ["Is that your house?", "That is your house?", "Is your house that?"], answer: 0, say: "Is that your house?", why: QW2 }
        ] },
        { id: "wr", label: "Practise · 8 Write your own", title: "Your Turn: Write", char: "polly", type: "write", skill: "Writing your own sentences",
          intro: { en: "Look around you. Write your own sentences.", hi: "अपने आस-पास देखिए। अपने खुद के वाक्य लिखिए।" }, items: [
            { tag: "Affirmative", form: "aff", ask: { en: "Look at something near you. Write a sentence with a noun. Start with “This is”.", hi: "अपने पास की किसी चीज़ को देखिए। संज्ञा (noun) के साथ वाक्य लिखिए। “This is” से शुरू कीजिए।" }, hint: "Pattern: This is + a / an / my + noun.", hintHi: "पैटर्न: This is + a / an / my + संज्ञा।", model: "This is my pen." },
            { tag: "Negative", form: "neg", ask: { en: "Look at something far from you. Write with a noun: That is not…", hi: "अपने से दूर की किसी चीज़ को देखिए। संज्ञा (noun) के साथ लिखिए: That is not…" }, hint: "Pattern: That is not + a / an / my + noun.", hintHi: "पैटर्न: That is not + a / an / my + संज्ञा।", model: "That is not my bag." },
            { tag: "Question", form: "q", ask: { en: "Write a question with a noun. Start with “Is this” or “Is that”.", hi: "संज्ञा (noun) के साथ एक सवाल लिखिए। “Is this” या “Is that” से शुरू कीजिए।" }, hint: "Pattern: Is that + a / an / your + noun?", hintHi: "पैटर्न: Is that + a / an / your + संज्ञा?", model: "Is that your school?" }
        ] },
        { id: "speak", label: "Speak · Listen, Repeat, Say", title: "Speak It", char: "panda", type: "speak",
          intro: { en: "Now it's your turn. Don't just read. Speak!", hi: "अब आपकी बारी है। सिर्फ पढ़िए मत। बोलिए!" }, items: [
            { tag: "Statement", en: "This is my pen.", hi: "यह मेरा पेन है।", tip: "For “th”, touch your tongue to your front teeth: this.", tipHi: "“th” के लिए जीभ को आगे के दाँतों से छुआइए: this।" },
            { tag: "Statement", en: "That is my school.", hi: "वह मेरा स्कूल है।", tip: "You can also say “That's my school.”", tipHi: "आप “That's my school.” भी बोल सकते हैं।" },
            { tag: "Negative", en: "This isn't my bag.", hi: "यह मेरा बैग नहीं है।", tip: "isn't = इज़्-न्ट. Say it as one word.", tipHi: "isn't = इज़्-न्ट। इसे एक शब्द की तरह बोलिए।" },
            { tag: "Question", en: "Is that your book?", hi: "क्या वह आपकी किताब है?", tip: "Let your voice go up a little at the end ↗", tipHi: "अंत में आवाज़ थोड़ी ऊपर उठाइए ↗" },
            { tag: "Short answer", en: "Yes, it is.", hi: "हाँ, यह है।", tip: "Say “it”, and say “it is” in full.", tipHi: "“it” बोलिए, और “it is” पूरा बोलिए।" },
            { tag: "Short answer", en: "No, it isn't.", hi: "नहीं, यह नहीं है।" }
        ] },
        { id: "d2", label: "Speak · Change it and say it", title: "Change It and Say It", char: "panda", type: "drill",
          intro: { en: "Change the sentence as asked. Say your answer aloud. Then check.", hi: "निर्देश के अनुसार वाक्य बदलिए। अपना उत्तर ज़ोर से बोलिए। फिर जाँचिए।" }, items: [
            { ask: D_NEG, tag: "Statement → Negative", from: "This is a pen.", to: "This is not a pen." },
            { ask: D_NEG, tag: "Statement → Negative", from: "That is my bag.", to: "That is not my bag." },
            { ask: D_Q, tag: "Statement → Question", from: "This is my phone.", to: "Is this my phone?" },
            { ask: D_Q, tag: "Statement → Question", from: "That is a bus.", to: "Is that a bus?" },
            { ask: D_STAT, tag: "Question → Statement", from: "Is this a pen?", to: "This is a pen." },
            { ask: D_STAT, tag: "Question → Statement", from: "Is that a car?", to: "That is a car." },
            { ask: D_STAT, tag: "Negative → Statement", from: "That is not my school.", to: "That is my school." },
            { ask: D_YES, tag: "Short answer", from: "Is this your pen?", to: "Yes, it is." },
            { ask: D_NO, tag: "Short answer", from: "Is that a bus?", to: "No, it isn't." }
        ] },
        { id: "gate", label: "Optional Extra Practice", title: "Want More Practice?", char: "foxy", type: "gate",
          en: "Core practice done! 🎉", hi: "मुख्य अभ्यास पूरा हुआ! 🎉",
          text: { en: "The extra steps below are optional. They give more practice before your final check.", hi: "नीचे के अतिरिक्त चरण वैकल्पिक हैं। ये आपकी अंतिम जाँच से पहले और अभ्यास देते हैं।" } },
        { id: "uses", opt: true, label: "Extra · Where we use this / that", title: "This and That: More Uses", char: "panda", type: "info", blocks: [
          { t: "cat", cls: "c-blue", name: "Things", en: "This is my phone.", hi: "यह मेरा फ़ोन है।" },
          { t: "cat", cls: "c-green", name: "Places", en: "That is my school.", hi: "वह मेरा स्कूल है।" },
          { t: "cat", cls: "c-yellow", name: "People", en: "This is my friend.", hi: "यह मेरा दोस्त है।" },
          { t: "bi", style: "quote", en: "For one person, the short answer uses “he” or “she”: Is this your friend? Yes, he is. You will learn “he” and “she” later.", hi: "एक व्यक्ति के लिए छोटे उत्तर में “he” या “she” आता है: Is this your friend? Yes, he is. “he” और “she” आप आगे सीखेंगे।" }
        ] },
        { id: "mistakes", opt: true, label: "Extra · Common mistakes", title: "⚠️ Watch out!", char: "foxy", type: "info", blocks: [
          { t: "fix", wrong: "This are my pen.", right: "This is my pen." },
          { t: "bi", style: "big", en: "With “this” and “that”, use “is”.", hi: "“this” और “that” के साथ “is” का इस्तेमाल करें।" },
          { t: "fix", wrong: "That not is my bag.", right: "That is not my bag." },
          { t: "bi", style: "big", en: "Put “not” after “is”.", hi: "“not” को “is” के बाद रखिए।" },
          { t: "fix", wrong: "That is a bus?", right: "Is that a bus?" },
          { t: "bi", style: "big", en: "For a Yes/No question, start with “Is”.", hi: "“हाँ/नहीं” वाले सवाल में “Is” से शुरू कीजिए।" }
        ] },
        { id: "fill", opt: true, label: "Extra · Complete the sentence", title: "Complete the Sentence", char: "polly", type: "quiz", skill: "Completing sentences",
          intro: { en: "Choose the missing word.", hi: "छूटा हुआ शब्द चुनिए।" }, why: TIS, items: [
          { ask: { en: "Complete the sentence.", hi: "वाक्य पूरा कीजिए।" }, prompt: "This ___ my pen.", options: ["am", "is", "are"], answer: 1, say: "This is my pen." },
          { ask: { en: "Complete the sentence.", hi: "वाक्य पूरा कीजिए।" }, prompt: "That ___ not a bus.", options: ["is", "are", "am"], answer: 0, say: "That is not a bus.", why: NEG2 },
          { ask: { en: "Complete the question.", hi: "सवाल पूरा कीजिए।" }, prompt: "___ this your book?", options: ["Is", "Are", "Am"], answer: 0, say: "Is this your book?", why: QW2 },
          { ask: { en: "Complete the question.", hi: "सवाल पूरा कीजिए।" }, prompt: "___ that your bag?", options: ["Are", "Am", "Is"], answer: 2, say: "Is that your bag?", why: QW2 },
          { ask: { en: "Complete the sentence.", hi: "वाक्य पूरा कीजिए।" }, prompt: "That is ___ apple.", options: ["a", "an", "two"], answer: 1, say: "That is an apple.", why: { en: "Use “an” before the sounds a, e, i, o, u: an apple.", hi: "a, e, i, o, u की आवाज़ से पहले “an” लगाइए: an apple।" } }] },
        { id: "p5", opt: true, label: "Extra · English → Hindi", title: "Understand the Meaning", char: "polly", type: "quiz", skill: "Meaning (English → Hindi)",
          intro: { en: "Read the English sentence. Choose its Hindi meaning.", hi: "अंग्रेज़ी वाक्य पढ़िए। उसका हिंदी अर्थ चुनिए।" }, ask: A_MEAN, why: W_MEAN, optLang: "hi", promptLang: "en", items: [
            { prompt: "This is my pen.", options: ["यह मेरा पेन है।", "यह मेरा पेन नहीं है।", "क्या यह मेरा पेन है?"], answer: 0, say: "This is my pen." },
            { prompt: "That is not a bus.", options: ["वह एक बस है।", "वह बस नहीं है।", "क्या वह एक बस है?"], answer: 1, say: "That is not a bus." },
            { prompt: "Is that your bag?", options: ["वह आपका बैग नहीं है।", "वह आपका बैग है।", "क्या वह आपका बैग है?"], answer: 2, say: "Is that your bag?" },
            { prompt: "Is this a book?", options: ["क्या यह एक किताब है?", "यह एक किताब है।", "यह किताब नहीं है।"], answer: 0, say: "Is this a book?" }
        ] },
        { id: "p12", opt: true, label: "Extra · Build from Hindi", title: "Hindi → Build the Sentence", char: "polly", type: "builder", skill: "Word order (from Hindi)",
          intro: { en: "Read the Hindi. Tap the English words in the correct order.", hi: "हिंदी पढ़िए। अंग्रेज़ी शब्दों को सही क्रम में टैप कीजिए।" }, ask: { en: "Build the English sentence from the Hindi.", hi: "हिंदी के आधार पर अंग्रेज़ी वाक्य बनाइए।" }, items: [
          { tag: "Affirmative", hi: "यह मेरा फ़ोन है।", words: ["phone", "This", "my", "is"], answer: "This is my phone." },
          { tag: "Negative", hi: "वह मेरा बैग नहीं है।", words: ["bag", "my", "is", "That", "not"], answer: "That is not my bag." },
          { tag: "Question", hi: "क्या यह आपकी किताब है?", words: ["your", "this", "book", "Is"], answer: "Is this your book?" },
          { tag: "Negative", hi: "यह कुर्सी नहीं है।", words: ["chair", "not", "a", "This", "is"], answer: "This is not a chair." },
          { tag: "Question", hi: "क्या वह बस है?", words: ["bus", "Is", "a", "that"], answer: "Is that a bus?" }] },
        { id: "d1", opt: true, label: "Extra · Speak Hindi → English", title: "Say It in English", char: "panda", type: "drill",
          intro: { en: "Hear the Hindi. Say the English sentence aloud. Then check.", hi: "हिंदी सुनिए। अंग्रेज़ी वाक्य ज़ोर से बोलिए। फिर जाँचिए।" }, ask: { en: "Say this in English.", hi: "इसे अंग्रेज़ी में बोलिए।" }, items: [
          { tag: "Affirmative", from: "यह आसान है।", fromLang: "hi", to: "This is easy." },
          { tag: "Negative", from: "वह मेरी किताब नहीं है।", fromLang: "hi", to: "That is not my book." },
          { tag: "Question", from: "क्या यह आपका फ़ोन है?", fromLang: "hi", to: "Is this your phone?" },
          { tag: "Negative", from: "यह मेरा बैग नहीं है।", fromLang: "hi", to: "This is not my bag." },
          { tag: "Question", from: "क्या वह बस है?", fromLang: "hi", to: "Is that a bus?" },
          { tag: "Affirmative", from: "यह किताब है।", fromLang: "hi", to: "This is a book." }] },
        { id: "p7", opt: true, label: "Extra · Remove “not”", title: "Negative → Statement", char: "polly", type: "transform", skill: "Negative → statement",
          intro: { en: "Take out “not” to make a normal sentence.", hi: "“not” हटाकर सामान्य वाक्य बनाइए।" }, arrow: "remove not", promptLang: "en",
          pairs: [{ from: "This is not a pen.", to: "This is a pen." }, { from: "That is not my bag.", to: "That is my bag." }],
          note: { en: "Look: take “not” out.", hi: "देखिए: “not” हटा दीजिए।" }, ask: { en: "Take out “not” to make a normal sentence.", hi: "“not” हटाकर सामान्य वाक्य बनाइए।" },
          why: { en: "Take “not” out: This is not easy → This is easy.", hi: "“not” हटाइए: This is not easy → This is easy." }, items: [
          { prompt: "This is not easy.", options: ["This is easy.", "This not is easy.", "This is easy not."], answer: 0, say: "This is easy." },
          { prompt: "That is not difficult.", options: ["That are difficult.", "That is difficult.", "Is that difficult."], answer: 1, say: "That is difficult." },
          { prompt: "This is not my book.", options: ["This my book is.", "This is my book.", "This is not book."], answer: 1, say: "This is my book." },
          { prompt: "That is not a bus.", options: ["That is a bus.", "That a bus is.", "That are a bus."], answer: 0, say: "That is a bus." }] },
        { id: "p8", opt: true, label: "Extra · Question → Statement", title: "Question → Statement", char: "polly", type: "transform", skill: "Question → statement",
          intro: { en: "Turn the question back into a statement.", hi: "सवाल को वापस सामान्य वाक्य बनाइए।" }, arrow: "is moves after this / that", promptLang: "en",
          pairs: [{ from: "Is this a pen?", to: "This is a pen." }, { from: "Is that a bus?", to: "That is a bus." }],
          note: { en: "Look: “is” goes back after “this” or “that”.", hi: "देखिए: “is”, “this” या “that” के बाद वापस आ जाता है।" }, ask: { en: "Make this question a normal sentence.", hi: "इस सवाल को सामान्य वाक्य बनाइए।" },
          why: { en: "For a normal sentence, start with “This” or “That”: Is this a pen? → This is a pen.", hi: "सामान्य वाक्य “This” या “That” से शुरू होता है: Is this a pen? → This is a pen." }, items: [
          { prompt: "Is this easy?", options: ["This is easy.", "Is this easy.", "This easy is."], answer: 0, say: "This is easy." },
          { prompt: "Is this my phone?", options: ["This my phone is.", "This is my phone.", "Is my phone this."], answer: 1, say: "This is my phone." },
          { prompt: "Is that a car?", options: ["That is a car.", "That are a car.", "Is a car that."], answer: 0, say: "That is a car." },
          { prompt: "Is that your bag?", options: ["Is that your bag.", "That your bag is.", "That is your bag."], answer: 2, say: "That is your bag." }] },
        { id: "p9", opt: true, label: "Extra · Mix & Transform", title: "Mix & Transform", char: "foxy", type: "quiz", skill: "Mixed transformations",
          intro: { en: "Different tasks. Read each instruction carefully!", hi: "अलग-अलग काम। हर निर्देश ध्यान से पढ़िए!" },
          why: { en: "Yes/No questions: “Is” goes first. “No” sentences: “not” goes after “is”.", hi: "हाँ/नहीं वाले सवाल में “Is” पहले आता है। “नहीं” वाले वाक्य में “is” के बाद “not” आता है।" }, promptLang: "en", items: [
          { ask: { en: "Turn this “no” sentence into a question.", hi: "इस “नहीं” वाले वाक्य को सवाल बनाइए।" }, prompt: "This is not easy.", options: ["Is this easy?", "This is not easy?", "Is easy this?"], answer: 0, say: "Is this easy?" },
          { ask: { en: "Turn this question into a “no” sentence.", hi: "इस सवाल को “नहीं” वाला वाक्य बनाइए।" }, prompt: "Is this a pen?", options: ["This is not a pen.", "This not is a pen.", "Is this not a pen."], answer: 0, say: "This is not a pen." },
          { ask: { en: "Turn this question into a “no” sentence.", hi: "इस सवाल को “नहीं” वाला वाक्य बनाइए।" }, prompt: "Is that a bus?", options: ["Is that not a bus?", "That is not a bus.", "That not a bus is."], answer: 1, say: "That is not a bus." },
          { ask: { en: "Turn this “no” sentence into a question.", hi: "इस “नहीं” वाले वाक्य को सवाल बनाइए।" }, prompt: "That is not my bag.", options: ["That is my bag?", "Is my bag that?", "Is that my bag?"], answer: 2, say: "Is that my bag?" },
          { ask: { en: "Make this a “no” sentence (add “not”).", hi: "इसे “नहीं” वाला वाक्य बनाइए (“not” लगाइए)।" }, prompt: "This is good.", options: ["This is not good.", "Is this good?", "This not good is."], answer: 0, say: "This is not good." },
          { ask: { en: "Make this question a normal sentence.", hi: "इस सवाल को सामान्य वाक्य बनाइए।" }, prompt: "Is that a car?", options: ["That is a car.", "Is that a car.", "That are a car."], answer: 0, say: "That is a car." }] },
        { id: "l2", opt: true, label: "Extra · Listen हिंदी ↔ English", title: "Listen & Understand", char: "polly", type: "quiz", skill: "Listening (Hindi ↔ English)",
          intro: { en: "Listen in Hindi or English. Choose the matching sentence.", hi: "हिंदी या अंग्रेज़ी में सुनिए। सही वाक्य चुनिए।" }, ask: { en: "Listen and choose the correct meaning.", hi: "सुनिए और सही अर्थ चुनिए।" },
          why: { en: "“not” means ‘नहीं’. A Yes/No question that starts with “Is” means ‘क्या…?’", hi: "“not” का मतलब ‘नहीं’ है। “Is” से शुरू होने वाला हाँ/नहीं वाला सवाल ‘क्या…?’ से शुरू होता है।" }, items: [
          { listen: "यह मेरा बैग नहीं है।", listenLang: "hi", options: ["This is not my bag.", "This is my bag.", "Is this my bag?"], answer: 0, say: "This is not my bag." },
          { listen: "क्या यह आसान है?", listenLang: "hi", options: ["This is easy.", "Is this easy?", "This is not easy."], answer: 1, say: "Is this easy?" },
          { listen: "वह कार है।", listenLang: "hi", options: ["That is not a car.", "Is that a car?", "That is a car."], answer: 2, say: "That is a car." },
          { listen: "This is not easy.", optLang: "hi", options: ["यह आसान नहीं है।", "यह आसान है।", "क्या यह आसान है?"], answer: 0 },
          { listen: "Is that a bus?", optLang: "hi", options: ["वह बस नहीं है।", "क्या वह बस है?", "वह बस है।"], answer: 1 },
          { listen: "This is my book.", optLang: "hi", options: ["यह मेरी किताब नहीं है।", "क्या यह मेरी किताब है?", "यह मेरी किताब है।"], answer: 2 }] },
        { id: "quick", opt: true, label: "Extra · Quick Translation", title: "Quick Challenge", char: "foxy", type: "quiz", skill: "Translation (more practice)",
          intro: { en: "Ready for the challenge?", hi: "क्या आप चैलेंज के लिए तैयार हैं?" }, why: TIS, items: [
          { ask: { en: "Translate into English — a negative sentence.", hi: "अंग्रेज़ी में अनुवाद कीजिए — नकारात्मक वाक्य।" }, prompt: "यह मेरी किताब नहीं है।", hiPrompt: true, options: ["This is not my book.", "This not my book is.", "This are not my book."], answer: 0, say: "This is not my book.", why: NEG2 },
          { ask: { en: "Translate into English — a question.", hi: "अंग्रेज़ी में अनुवाद कीजिए — सवाल।" }, prompt: "क्या यह आपका बैग है?", hiPrompt: true, options: ["Is this your bag?", "This is your bag?", "Is your bag this?"], answer: 0, say: "Is this your bag?", why: QW2 },
          { ask: { en: "Translate into English — a statement.", hi: "अंग्रेज़ी में अनुवाद कीजिए — सामान्य वाक्य।" }, prompt: "वह कुर्सी है।", hiPrompt: true, options: ["That is a chair.", "That are a chair.", "That chair is."], answer: 0, say: "That is a chair." },
          { ask: { en: "Translate into English — a negative sentence.", hi: "अंग्रेज़ी में अनुवाद कीजिए — नकारात्मक वाक्य।" }, prompt: "वह बस नहीं है।", hiPrompt: true, options: ["That not a bus is.", "That is not a bus.", "That is a bus not."], answer: 1, say: "That is not a bus.", why: NEG2 },
          { ask: { en: "Translate into English — a question.", hi: "अंग्रेज़ी में अनुवाद कीजिए — सवाल।" }, prompt: "क्या वह आपका घर है?", hiPrompt: true, options: ["That is your house?", "Is your house that?", "Is that your house?"], answer: 2, say: "Is that your house?", why: QW2 }] },
        { id: "d3", opt: true, label: "Extra · Speak English → Hindi", title: "Say the Hindi Meaning", char: "panda", type: "drill",
          intro: { en: "Hear the English. Say the Hindi meaning aloud. Then check.", hi: "अंग्रेज़ी सुनिए। हिंदी अर्थ ज़ोर से बोलिए। फिर जाँचिए।" }, ask: { en: "Say the Hindi meaning.", hi: "इसका हिंदी अर्थ बोलिए।" }, items: [
          { from: "This is difficult.", fromLang: "en", to: "यह मुश्किल है।", toLang: "hi" },
          { from: "That is not my shoe.", fromLang: "en", to: "वह मेरा जूता नहीं है।", toLang: "hi" },
          { from: "Is this good?", fromLang: "en", to: "क्या यह अच्छा है?", toLang: "hi" },
          { from: "This is my bag.", fromLang: "en", to: "यह मेरा बैग है।", toLang: "hi" },
          { from: "Is that your book?", fromLang: "en", to: "क्या वह आपकी किताब है?", toLang: "hi" }] },
        { id: "bonus1", opt: true, label: "Extra · Foxy's Bonus", title: "💡 Foxy's Bonus", char: "foxy", type: "info", blocks: [
          { t: "bi", style: "big", say: true, en: "Did you know?", hi: "क्या आप जानते हैं?" },
          { t: "bi", en: "To find out a name, ask: “What is this?” or “What is that?”", hi: "किसी चीज़ का नाम जानने के लिए पूछिए: “What is this?” या “What is that?”" },
          { t: "ex", items: [{ en: "What is this?", hi: "यह क्या है?" }, { en: "What is that?", hi: "वह क्या है?" }, { en: "It is a pen.", hi: "यह एक पेन है।" }] },
          { t: "bi", style: "quote", say: true, en: "You will learn more about questions later. For now, remember: This is... / That is... is very useful!", hi: "सवालों के बारे में आप आगे और सीखेंगे। अभी बस याद रखिए: This is... / That is... बहुत काम का है!" }] },
        { id: "final", opt: true, label: "Extra · Say the 6 key sentences", title: "🎤 Key Sentences", char: "panda", type: "checklist",
          intro: { en: "Say these 6 sentences aloud:", hi: "इन 6 वाक्यों को ज़ोर से बोलिए:" },
          items: [ { en: "This is my pen.", hi: "यह मेरा पेन है।" }, { en: "That is my school.", hi: "वह मेरा स्कूल है।" }, { en: "This is not my bag.", hi: "यह मेरा बैग नहीं है।" }, { en: "That is not a bus.", hi: "वह बस नहीं है।" }, { en: "Is this your book?", hi: "क्या यह आपकी किताब है?" }, { en: "Is that your house?", hi: "क्या वह आपका घर है?" } ],
          finish: { en: "Great! You can point at things in English.", hi: "बहुत बढ़िया! आप अंग्रेज़ी में चीज़ों की ओर इशारा कर सकते हैं।" } },
        { id: "assess", label: "Review · Final Check", title: "Final Check", char: "panda", type: "assess",
          items: [
            { kind: "mc", skill: "This or That", ask: { en: "The book is in your hand. Which sentence is best?", hi: "किताब आपके हाथ में है। कौन-सा वाक्य सही है?" }, options: ["That is my book.", "This is my book.", "Is that my book."], answer: 1, say: "This is my book.", why: { en: "Near you → “this”.", hi: "पास में → “this”।" } },
            { kind: "mc", skill: "This or That", ask: { en: "The bus is far away. Which sentence is best?", hi: "बस दूर है। कौन-सा वाक्य सही है?" }, options: ["This is a bus.", "That is a bus.", "Is this a bus."], answer: 1, say: "That is a bus.", why: { en: "Far from you → “that”.", hi: "दूर → “that”।" } },
            { kind: "build", skill: "Word order", ask: B_AFF, hi: "वह मेरा बैग है।", words: ["bag", "That", "my", "is"], answer: "That is my bag." },
            { kind: "mc", skill: "Negative sentences", ask: A_NEGT, prompt: "This is my pen.", options: ["This is not my pen.", "This not is my pen.", "This is my pen not."], answer: 0, say: "This is not my pen." },
            { kind: "mc", skill: "Questions", ask: A_MAKEQ, prompt: "That is a bus.", options: ["That is a bus?", "Is that a bus?", "Is a bus that?"], answer: 1, say: "Is that a bus?" },
            { kind: "mc", skill: "Short answers", ask: A_SHORT, prompt: "Is this your phone? (Say NO)", options: ["No, it isn't.", "No, it are.", "Yes, it isn't."], answer: 0, say: "No, it isn't." },
            { kind: "mc", skill: "Fixing mistakes", spot: true, ask: A_WRONG, options: ["That is not my bag.", "That not is my bag.", "Is that my bag?"], answer: 1, fix: "That is not my bag.", say: "That is not my bag.", why: NEG2 },
            { kind: "mc", skill: "Translation", ask: T_Q, prompt: "क्या यह आपका पेन है?", hiPrompt: true, options: ["Is this your pen?", "This is your pen?", "Is your pen this?"], answer: 0, say: "Is this your pen?" },
            { kind: "build", skill: "Word order", ask: B_Q, hi: "क्या वह आपका स्कूल है?", words: ["school", "your", "Is", "that"], answer: "Is that your school?" },
            { kind: "write", skill: "Writing your own sentences", form: "neg", ask: { en: "Write a negative sentence about something far from you.", hi: "अपने से दूर की किसी चीज़ के बारे में नकारात्मक वाक्य लिखिए।" }, hint: "Use “That is not” and a noun with a / an / my.", hintHi: "“That is not” लगाइए और a / an / my के साथ कोई संज्ञा लगाइए।", model: "That is not my bag." },
            { kind: "write", skill: "Writing your own sentences", form: "q", ask: { en: "Write a question about something near you.", hi: "अपने पास की किसी चीज़ के बारे में एक सवाल लिखिए।" }, hint: "Start with “Is this” and use a noun with a / an / your.", hintHi: "“Is this” से शुरू कीजिए और a / an / your के साथ कोई संज्ञा लगाइए।", model: "Is this your pen?" },
            { kind: "mc", skill: "Real-life use", ask: { en: "A friend asks: “Is this your pen?” It is your pen. What do you say?", hi: "दोस्त पूछता है: “Is this your pen?” वह आपका पेन है। आप क्या कहेंगे?" }, options: ["Yes, it is. It is my pen.", "Yes, it isn't. It is my pen.", "No, it is. It is my pen."], answer: 0, say: "Yes, it is. It is my pen.", why: WSH2 }
        ] },
        { id: "convo", label: "Apply · Real Conversation", title: "Mini Conversation", char: "panda", type: "dialogue",
          note: { en: "“brother's” means “of my brother”. my brother's car = मेरे भाई की कार.", hi: "“brother's” का मतलब “भाई का/की” है। my brother's car = मेरे भाई की कार।" }, lines: [
          { who: "panda", en: "What is that?", hi: "वह क्या है?" },
          { who: "polly", en: "That is my school.", hi: "वह मेरा स्कूल है।" },
          { who: "panda", en: "Is this your bag?", hi: "क्या यह आपका बैग है?" },
          { who: "polly", en: "Yes, it is. This is my bag.", hi: "हाँ, यह मेरा बैग है।" },
          { who: "panda", en: "Is that your car?", hi: "क्या वह आपकी कार है?" },
          { who: "polly", en: "No, it isn't. That is my brother's car.", hi: "नहीं। वह मेरे भाई की कार है।" }
        ] },
        { id: "task", label: "Apply · Your Speaking Task", title: "🎤 Use It in Real Life", char: "panda", type: "task",
          intro: { en: "Look around you. Say your own sentences about things near you and far from you.", hi: "अपने आस-पास देखिए। पास की और दूर की चीज़ों के बारे में अपने खुद के वाक्य बोलिए।" },
          note: { en: "Pick things like a pen, bag, book, chair, tree or bus. Say each sentence aloud, then tap its button. PleasantLearn cannot hear you, so listen to yourself carefully.", hi: "पेन, बैग, किताब, कुर्सी, पेड़ या बस जैसी चीज़ें चुनिए। हर वाक्य ज़ोर से बोलिए, फिर उसका बटन दबाइए। PleasantLearn आपकी आवाज़ नहीं सुन सकता, इसलिए खुद ध्यान से सुनिए।" },
          items: [
            { tag: "This (near)", count: 2, frame: "This is my ____. / This is a ____.", ask: { en: "Touch something near you. Say 2 sentences with “This is…”.", hi: "पास की चीज़ को छूकर “This is…” से 2 वाक्य बोलिए।" }, ex: [ { en: "This is my pen.", hi: "यह मेरा पेन है।" }, { en: "This is a chair.", hi: "यह एक कुर्सी है।" } ] },
            { tag: "That (far)", count: 2, frame: "That is a ____. / That is my ____.", ask: { en: "Point at something far away. Say 2 sentences with “That is…”.", hi: "दूर की चीज़ की ओर इशारा करके “That is…” से 2 वाक्य बोलिए।" }, ex: [ { en: "That is a tree.", hi: "वह एक पेड़ है।" }, { en: "That is my school.", hi: "वह मेरा स्कूल है।" } ] },
            { tag: "Negative", count: 2, frame: "This is not my ____. / That isn't a ____.", ask: { en: "Say 2 sentences with “not”.", hi: "“not” से 2 वाक्य बोलिए।" }, ex: [ { en: "This is not my bag.", hi: "यह मेरा बैग नहीं है।" }, { en: "That isn't a bus.", hi: "वह बस नहीं है।" } ] },
            { tag: "Question", count: 2, frame: "Is this your ____? / Is that a ____?", ask: { en: "Ask 2 questions.", hi: "2 सवाल पूछिए।" }, ex: [ { en: "Is this your book?", hi: "क्या यह आपकी किताब है?" }, { en: "Is that a car?", hi: "क्या वह एक कार है?" } ] },
            { tag: "Short answer", count: 2, frame: "Yes, it is. / No, it isn't.", ask: { en: "Answer your own questions.", hi: "अपने ही सवालों का जवाब दीजिए।" }, ex: [ { en: "Yes, it is.", hi: "हाँ, यह है।" }, { en: "No, it isn't.", hi: "नहीं, यह नहीं है।" } ] }
          ] },
        { id: "complete", label: "Day Completion", title: "Day Completion", char: "panda", type: "complete",
          achievements: ["This is… (near) and That is… (far)", "Statements, “no” sentences and questions", "Short answers with “it”", "Contractions: that's, isn't", "Hindi ↔ English meaning", "Listening and speaking practice"],
          remember: [
            { t: "form", name: "Affirmative · statement · सामान्य वाक्य", cls: "c-blue", pattern: "This / That is + ...", example: "That is my school." },
            { t: "form", name: "Negative · “no” sentence · नकारात्मक वाक्य", cls: "c-red", pattern: "This / That is + not + ...", example: "This is not my pen." },
            { t: "form", name: "Interrogative · Yes/No question · सवाल", cls: "c-yellow", pattern: "Is + this / that + ...?", example: "Is that a bus?" },
            { t: "bi", style: "quote", en: "Short answers: Yes, it is. · No, it isn't.", hi: "छोटे उत्तर: हाँ, यह है। · नहीं, यह नहीं है।" },
            { t: "bi", style: "quote", en: "Keep practising: say 3 sentences aloud every day.", hi: "रोज़ अभ्यास कीजिए: हर दिन 3 वाक्य ज़ोर से बोलिए।" }
          ],
          farewell: { en: "See you in Day 3!", hi: "अगले दिन मिलते हैं!" } }
      ]
    }
  );
})();
