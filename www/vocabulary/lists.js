/* PleasantLearn — Vocabulary: word lists by topic (open any list, in any order).
   ADD A WORD: add [english, hindi] (or [english, hindi, emoji]) to a list.
   ADD A LIST:  add a block { id, icon, title, hi, words: [...] } — id must be unique, lowercase, no spaces.
   The quiz uses every word in every list, plus the lesson words in words.js. */
window.LW = window.LW || {};
LW.vocab = LW.vocab || {};
LW.vocab.lists = [
  { id: "fruits", icon: "🍎", title: "Fruits", hi: "फल", words: [
    ["apple", "सेब", "🍎"], ["banana", "केला", "🍌"], ["mango", "आम", "🥭"], ["orange", "संतरा", "🍊"], ["grapes", "अंगूर", "🍇"],
    ["watermelon", "तरबूज़", "🍉"], ["papaya", "पपीता"], ["guava", "अमरूद"], ["pomegranate", "अनार"], ["pineapple", "अनानास", "🍍"],
    ["lemon", "नींबू", "🍋"], ["pear", "नाशपाती", "🍐"], ["peach", "आड़ू", "🍑"], ["cherry", "चेरी", "🍒"], ["strawberry", "स्ट्रॉबेरी", "🍓"],
    ["coconut", "नारियल", "🥥"], ["melon", "खरबूज़ा", "🍈"], ["litchi", "लीची"], ["fig", "अंजीर"], ["custard apple", "शरीफ़ा"],
    ["plum", "आलूबुखारा"], ["jackfruit", "कटहल"], ["dates", "खजूर"], ["sapota", "चीकू"], ["kiwi", "कीवी", "🥝"]
  ] },
  { id: "vegetables", icon: "🥕", title: "Vegetables", hi: "सब्ज़ियाँ", words: [
    ["potato", "आलू", "🥔"], ["onion", "प्याज़", "🧅"], ["tomato", "टमाटर", "🍅"], ["carrot", "गाजर", "🥕"], ["cabbage", "पत्ता गोभी"],
    ["cauliflower", "फूलगोभी"], ["spinach", "पालक"], ["brinjal", "बैंगन", "🍆"], ["lady finger", "भिंडी"], ["peas", "मटर"],
    ["cucumber", "खीरा", "🥒"], ["radish", "मूली"], ["beetroot", "चुकंदर"], ["pumpkin", "कद्दू", "🎃"], ["bottle gourd", "लौकी"],
    ["bitter gourd", "करेला"], ["green chilli", "हरी मिर्च", "🌶️"], ["capsicum", "शिमला मिर्च", "🫑"], ["garlic", "लहसुन", "🧄"], ["ginger", "अदरक"],
    ["coriander", "धनिया"], ["corn", "मक्का", "🌽"], ["sweet potato", "शकरकंद"], ["turnip", "शलगम"], ["ridge gourd", "तोरी"]
  ] },
  { id: "animals", icon: "🐘", title: "Animals", hi: "जानवर", words: [
    ["dog", "कुत्ता", "🐕"], ["cat", "बिल्ली", "🐈"], ["cow", "गाय", "🐄"], ["buffalo", "भैंस", "🐃"], ["horse", "घोड़ा", "🐎"],
    ["goat", "बकरी", "🐐"], ["sheep", "भेड़", "🐑"], ["donkey", "गधा"], ["camel", "ऊँट", "🐪"], ["elephant", "हाथी", "🐘"],
    ["lion", "शेर", "🦁"], ["tiger", "बाघ", "🐅"], ["leopard", "तेंदुआ", "🐆"], ["monkey", "बंदर", "🐒"], ["rabbit", "खरगोश", "🐇"],
    ["deer", "हिरण", "🦌"], ["bear", "भालू", "🐻"], ["fox", "लोमड़ी", "🦊"], ["wolf", "भेड़िया", "🐺"], ["zebra", "ज़ेबरा", "🦓"],
    ["giraffe", "जिराफ़", "🦒"], ["crocodile", "मगरमच्छ", "🐊"], ["snake", "साँप", "🐍"], ["frog", "मेंढक", "🐸"], ["rat", "चूहा", "🐀"], ["pig", "सूअर", "🐖"]
  ] },
  { id: "birds", icon: "🦜", title: "Birds", hi: "पक्षी", words: [
    ["parrot", "तोता", "🦜"], ["crow", "कौआ"], ["sparrow", "गौरैया"], ["pigeon", "कबूतर", "🕊️"], ["peacock", "मोर", "🦚"],
    ["owl", "उल्लू", "🦉"], ["eagle", "उक़ाब / गरुड़", "🦅"], ["hawk", "बाज़"], ["kite", "चील"], ["vulture", "गिद्ध"],
    ["hen", "मुर्गी", "🐔"], ["rooster", "मुर्गा", "🐓"], ["duck", "बत्तख", "🦆"], ["swan", "हंस", "🦢"], ["cuckoo", "कोयल"],
    ["myna", "मैना"], ["bulbul", "बुलबुल"], ["crane", "सारस"], ["woodpecker", "कठफोड़वा"], ["kingfisher", "किलकिला"],
    ["penguin", "पेंगुइन", "🐧"], ["turkey", "टर्की", "🦃"]
  ] },
  { id: "flowers", icon: "🌹", title: "Flowers", hi: "फूल", words: [
    ["rose", "गुलाब", "🌹"], ["lotus", "कमल"], ["marigold", "गेंदा"], ["jasmine", "चमेली"], ["sunflower", "सूरजमुखी", "🌻"],
    ["tulip", "ट्यूलिप", "🌷"], ["lily", "लिली"], ["hibiscus", "गुड़हल", "🌺"], ["daisy", "डेज़ी"], ["orchid", "ऑर्किड"],
    ["dahlia", "डहलिया"], ["chrysanthemum", "गुलदाउदी"], ["bougainvillea", "बोगनवेलिया"], ["frangipani", "चंपा"], ["tuberose", "रजनीगंधा"],
    ["daffodil", "नरगिस"], ["carnation", "कार्नेशन"], ["lavender", "लैवेंडर"], ["oleander", "कनेर"], ["blossom", "फूल / बौर", "🌸"]
  ] },
  { id: "trees", icon: "🌳", title: "Trees", hi: "पेड़", words: [
    ["mango tree", "आम का पेड़"], ["neem", "नीम"], ["banyan", "बरगद"], ["peepal", "पीपल"], ["tamarind", "इमली"],
    ["coconut palm", "नारियल का पेड़", "🌴"], ["teak", "सागौन"], ["bamboo", "बाँस", "🎋"], ["sal", "साल"], ["rosewood", "शीशम"],
    ["eucalyptus", "यूकेलिप्टस / सफ़ेदा"], ["pine", "चीड़", "🌲"], ["oak", "बलूत"], ["palm", "ताड़"], ["cedar", "देवदार"],
    ["willow", "बेंत / विलो"], ["acacia", "बबूल"], ["ashoka", "अशोक"], ["gulmohar", "गुलमोहर"], ["date palm", "खजूर का पेड़"]
  ] },
  { id: "spices", icon: "🌶️", title: "Spices", hi: "मसाले", words: [
    ["turmeric", "हल्दी"], ["cumin", "जीरा"], ["coriander seeds", "साबुत धनिया"], ["black pepper", "काली मिर्च"], ["red chilli", "लाल मिर्च", "🌶️"],
    ["cardamom", "इलायची"], ["clove", "लौंग"], ["cinnamon", "दालचीनी"], ["mustard seeds", "सरसों"], ["fenugreek", "मेथी"],
    ["fennel", "सौंफ़"], ["asafoetida", "हींग"], ["bay leaf", "तेज पत्ता"], ["nutmeg", "जायफल"], ["mace", "जावित्री"],
    ["saffron", "केसर"], ["carom seeds", "अजवाइन"], ["star anise", "चक्र फूल"], ["black cardamom", "बड़ी इलायची"], ["dry mango powder", "अमचूर"],
    ["salt", "नमक", "🧂"], ["garam masala", "गरम मसाला"], ["poppy seeds", "खसखस"], ["sesame seeds", "तिल"]
  ] },
  { id: "home", icon: "🏠", title: "Home & Household", hi: "घर की चीज़ें", words: [
    ["bed", "पलंग / बिस्तर", "🛏️"], ["pillow", "तकिया"], ["blanket", "कंबल"], ["mattress", "गद्दा"], ["bedsheet", "चादर"],
    ["table", "मेज़"], ["chair", "कुर्सी", "🪑"], ["sofa", "सोफ़ा", "🛋️"], ["cupboard", "अलमारी"], ["shelf", "ताक / शेल्फ़"],
    ["mirror", "आईना"], ["curtain", "पर्दा"], ["carpet", "कालीन"], ["broom", "झाड़ू", "🧹"], ["mop", "पोछा"],
    ["bucket", "बाल्टी", "🪣"], ["door", "दरवाज़ा", "🚪"], ["window", "खिड़की"], ["lock", "ताला", "🔒"], ["key", "चाबी", "🔑"],
    ["fan", "पंखा"], ["bulb", "बल्ब", "💡"], ["clock", "घड़ी", "🕰️"], ["television", "टेलीविज़न"], ["refrigerator", "फ़्रिज"],
    ["washing machine", "वॉशिंग मशीन"], ["iron", "इस्त्री"], ["soap", "साबुन", "🧼"], ["towel", "तौलिया"], ["comb", "कंघी"],
    ["toothbrush", "टूथब्रश", "🪥"], ["toothpaste", "टूथपेस्ट"]
  ] },
  { id: "kitchen", icon: "🍳", title: "Kitchen Utensils", hi: "रसोई के बर्तन", words: [
    ["plate", "थाली / प्लेट", "🍽️"], ["bowl", "कटोरी"], ["spoon", "चम्मच", "🥄"], ["fork", "काँटा", "🍴"], ["knife", "चाकू", "🔪"],
    ["glass", "गिलास"], ["cup", "कप", "☕"], ["jug", "जग"], ["pot", "पतीला / भगोना"], ["frying pan", "कड़ाही", "🍳"],
    ["tawa", "तवा"], ["pressure cooker", "प्रेशर कुकर"], ["kettle", "केतली"], ["ladle", "कलछी / करछी"], ["rolling pin", "बेलन"],
    ["rolling board", "चकला"], ["grater", "कद्दूकस"], ["sieve", "छलनी"], ["tongs", "चिमटा"], ["peeler", "छीलनी"],
    ["chopping board", "कटिंग बोर्ड"], ["lid", "ढक्कन"], ["bottle", "बोतल", "🍼"], ["tray", "ट्रे"], ["stove", "चूल्हा / स्टोव"],
    ["tiffin box", "टिफ़िन"], ["mixer grinder", "मिक्सर ग्राइंडर"]
  ] },
  { id: "vehicles", icon: "🚌", title: "Vehicles", hi: "वाहन", words: [
    ["bus", "बस", "🚌"], ["car", "कार", "🚗"], ["motorcycle", "मोटरसाइकिल", "🏍️"], ["bicycle", "साइकिल", "🚲"], ["scooter", "स्कूटर", "🛵"],
    ["auto-rickshaw", "ऑटो रिक्शा", "🛺"], ["rickshaw", "रिक्शा"], ["taxi", "टैक्सी", "🚕"], ["truck", "ट्रक", "🚚"], ["tractor", "ट्रैक्टर", "🚜"],
    ["train", "रेलगाड़ी", "🚆"], ["metro", "मेट्रो", "🚇"], ["aeroplane", "हवाई जहाज़", "✈️"], ["helicopter", "हेलिकॉप्टर", "🚁"], ["ship", "जहाज़", "🚢"],
    ["boat", "नाव", "⛵"], ["ambulance", "एम्बुलेंस", "🚑"], ["fire engine", "दमकल", "🚒"], ["police car", "पुलिस की गाड़ी", "🚓"], ["van", "वैन", "🚐"],
    ["cart", "ठेला / बैलगाड़ी"], ["rocket", "रॉकेट", "🚀"]
  ] },
  { id: "body", icon: "🧍", title: "Body Parts", hi: "शरीर के अंग", words: [
    ["head", "सिर"], ["hair", "बाल"], ["face", "चेहरा"], ["eye", "आँख", "👁️"], ["ear", "कान", "👂"], ["nose", "नाक", "👃"],
    ["mouth", "मुँह", "👄"], ["tooth", "दाँत", "🦷"], ["tongue", "जीभ", "👅"], ["neck", "गर्दन"], ["shoulder", "कंधा"],
    ["arm", "बाँह"], ["hand", "हाथ", "✋"], ["finger", "उँगली"], ["nail", "नाखून"], ["chest", "छाती"], ["stomach", "पेट"],
    ["back", "पीठ"], ["leg", "टाँग", "🦵"], ["knee", "घुटना"], ["foot", "पैर", "🦶"], ["heart", "दिल", "❤️"]
  ] },
  { id: "family", icon: "👪", title: "Family & Relations", hi: "परिवार और रिश्ते", words: [
    ["father", "पिता"], ["mother", "माँ"], ["parents", "माता-पिता"], ["brother", "भाई"], ["sister", "बहन"],
    ["grandfather", "दादा / नाना"], ["grandmother", "दादी / नानी"], ["uncle", "चाचा / मामा / फूफा"], ["aunt", "चाची / मौसी / बुआ"], ["son", "बेटा"],
    ["daughter", "बेटी"], ["husband", "पति"], ["wife", "पत्नी"], ["cousin", "चचेरा / ममेरा भाई-बहन"], ["nephew", "भतीजा / भांजा"],
    ["niece", "भतीजी / भांजी"], ["father-in-law", "ससुर"], ["mother-in-law", "सास"], ["baby", "शिशु", "👶"], ["neighbour", "पड़ोसी"], ["relatives", "रिश्तेदार"]
  ] },
  { id: "colours", icon: "🎨", title: "Colours", hi: "रंग", words: [
    ["red", "लाल", "🔴"], ["blue", "नीला", "🔵"], ["green", "हरा", "🟢"], ["yellow", "पीला", "🟡"], ["black", "काला", "⚫"],
    ["white", "सफ़ेद", "⚪"], ["orange", "नारंगी", "🟠"], ["pink", "गुलाबी"], ["purple", "बैंगनी", "🟣"], ["brown", "भूरा", "🟤"],
    ["grey", "स्लेटी"], ["golden", "सुनहरा"], ["silver", "रुपहला"], ["maroon", "गहरा लाल"]
  ] },
  { id: "clothes", icon: "👕", title: "Clothes", hi: "कपड़े", words: [
    ["shirt", "कमीज़", "👔"], ["T-shirt", "टी-शर्ट", "👕"], ["trousers", "पतलून", "👖"], ["jeans", "जींस"], ["saree", "साड़ी"],
    ["kurta", "कुर्ता"], ["salwar", "सलवार"], ["dupatta", "दुपट्टा"], ["dress", "फ़्रॉक / पोशाक", "👗"], ["skirt", "स्कर्ट"],
    ["coat", "कोट", "🧥"], ["jacket", "जैकेट"], ["sweater", "स्वेटर"], ["cap", "टोपी", "🧢"], ["hat", "हैट", "👒"],
    ["scarf", "मफ़लर / स्कार्फ़", "🧣"], ["sandals", "चप्पल / सैंडल"],
    ["belt", "बेल्ट"], ["tie", "टाई"], ["uniform", "वर्दी"], ["raincoat", "रेनकोट"]
  ] },
  { id: "jobs", icon: "👩‍⚕️", title: "Professions", hi: "पेशे", words: [
    ["teacher", "शिक्षक"], ["doctor", "डॉक्टर"], ["nurse", "नर्स"], ["engineer", "इंजीनियर"], ["farmer", "किसान"],
    ["driver", "ड्राइवर"], ["police officer", "पुलिसकर्मी"], ["soldier", "सिपाही / सैनिक"], ["lawyer", "वकील"], ["judge", "न्यायाधीश"],
    ["pilot", "पायलट"], ["cook", "रसोइया"], ["tailor", "दर्ज़ी"], ["carpenter", "बढ़ई"], ["plumber", "नलसाज़"],
    ["electrician", "बिजली मिस्त्री"], ["mechanic", "मैकेनिक"], ["shopkeeper", "दुकानदार"], ["barber", "नाई"], ["painter", "चित्रकार / रंगसाज़"],
    ["singer", "गायक"], ["actor", "अभिनेता"], ["writer", "लेखक"], ["postman", "डाकिया"], ["businessman", "व्यापारी"]
  ] },
  { id: "school", icon: "🎒", title: "School Things", hi: "स्कूल की चीज़ें", words: [
    ["pen", "कलम / पेन", "🖊️"], ["pencil", "पेंसिल", "✏️"], ["eraser", "रबड़"], ["sharpener", "पेंसिल छीलने की मशीन"], ["ruler", "पटरी / स्केल", "📏"],
    ["notebook", "कॉपी", "📓"], ["book", "किताब", "📖"], ["school bag", "स्कूल बैग", "🎒"], ["blackboard", "ब्लैकबोर्ड"], ["chalk", "चॉक"],
    ["duster", "डस्टर"], ["desk", "डेस्क"], ["bench", "बेंच"], ["scissors", "कैंची", "✂️"], ["glue", "गोंद"],
    ["map", "नक्शा", "🗺️"], ["calculator", "कैलकुलेटर", "🧮"], ["marker", "मार्कर"], ["crayons", "रंगीन पेंसिलें / क्रेयॉन"], ["paper", "काग़ज़"],
    ["classroom", "कक्षा"], ["library", "पुस्तकालय"]
  ] },
  { id: "time", icon: "📅", title: "Days & Months", hi: "दिन और महीने", words: [
    ["Monday", "सोमवार"], ["Tuesday", "मंगलवार"], ["Wednesday", "बुधवार"], ["Thursday", "गुरुवार"], ["Friday", "शुक्रवार"],
    ["Saturday", "शनिवार"], ["Sunday", "रविवार"], ["January", "जनवरी"], ["February", "फ़रवरी"], ["March", "मार्च"],
    ["April", "अप्रैल"], ["May", "मई"], ["June", "जून"], ["July", "जुलाई"], ["August", "अगस्त"],
    ["September", "सितंबर"], ["October", "अक्टूबर"], ["November", "नवंबर"], ["December", "दिसंबर"]
  ] },
  { id: "nature", icon: "⛅", title: "Weather & Nature", hi: "मौसम और प्रकृति", words: [
    ["sun", "सूरज", "☀️"], ["moon", "चाँद", "🌙"], ["star", "तारा", "⭐"], ["sky", "आसमान"], ["cloud", "बादल", "☁️"],
    ["rain", "बारिश", "🌧️"], ["wind", "हवा"], ["storm", "तूफ़ान"], ["snow", "बर्फ़", "❄️"], ["thunder", "बादलों की गरज"],
    ["lightning", "बिजली चमकना", "⚡"], ["rainbow", "इंद्रधनुष", "🌈"], ["fog", "कोहरा"], ["summer", "गर्मी का मौसम"], ["winter", "सर्दी का मौसम"],
    ["monsoon", "बरसात का मौसम"], ["river", "नदी"], ["mountain", "पहाड़", "⛰️"], ["sea", "समुद्र", "🌊"], ["lake", "झील"],
    ["forest", "जंगल"], ["desert", "रेगिस्तान", "🏜️"], ["island", "द्वीप", "🏝️"]
  ] }
];
