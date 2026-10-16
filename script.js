(function() {
    const TOKEN_DB = {
        silver: "Silver.2026",
        gold: "Gold.2026"
    };

    let unlockedTiers = { silver: false, gold: false };
    const savedUnlocked = localStorage.getItem('unlockedTiers');
    if (savedUnlocked) {
        try { unlockedTiers = JSON.parse(savedUnlocked); } catch(e) {}
    }

    function saveUnlockStatus() {
        localStorage.setItem("unlockedTiers", JSON.stringify(unlockedTiers));
    }

    const bronzeStages = [
        { emojis: ["🚫", "🔊", "✋️"], answer: "یک دست صدا ندارد" },
        { emojis: ["✍️", "💧", "🐭"], answer: "موش آب کشیده" },
        { emojis: ["🎁", "🤴", "💰"], answer: "از کیسه خلیفه بخشیدن" },
        { emojis: ["🇮🇳", "🦚", "👤"], answer: "هر که طاووس خواهد جور هندوستان کشد" },
        { emojis: ["⚰️", "🐺", "🤲"], answer: "توبه گرگ مرگ است" },
        { emojis: ["🤐", "👀", "🐪"], answer: "شتر دیدی ندیدی" },
        { emojis: ["⏰️", "💧", "🐟"], answer: "ماهی رو هر وقت از آب بگیری تازه است" },
        { emojis: ["🧠", "🤏", "🤥"], answer: "آدم دروغگو کم حافظه است" },
        { emojis: ["❌️", "☁️", "🌛"], answer: "ماه پشت ابر نمی‌ماند" },
        { emojis: ["🦆", "👥️️", "🐔"], answer: "مرغ همسایه غازه" },
        { emojis: ["🍼", "👃", "👄"], answer: "دهانش بوی شیر میده" },
        { emojis: ["👆", "⬆️", "✋️"], answer: "دست بالای دست بسیار است" },
        { emojis: ["🕌", "🏠", "🪔"], answer: "چراغی که به خانه رواست به مسجد حرام نیست" },
        { emojis: ["🌿", "💭", "🐪"], answer: "شتر در خواب بیند پنبه دانه" },
        { emojis: ["⬇️", "🐘", "👃"], answer: "از دماغ فیل افتادن" },
        { emojis: ["🤜", "🥣", "💧"], answer: "آب در هاون کوبیدن" },
        { emojis: ["🦊", "🤔", "🦁"], answer: "شیری یا روباه" },
        { emojis: ["❌️", "👞", "🦶"], answer: "پا در کفش کسی نکن" },
        { emojis: ["💎", "⛏️", "🔍"], answer: "جوینده یابنده است" },
        { emojis: ["🚶", "🤷‍♂️", "🚴"], answer: "سواره خبر از حال پیاده نداره" },
        { emojis: ["🥣", "😏", "🍵"], answer: "کاچی به از هیچ" },
        { emojis: ["👂", "🐀", "🧱"], answer: "دیوار موش داره موشم گوش داره" },
        { emojis: ["🤑", "💸", "💵"], answer: "پول پول میاره" },
        { emojis: ["👀", "🤨", "👂"], answer: "شنیدن کی بود مانند دیدن" },
        { emojis: ["🙏🏻", "🤒", "☠️"], answer: "به مرگ گرفته به تب راضی بشه" },
        { emojis: ["❌️", "😳", "👂"], answer: "بشنو ولی باور نکن" },
        { emojis: ["🐻", "🧕", "👭"], answer: "دوستی خاله خرسه" },
        { emojis: ["🇮🇳", "🤔", "🐘"], answer: "فیلش یاد هندوستان کرده" },
        { emojis: ["🎶", "🐓", "🐥"], answer: "کبکش خروس میخونه" },
        { emojis: ["🐏", "👕", "🐺"], answer: "گرگ در لباس میش" },
        { emojis: ["🦊", "👌", "🍇"], answer: "انگور خوب نصیب شغال میشه" },
        { emojis: ["🕳", "👤", "🪢"], answer: "با طناب کسی توی چاه رفتن" },
        { emojis: ["❌️", "⚫️", "👆"], answer: "بالاتر از سیاهی رنگی نیست" },
        { emojis: ["🐪", "🥷", "🥚"], answer: "تخم‌ مرغ دزد شتر دزد می‌شود" },
        { emojis: ["⬛️", "⬇️", "🏹"], answer: "تیری در تاریکی" },
        { emojis: ["🧮", "🍁", "🐣"], answer: "جوجه را آخر پائیز می‌شمارند" },
        { emojis: ["1️⃣", "👨", "🗣"], answer: "حرف مرد یکی است" },
        { emojis: ["🎶", "🛣", "🐓"], answer: "خروس اگه خروس باشه توی راه هم میخونه" },
        { emojis: ["❌️", "🥅", "🤥"], answer: "دروغ از دروازه تو نمیاد" },
        { emojis: ["🌾", "🤲", "🏃"], answer: "از تو حرکت از خدا برکت" },
        { emojis: ["🎁", "🌊", "💧"], answer: "آب از دریا بخشیدن" },
        { emojis: ["🌈", "🗺", "🌫"], answer: "آسمون همه جاش یه رنگه" },
        { emojis: ["🏜", "🏖", "🦶"], answer: "پا به دریا بزاره دریا خشک میشه" },
        { emojis: ["🪨", "⬅️", "🏹"], answer: "تیرش به سنگ میخوره" },
        { emojis: ["❌️", "🪤", "〰️"], answer: "دم به تله ندادن" },
        { emojis: ["❌️", "☔️", "🐺"], answer: "گرگ باران دیده نیست" },
        { emojis: ["🔥", "🌰", "👑"], answer: "شاه بلوط را از آتش برای تو در می‌آورم" },
        { emojis: ["⚖️", "🦟", "🐪"], answer: "شتر را با پشه سنجیدن" },
        { emojis: ["🌊", "💧", "💧"], answer: "قطره قطره جمع گردد وانگهی دریا شود" },
        { emojis: ["😋", "🧂", "🍞"], answer: "نان و نمک کسی را خوردن" },    
    ];
    
    const silverStages = [
        { emojis: ["❌️", "🐻", "🌱", "💵"], answer: "پول علف خرس نیست"},
        { emojis: ["🔥", "👄", "❌️", "🍲"], answer: "آش نخورده و دهان سوخته" },
        { emojis: ["😖", "🧂", "2️⃣", "👩‍🍳"], answer: "آشپز که دو تا شد آش یا شور میشه یا بی‌نمک" },
        { emojis: ["🌏", "🏃‍♂️", "⚱️", "💧"], answer: "آب در کوزه و ما گرد جهان می‌گردیم" },
        { emojis: ["💧", "❤", "🐄", "🐮"], answer: "تا گوساله گاو شود دل صاحبش آب شود" },
        { emojis: ["☻️", "🗣", "🥘", "🥘"], answer: "دیگ به دیگ میگه روت سیاه" },
        { emojis: ["🔑", "🔒", "🔒", "🔒"], answer: "هر قفلی یک کلیدی دارد" },
        { emojis: ["❌️", "🎮", "🦁", "〰️"], answer: "با دم شیر بازی نکن" },
        { emojis: ["❌️", "🌸", "🌹", "1️⃣"], answer: "با یک گل بهار نمی‌شود" },
        { emojis: ["👑", "🥷", "⬅️", "🥷"], answer: "دزد که به دزد بزنه شاه دزده" },
        { emojis: ["❌️", "🙇‍♂️", "🙇‍♂️", "🐫"], answer: "شتر سواری دلا دلا نمیشه" },
        { emojis: ["👁", "💪", "🛣", "🌃"], answer: "شب دراز است و قلندر بیدار" },
        { emojis: ["🥅", "👂", "🚪", "👂"], answer: "یک گوشش در و یک گوشش دروازه" },
        { emojis: ["🦅", "🦅", "🕊", "🕊"], answer: "کبوتر با کبوتر باز با باز" },
        { emojis: ["🎯", "2️⃣", "🏹", "1️⃣"], answer: "یک تیر و دو نشان" },
        { emojis: ["👨", "☠️", "⬅️", "💊"], answer: "نوش دارو بعد از مرگ سهراب" },
        { emojis: ["🪨", "👈", "📌", "❌️"], answer: "نرود میخ آهنی در سنگ" },
        { emojis: ["⬅️", "🌬", "⬅️", "🌬"], answer: "باد آورده را باد می‌برد" },
        { emojis: ["❌️", "🔄", "🦷", "🐺"], answer: "گرگ دندان عوض نمی‌کند" },
        { emojis: ["💧", "❄️", "🚫", "💵"], answer: "پول حرام مثل برف آب می‌شود" },
        { emojis: ["❌️", "🧤", "❌️", "🤕"], answer: "سری که درد نمی‌کند دستمال نمی‌بندند" },
        { emojis: ["👄", "🥵", "⚱️", "💧"], answer: "آب در کوزه و ما تشنه لبان" },
        { emojis: ["🍲", "🔝", "🔥", "🥣"], answer: "کاسه داغ تر از آش" },
        { emojis: ["😋", "😭", "😋", "🧅"], answer: "هر که پیاز می‌خورد اشکش را هم می‌خورد" },
        { emojis: ["❌️", "👬", "🐑", "🐺"], answer: "گرگ و گوسفند با هم برادر نمی‌شوند" },
        { emojis: ["❌️", "🤝", "🧊", "🌞"], answer: "آفتاب و یخ با هم جمع نمی‌شوند" },      
        { emojis: ["🤝", "🍁", "🫲", "🌹"], answer: "گل را به دست خزان سپردن" },
        { emojis: ["🤚", "🌊", "👂", "🐚"], answer: "صدف گوش به دریا بسپار" },
        { emojis: ["💪", "❌️", "🗻", "🐜"], answer: "مورچه کوه را نمی‌تواند برد" },
        { emojis: ["🧘‍♀️", "⚓", "🌪", "🧭"], answer: "قطب نما در طوفان لنگر در آرامش" },
        { emojis: ["❌️", "👩", "💔", "🪞"], answer: "آینه شکسته رو به دختر نشون نده" },
        { emojis: ["👜", "😇", "👬", "💵"], answer: "تا پول داری رفیقتم قربان بند کیفتم " },
        { emojis: ["❌️", "🫵", "🥅", "🤥"], answer: "دروغ از دروازه تو نمی‌آید" },
        { emojis: ["🌬", "🟩", "🟥", "👅"], answer: "زبان سرخ سر سبز می‌دهد بر باد" },
        { emojis: ["🆓️", "🐦", "🆓️", "🪨"], answer: "سنگ مفت گنجشک مفت" },
        { emojis: ["❌️", "♟️", "🎁", "👑"], answer: "شاه می‌بخشد وزیر نمی‌بخشد" },
        { emojis: ["👍", "🔚", "📜", "👑"], answer: "شاهنامه آخرش خوش است" },
        { emojis: ["💧", "🍈", "🥖", "🤔"], answer: "فکر نان کن که خربزه آب است" },
        { emojis: ["🤝", "🫳", "⬅️", "🫴"], answer: "دست به دست سپرده است" },
        { emojis: ["❌️", "🕳", "⬆️", "🐍"], answer: "تا مار راست نشود به سوراخ نرود" },        
        { emojis: ["😂", "🌏", "⬅️", "😂"], answer: "بخند تا دنیا به رویت بخندد" },
        { emojis: ["🗣", "👈", "🤔", "☝️"], answer: "اول اندیشه وانگهی گفتار" },
        { emojis: ["🚪", "👆", "⬅️", "👇"], answer: "این به آن در" },
        { emojis: ["😐", "🔚", "🤪", "🤪"], answer: "شوخی شوخی آخرش جدی می‌شود" },
        { emojis: ["😋", "🤛", "😵‍💫", "🤛"], answer: "زدی ضربتی ضربتی نوش کن" },
        { emojis: ["🚚", "🫘", "🫴", "🦓"], answer: "خر بیار و باقالی بار کن" },
        { emojis: ["✅️", "🚪", "⬅️", "🪨"], answer: "سنگ به در بسته میخوره" },
        { emojis: ["💵", "1️⃣", "🪙", "👤"], answer: "کسی را سکه یه پول کردن" },
        { emojis: ["❌️", "🩸", "🤚", "🔪"], answer: "چاقو دست خودش را نمی‌برد" },
        { emojis: ["❌️", "🐭", "🤲", "🐱"], answer: "گربه برای رضای خدا موش نمی‌گیرد" },
    ]; 
    const goldStages = [
        { emojis: ["🍽", "❌️", "🍯", "⚖️", "☝️"], answer: "با یک من عسل هم نمی‌شود خوردش" },
        { emojis: ["👂", "🧒", "👈", "👍", "🗣"], answer: "حرف راست رو باید از بچه شنید" },
        { emojis: ["🏘", "👄", "👴", "👈", "🌞"], answer: "آفتاب عمرش لب بام است" },
        { emojis: ["↙️", "💧", "❌️", "😴", "🗺"], answer: " جایی نمی‌خوابه که آب زیرش بره" },
        { emojis: ["❌️", "❄️", "🤔", "🎶", "🐣"], answer: "جیک جیک مستونت بود فکر زمستونت نبود" },        
        { emojis: ["😱", "⚪️", "⚫️", "🧶", "🐍"], answer: "مار گزیده از ریسمان سیاه و سفید می‌ترسد" },
        { emojis: ["🧙‍♂️", "🤚", "🆓️", "🥷", "🤚"], answer: "از دست دزد آزاد شد و دست رمال افتاد" },
        { emojis: ["✅️", "🎃", "🍇", "👍", "✋️"], answer: "گر صبر کنی ز غوره حلوا سازم" },
        { emojis: ["🟩", "🏠", "🤢", "🍀", "🐍"], answer: "مار از پونه بدش میاد دم خونش سبز میشه" },
        { emojis: ["✅️", "🦊", "👬", "🟡", "🐕"], answer: "سگ زرد برادر شغال است" },
        { emojis: ["❌️", "🦷", "✅️", "🫴", "🪢"], answer: "گره‌ای که با دست باز می‌شود را با دندان باز نمی‌کنند" },
        { emojis: ["✅️", "🫂", "❌️", "🗻", "🗻"], answer: "کوه به کوه نمی‌رسد اما آدم به آدم می‌رسد" },
        { emojis: ["🎶", "🧔", "🐸", "⬆️", "💧"], answer: "آب که سر بالا بره قورباغه ابوعطا میخونه" },
        { emojis: ["❌️", "🥥", "🖐", "👴", "🐒"], answer: "میمون پیر دستش را داخل نارگیل نمی‌کند" },
        { emojis: ["😏", "💰", "❌️", "🙅‍♂️", "😒"], answer: "حسود هرگز نیاسود" },
        { emojis: ["❌", "😏", "✈️", "🪽", "🐜"], answer: "مورچه را به بال پرواز طمع نیست" },
        { emojis: ["❌️", "😲", "👄", "🎁", "🐴"], answer: "اسب هدیه را دهان باز نکن" },
        { emojis: ["❌️", "🤷‍♂️", "💃", "🦶", "🦚"], answer: "طاووس به پای خود رقصیدن بلد نیست" },
        { emojis: ["❌️", "🍯", "❄️", "⬅️", "🐜"], answer: "مورچه در زمستان سراغ عسل نمی‌رود" },
        { emojis: ["✅️", "🏆", "🐢", "😴", "🐇"], answer: "خرگوش خوابید و لاک‌پشت برنده شد" },
        { emojis: ["🐟", "🤔", "👀", "🌊", "🐕"], answer: "سگ به دریا نگاه می‌کند و یاد ماهی می‌کند" },
        { emojis: ["❌️", "🐝", "❌️", "🍯", "✋️"], answer: "دست به عسل نزن تا زنبورت نزند" },
        { emojis: ["✅️", "👨‍🎓", "🏚", "⬅️", "🦉"], answer: "جغد در ویرانه داناست" },
        { emojis: ["❌️", "😟", "🌊", "🦶", "8️⃣"], answer: "هشت پا از موج نمی‌ترسد" },
        { emojis: ["❌️", "😃", "👉", "🏠", "🐌"], answer: "حلزون از خانه خودش راضی نیست" },
        { emojis: ["🤴", "⬅️", "🩸", "🍯", "🐝"], answer: "زنبور عسل را کشتند که شاه آمد" },
        { emojis: ["❌️", "😖", "🐪", "🌊", "🧂"], answer: "نمک دریا را شتر خورد شور نشد" },
        { emojis: ["❌️", "🛏", "👄", "💄", "🐖"], answer: "خوک را با رژ لب به تخت ننشانند" },
        { emojis: ["🪹", "🔥", "📣", "✉️", "🕊"], answer: "کبوتر نامه‌‌بر خبر سوختن لانه خودش را آورد" },
        { emojis: ["🐟", "👈", "🐊", "😢", "🐊"], answer: "تمساح اشک تمساح برای ماهی می‌ریزد" },
        { emojis: ["🦂", "🦂", "🐪", "👞", "🦂"], answer: "عقرب در کفش شتر عقرب‌تر شد" },
        { emojis: ["👉", "🕳", "🤴", "🍞", "🐜"], answer: "مورچه نان شاه را به سوراخ خودش برد" },
        { emojis: ["👓", "👀", "❌️", "🌞", "🦇"], answer: "خفاش آفتاب را ندید عینک زد" },
        { emojis: ["❌️", "🪹", "🔥", "🪽", "🐦"], answer: "پرنده بال سوخته به لانه قدیم نرفت" },
        { emojis: ["✅️", "🤰", "❌️", "🥚", "🐔"], answer: "مرغ تخم نداشت آبستن شد" },
        { emojis: ["❌️", "🤴", "⬅️", "🤲", "🥖"], answer: "نان گدایی را به شاه نمی‌دهند" },
        { emojis: ["🌬", "🧠", "🏠", "🚪", "🐪"], answer: "شتر را به در خانه بستند عقلش به باد رفت" },
        { emojis: ["🥷", "🥚", "🎶", "🌃", "🐔"], answer: "مرغ نصفه شب خواند تخمش را دزدیدند" },
        { emojis: ["🙏🏻", "💫", "🗣", "🌛", "🐚"], answer: "صدف به ماه گفت مروارید از تو قرض کردم" },
        { emojis: ["🍌", "💔", "🤴", "🪞", "🐒"], answer: "میمون آینه شاه را شکست موز خواست" }, 
        { emojis: ["😋", "❌️", "❄️", "🦷", "🍉"], answer: "هندوانه را با دندانه‌ یخ زده نمی‌توان خورد" },
        { emojis: ["🤔", "🧈", "❓️", "🍚", "☝️"], answer: "یک من ماست چقدر کره میده" },
        { emojis: ["❌️", "😖", "🧂", "⬇️", "🧂"], answer: "نمک در نمکدان شوری ندارد" },
        { emojis: ["✅️", "🦊", "🎮", "👴", "🦁"], answer: "شیر که پیر میشه بازیچه شغال میشه" },
        { emojis: ["😄", "1️⃣", "😭", "👁", "1️⃣"], answer: "یک چشم گریان و یک خندان" },
        { emojis: ["❌️", "🎮", "3️⃣", "2️⃣", "1️⃣"], answer: "تا سه نشه بازی نشه" },
        { emojis: ["✅️", "⬅️", "🪑", "⬅️", "🗣"], answer: "حرف خود را به کرسی نشاندن" },
        { emojis: ["✅️", "☘️", "🥘", "👃", "🤯"], answer: "کلش بوی قرمه سبزی میده" },
        { emojis: ["🤢", "👃", "🗣", "🧅", "🧄"], answer: "سیر به پیاز میگه بو میدی" },
        { emojis: ["👌", "👅", "⬅️", "✨️", "❤"], answer: "دل که پاک است زبان بی‌باک است" },          
    ];  

    const tiers = {
        bronze: { name: "برنز", stages: bronzeStages, keySuffix: "bronze" },
        silver: { name: "نقره", stages: silverStages, keySuffix: "silver" },
        gold: { name: "طلا", stages: goldStages, keySuffix: "gold" }
    };
    let currentTier = "bronze";

    let solvedMap = {
        bronze: new Array(bronzeStages.length).fill(false),
        silver: new Array(silverStages.length).fill(false),
        gold: new Array(goldStages.length).fill(false)
    };
    let currentStageMap = {
        bronze: 0,
        silver: 0,
        gold: 0
    };

    const savedSolvedBronze = localStorage.getItem('solvedStages_bronze');
    if (savedSolvedBronze) {
        try { solvedMap.bronze = JSON.parse(savedSolvedBronze); } catch(e) {}
    }
    const savedSolvedSilver = localStorage.getItem('solvedStages_silver');
    if (savedSolvedSilver) {
        try { solvedMap.silver = JSON.parse(savedSolvedSilver); } catch(e) {}
    }
    const savedSolvedGold = localStorage.getItem('solvedStages_gold');
    if (savedSolvedGold) {
        try { solvedMap.gold = JSON.parse(savedSolvedGold); } catch(e) {}
    }

    const savedStageBronze = localStorage.getItem('currentStage_bronze');
    if (savedStageBronze) {
        try { currentStageMap.bronze = parseInt(savedStageBronze, 10) || 0; } catch(e) {}
    }
    const savedStageSilver = localStorage.getItem('currentStage_silver');
    if (savedStageSilver) {
        try { currentStageMap.silver = parseInt(savedStageSilver, 10) || 0; } catch(e) {}
    }
    const savedStageGold = localStorage.getItem('currentStage_gold');
    if (savedStageGold) {
        try { currentStageMap.gold = parseInt(savedStageGold, 10) || 0; } catch(e) {}
    }

    const savedCurrentTier = localStorage.getItem('currentTier');
    if (savedCurrentTier && ['bronze','silver','gold'].includes(savedCurrentTier)) {
        currentTier = savedCurrentTier;
    }

    function getCurrentStages() { return tiers[currentTier].stages; }
    function getCurrentSolved() { return solvedMap[currentTier]; }
    function getCurrentStageIndex() { return currentStageMap[currentTier]; }
    function setCurrentStageIndex(idx) { currentStageMap[currentTier] = idx; saveCurrentTierData(); }
    function setCurrentSolved(arr) { solvedMap[currentTier] = arr; saveCurrentTierData(); }
    function saveCurrentTierData() {
        localStorage.setItem(`solvedStages_${currentTier}`, JSON.stringify(solvedMap[currentTier]));
        localStorage.setItem(`currentStage_${currentTier}`, currentStageMap[currentTier].toString());
        localStorage.setItem("currentTier", currentTier);
    }

    const elements = {
        stageText: document.getElementById('stageText'),
        emojiContainer: document.getElementById('emojiContainer'),
        answerInput: document.getElementById('answerInput'),
        submitBtn: document.getElementById('submitBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        infoBtn: document.getElementById('infoBtn'),
        prevBtn: document.getElementById('prevLevelBtn'),
        nextBtn: document.getElementById('nextLevelBtn'),
        fullResetBtn: document.getElementById('fullResetBtn'),
        musicBtn: document.getElementById('musicBtn'),
        tierBronze: document.getElementById('tierBronzeBtn'),
        tierSilver: document.getElementById('tierSilverBtn'),
        tierGold: document.getElementById('tierGoldBtn'),
        dailyChallengeBtn: document.getElementById('dailyChallengeBtn'),
        answerRevealBtn: document.getElementById('answerRevealBtn')
    };

    const modal = {
        overlay: document.getElementById('modalOverlay'),
        title: document.getElementById('modalTitle'),
        message: document.getElementById('modalMessage'),
        buttons: document.getElementById('modalButtons'),
        currentResolve: null,
        show(title, message, showConfirmButtons = false) {
            this.title.innerText = title;
            this.message.innerText = message;
            this.buttons.innerHTML = '';
            if (showConfirmButtons) {
                const confirmBtn = document.createElement('button');
                confirmBtn.textContent = 'بله';
                confirmBtn.className = 'modal-btn confirm';
                const cancelBtnModal = document.createElement('button');
                cancelBtnModal.textContent = 'خیر';
                cancelBtnModal.className = 'modal-btn cancel';
                this.buttons.appendChild(confirmBtn);
                this.buttons.appendChild(cancelBtnModal);
                return new Promise((resolve) => {
                    this.currentResolve = resolve;
                    const onConfirm = () => { this.close(); resolve(true); cleanup(); };
                    const onCancel = () => { this.close(); resolve(false); cleanup(); };
                    const cleanup = () => {
                        confirmBtn.removeEventListener('click', onConfirm);
                        cancelBtnModal.removeEventListener('click', onCancel);
                    };
                    confirmBtn.addEventListener('click', onConfirm);
                    cancelBtnModal.addEventListener('click', onCancel);
                    this.overlay.classList.add('active');
                });
            } else {
                const closeBtn = document.createElement('button');
                closeBtn.textContent = 'بستن';
                closeBtn.className = 'modal-btn normal';
                closeBtn.addEventListener('click', () => this.close());
                this.buttons.appendChild(closeBtn);
                this.overlay.classList.add('active');
                return Promise.resolve(false);
            }
        },
        close() { this.overlay.classList.remove('active'); if (this.currentResolve) this.currentResolve = null; }
    };
    modal.overlay.addEventListener('click', (e) => { if (e.target === modal.overlay) modal.close(); });

    const internetModal = {
        overlay: document.getElementById('internetModal'),
        retryBtn: document.getElementById('internetRetryBtn'),
        show() {
            this.overlay.classList.add('active');
            return new Promise((resolve) => {
                const onRetry = () => {
                    this.overlay.classList.remove('active');
                    resolve(true);
                    this.retryBtn.removeEventListener('click', onRetry);
                };
                this.retryBtn.addEventListener('click', onRetry);
            });
        },
        close() {
            this.overlay.classList.remove('active');
        }
    };

    const paymentModal = {
        overlay: document.getElementById('paymentModal'),
        confirmBtn: document.getElementById('paymentConfirmBtn'),
        cancelBtn: document.getElementById('paymentCancelBtn'),
        tokenInput: document.getElementById('tokenInput'),
        messageEl: document.getElementById('paymentMessage'),
        currentTier: null,
        show(tier) {
            this.currentTier = tier;
            if (tier === 'silver') {
                this.messageEl.textContent = 'مبلغ 15,000 تومان را به شماره کارت زیر واریز کنید.';
            } else {
                this.messageEl.textContent = 'مبلغ 30,000 تومان را به شماره کارت زیر واریز کنید.';
            }
            this.overlay.classList.add('active');
            this.tokenInput.value = '';
            this.tokenInput.focus();
            return new Promise((resolve) => {
                const onConfirm = () => {
                    this.overlay.classList.remove('active');
                    resolve(true);
                    cleanup();
                };
                const onCancel = () => {
                    this.overlay.classList.remove('active');
                    resolve(false);
                    cleanup();
                };
                const cleanup = () => {
                    this.confirmBtn.removeEventListener('click', onConfirm);
                    this.cancelBtn.removeEventListener('click', onCancel);
                };
                this.confirmBtn.addEventListener('click', onConfirm);
                this.cancelBtn.addEventListener('click', onCancel);
            });
        },
        close() {
            this.overlay.classList.remove('active');
        }
    };
    paymentModal.overlay.addEventListener('click', (e) => { if (e.target === paymentModal.overlay) paymentModal.close(); });

    function isOnline() { return navigator.onLine; }

    let internetCheckInterval = null;
    function startInternetMonitoring() {
        if (internetCheckInterval) clearInterval(internetCheckInterval);
        internetCheckInterval = setInterval(() => {
            if (!isOnline()) {
                if (!internetModal.overlay.classList.contains('active')) {
                    internetModal.show();
                }
            } else {
                if (internetModal.overlay.classList.contains('active')) {
                    internetModal.close();
                }
            }
        }, 1000);
    }

    async function checkInternet() {
        if (!isOnline()) {
            await internetModal.show();
            return false;
        }
        return true;
    }

    async function checkInternetForMusic() {
        if (!isOnline()) {
            await internetModal.show();
            return false;
        }
        return true;
    }

    function normalizeText(str) {
        return str.trim()
                  .replace(/\s+/g, ' ')
                  .replace(/ي/g, 'ی')
                  .replace(/ك/g, 'ک')
                  .replace(/\u200c/g, '')
                  .replace(/\u200d/g, '')
                  .replace(/\u200e/g, '')
                  .replace(/\u200f/g, '');
    }

    function checkFullResetVisibility() {
        const stages = getCurrentStages();
        const solved = getCurrentSolved();
        if (stages.length > 0 && solved.every(v => v === true)) {
            elements.fullResetBtn.classList.remove('hidden');
        } else {
            elements.fullResetBtn.classList.add('hidden');
        }
    }

    function updateArrows() {
        const stages = getCurrentStages();
        const currentIdx = getCurrentStageIndex();
        if (stages.length === 0) {
            elements.prevBtn.classList.add('disabled');
            elements.nextBtn.classList.add('disabled');
            return;
        }
        if (currentIdx === 0) elements.prevBtn.classList.add('disabled');
        else elements.prevBtn.classList.remove('disabled');
        if (currentIdx === stages.length-1 || !getCurrentSolved()[currentIdx]) elements.nextBtn.classList.add('disabled');
        else elements.nextBtn.classList.remove('disabled');
    }

    function loadStage() {
        const stages = getCurrentStages();
        const solved = getCurrentSolved();
        const currentIdx = getCurrentStageIndex();
        const total = stages.length;

        if (total === 0) {
            elements.emojiContainer.innerHTML = '<div class="empty-message">⚡ هنوز چیزی اضافه نشده ⚡</div>';
            elements.stageText.textContent = `مرحله 0 از 0`;
            elements.answerInput.disabled = true;
            elements.submitBtn.disabled = true;
            elements.cancelBtn.disabled = true;
            elements.answerInput.value = '';
            updateArrows();
            checkFullResetVisibility();
            return;
        }

        const stage = stages[currentIdx];
        elements.emojiContainer.innerHTML = '';
        stage.emojis.forEach(emo => {
            const span = document.createElement('span');
            span.textContent = emo;
            elements.emojiContainer.appendChild(span);
        });
        elements.stageText.textContent = `مرحله ${currentIdx+1} از ${total}`;

        const isSolved = solved[currentIdx];
        if (isSolved) {
            elements.answerInput.value = stage.answer;
            elements.answerInput.disabled = true;
            elements.submitBtn.disabled = true;
            elements.cancelBtn.disabled = true;
        } else {
            elements.answerInput.value = '';
            elements.answerInput.disabled = false;
            elements.submitBtn.disabled = false;
            elements.cancelBtn.disabled = false;
            elements.answerInput.focus();
        }
        updateArrows();
        saveCurrentTierData();
        checkFullResetVisibility();
    }

    async function showLockModal(tierName, tierKey) {
        if (!await checkInternet()) return;
        if (unlockedTiers[tierKey]) {
            switchTierInternal(tierKey);
            return;
        }

        const wantToBuy = await modal.show("📋 اطلاعیه", `این سطح قفل می‌باشد.\nآیا مایل به خرید این سطح هستید؟`, true);
        if (!wantToBuy) {
            await modal.show("❌️ انصراف", "شما خرید این سطح را لغو کردید.");
            return;
        }

        let success = false;
        while (!success) {
            const payResult = await paymentModal.show(tierKey);
            if (!payResult) {
                await modal.show("❌️ انصراف", "شما خرید این سطح را لغو کردید.");
                return;
            }
            const token = paymentModal.tokenInput.value.trim();
            if (token.length === 0) {
                paymentModal.close();
                await modal.show("🚫 هشدار", "لطفا کد توکن را وارد کنید.");
                continue;
            }
            if (token === TOKEN_DB[tierKey]) {
                unlockedTiers[tierKey] = true;
                saveUnlockStatus();
                paymentModal.close();
                await modal.show("✅️ موفق", `خرید سطح ${tierName} با موفقیت انجام شد.`);
                switchTierInternal(tierKey);
                success = true;
                break;
            } else {
                paymentModal.close();
                await modal.show("⚠️ خطا", "کد توکن وارد شده اشتباه است.\nلطفا کد توکن صحیح را وارد کنید.");
            }
        }
    }

    function switchTierInternal(tierId) {
        if (tierId === currentTier) return;
        saveCurrentTierData();
        currentTier = tierId;
        document.querySelectorAll('.tier-btn').forEach(btn => btn.classList.remove('active'));
        if (tierId === 'bronze') elements.tierBronze.classList.add('active');
        else if (tierId === 'silver') elements.tierSilver.classList.add('active');
        else if (tierId === 'gold') elements.tierGold.classList.add('active');
        const stagesArr = getCurrentStages();
        if (currentStageMap[currentTier] >= stagesArr.length) currentStageMap[currentTier] = Math.max(0, stagesArr.length-1);
        if (currentStageMap[currentTier] < 0) currentStageMap[currentTier] = 0;
        loadStage();
    }

    function switchTier(tierId) {
        if (tierId === 'silver') {
            showLockModal('نقره', 'silver');
            return;
        }
        if (tierId === 'gold') {
            showLockModal('طلا', 'gold');
            return;
        }
        if (tierId === currentTier) return;
        switchTierInternal(tierId);
    }

    async function fullResetCurrentTier() {
        if (!await checkInternet()) return;
        const stages = getCurrentStages();
        if (stages.length === 0) {
            modal.show("✉️ پیام", "این سطح هنوز مرحله‌ای ندارد. \n بنابراین نمی‌توان ریست کرد.");
            return;
        }
        const confirmed = await modal.show("🚫 هشدار", `آیا از ریست کامل سطح ${tiers[currentTier].name} مطمئن هستید؟\nتمام پیشرفت این سطح پاک می‌شود!`, true);
        if (confirmed) {
            const newSolved = new Array(stages.length).fill(false);
            solvedMap[currentTier] = newSolved;
            currentStageMap[currentTier] = 0;
            saveCurrentTierData();
            loadStage();
            modal.show("📋 اطلاعیه", `سطح ${tiers[currentTier].name} کاملاً ریست شد. \n لطفا از مرحله اول شروع کنید.`);
        }
    }

    async function checkAnswer() {
        if (!await checkInternet()) return;
        const stages = getCurrentStages();
        if (stages.length === 0) { modal.show("✉️ پیام", "این سطح هنوز مرحله‌ای ندارد."); return; }
        const solved = getCurrentSolved();
        const idx = getCurrentStageIndex();
        if (solved[idx]) { modal.show("📫 اطلاعیه", "این مرحله قبلاً حل شده است."); return; }
        const userAnswer = elements.answerInput.value.trim();
        if (userAnswer === "") { modal.show("⚠️ اخطار", "هنوز چیزی وارد نکردید. \n لطفا پاسخ خود را وارد کنید."); return; }
        const correct = stages[idx].answer;
        if (normalizeText(userAnswer) === normalizeText(correct)) {
            solved[idx] = true;
            setCurrentSolved(solved);
            if (idx + 1 === stages.length) {
                modal.show("🎉 تبریک 🎉", `سطح ${tiers[currentTier].name} با موفقیت کامل شد!`);
            } else {
                modal.show("✅ پاسخ درست", `مرحله ${idx+1} حل شد. \n می‌توانید به مرحله بعد بروید.`);
            }
            loadStage();
        } else {
            modal.show("❌ پاسخ نادرست", "پاسخ شما صحیح نیست. \n لطفا دوباره تلاش کنید.");
        }
    }

    function goPrevLevel() {
        const stages = getCurrentStages();
        if (stages.length === 0) return;
        let idx = getCurrentStageIndex();
        if (idx === 0) { modal.show("📢 اطلاعیه", "در اولین مرحله هستید."); return; }
        idx--;
        setCurrentStageIndex(idx);
        loadStage();
    }
    function goNextLevel() {
        const stages = getCurrentStages();
        if (stages.length === 0) return;
        let idx = getCurrentStageIndex();
        const solved = getCurrentSolved();
        if (idx === stages.length-1) { modal.show("📢 اطلاعیه", "در آخرین مرحله هستید."); return; }
        if (!solved[idx]) { modal.show("🔒 قفل", "ابتدا این مرحله را حل کنید."); return; }
        idx++;
        setCurrentStageIndex(idx);
        loadStage();
    }

    function showAnswer() {
        const stages = getCurrentStages();
        if (stages.length === 0) { modal.show("❗️ توجه", "مرحله‌ای وجود ندارد."); return; }
        const solved = getCurrentSolved();
        const idx = getCurrentStageIndex();
        if (solved[idx]) { modal.show("🔔 اعلان", "این مرحله قبلاً حل شده است."); return; }
        modal.show("💡 راهنمایی", `پاسخ صحیح: «${stages[idx].answer}» \n می‌توانید دوباره امتحان کنید.`);
    }

    function showInfo() {
        modal.show("درباره ما", `👤 توسعه دهنده : AmirMahdi.JN\n🆔️ تلگرام : AmirMahdi_2023@\n🆔️ روبیکا : AmirMahdi_2018@\n📞 موبایل : 09918659151`);
    }

    let currentAudio = null, currentPlayingButton = null;
    function initMusic() {
        const musicModalOverlay = document.getElementById('musicModal');
        const closeMusic = document.getElementById('musicCloseBtn');
        const openMusic = elements.musicBtn;
        openMusic.addEventListener('click', () => musicModalOverlay.classList.add('active'));
        closeMusic.addEventListener('click', () => musicModalOverlay.classList.remove('active'));
        musicModalOverlay.addEventListener('click', (e) => { if (e.target === musicModalOverlay) musicModalOverlay.classList.remove('active'); });
        document.querySelectorAll('.music-item').forEach(function(item) {
            const coverEl = item.querySelector('.music-cover');
            const coverUrl = item.dataset.coverUrl;
            if (coverEl && coverUrl) {
                coverEl.innerHTML = '<img src="' + coverUrl + '" alt="cover" style="width:100%;height:100%;object-fit:cover;">';
            }
        });
        const playBtns = document.querySelectorAll('.music-play-btn');
        playBtns.forEach(btn => {
            const musicItem = btn.closest('.music-item');
            const songUrl = musicItem.dataset.songUrl;
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (!await checkInternetForMusic()) return;
                if (currentAudio && currentPlayingButton === btn) {
                    currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null;
                    btn.textContent = '▶'; btn.dataset.playing = 'false'; currentPlayingButton = null;
                    return;
                }
                if (currentAudio) { currentAudio.pause(); if(currentPlayingButton) { currentPlayingButton.textContent = '▶'; currentPlayingButton.dataset.playing = 'false'; } currentAudio = null; currentPlayingButton = null; }
                try {
                    const audio = new Audio(); audio.src = songUrl; audio.loop = false;
                    await audio.play();
                    currentAudio = audio; currentPlayingButton = btn;
                    btn.textContent = '❙❙'; btn.dataset.playing = 'true';
                    audio.addEventListener('ended', () => { if(currentAudio === audio) { btn.textContent = '▶'; btn.dataset.playing = 'false'; currentAudio = null; currentPlayingButton = null; } });
                    audio.addEventListener('error', () => { modal.show("😧 خطا", "پخش آهنگ امکان‌پذیر نیست."); btn.textContent = '▶'; currentAudio = null; currentPlayingButton = null; });
                } catch(err) { modal.show("😧‌ خطا", "مشکلی در پخش آهنگ به وجود آمده است."); btn.textContent = '▶'; }
            });
        });
    }

    const dailyRiddles = [
        { question: "چه اختراعی به شما اجازه می‌دهد که آن طرف دیوار را نگاه کنید؟", answer: "پنجره" },
        { question: "کدام کلید است که هیچ دری را باز نمی‌کند؟", answer: "کلید برق" },
        { question: "دارا آن را ندارد و ندار آن را دارد؟", answer: "نقطه‌" },
        { question: "ورزشکاران برای شکستن آن جایزه می‌گیرند؟", answer: "رکورد" },
        { question: "آن چیست که هم بچه دارد و هم تفنگ دارد؟", answer: "قنداق" },
        { question: "درختی می‌باشد که تا به حال کاشته نشده است؟", answer: "شجره خانوادگی" },
        { question: "روزها می‌دود ولی شب‌ها، جلوی درب خانه نگهبان است؟", answer: "کفش" },
        { question: "آن چیست که وقتی باران می‌بارد، اشک آن نیز روان می‌شود؟‌", answer: "ناودان" },
        { question: "پایان همه چیزهایی است که شروع می‌شود؟", answer: "مرگ" },
        { question: "چه چیزی گردن دارد اما سر ندارد؟", answer: "بطری" }
    ];

    function getDailyChallenge() {
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        const index = dayOfYear % dailyRiddles.length;
        return dailyRiddles[index];
    }

    function getTodayKey() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    }

    let dailySolved = false;
    let dailyTimerInterval = null;

    function initDailyChallenge() {
        const dailyModal = document.getElementById('dailyModal');
        const closeBtn = document.getElementById('dailyCloseBtn');
        const questionEl = document.getElementById('dailyQuestion');
        const timerEl = document.getElementById('dailyTimer');
        const answerInput = document.getElementById('dailyAnswerInput');
        const submitBtn = document.getElementById('dailySubmitBtn');
        const statusEl = document.getElementById('dailyStatus');

        elements.dailyChallengeBtn.addEventListener('click', async () => {
            if (!await checkInternet()) return;
            const todayKey = getTodayKey();
            const stored = localStorage.getItem('dailySolved_' + todayKey);
            dailySolved = (stored === 'true');

            const riddle = getDailyChallenge();
            questionEl.textContent = '◆ ' + riddle.question;

            if (dailySolved) {
                answerInput.disabled = true;
                submitBtn.disabled = true;
                statusEl.textContent = '✅ معمای امروز را با موفقیت به پایان رساندید.';
                statusEl.className = 'daily-status success';
                answerInput.value = '';
            } else {
                answerInput.disabled = false;
                submitBtn.disabled = false;
                statusEl.textContent = '';
                statusEl.className = 'daily-status';
                answerInput.value = '';
                answerInput.focus();
            }

            dailyModal.classList.add('active');
            startDailyTimer(timerEl);
        });

        const closeDaily = () => {
            dailyModal.classList.remove('active');
            if (dailyTimerInterval) {
                clearInterval(dailyTimerInterval);
                dailyTimerInterval = null;
            }
        };
        closeBtn.addEventListener('click', closeDaily);
        dailyModal.addEventListener('click', (e) => {
            if (e.target === dailyModal) closeDaily();
        });

        submitBtn.addEventListener('click', async () => {
            if (dailySolved) {
                statusEl.textContent = '✅ امروز را قبلاً حل کرده‌اید!';
                statusEl.className = 'daily-status success';
                return;
            }
            const userAns = answerInput.value.trim();
            if (userAns === '') {
                statusEl.textContent = '⚠️ لطفاً پاسخ را وارد کنید.';
                statusEl.className = 'daily-status error';
                return;
            }
            const riddle = getDailyChallenge();
            if (normalizeText(userAns) === normalizeText(riddle.answer)) {
                dailySolved = true;
                const todayKey = getTodayKey();
                localStorage.setItem('dailySolved_' + todayKey, 'true');
                answerInput.disabled = true;
                submitBtn.disabled = true;
                statusEl.textContent = '🎉 پاسخ صحیح! چالش امروز را با موفقیت انجام دادید.';
                statusEl.className = 'daily-status success';
            } else {
                statusEl.textContent = '❌ پاسخ غلط! دوباره تلاش کنید.';
                statusEl.className = 'daily-status error';
                answerInput.value = '';
                answerInput.focus();
            }
        });

        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
    }

    function startDailyTimer(timerEl) {
        if (dailyTimerInterval) clearInterval(dailyTimerInterval);
        updateDailyTimer(timerEl);
        dailyTimerInterval = setInterval(() => {
            updateDailyTimer(timerEl);
        }, 1000);
    }

    function updateDailyTimer(timerEl) {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const diffMs = tomorrow - now;
        if (diffMs <= 0) {
            timerEl.textContent = '۰۰:۰۰:۰۰';
            return;
        }
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        timerEl.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    }

    window.addEventListener('online', () => {
        if (internetModal.overlay.classList.contains('active')) {
            internetModal.close();
        }
    });

    window.addEventListener('offline', () => {
        if (!internetModal.overlay.classList.contains('active')) {
            internetModal.show();
        }
    });

    elements.submitBtn.addEventListener('click', checkAnswer);
    elements.cancelBtn.addEventListener('click', () => { if(getCurrentStages().length && !getCurrentSolved()[getCurrentStageIndex()]) elements.answerInput.value = ''; });
    elements.infoBtn.addEventListener('click', showInfo);
    elements.prevBtn.addEventListener('click', goPrevLevel);
    elements.nextBtn.addEventListener('click', goNextLevel);
    elements.fullResetBtn.addEventListener('click', fullResetCurrentTier);
    elements.tierBronze.addEventListener('click', () => switchTier('bronze'));
    elements.tierSilver.addEventListener('click', () => switchTier('silver'));
    elements.tierGold.addEventListener('click', () => switchTier('gold'));
    elements.answerInput.addEventListener('keypress', (e) => { if(e.key === 'Enter' && getCurrentStages().length && !getCurrentSolved()[getCurrentStageIndex()]) checkAnswer(); });
    elements.answerRevealBtn.addEventListener('click', showAnswer);

    startInternetMonitoring();
    initMusic();
    initDailyChallenge();

    if (currentTier === 'bronze') elements.tierBronze.classList.add('active');
    else if (currentTier === 'silver') elements.tierSilver.classList.add('active');
    else elements.tierGold.classList.add('active');
    loadStage();
})();

(function handleSplash() {
    const splash = document.getElementById('splashScreen');
    const gameContainer = document.getElementById('mainGameContainer');
    if (!splash || !gameContainer) return;
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            if (splash && splash.parentNode) splash.remove();
            if (gameContainer) {
                gameContainer.style.display = 'block';
            }
        }, 600);
    }, 3500);
})();

(function initUpdateSystem() {
    'use strict';
    
    if (!('serviceWorker' in navigator)) {
        return;
    }
    
    var newWorker = null;
    var refreshing = false;
    
    var notification = document.getElementById('update-notification');
    var updateNowBtn = document.getElementById('updateNowBtn');
    var updateCloseBtn = document.getElementById('updateCloseBtn');
    
    var USER_VERSION_KEY = '__user_confirmed_version__';
    
    var PROTECTED_KEYS = [
        'unlockedTiers',
        'solvedStages_bronze',
        'solvedStages_silver',
        'solvedStages_gold',
        'currentStage_bronze',
        'currentStage_silver',
        'currentStage_gold',
        'currentTier'
    ];
    
    function backupUserData() {
        var backup = {};
        PROTECTED_KEYS.forEach(function(key) {
            var value = localStorage.getItem(key);
            if (value !== null) {
                backup[key] = value;
            }
        });
        
        Object.keys(localStorage).forEach(function(key) {
            if (key.indexOf('dailySolved_') === 0) {
                backup[key] = localStorage.getItem(key);
            }
        });
        
        try {
            sessionStorage.setItem('__update_backup__', JSON.stringify(backup));
        } catch (e) {}
    }
    
    function restoreUserData() {
        try {
            var backupStr = sessionStorage.getItem('__update_backup__');
            if (!backupStr) return;
            var backup = JSON.parse(backupStr);
            Object.keys(backup).forEach(function(key) {
                if (!localStorage.getItem(key)) {
                    localStorage.setItem(key, backup[key]);
                }
            });
            sessionStorage.removeItem('__update_backup__');
        } catch (e) {}
    }
    
    restoreUserData();
    
    function getUserConfirmedVersion() {
        return localStorage.getItem(USER_VERSION_KEY) || null;
    }
    
    function setUserConfirmedVersion(version) {
        if (version) {
            localStorage.setItem(USER_VERSION_KEY, version);
        }
    }
    
    function askVersionFromController() {
        return new Promise(function(resolve) {
            if (!navigator.serviceWorker.controller) {
                resolve(null);
                return;
            }
            var messageChannel = new MessageChannel();
            var resolved = false;
            
            messageChannel.port1.onmessage = function(event) {
                if (resolved) return;
                resolved = true;
                if (event.data && event.data.version) {
                    resolve(event.data.version);
                } else {
                    resolve(null);
                }
            };
            
            try {
                navigator.serviceWorker.controller.postMessage(
                    { type: 'GET_VERSION' },
                    [messageChannel.port2]
                );
            } catch (e) {
                resolve(null);
            }
            
            setTimeout(function() {
                if (!resolved) {
                    resolved = true;
                    resolve(null);
                }
            }, 800);
        });
    }
    
    function askVersionFromWorker(worker) {
        return new Promise(function(resolve) {
            if (!worker) {
                resolve(null);
                return;
            }
            var messageChannel = new MessageChannel();
            var resolved = false;
            
            messageChannel.port1.onmessage = function(event) {
                if (resolved) return;
                resolved = true;
                if (event.data && event.data.version) {
                    resolve(event.data.version);
                } else {
                    resolve(null);
                }
            };
            
            try {
                worker.postMessage(
                    { type: 'GET_VERSION' },
                    [messageChannel.port2]
                );
            } catch (e) {
                resolve(null);
            }
            
            setTimeout(function() {
                if (!resolved) {
                    resolved = true;
                    resolve(null);
                }
            }, 800);
        });
    }
    
    function showNotification() {
        if (!notification) return;
        notification.classList.add('show');
    }
    
    function hideNotification() {
        if (!notification) return;
        notification.classList.remove('show');
    }
    
    function checkForRealUpdate(registration) {
        var promises = [];
        
        if (registration.waiting) {
            promises.push(
                askVersionFromWorker(registration.waiting).then(function(version) {
                    return { source: 'waiting', version: version, worker: registration.waiting };
                })
            );
        }
        
        promises.push(
            askVersionFromController().then(function(version) {
                return { source: 'controller', version: version, worker: null };
            })
        );
        
        return Promise.all(promises).then(function(results) {
            var waitingResult = null;
            var controllerResult = null;
            
            results.forEach(function(r) {
                if (r.source === 'waiting') waitingResult = r;
                if (r.source === 'controller') controllerResult = r;
            });
            
            var waitingVersion = waitingResult ? waitingResult.version : null;
            var controllerVersion = controllerResult ? controllerResult.version : null;
            var userVersion = getUserConfirmedVersion();
            
            console.log('[Update] waiting:', waitingVersion, '| controller:', controllerVersion, '| user:', userVersion);
            
            if (waitingVersion) {
                newWorker = waitingResult.worker;
                showNotification();
                return;
            }
            
            if (!controllerVersion) {
                return;
            }
            
            if (!userVersion) {
                setUserConfirmedVersion(controllerVersion);
                return;
            }
            
            if (controllerVersion !== userVersion) {
                console.log('[Update] نسخه فعال با نسخه تأیید شده فرق دارد — نمایش نوتیف');
                newWorker = null;
                showNotification();
            }
        });
    }
    
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./service-worker.js')
            .then(function(registration) {
                console.log('[Update] Service Worker ثبت شد');
                
                setTimeout(function() {
                    checkForRealUpdate(registration);
                }, 1500);
                
                registration.addEventListener('updatefound', function() {
                    var installingWorker = registration.installing;
                    if (!installingWorker) return;
                    
                    installingWorker.addEventListener('statechange', function() {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                newWorker = installingWorker;
                                showNotification();
                            }
                        }
                    });
                });
            })
            .catch(function(err) {
                console.warn('Service Worker registration failed:', err);
            });
        
        navigator.serviceWorker.addEventListener('controllerchange', function() {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
        
        navigator.serviceWorker.ready.then(function(registration) {
            setTimeout(function() {
                checkForRealUpdate(registration);
            }, 2000);
        });
    });
    
    if (updateCloseBtn) {
        updateCloseBtn.addEventListener('click', function() {
            hideNotification();
        });
    }
    
    if (updateNowBtn) {
        updateNowBtn.addEventListener('click', function() {
            backupUserData();
            
            updateNowBtn.textContent = 'در حال آپدیت...';
            updateNowBtn.disabled = true;
            if (updateCloseBtn) updateCloseBtn.disabled = true;
            
            askVersionFromController().then(function(activeVersion) {
                var targetVersion = activeVersion;
                
                if (newWorker) {
                    askVersionFromWorker(newWorker).then(function(waitingVersion) {
                        if (waitingVersion) targetVersion = waitingVersion;
                        
                        if (targetVersion) setUserConfirmedVersion(targetVersion);
                        
                        setTimeout(function() {
                            if (newWorker) {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                            } else {
                                window.location.reload();
                            }
                        }, 300);
                    });
                } else {
                    if (targetVersion) setUserConfirmedVersion(targetVersion);
                    setTimeout(function() {
                        window.location.reload();
                    }, 300);
                }
            });
        });
    }
    
    window.forceShowUpdate = function() {
        showNotification();
    };
    
    window.resetUpdateDismiss = function() {
        localStorage.removeItem(USER_VERSION_KEY);
        console.log('نسخه تأیید شده پاک شد');
    };
    
    window.checkUpdateNow = function() {
        return navigator.serviceWorker.getRegistration().then(function(reg) {
            if (reg) {
                return checkForRealUpdate(reg);
            }
        });
    };
    
    window.showUpdateState = function() {
        Promise.all([
            askVersionFromController(),
            navigator.serviceWorker.getRegistration().then(function(r) {
                return r && r.waiting ? askVersionFromWorker(r.waiting) : null;
            })
        ]).then(function(results) {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('نسخه فعال:', results[0]);
            console.log('نسخه در انتظار:', results[1]);
            console.log('نسخه تأیید شده کاربر:', getUserConfirmedVersion());
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
        });
    };
    
})();
