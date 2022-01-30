var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image(); // Создание объекта
var bg = new Image(); // Создание объекта
var fg = new Image(); // Создание объекта
var pipeUp = new Image(); // Создание объекта
var pipeBotton = new Image(); // Создание объекта

bird.src = "img/flappy_bird_bird.png" // Указание нужного изображения
bg.src = "img/flappy_bird_bg.png" // Указание нужного изображения
fg.src = "img/flappy_bird_fg.png" // Указание нужного изображения
pipeUp.src = "img/flappy_bird_pipeUp.png" // Указание нужного изображения
pipeBotton.src = "img/flappy_bird_pipeBottom.png" // Указание нужного изображения

var fly = new Audio();
var score_audio = new Audio();

fly.src = "sound/fly.mp3";
score_audio.src = "sound/score.mp3";

var gap = 90;

document.addEventListener("keydown", moveUp); //отслеживание действия

function moveUp() {
    yPos -= 30;
    fly.play();
};

var pipe = []; // Создание блоков

pipe[0] = {
    x : cvs.width,
    y : 0
};
var score =0;

var xPos = 10; // Позиция птицы
var yPos = 150;
var grav = 1.5 

function draw() {
    ctx.drawImage(bg, 0,0); //background

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBotton, pipe[i].x, pipe[i].y + pipeUp.height + gap); 
        
        
        pipe[i].x--

        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height){
                location.reload();
            }

        if(pipe[i].x == 5) {
            score++;
           score.play();
        }
     
        // if (pipe.length > 2){
        //     pipe.shift()
        // }

       
    };
    
    

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos,yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт " +score, 10, cvs.height - 20)

    requestAnimationFrame(draw); // Вызов функции постоянно
};

pipeBotton.onload = draw;