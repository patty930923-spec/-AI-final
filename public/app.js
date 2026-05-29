const storageKeys = {
  language: "oasis_language",
  dew: "oasis_dew_balance",
  checkins: "oasis_weekly_checkins",
  goal: "oasis_goal",
  journal: "oasis_journal_entries",
  customQuests: "oasis_custom_quests",
  activeQuest: "oasis_active_quest",
  profile: "oasis_profile",
  avatarLook: "oasis_avatar_look",
  oasisWeather: "oasis_weather",
  oasisMood: "oasis_mood",
  shopOwned: "oasis_shop_owned",
};

function getApiBase() {
  return (window.OASIS_CONFIG?.apiBase || "").replace(/\/$/, "");
}

function apiUrl(path) {
  const base = getApiBase();
  return base ? `${base}${path}` : path;
}

const CHECKIN_EMOJIS = ["😌", "🙂", "🌤", "✨", "🌿", "😴", "💪", "🫶", "🌧", "🎉"];
const CHECKIN_DEW = 5;
const DAY_LABELS = { en: ["M", "T", "W", "T", "F", "S", "S"], zh: ["一", "二", "三", "四", "五", "六", "日"] };

const translations = {
  en: {
    pageTitles: { home: "Home", quest: "Quest", journal: "Journal", journey: "Journey", profile: "Profile" },
    nav: { home: "Home", quest: "Quest", journal: "Journal", journey: "Journey", profile: "Profile" },
    oasisTone: "Oasis tone", weatherMood: "Weather + mood", weather: "Weather", mood: "Mood",
    weeklyCheckin: "Weekly check-in", oneCircleDay: "One circle a day",
    myGoal: "My Goal", goalTitle: "Goal title", goalDetail: "Details", saveGoal: "Save goal", saved: "Saved",
    partyMission: "Party mission", seeMission: "See mission", journal: "Journal", writeOneLine: "Write for today", open: "Open",
    questTab: "Quest", cardTab: "Card", shopTab: "Shop",
    themeOfWeek: "Theme of the week", currentQuest: "My current quest", logProgress: "Log progress", leaveQuest: "Leave quest",
    thisWeekQuests: "This week's quests", gentleQuests: "Gentle quests", join: "Join", joined: "Joined",
    createOwn: "Create your own", fitYourPace: "Make it fit your pace",
    questName: "Quest name", questDesc: "Description", friends: "Friends", rewardDew: "Reward (dew)", createQuest: "Create quest with friends",
    companionCard: "Companion card", sageSprout: "Sage Sprout", cardHint: "Collect dew from check-ins and quests to grow your oasis.",
    dewShop: "Dew drop shop", spendGlow: "Spend your glow", buy: "Buy", owned: "Owned",
    dailyNote: "Daily note", whatFeltSoft: "What felt soft today?", journalHint: "Write freely. Your words stay on this device.",
    yourEntry: "Your entry", entryTitle: "Title (optional)", saveEntry: "Save entry", clearDraft: "Clear",
    weeklyArchive: "Weekly archive", tapDay: "Tap a day", noEntryYet: "No entry for this day yet.",
    thisWeek: "This week", journeySnapshot: "Journey snapshot",
    journeyPlaceholder: "Connect movement logs later. For now, track goals and journal here.",
    profile: "Profile", displayName: "Display name", bio: "Short bio", saveProfile: "Save profile",
    avatarStudio: "Avatar studio", dressOasis: "Dress your oasis self",
    appSettings: "App settings", languageAi: "Language + AI", language: "Language", languageTitle: "App language",
    aiServer: "AI server", aiServerHint: "Public demo: you host on OZ, API key stays on Vercel. Visitors do not need a key.",
    aiChecking: "Checking…", aiReady: "Ready", aiNotConfigured: "Not configured on server",
    aiOffline: "API unavailable", aiOfflineHint: "Run npm start locally, or deploy with server + env vars.",
    privacy: "Privacy", diaryPrivate: "Diary stays on device",
    checkinToday: "Tap today to pick an emoji and earn dew.",
    checkinDone: "Checked in! +{n} dew",
    checkinFuture: "This day hasn't arrived yet.",
    checkinPastMissed: "Past day — you can still log a mood.",
    pickEmoji: "Choose your mood",
    daysLeft: (n) => `${n} days left`,
    dewReward: (n) => `+${n} dew`,
    noActiveQuest: "Join a quest below to start.",
    heroReady: "Your gentle oasis is ready.",
    heroSub: "Tiny steps. Softer days.",
    weatherLabels: { sunny: "Sunny", rainy: "Rainy", moonlit: "Moonlit" },
    moodLabels: { calm: "Calm", fresh: "Fresh", cozy: "Cozy" },
    avatarLooks: { sage: "Sage calm", dune: "Dune glow", moon: "Moon mist" },
    journeyCheckins: "Check-ins", journeyJournal: "Journal days", journeyDew: "Dew earned",
    customQuestTag: (n) => `party ${n}`,
    deleteQuest: "Remove",
  },
  zh: {
    pageTitles: { home: "首頁", quest: "任務", journal: "日記", journey: "歷程", profile: "個人" },
    nav: { home: "首頁", quest: "任務", journal: "日記", journey: "歷程", profile: "個人" },
    oasisTone: "綠洲氛圍", weatherMood: "天氣與心情", weather: "天氣", mood: "心情",
    weeklyCheckin: "每週打卡", oneCircleDay: "一天一個圓圈",
    myGoal: "我的目標", goalTitle: "目標標題", goalDetail: "補充說明", saveGoal: "儲存目標", saved: "已儲存",
    partyMission: "揪團任務", seeMission: "查看任務", journal: "日記", writeOneLine: "寫下今天", open: "開啟",
    questTab: "任務", cardTab: "卡片", shopTab: "商店",
    themeOfWeek: "本週主題", currentQuest: "進行中任務", logProgress: "記錄進度", leaveQuest: "離開任務",
    thisWeekQuests: "本週任務", gentleQuests: "溫和挑戰", join: "加入", joined: "已加入",
    createOwn: "自己建立", fitYourPace: "依你的節奏訂製",
    questName: "任務名稱", questDesc: "任務說明", friends: "朋友人數", rewardDew: "獎勵（露珠）", createQuest: "建立揪團任務",
    companionCard: "夥伴卡", sageSprout: "嫩芽夥伴", cardHint: "透過打卡與任務收集露珠，讓綠洲成長。",
    dewShop: "露珠商店", spendGlow: "兌換小物", buy: "兌換", owned: "已擁有",
    dailyNote: "每日札記", whatFeltSoft: "今天哪裡比較柔軟？", journalHint: "自由書寫，內容只存在這台裝置。",
    yourEntry: "今日內容", entryTitle: "標題（選填）", saveEntry: "儲存日記", clearDraft: "清除",
    weeklyArchive: "本週回顧", tapDay: "點選日期", noEntryYet: "這天還沒有日記。",
    thisWeek: "本週", journeySnapshot: "歷程一覽",
    journeyPlaceholder: "之後可串接運動紀錄；目前先從目標與日記開始。",
    profile: "個人", displayName: "顯示名稱", bio: "一句話介紹", saveProfile: "儲存個人資料",
    avatarStudio: "角色工作室", dressOasis: "打扮你的綠洲自我",
    appSettings: "應用設定", languageAi: "語言與 AI", language: "語言", languageTitle: "介面語言",
    aiServer: "AI 伺服器", aiServerHint: "公開給大家用：網頁在 OZ，金鑰只在 Vercel。訪客不需申請 API Key。",
    aiChecking: "檢查中…", aiReady: "已就緒", aiNotConfigured: "伺服器尚未設定金鑰",
    aiOffline: "無法連線 API", aiOfflineHint: "本機請執行 npm start；上線請用含後端的部署方式。",
    privacy: "隱私", diaryPrivate: "日記僅存於本機",
    checkinToday: "點選今天，選一個 emoji 並獲得露珠。",
    checkinDone: "打卡完成！+{n} 露珠",
    checkinFuture: "這天還沒到喔。",
    checkinPastMissed: "過去的日期，仍可補登心情。",
    pickEmoji: "選擇你的心情",
    daysLeft: (n) => `剩 ${n} 天`,
    dewReward: (n) => `+${n} 露珠`,
    noActiveQuest: "從下方加入一個任務開始吧。",
    heroReady: "你的溫柔綠洲準備好了。",
    heroSub: "小步前進，日子更柔軟。",
    weatherLabels: { sunny: "晴天", rainy: "雨天", moonlit: "月夜" },
    moodLabels: { calm: "平靜", fresh: "清新", cozy: "溫暖" },
    avatarLooks: { sage: "鼠尾草晨霧", dune: "暖沙微光", moon: "月色薄霧" },
    journeyCheckins: "本週打卡", journeyJournal: "日記天數", journeyDew: "累積露珠",
    customQuestTag: (n) => `揪團 ${n} 人`,
    deleteQuest: "刪除",
  },
};

const weeklyQuestThemes = [
  { title: { en: "Spring Reset Party", zh: "春日重整派對" }, copy: { en: "Fresh air, easy wins, water breaks with friends.", zh: "清新空氣、輕鬆小勝利，和朋友一起補水。" }, tags: { en: ["soft reset", "group friendly", "+ dew"], zh: ["柔和重整", "適合揪團", "+ 露珠"] } },
  { title: { en: "Moonlight Walk Week", zh: "月光散步週" }, copy: { en: "Evening strolls and quiet conversations.", zh: "傍晚散步與輕聲聊天。" }, tags: { en: ["evening", "calm", "+ dew"], zh: ["傍晚", "平靜", "+ 露珠"] } },
  { title: { en: "Hydration Circle", zh: "補水圈圈" }, copy: { en: "Six cups a day, cheer each other on.", zh: "每天六杯水，互相加油。" }, tags: { en: ["hydration", "party", "+ dew"], zh: ["補水", "揪團", "+ 露珠"] } },
  { title: { en: "Stretch & Tea", zh: "伸展與茶" }, copy: { en: "Short stretches, longer pauses.", zh: "短伸展、長休息。" }, tags: { en: ["mind-body", "cozy", "+ dew"], zh: ["身心", "溫暖", "+ 露珠"] } },
];

const weeklyQuestPool = [
  [
    { id: "walk-party", title: { en: "Party Walk", zh: "揪團散步" }, copy: { en: "5 friends, 10 km shared goal.", zh: "5 位朋友，共同 10 公里。" }, reward: 30, days: 7, tags: { en: ["party 5", "7 days"], zh: ["揪團 5", "7 天"] } },
    { id: "water", title: { en: "Drink Water Challenge", zh: "喝水挑戰" }, copy: { en: "6 cups a day with your circle.", zh: "每天 6 杯水，和圈圈一起。" }, reward: 20, days: 7, tags: { en: ["party", "hydration"], zh: ["揪團", "補水"] } },
    { id: "stretch", title: { en: "Moonlight Stretch", zh: "月光伸展" }, copy: { en: "3 calm sessions after 8 pm.", zh: "晚上 8 點後，3 次溫和伸展。" }, reward: 18, days: 5, tags: { en: ["solo", "mind-body"], zh: ["個人", "身心"] } },
  ],
  [
    { id: "sunrise", title: { en: "Sunrise Steps", zh: "日出步數" }, copy: { en: "Morning walks, 3 times this week.", zh: "本週晨走 3 次。" }, reward: 22, days: 7, tags: { en: ["morning", "walk"], zh: ["早晨", "散步"] } },
    { id: "gratitude", title: { en: "Gratitude Chain", zh: "感謝接力" }, copy: { en: "Share one line with friends daily.", zh: "每天和朋友交換一句話。" }, reward: 16, days: 7, tags: { en: ["social", "journal"], zh: ["社交", "日記"] } },
    { id: "badminton", title: { en: "Court Meetup", zh: "球場小聚" }, copy: { en: "2 sessions, any racket sport.", zh: "2 次場地運動，羽球亦可。" }, reward: 25, days: 7, tags: { en: ["party", "sport"], zh: ["揪團", "運動"] } },
  ],
  [
    { id: "tea-walk", title: { en: "Tea Walk", zh: "茶後散步" }, copy: { en: "Post-tea 20 min walks, 4 days.", zh: "喝完茶散步 20 分鐘，共 4 天。" }, reward: 20, days: 7, tags: { en: ["cozy", "walk"], zh: ["溫暖", "散步"] } },
    { id: "read", title: { en: "Quiet Read", zh: "安靜閱讀" }, copy: { en: "15 min reading, no phone.", zh: "15 分鐘閱讀，不看手機。" }, reward: 14, days: 5, tags: { en: ["solo", "rest"], zh: ["個人", "休息"] } },
    { id: "cook", title: { en: "Cook Together", zh: "一起下廚" }, copy: { en: "One shared meal with friends.", zh: "和朋友共做一餐。" }, reward: 24, days: 7, tags: { en: ["party", "food"], zh: ["揪團", "飲食"] } },
  ],
  [
    { id: "bike", title: { en: "Easy Ride", zh: "輕鬆騎行" }, copy: { en: "15 km total, any pace.", zh: "累計 15 公里，不限速度。" }, reward: 28, days: 7, tags: { en: ["outdoor", "cardio"], zh: ["戶外", "有氧"] } },
    { id: "stretch-am", title: { en: "Morning Stretch", zh: "晨間伸展" }, copy: { en: "5 min stretch, 5 mornings.", zh: "5 個早晨，各 5 分鐘伸展。" }, reward: 18, days: 5, tags: { en: ["solo", "morning"], zh: ["個人", "早晨"] } },
    { id: "call", title: { en: "Voice Check-in", zh: "語音問候" }, copy: { en: "Call a friend twice this week.", zh: "本週打電話關心朋友 2 次。" }, reward: 15, days: 7, tags: { en: ["social", "care"], zh: ["社交", "關懷"] } },
  ],
];

const shopItems = [
  { id: "moss-cape", name: { en: "Moss cape", zh: "苔披風" }, cost: 40 },
  { id: "dune-bg", name: { en: "Dune backdrop", zh: "沙丘背景" }, cost: 55 },
  { id: "moon-badge", name: { en: "Moon badge", zh: "月亮徽章" }, cost: 24 },
  { id: "bloom-clip", name: { en: "Bloom clip", zh: "花苞髮夾" }, cost: 30 },
];

let currentPage = "home";
let currentLanguage = "zh";
let dewBalance = 0;
let weekCheckins = [];
let selectedCheckinIndex = null;
let customQuests = [];
let activeQuest = null;
let journalEntries = {};
let profile = { name: "旅人", bio: "" };
let currentAvatarLook = "sage";
let currentWeather = "sunny";
let currentOasisMood = "calm";
let shopOwned = [];
let selectedArchiveDate = null;

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getCopy() {
  return translations[currentLanguage];
}

function t(key, vars = {}) {
  const val = getCopy()[key];
  if (typeof val === "function") {
    let s = val(vars.n ?? vars.count ?? 0);
    Object.entries(vars).forEach(([k, v]) => {
      s = s.replace(`{${k}}`, String(v));
    });
    return s;
  }
  if (typeof val === "string") {
    return Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, String(v)), val);
  }
  return val ?? key;
}

function getWeekId(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getFullYear()}-W${weekNo}`;
}

function getWeekIndex() {
  const id = getWeekId();
  const num = Number(id.split("-W")[1]) || 1;
  return num;
}

function getMondayOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDateKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getTodayIndex() {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}

function localizeQuest(item) {
  return {
    ...item,
    title: item.title[currentLanguage] ?? item.title.en,
    copy: item.copy[currentLanguage] ?? item.copy.en,
    tags: item.tags[currentLanguage] ?? item.tags.en,
  };
}

function getWeeklyTheme() {
  const idx = getWeekIndex() % weeklyQuestThemes.length;
  const theme = weeklyQuestThemes[idx];
  return {
    title: theme.title[currentLanguage],
    copy: theme.copy[currentLanguage],
    tags: theme.tags[currentLanguage],
  };
}

function getWeeklyQuests() {
  const poolIdx = getWeekIndex() % weeklyQuestPool.length;
  return weeklyQuestPool[poolIdx].map(localizeQuest);
}

function loadState() {
  currentLanguage = window.localStorage.getItem(storageKeys.language) || (navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en");
  dewBalance = Number(window.localStorage.getItem(storageKeys.dew)) || 0;

  const storedCheckins = readJson(storageKeys.checkins, {});
  const weekId = getWeekId();
  weekCheckins = storedCheckins[weekId] || Array(7).fill(null);

  customQuests = readJson(storageKeys.customQuests, []);
  activeQuest = readJson(storageKeys.activeQuest, null);
  journalEntries = readJson(storageKeys.journal, {});
  profile = readJson(storageKeys.profile, { name: "旅人", bio: "" });
  currentAvatarLook = window.localStorage.getItem(storageKeys.avatarLook) || "sage";
  currentWeather = window.localStorage.getItem(storageKeys.oasisWeather) || "sunny";
  currentOasisMood = window.localStorage.getItem(storageKeys.oasisMood) || "calm";
  shopOwned = readJson(storageKeys.shopOwned, []);

  const goal = readJson(storageKeys.goal, null);
  if (goal) {
    document.getElementById("goalTitleInput").value = goal.title || "";
    document.getElementById("goalCopyInput").value = goal.copy || "";
  }

  document.getElementById("profileNameInput").value = profile.name || "";
  document.getElementById("profileBioInput").value = profile.bio || "";

  window.localStorage.removeItem("oasis_api_key");
}

function saveCheckins() {
  const all = readJson(storageKeys.checkins, {});
  all[getWeekId()] = weekCheckins;
  writeJson(storageKeys.checkins, all);
}

function setDew(next) {
  dewBalance = Math.max(0, next);
  window.localStorage.setItem(storageKeys.dew, String(dewBalance));
  document.getElementById("dewBalance").textContent = String(dewBalance);
  document.getElementById("shopDewBalance").textContent = `${dewBalance} dew`;
}

function addDew(amount) {
  setDew(dewBalance + amount);
}

function setActivePage(nextPage) {
  currentPage = nextPage;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.pageTarget === nextPage);
  });
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.dataset.page === nextPage);
  });
  document.getElementById("pageTitle").textContent = getCopy().pageTitles[nextPage];
  if (nextPage === "journal") {
    loadJournalEditorForDate(formatDateKey(new Date()));
  }
}

function applyI18n() {
  const copy = getCopy();
  document.getElementById("pageTitle").textContent = copy.pageTitles[currentPage];
  document.querySelectorAll("[data-nav-label]").forEach((el) => {
    el.textContent = copy.nav[el.dataset.navLabel];
  });
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (copy[key]) el.textContent = copy[key];
  });
  document.getElementById("languageTitle").textContent = copy.languageTitle;
  document.getElementById("checkinRewardHint").textContent = `+${CHECKIN_DEW} dew / day`;
  document.getElementById("heroHeadline").textContent = copy.heroReady;
  document.getElementById("heroSubtext").textContent = copy.heroSub;
  renderHeroTheme();
  renderCheckinRow();
  renderQuests();
  renderShop();
  renderJourney();
  applyAvatarLook(currentAvatarLook);
}

function applyLanguage(nextLanguage) {
  currentLanguage = nextLanguage;
  window.localStorage.setItem(storageKeys.language, currentLanguage);
  document.querySelectorAll("[data-language]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.language === currentLanguage);
  });
  applyI18n();
}

function renderHeroTheme() {
  const copy = getCopy();
  const hero = document.getElementById("homeHero");
  hero.classList.remove("weather-sunny", "weather-rainy", "weather-moonlit", "mood-calm", "mood-fresh", "mood-cozy");
  hero.classList.add(`weather-${currentWeather}`, `mood-${currentOasisMood}`);
  document.getElementById("heroThemePill").textContent = `${copy.weatherLabels[currentWeather]} · ${copy.moodLabels[currentOasisMood]}`;
  document.querySelectorAll("[data-weather]").forEach((btn) => {
    btn.textContent = copy.weatherLabels[btn.dataset.weather];
    btn.classList.toggle("active", btn.dataset.weather === currentWeather);
  });
  document.querySelectorAll("[data-oasis-mood]").forEach((btn) => {
    btn.textContent = copy.moodLabels[btn.dataset.oasisMood];
    btn.classList.toggle("active", btn.dataset.oasisMood === currentOasisMood);
  });
  document.getElementById("heroGreeting").textContent = `${currentLanguage === "zh" ? "嗨" : "Hi"}, ${profile.name || "旅人"}`;
}

function renderCheckinRow() {
  const row = document.getElementById("homeMoodRow");
  const labels = DAY_LABELS[currentLanguage];
  const todayIdx = getTodayIndex();
  row.innerHTML = "";

  for (let i = 0; i < 7; i += 1) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mood-dot";
    btn.dataset.dayIndex = String(i);
    const emoji = weekCheckins[i];
    if (emoji) {
      btn.classList.add("done");
      btn.innerHTML = `<span>${labels[i]}</span><small>${emoji}</small>`;
    } else {
      btn.innerHTML = `<span>${labels[i]}</span><small>${i === todayIdx ? "·" : "+"}</small>`;
      if (i === todayIdx) btn.classList.add("active");
    }
    btn.addEventListener("click", () => onCheckinDayClick(i));
    row.appendChild(btn);
  }

  const note = document.getElementById("checkinNote");
  if (weekCheckins[todayIdx]) {
    note.textContent = t("checkinDone", { n: CHECKIN_DEW });
  } else {
    note.textContent = t("checkinToday");
  }
}

function showEmojiPicker(dayIndex) {
  selectedCheckinIndex = dayIndex;
  const picker = document.getElementById("emojiPicker");
  picker.innerHTML = "";
  picker.classList.remove("hidden");
  CHECKIN_EMOJIS.forEach((emoji) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "emoji-choice";
    btn.textContent = emoji;
    btn.addEventListener("click", () => completeCheckin(dayIndex, emoji));
    picker.appendChild(btn);
  });
}

function hideEmojiPicker() {
  document.getElementById("emojiPicker").classList.add("hidden");
  selectedCheckinIndex = null;
}

function onCheckinDayClick(dayIndex) {
  const todayIdx = getTodayIndex();
  if (dayIndex > todayIdx) {
    document.getElementById("checkinNote").textContent = t("checkinFuture");
    hideEmojiPicker();
    return;
  }
  if (weekCheckins[dayIndex]) {
    document.getElementById("checkinNote").textContent = `${weekCheckins[dayIndex]} ${currentLanguage === "zh" ? "已打卡" : "checked in"}`;
    hideEmojiPicker();
    return;
  }
  if (dayIndex < todayIdx) {
    document.getElementById("checkinNote").textContent = t("checkinPastMissed");
  }
  showEmojiPicker(dayIndex);
}

function completeCheckin(dayIndex, emoji) {
  if (weekCheckins[dayIndex]) return;
  weekCheckins[dayIndex] = emoji;
  saveCheckins();
  addDew(CHECKIN_DEW);
  hideEmojiPicker();
  renderCheckinRow();
  renderJourney();
}

function saveGoal() {
  const title = document.getElementById("goalTitleInput").value.trim();
  const copy = document.getElementById("goalCopyInput").value.trim();
  writeJson(storageKeys.goal, { title, copy });
  const badge = document.getElementById("goalSaveBadge");
  badge.hidden = false;
  badge.textContent = t("saved");
  window.setTimeout(() => {
    badge.hidden = true;
  }, 1200);
}

function renderQuests() {
  const theme = getWeeklyTheme();
  document.getElementById("weeklyThemeTitle").textContent = theme.title;
  document.getElementById("weeklyThemeCopy").textContent = theme.copy;
  const tagsEl = document.getElementById("weeklyThemeTags");
  tagsEl.innerHTML = theme.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

  const list = document.getElementById("weeklyQuestList");
  list.innerHTML = "";
  const quests = [...getWeeklyQuests(), ...customQuests.map((q) => ({ ...q, isCustom: true }))];

  quests.forEach((quest) => {
    const card = document.createElement("article");
    card.className = "card quest-card";
    const joined = activeQuest?.id === quest.id;
    const tags = (quest.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join("");
    card.innerHTML = `
      <div class="quest-card-top">
        <div>
          <h4>${quest.title}</h4>
          <p>${quest.copy}</p>
        </div>
        <span class="reward">${t("dewReward", { n: quest.reward })}</span>
      </div>
      <div class="tag-row">${tags}</div>
      <button class="${joined ? "secondary-btn" : "primary-btn"} join-btn full-width" type="button">${joined ? t("joined") : t("join")}</button>
    `;
    card.querySelector(".join-btn").addEventListener("click", () => {
      if (joined) return;
      joinQuest(quest);
    });
    list.appendChild(card);
  });

  renderActiveQuest();
  renderCustomQuestList();
  updateHomePartyCard();
}

function joinQuest(quest) {
  activeQuest = {
    id: quest.id,
    title: quest.title,
    copy: quest.copy,
    reward: quest.reward,
    days: quest.days || 7,
    progress: 0,
    target: 100,
    isCustom: Boolean(quest.isCustom),
    friends: quest.friends,
  };
  writeJson(storageKeys.activeQuest, activeQuest);
  renderQuests();
}

function leaveQuest() {
  activeQuest = null;
  writeJson(storageKeys.activeQuest, null);
  renderQuests();
}

function logQuestProgress() {
  if (!activeQuest) return;
  activeQuest.progress = Math.min(activeQuest.target, (activeQuest.progress || 0) + 20);
  if (activeQuest.progress >= activeQuest.target) {
    addDew(activeQuest.reward);
    activeQuest = null;
    writeJson(storageKeys.activeQuest, null);
  } else {
    writeJson(storageKeys.activeQuest, activeQuest);
  }
  renderQuests();
}

function renderActiveQuest() {
  const titleEl = document.getElementById("activeQuestTitle");
  const copyEl = document.getElementById("activeQuestCopy");
  const daysEl = document.getElementById("activeQuestDays");
  const progressEl = document.getElementById("activeQuestProgress");
  const rewardEl = document.getElementById("activeQuestReward");
  const fillEl = document.getElementById("activeQuestFill");
  const leaveBtn = document.getElementById("leaveQuestBtn");
  const logBtn = document.getElementById("questProgressBtn");

  if (!activeQuest) {
    titleEl.textContent = "—";
    copyEl.textContent = t("noActiveQuest");
    daysEl.textContent = "";
    progressEl.textContent = "";
    rewardEl.textContent = "";
    fillEl.style.width = "0%";
    leaveBtn.disabled = true;
    logBtn.disabled = true;
    return;
  }

  titleEl.textContent = activeQuest.title;
  copyEl.textContent = activeQuest.copy;
  daysEl.textContent = t("daysLeft", { n: activeQuest.days || 7 });
  const pct = Math.round(((activeQuest.progress || 0) / activeQuest.target) * 100);
  fillEl.style.width = `${pct}%`;
  progressEl.textContent = `${pct}%`;
  rewardEl.textContent = t("dewReward", { n: activeQuest.reward });
  leaveBtn.disabled = false;
  logBtn.disabled = false;
}

function updateHomePartyCard() {
  const titleEl = document.getElementById("homeQuestTitle");
  const copyEl = document.getElementById("homeQuestCopy");
  const rewardEl = document.getElementById("homeQuestReward");
  if (activeQuest) {
    titleEl.textContent = activeQuest.title;
    copyEl.textContent = activeQuest.copy;
    rewardEl.textContent = t("dewReward", { n: activeQuest.reward });
  } else {
    const first = getWeeklyQuests()[0];
    if (first) {
      titleEl.textContent = first.title;
      copyEl.textContent = first.copy;
      rewardEl.textContent = t("dewReward", { n: first.reward });
    }
  }
}

function renderCustomQuestList() {
  const container = document.getElementById("customQuestList");
  container.innerHTML = "";
  customQuests.forEach((quest) => {
    const row = document.createElement("div");
    row.className = "custom-quest-item";
    row.innerHTML = `
      <div>
        <strong>${quest.title}</strong>
        <p class="micro-note">${quest.copy}</p>
        <span class="tag">${t("customQuestTag", { n: quest.friends })}</span>
      </div>
      <button type="button" class="ghost-btn small-btn">${t("deleteQuest")}</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      customQuests = customQuests.filter((q) => q.id !== quest.id);
      writeJson(storageKeys.customQuests, customQuests);
      if (activeQuest?.id === quest.id) leaveQuest();
      renderQuests();
    });
    container.appendChild(row);
  });
}

function onCustomQuestSubmit(event) {
  event.preventDefault();
  const title = document.getElementById("customQuestTitle").value.trim();
  const copy = document.getElementById("customQuestDesc").value.trim();
  const friends = Number(document.getElementById("customQuestFriends").value) || 2;
  const reward = Number(document.getElementById("customQuestReward").value) || 20;
  if (!title) return;

  const quest = {
    id: `custom-${Date.now()}`,
    title,
    copy: copy || (currentLanguage === "zh" ? "和朋友一起完成的小任務" : "A small quest with friends"),
    reward,
    days: 7,
    friends,
    tags: [t("customQuestTag", { n: friends })],
    isCustom: true,
  };
  customQuests.push(quest);
  writeJson(storageKeys.customQuests, customQuests);
  event.target.reset();
  document.getElementById("customQuestFriends").value = "2";
  document.getElementById("customQuestReward").value = "20";
  renderQuests();
}

function renderShop() {
  const grid = document.getElementById("shopGrid");
  grid.innerHTML = "";
  const copy = getCopy();
  shopItems.forEach((item) => {
    const owned = shopOwned.includes(item.id);
    const card = document.createElement("article");
    card.className = "card shop-item";
    card.innerHTML = `<strong>${item.name[currentLanguage]}</strong><span>${item.cost} dew</span>`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = owned ? "ghost-btn full-width" : "secondary-btn full-width";
    btn.textContent = owned ? copy.owned : copy.buy;
    btn.disabled = owned || dewBalance < item.cost;
    btn.addEventListener("click", () => {
      if (dewBalance < item.cost) return;
      setDew(dewBalance - item.cost);
      shopOwned.push(item.id);
      writeJson(storageKeys.shopOwned, shopOwned);
      renderShop();
    });
    card.appendChild(btn);
    grid.appendChild(card);
  });
  document.getElementById("shopDewBalance").textContent = `${dewBalance} dew`;
}

function getWeekDates() {
  const monday = getMondayOfWeek();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function renderArchiveRow() {
  const row = document.getElementById("archiveRow");
  const labels = DAY_LABELS[currentLanguage];
  row.innerHTML = "";
  const dates = getWeekDates();
  const todayKey = formatDateKey(new Date());

  dates.forEach((date, i) => {
    const key = formatDateKey(date);
    const entry = journalEntries[key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "archive-dot";
    btn.dataset.dateKey = key;
    const preview = entry?.title?.slice(0, 4) || entry?.body?.slice(0, 4) || (entry ? "✓" : "·");
    btn.innerHTML = `<span>${labels[i]}</span><small>${preview}</small>`;
    if (key === (selectedArchiveDate || todayKey)) btn.classList.add("active");
    btn.addEventListener("click", () => {
      selectedArchiveDate = key;
      renderArchiveRow();
      showJournalDetail(key);
      loadJournalEditorForDate(key);
    });
    row.appendChild(btn);
  });
}

function loadJournalEditorForDate(dateKey) {
  const entry = journalEntries[dateKey] || { title: "", body: "" };
  document.getElementById("journalTitleInput").value = entry.title || "";
  document.getElementById("journalBodyInput").value = entry.body || "";
  const date = parseDateKey(dateKey);
  const locale = currentLanguage === "zh" ? "zh-TW" : "en-US";
  document.getElementById("journalDateLabel").textContent = date.toLocaleDateString(locale, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function saveJournal() {
  const dateKey = selectedArchiveDate || formatDateKey(new Date());
  const title = document.getElementById("journalTitleInput").value.trim();
  const body = document.getElementById("journalBodyInput").value.trim();
  if (!title && !body) return;

  journalEntries[dateKey] = {
    title: title || (currentLanguage === "zh" ? "無標題" : "Untitled"),
    body,
    updatedAt: new Date().toISOString(),
  };
  writeJson(storageKeys.journal, journalEntries);

  const badge = document.getElementById("journalSaveBadge");
  badge.hidden = false;
  badge.textContent = t("saved");
  window.setTimeout(() => { badge.hidden = true; }, 1200);

  renderArchiveRow();
  showJournalDetail(dateKey);
  renderJourney();
}

function clearJournalDraft() {
  document.getElementById("journalTitleInput").value = "";
  document.getElementById("journalBodyInput").value = "";
}

function showJournalDetail(dateKey) {
  const entry = journalEntries[dateKey];
  const date = parseDateKey(dateKey);
  const locale = currentLanguage === "zh" ? "zh-TW" : "en-US";
  document.getElementById("detailDate").textContent = date.toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const titleEl = document.getElementById("detailTitle");
  const noteEl = document.getElementById("detailNote");
  if (!entry) {
    titleEl.textContent = "—";
    noteEl.textContent = t("noEntryYet");
    noteEl.classList.add("detail-empty");
    return;
  }
  titleEl.textContent = entry.title;
  noteEl.textContent = entry.body;
  noteEl.classList.remove("detail-empty");
}

function renderJourney() {
  const weekDates = getWeekDates().map(formatDateKey);
  const checkinCount = weekCheckins.filter(Boolean).length;
  const journalCount = weekDates.filter((k) => journalEntries[k]).length;
  const grid = document.getElementById("journeySummary");
  const copy = getCopy();
  grid.innerHTML = `
    <div class="summary-pill"><span>${copy.journeyCheckins}</span><strong>${checkinCount} / 7</strong></div>
    <div class="summary-pill"><span>${copy.journeyJournal}</span><strong>${journalCount}</strong></div>
    <div class="summary-pill"><span>${copy.journeyDew}</span><strong>${dewBalance}</strong></div>
  `;
}

function applyAvatarLook(nextLook) {
  currentAvatarLook = nextLook;
  window.localStorage.setItem(storageKeys.avatarLook, currentAvatarLook);
  const figure = document.getElementById("avatarFigure");
  figure.classList.remove("look-sage", "look-dune", "look-moon");
  figure.classList.add(`look-${currentAvatarLook}`);
  document.getElementById("avatarLookBadge").textContent = getCopy().avatarLooks[currentAvatarLook];
  document.querySelectorAll("[data-avatar-look]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.avatarLook === currentAvatarLook);
  });
}

function saveProfile() {
  profile = {
    name: document.getElementById("profileNameInput").value.trim() || "旅人",
    bio: document.getElementById("profileBioInput").value.trim(),
  };
  writeJson(storageKeys.profile, profile);
  renderHeroTheme();
}

async function checkAiServerStatus() {
  const statusEl = document.getElementById("aiServerStatus");
  const badgeEl = document.getElementById("aiServerBadge");
  const hintEl = document.getElementById("aiServerHint");
  statusEl.textContent = t("aiChecking");
  badgeEl.textContent = "…";

  try {
    const res = await fetch(apiUrl("/api/status"));
    if (!res.ok) throw new Error("status failed");
    const data = await res.json();
    if (data.configured) {
      statusEl.textContent = t("aiReady");
      badgeEl.textContent = data.model || "gpt-4o-mini";
      hintEl.textContent = t("aiServerHint");
    } else {
      statusEl.textContent = t("aiNotConfigured");
      badgeEl.textContent = "—";
      hintEl.textContent = t("aiServerHint");
    }
  } catch {
    statusEl.textContent = t("aiOffline");
    badgeEl.textContent = "—";
    hintEl.textContent = t("aiOfflineHint");
  }
}

async function callOpenAI(messages, options = {}) {
  const res = await fetch(apiUrl("/api/chat"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, model: options.model }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "AI request failed");
  }
  return data.content;
}

window.oasisApi = { chat: callOpenAI, refreshStatus: checkAiServerStatus };

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setActivePage(tab.dataset.pageTarget));
  });
  document.querySelectorAll("[data-link-page]").forEach((btn) => {
    btn.addEventListener("click", () => setActivePage(btn.dataset.linkPage));
  });
  document.querySelectorAll("[data-language]").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.language));
  });
  document.querySelectorAll("[data-weather]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentWeather = btn.dataset.weather;
      window.localStorage.setItem(storageKeys.oasisWeather, currentWeather);
      renderHeroTheme();
    });
  });
  document.querySelectorAll("[data-oasis-mood]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentOasisMood = btn.dataset.oasisMood;
      window.localStorage.setItem(storageKeys.oasisMood, currentOasisMood);
      renderHeroTheme();
    });
  });
  document.querySelectorAll("[data-avatar-look]").forEach((btn) => {
    btn.addEventListener("click", () => applyAvatarLook(btn.dataset.avatarLook));
  });
  document.querySelectorAll("[data-quest-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const pane = tab.dataset.questTab;
      document.querySelectorAll("[data-quest-tab]").forEach((t) => t.classList.toggle("active", t === tab));
      document.querySelectorAll("[data-quest-pane]").forEach((p) => p.classList.toggle("active", p.dataset.questPane === pane));
    });
  });

  document.getElementById("saveGoalBtn").addEventListener("click", saveGoal);
  document.getElementById("customQuestForm").addEventListener("submit", onCustomQuestSubmit);
  document.getElementById("leaveQuestBtn").addEventListener("click", leaveQuest);
  document.getElementById("questProgressBtn").addEventListener("click", logQuestProgress);
  document.getElementById("saveJournalBtn").addEventListener("click", saveJournal);
  document.getElementById("clearJournalBtn").addEventListener("click", clearJournalDraft);
  document.getElementById("saveProfileBtn").addEventListener("click", saveProfile);
}

function init() {
  loadState();
  bindEvents();
  setDew(dewBalance);
  selectedArchiveDate = formatDateKey(new Date());
  applyLanguage(currentLanguage);
  applyAvatarLook(currentAvatarLook);
  renderArchiveRow();
  showJournalDetail(selectedArchiveDate);
  loadJournalEditorForDate(selectedArchiveDate);
  setActivePage("home");
  checkAiServerStatus();
}

init();
