// 女孩動畫變數
let girlSpriteSheet;
let girlFrames = [];
const girlFrameWidth = 595 / 8; // 女孩每幀的寬度
const girlFrameHeight = 103;    // 女孩每幀的高度
const totalGirlFrames = 8;      // 女孩總幀數
let currentGirlFrame = 0;

// 布偶動畫變數
let puppetSpriteSheet;
let puppetFrames = [];
const puppetFrameWidth = 534 / 7; // 布偶每幀的寬度
const puppetFrameHeight = 110;    // 布偶每幀的高度
const totalPuppetFrames = 7;      // 布偶總幀數
let currentPuppetFrame = 0;

// 貓動畫變數
let catSpriteSheet;
let catFrames = [];
const catFrameWidth = 295 / 9; // 貓每幀的寬度
const catFrameHeight = 32;     // 貓每幀的高度
const totalCatFrames = 9;      // 貓總幀數
let currentCatFrame = 0;

// 通用動畫變數
let animationSpeed = 5; // 數字越小，動畫越快

// 音樂變數
let bgMusic;

function preload() {
  // 預先載入圖片，請確保路徑正確
  girlSpriteSheet = loadImage('1/all-1.png'); // 載入女孩圖片
  puppetSpriteSheet = loadImage('3/all-3.png'); // 載入布偶圖片
  catSpriteSheet = loadImage('4/all-4.png'); // 載入貓圖片
  bgMusic = loadSound('music/animation-funny-background-music-362849.mp3'); // 載入背景音樂
}

function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);

  // 從 Sprite Sheet 中切割出每一幀
  for (let i = 0; i < totalGirlFrames; i++) {
    let x = i * girlFrameWidth;
    // 使用 get() 方法從原圖中提取一幀
    let frame = girlSpriteSheet.get(x, 0, girlFrameWidth, girlFrameHeight);
    girlFrames.push(frame);
  }

  // 切割布偶的每一幀
  for (let i = 0; i < totalPuppetFrames; i++) {
    let x = i * puppetFrameWidth;
    let frame = puppetSpriteSheet.get(x, 0, puppetFrameWidth, puppetFrameHeight);
    puppetFrames.push(frame);
  }

  // 切割貓的每一幀
  for (let i = 0; i < totalCatFrames; i++) {
    let x = i * catFrameWidth;
    let frame = catSpriteSheet.get(x, 0, catFrameWidth, catFrameHeight);
    catFrames.push(frame);
  }
}

function draw() {
  // 設定背景顏色
  background('#c3d2d5');

  // --- 繪製動畫 ---
  // 為了讓兩個動畫並排且整體居中，計算起始位置
  const puppetScale = 1.2; // 布偶的放大比例 (1.2 = 放大20%)
  const scaledPuppetWidth = puppetFrameWidth * puppetScale;
  const scaledPuppetHeight = puppetFrameHeight * puppetScale;

  const catScale = 2.5; // 貓的放大比例 (2.5 = 放大150%)
  const scaledCatWidth = catFrameWidth * catScale;
  const scaledCatHeight = catFrameHeight * catScale;

  const spacing = 30; // 兩個動畫之間的間距
  const totalAnimWidth = girlFrameWidth + scaledPuppetWidth + scaledCatWidth + (spacing * 2);
  const startX = (width - totalAnimWidth) / 2;

  // 顯示女孩當前的幀
  const girlY = (height - girlFrameHeight) / 2;
  image(girlFrames[currentGirlFrame], startX, girlY);

  // 顯示放大後的布偶當前的幀
  const puppetX = startX + girlFrameWidth + spacing;
  const puppetY = (height - scaledPuppetHeight) / 2;
  image(puppetFrames[currentPuppetFrame], puppetX, puppetY, scaledPuppetWidth, scaledPuppetHeight);

  // 顯示放大後的貓當前的幀
  const catX = puppetX + scaledPuppetWidth + spacing;
  const catY = (height - scaledCatHeight) / 2;
  image(catFrames[currentCatFrame], catX, catY, scaledCatWidth, scaledCatHeight);

  // 每隔 animationSpeed 幀更新一次動畫幀
  if (frameCount % animationSpeed === 0) {
    currentGirlFrame = (currentGirlFrame + 1) % totalGirlFrames; // 循環播放女孩動畫
    currentPuppetFrame = (currentPuppetFrame + 1) % totalPuppetFrames; // 循環播放布偶動畫
    currentCatFrame = (currentCatFrame + 1) % totalCatFrames; // 循環播放貓動畫
  }
}

// 處理使用者互動以播放聲音
function mousePressed() {
  // 現代瀏覽器需要使用者先進行互動 (如點擊) 才能播放聲音。
  // 這段程式碼確保在使用者第一次點擊畫布時，背景音樂會開始循環播放。
  // isPlaying() 檢查可以防止每次點擊都重新播放音樂。
  if (!bgMusic.isPlaying()) {
    // .loop() 會讓音樂無限循環播放
    bgMusic.loop();
  }
}
