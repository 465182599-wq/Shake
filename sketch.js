let words = [
  "life", "job", "career", "family", "future", "big television", 
  "washing machine", "car", "CD player", "tin opener", "health", 
  "cholesterol", "dental insurance", "mortgage", "starter home", 
  "friends", "leisurewear", "luggage", "three-piece suit", "hire purchase",
  "DIY", "Sunday morning", "couch", "game show", "junk food", 
  "miserable home", "rotting", "embarrassment", "children"
];
let wordsData = [];
let shakeIntensity = 0; 
let alphaDecreaseRate = 5; 
let isGameInitiated = false; // 新增：标记是否触发用户交互

function setup() {
  // 修复：适配手机全屏
  createCanvas(windowWidth, windowHeight);
  textSize(24); // 修复：缩小字体适配手机
  textAlign(CENTER, CENTER);

  // 初始化词语数据（保留原有逻辑）
  for (let i = 0; i < words.length; i++) {
    wordsData.push({
      text: words[i],
      x: random(width),
      y: random(height),
      alpha: 255
    });
  }

  // 修复：不再在这里注册监听，改为用户点击后注册
}

function draw() {
  background(255);

  // 显示所有词语（保留原有逻辑）
  for (let i = 0; i < wordsData.length; i++) {
    let word = wordsData[i];
    fill(0, 0, 0, word.alpha);
    text(word.text, word.x, word.y);
  }
}

// 新增：监听用户点击/触摸，触发游戏开始（解决权限问题）
function touchStarted() {
  if (!isGameInitiated) {
    isGameInitiated = true;
    document.getElementById("tip").style.display = "none";
    // 只有用户交互后才注册摇晃监听
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
      console.log("已开启摇晃监听");
    } else {
      alert("你的设备不支持重力感应！");
    }
  }
  return false; // 阻止默认行为
}

// 修复：处理摇晃事件（优化逻辑+降低阈值）
function handleMotion(event) {
  // 兼容不同设备的加速度取值
  let acceleration = event.accelerationIncludingGravity || event.acceleration;
  if (!acceleration) return;

  let x = acceleration.x || 0;
  let y = acceleration.y || 0;
  let z = acceleration.z || 0;

  // 修复：计算摇晃强度（减去重力加速度，降低触发阈值）
  shakeIntensity = Math.sqrt(x*x + y*y + z*z) - 9.8;
  
  // 修复：阈值从10改为3，手机摇晃易触发
  if (shakeIntensity > 3) {
    adjustWords();
  }
}

// 保留原有逻辑，仅简化调用
function adjustWords() {
  for (let i = 0; i < wordsData.length; i++) {
    wordsData[i].alpha = max(0, wordsData[i].alpha - alphaDecreaseRate);
  }
}

// 新增：适配屏幕旋转
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
