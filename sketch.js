let words = [
  "life", "job", "career", "family", "future", "big television", 
  "washing machine", "car", "CD player", "tin opener", "health", 
  "cholesterol", "dental insurance", "mortgage", "starter home", 
  "friends", "leisurewear", "luggage", "three-piece suit", "hire purchase",
  "DIY", "Sunday morning", "couch", "game show", "junk food", 
  "miserable home", "rotting", "embarrassment", "children"
];
let wordsData = [];
let shakeIntensity = 0; // 摇动强度
let alphaDecreaseRate = 5; // 透明度减少速率

function setup() {
  createCanvas(600, 400);
  textSize(32);
  textAlign(CENTER, CENTER);

  // 初始化词语数据
  for (let i = 0; i < words.length; i++) {
    wordsData.push({
      text: words[i],
      x: random(width),
      y: random(height),
      alpha: 255  // 初始透明度
    });
  }

  // 监听手机加速度事件
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', handleMotion);
  }
}

function draw() {
  background(255);

  // 显示所有词语
  for (let i = 0; i < wordsData.length; i++) {
    let word = wordsData[i];
    fill(0, 0, 0, word.alpha);
    text(word.text, word.x, word.y);
  }
}

// 处理手机的运动数据
function handleMotion(event) {
  let x = event.acceleration.x;
  let y = event.acceleration.y;
  let z = event.acceleration.z;

  // 计算摇动强度
  shakeIntensity = Math.sqrt(x * x + y * y + z * z);

  // 根据摇动强度调整词语消失的逻辑
  adjustWords(shakeIntensity);
}

// 根据摇动强度调整词语的透明度
function adjustWords(intensity) {
  for (let i = 0; i < wordsData.length; i++) {
    // 如果摇动强度超过一定值，让词语逐渐消失
    if (intensity > 10) {
      wordsData[i].alpha = max(0, wordsData[i].alpha - alphaDecreaseRate);  // 让词语透明度减少
    }
  }
}
