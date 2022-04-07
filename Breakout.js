const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const start = document.querySelector('.start')
const refresh = document.querySelector(".refresh")
const stop = document.querySelector(".stop");
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const ballDiameter = 20
const boardHeight = 300
let xDirection = 2
let yDirection = 2
let score = 0
let timerId

const userStart = [230,10]
let currentposition = userStart

const ballStart = [270, 40]
let ballCurrentPostion = ballStart


//create Block
class Block{
    constructor (xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]



//draw all my block
function addBlocks(){
    for(let i = 0; i < blocks.length; i++){
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.left = blocks[i].bottomLeft[0]  + 'px';
  block.style.bottom = blocks[i].bottomLeft[1] + 'px';
  grid.appendChild(block);
    }
}
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
function drawUser(){
  user.style.left = currentposition[0] + "px";
  user.style.bottom = currentposition[1] + "px";
}
//draw the ball
function drawBall(){
    ball.style.left = ballCurrentPostion[0] + "px";
    ball.style.bottom = ballCurrentPostion[1] + "px";
}

//move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if (currentposition[0] > 0){
              currentposition[0] -= 10;
              drawUser();
            }
           break;
           case 'ArrowRight':
               if (currentposition[0] < boardWidth - blockWidth) {
                 currentposition[0] += 10;
                 drawUser();
               }
               break;

    }
}

document.addEventListener('keydown', moveUser)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall();
grid.appendChild(ball)

//move the ball
function moveBall(){
    ballCurrentPostion[0] += xDirection;
    ballCurrentPostion[1] += yDirection;
    drawBall()
    checkForCollisions()
}

// once you click, the game starts
start.addEventListener('click', () => {
//setting timer for the ball movement
timerId = setInterval(moveBall, 30)
})

///refresh game
refresh.addEventListener('click',()=>{
addBlocks()
scoreDisplay.innerHTML = score
})

//////////////////////////////
/////check for collision//////
//////////////////////////////
function checkForCollisions(){
//check for collusions with the block
for (let i = 0; i < blocks.length; i++){
  if (
    (ballCurrentPostion[0] > blocks[i].bottomLeft[0] && ballCurrentPostion[0] < blocks[i].bottomRight[0]) &&
    (ballCurrentPostion[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPostion[1] < blocks[i].topLeft[1]
  ){//note that 0 stands for x axis and 1 stands for y axis
    const allBlocks = Array.from(document.querySelectorAll('.block'))
    allBlocks[i].classList.remove('block')
    blocks.splice(i, 1)
    changeDirection()
    score++
    scoreDisplay.innerHTML = score
  }

  //check for a win 
  if(blocks.length === 0){
    scoreDisplay.innerHTML = 'You win:' +'' + score
    clearInterval(timerId)
    document.removeEventListener('keydown', moveUser)
  }

}

    
    //check walls for collisions
if(
    ballCurrentPostion[0] >= (boardWidth - ballDiameter) ||
    ballCurrentPostion[1] >= (boardHeight - ballDiameter)||
    ballCurrentPostion[0] <= 0
    ) {
    changeDirection()
  }

  //check for user collision
  if (
    (ballCurrentPostion[0] > currentposition[0] && ballCurrentPostion[0] < currentposition[0] + blockWidth) &&
    (ballCurrentPostion[1]> currentposition[1] && ballCurrentPostion[1] < currentposition[1] + blockHeight)
    ){
      changeDirection()
    }

  //check for game over
  if(ballCurrentPostion[1] <= 0){
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose:' +'' + score
    document.removeEventListener('keydown', moveUser)
  }
}

function changeDirection(){
  if(xDirection === 2 && yDirection === 2){
      yDirection = -2
      return
  }
   if (xDirection === 2 && yDirection === -2){
     xDirection = -2
     return
   }
   if (xDirection === -2 && yDirection === -2){
     yDirection = 2
     return
   }
   if (xDirection === -2 && yDirection === 2){
     xDirection = 2
     return
   }
}
