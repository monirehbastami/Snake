const snakeColor = 'white';
const snakeBorder = 'darkgreen';
const foodColor = 'lightgreen';
const foodBorderColor = 'darkgreen';
const rowNums = 30;
const colNums = 30;
const boxSize = 15;
const speed = 4
let headX = 5*boxSize;
let headY = 5*boxSize;
let totalScore = 0;
let velocityX = 0;
let velocityY = 0;
let foodX;
let foodY;
let bodySnake=[];
let tailLength=0;
let gameOver = 0;
let moves = 0;
let gap = 1;
let shine = 20


const statusTxt = document.querySelector(".status")
const gameCanvas = document.getElementById("gameCanvas");
gameCanvas.width = colNums*boxSize;
gameCanvas.height = rowNums*boxSize;
const ctx = gameCanvas.getContext("2d");


drawFood();

function drawBoard(){
  ctx.fillStyle = '#2b2134';
  ctx.fillRect(0,0,gameCanvas.width,gameCanvas.height);
  
  headX += velocityX*boxSize;
  headY += velocityY*boxSize;
  if (gameOver) {
    return
}
  ctx.fillStyle = '#fff';
  ctx.fillRect(headX,headY,boxSize-gap,boxSize-gap);

  if (velocityX || velocityY) {
    moves ++
}
bodySnake.push([headX,headY])
    if (bodySnake.length > tailLength + 1) {
      bodySnake.shift()
    }

  foodCollision();
  ctx.fillStyle = foodColor;
  ctx.strokestyle = foodBorderColor;
  ctx.fillRect(foodX, foodY, boxSize-gap,boxSize-gap);
  
  for (let i = 0; i < tailLength; i++) {
    if (velocityX || velocityY) {   
        ctx.fillStyle = "#fff"
        ctx.fillRect(bodySnake[i][0], bodySnake[i][1], boxSize-gap, boxSize-gap);
          
    }
    shine =shine -2;
}
ctx.fillStyle = "#fff"
ctx.fillRect(headX, headY, boxSize-gap, boxSize-gap);

if (headX < 0 || headX == colNums * boxSize || headY < 0 || headY == rowNums * boxSize) {
    statusTxt.innerText = "game over"
    velocityX = 0
    velocityY = 0
    gameOver = true
 
} else {
    statusTxt.innerText = ""
    gameOver = false
}

for (let i = 0; i < tailLength; i++) {
    if (moves > tailLength) {
        if (bodySnake[i][0] == headX && bodySnake[i][1] == headY) {
            document.querySelector(".status").innerText = "game over"
            gameOver = true
             break
        }
    }
    
}
  
  setTimeout(drawBoard,1000/speed);
}


function drawFood() {
  foodX = Math.floor(Math.random() * colNums) * boxSize
  foodY = Math.floor(Math.random() * rowNums) * boxSize
}



document.addEventListener("keydown", changeDirection);


function changeDirection(event) {
  
  const upKey = 38;
  const rightKey = 39;
  const leftKey = 37;
  const downKey = 40;

  if (event.keyCode === upKey) {
    if (velocityY == 1) {
        return
    }
    velocityX = 0
    velocityY = -1
  }
  if (event.keyCode === rightKey) {
    if (velocityX == -1) {
        return
    }
    velocityX = 1
    velocityY = 0
  }
  if (event.keyCode === leftKey) {
    if (velocityX == 1) {
        return
    }
    velocityX = -1
    velocityY = 0
  }
  if (event.keyCode === downKey) {
    if (velocityY == -1) {
        return
    }
    velocityX = 0
    velocityY = 1
  }
}

function foodCollision(){
  if(headX == foodX && headY == foodY){
    drawFood();
    setTimeout(()=>{tailLength ++}, 300)
    console.log(tailLength)
    totalScore++;
    document.querySelector('h3').textContent = `Score: ${totalScore}`
  }
}
drawBoard();
