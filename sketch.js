let shared; 
let bullets = []; 
let lifeWords = ["WXZ", "hypnotic", "hypnotik", "听着曾经的歌", "gorden", "CAREER", "ZED"];
let myTargets = [];

function preload() {
    partyConnect("wss://deepstream-server-1.herokuapp.com", "erosion_game_2024", "main_room");
    
    shared = partyLoadShared("data", { bulletList: [] });
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 15; i++) {
        myTargets.push({
            text: random(lifeWords),
            x: random(width * 0.4, width * 0.9),
            y: random(height),
            hp: 100
        });
    }
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0, 50); 

    if (mouseIsPressed && frameCount % 10 === 0) {
        let newBullet = {
            text: "）））））", 
            x: 0,
            y: mouseY,
            speed: random(5, 10),
            id: Math.random() 
        };
        shared.bulletList.push(newBullet);
    }


    for (let i = shared.bulletList.length - 1; i >= 0; i--) {
        let b = shared.bulletList[i];
        b.x += b.speed;
        fill(255, 0, 0);
        textSize(20);
        text(b.text, b.x, b.y);


        for (let t of myTargets) {
            if (dist(b.x, b.y, t.x, t.y) < 50) {
                t.hp -= 2; 
            }
        }

        
        if (b.x > width) {
            shared.bulletList.splice(i, 1);
        }
    }


    for (let i = myTargets.length - 1; i >= 0; i--) {
        let t = myTargets[i];
        if (t.hp > 0) {
            fill(255, t.hp * 2.5);
            textSize(25 + (100 - t.hp) / 2);
            text(t.text, t.x, t.y);
        } else {

            t.hp = 100;
            t.x = random(width * 0.4, width * 0.9);
            t.y = random(height);
        }
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
