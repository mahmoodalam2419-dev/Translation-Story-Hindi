/* PleasantLearn — shared instruction / rule texts used by many days (and by the engine).
   Each is { en, hi }. Day files refer to them by name (e.g. ask: A_SENT, why: NEG).
   Day-specific rule texts (like TIS for Day 2) belong at the top of that day's file instead. */
  var IS = { en: "With “it”, use “is”.", hi: "“it” के साथ “is” आता है।" };
  var ORDER = { en: "The order is: It + is + word.", hi: "क्रम है: It + is + शब्द।" };
  var A_SENT = { en: "Choose the correct sentence.", hi: "सही वाक्य चुनिए।" };
  var A_NEG = { en: "Choose the correct negative sentence (with “not”).", hi: "सही नकारात्मक वाक्य चुनिए (“not” वाला)।" };
  var A_Q = { en: "Choose the correct question.", hi: "सही सवाल चुनिए।" };
  var T_AFF = { en: "Translate into English — a statement.", hi: "अंग्रेज़ी में अनुवाद कीजिए — सामान्य वाक्य।" };
  var T_NEG = { en: "Translate into English — a negative sentence.", hi: "अंग्रेज़ी में अनुवाद कीजिए — नकारात्मक वाक्य।" };
  var T_Q = { en: "Translate into English — a question.", hi: "अंग्रेज़ी में अनुवाद कीजिए — सवाल।" };
  var B_AFF = { en: "Build the statement (It is…).", hi: "सामान्य वाक्य बनाइए (It is…)।" };
  var B_NEG = { en: "Build the negative sentence (It is not…).", hi: "नकारात्मक वाक्य बनाइए (It is not…)।" };
  var B_Q = { en: "Build the question (Is it…?).", hi: "सवाल बनाइए (Is it…?)।" };
  var A_MAKEQ = { en: "Make this sentence a question.", hi: "इस वाक्य को सवाल बनाइए।" };
  var A_FILL = { en: "Complete the sentence.", hi: "वाक्य पूरा कीजिए।" };
  var A_FILLQ = { en: "Complete the question.", hi: "सवाल पूरा कीजिए।" };
  var NEG = { en: "Put “not” after “is”: It is not good.", hi: "“is” के बाद “not” आता है: It is not good." };
  var QW = { en: "For a Yes/No question, start with “Is”: Is it good?", hi: "“हाँ/नहीं” वाले सवाल में “Is” पहले आता है: Is it good?" };
  var AAN = { en: "Use “an” before a vowel sound (like a, e, i, o, u): an apple. Use “a” before other sounds: a book.", hi: "a, e, i, o, u की आवाज़ से पहले “an” लगाइए: an apple। बाकी आवाज़ों से पहले “a”: a book।" };
  var A_MEAN = { en: "Choose the correct Hindi meaning.", hi: "सही हिंदी अर्थ चुनिए।" };
  var W_MEAN = { en: "“not” means ‘नहीं’. A Yes/No question that starts with “Is” means ‘क्या…?’", hi: "“not” का मतलब ‘नहीं’ है। “Is” से शुरू होने वाला हाँ/नहीं वाला सवाल ‘क्या…?’ से शुरू होता है।" };
  var A_NEGT = { en: "Make this a “no” sentence (add “not”).", hi: "इसे “नहीं” वाला वाक्य बनाइए (“not” लगाइए)।" };
  var A_POS = { en: "Take out “not” to make a normal sentence.", hi: "“not” हटाकर सामान्य वाक्य बनाइए।" };
  var W_POS = { en: "Take “not” out: It is not hot → It is hot.", hi: "“not” हटाइए: It is not hot → It is hot." };
  var A_QSTAT = { en: "Make this question a normal sentence.", hi: "इस सवाल को सामान्य वाक्य बनाइए।" };
  var W_QSTAT = { en: "For a normal sentence, start with “It”: Is it easy? → It is easy.", hi: "सामान्य वाक्य “It” से शुरू होता है: Is it easy? → It is easy." };
  var A_NEGQ = { en: "Turn this “no” sentence into a question.", hi: "इस “नहीं” वाले वाक्य को सवाल बनाइए।" };
  var A_QNEG = { en: "Turn this question into a “no” sentence.", hi: "इस सवाल को “नहीं” वाला वाक्य बनाइए।" };
  var W_MIX = { en: "Yes/No questions: “Is” goes first. “No” sentences: “not” goes after “is”.", hi: "हाँ/नहीं वाले सवाल में “Is” पहले आता है। “नहीं” वाले वाक्य में “is” के बाद “not” आता है।" };
  var A_WRONG = { en: "Which sentence is NOT correct?", hi: "कौन-सा वाक्य सही नहीं है?" };
  var W_WRONG = { en: "Remember: It + is + word. “not” comes after “is”. A Yes/No question starts with “Is”.", hi: "याद रखिए: It + is + शब्द। “not”, “is” के बाद आता है। हाँ/नहीं वाला सवाल “Is” से शुरू होता है।" };
  var A_SHORT = { en: "Choose the correct short answer.", hi: "सही छोटा उत्तर चुनिए।" };
  var W_SHORT = { en: "Short answers: Yes, it is. · No, it isn't.", hi: "छोटे उत्तर: Yes, it is. · No, it isn't." };
  var A_BUILDHI = { en: "Build the English sentence from the Hindi.", hi: "हिंदी के आधार पर अंग्रेज़ी वाक्य बनाइए।" };
  var A_LISTEN = { en: "Listen and choose what you heard.", hi: "सुनिए और जो सुना उसे चुनिए।" };
  var A_LISTENM = { en: "Listen and choose the correct meaning.", hi: "सुनिए और सही अर्थ चुनिए।" };
  var D_SAYEN = { en: "Say this in English.", hi: "इसे अंग्रेज़ी में बोलिए।" };
  var D_SAYHI = { en: "Say the Hindi meaning.", hi: "इसका हिंदी अर्थ बोलिए।" };
  var D_NEG = { en: "Say it as a “no” sentence (with “not”).", hi: "इसे “not” लगाकर बोलिए।" };
  var D_Q = { en: "Say it as a Yes/No question.", hi: "इसे हाँ/नहीं वाला सवाल बनाकर बोलिए।" };
  var D_STAT = { en: "Say it as a normal sentence.", hi: "इसे सामान्य वाक्य बनाकर बोलिए।" };
  var D_YES = { en: "Answer: Yes.", hi: "उत्तर दीजिए: हाँ।" };
  var D_NO = { en: "Answer: No.", hi: "उत्तर दीजिए: नहीं।" };

  /* The engine reads phrases from LW.P (never from loose globals). Day files may still use the bare names above. */
  LW.P = { IS: IS, ORDER: ORDER, A_SENT: A_SENT, A_NEG: A_NEG, A_Q: A_Q, T_AFF: T_AFF, T_NEG: T_NEG, T_Q: T_Q, B_AFF: B_AFF, B_NEG: B_NEG, B_Q: B_Q, A_MAKEQ: A_MAKEQ, A_FILL: A_FILL, A_FILLQ: A_FILLQ, NEG: NEG, QW: QW, AAN: AAN, A_MEAN: A_MEAN, W_MEAN: W_MEAN, A_NEGT: A_NEGT, A_POS: A_POS, W_POS: W_POS, A_QSTAT: A_QSTAT, W_QSTAT: W_QSTAT, A_NEGQ: A_NEGQ, A_QNEG: A_QNEG, W_MIX: W_MIX, A_WRONG: A_WRONG, W_WRONG: W_WRONG, A_SHORT: A_SHORT, W_SHORT: W_SHORT, A_BUILDHI: A_BUILDHI, A_LISTEN: A_LISTEN, A_LISTENM: A_LISTENM, D_SAYEN: D_SAYEN, D_SAYHI: D_SAYHI, D_NEG: D_NEG, D_Q: D_Q, D_STAT: D_STAT, D_YES: D_YES, D_NO: D_NO };
