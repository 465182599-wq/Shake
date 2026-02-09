<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>词语消失游戏</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  <style>
    body { margin: 0; padding: 0; overflow: hidden; }
    canvas { display: block; }
    #tip {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
      color: #333;
      text-align: center;
      padding: 20px;
      background: rgba(255,255,255,0.9);
      border-radius: 10px;
      z-index: 100;
    }
  </style>
</head>
<body>
  <div id="tip">点击屏幕开始游戏<br/>摇晃手机让词语消失</div>

  <script>
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
    let isGameInitiated = false; // 标记是否已触发用户交互

    function setup() {
      // 适配手机全屏
      createCanvas(windowWidth, windowHeight);
      textSize(24); // 缩小字体适配手机
      textAlign(CENTER, CENTER);

      // 初始化词语数据
      for (let i = 0; i < words.length; i++) {
        wordsData.push({
          text: words[i],
          x: random(width),
          y: random(height),
          alpha: 255
        });
      }
    }

    function draw() {
      background(255);
      // 绘制所有词语
      for (let i = 0; i < wordsData.length; i++) {
        let word = wordsData[i];
        fill(0, 0, 0, word.alpha);
        text(word.text, word.x, word.y);
      }
    }

    // 监听用户点击/触摸，触发游戏开始（解决浏览器权限问题）
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

    // 处理摇晃事件（仅保留一次监听）
    function handleMotion(event) {
      // 兼容不同设备的加速度取值（优先包含重力的加速度）
      let acceleration = event.accelerationIncludingGravity || event.acceleration;
      if (!acceleration) return;

      let x = acceleration.x || 0;
      let y = acceleration.y || 0;
      let z = acceleration.z || 0;

      // 计算摇晃强度（减去重力加速度9.8，只算额外摇晃）
      shakeIntensity = Math.sqrt(x*x + y*y + z*z) - 9.8;
      console.log("摇晃强度：", shakeIntensity.toFixed(1)); // 调试用

      // 调整阈值为3（手机摇晃易触发）
      if (shakeIntensity > 3) {
        adjustWords();
      }
    }

    // 调整词语透明度
    function adjustWords() {
      for (let i = 0; i < wordsData.length; i++) {
        wordsData[i].alpha = max(0, wordsData[i].alpha - alphaDecreaseRate);
      }
    }

    // 适配屏幕旋转
    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }
  </script>
</body>
</html>
