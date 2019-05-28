// minesweeper
let n , m, l = 30;
let len = 1500, wid = 600;
let board, visual;
let over = false;
function setup() {
  createCanvas(len, wid);
  n = floor(len/l);
  m = floor(wid/l);
  board = new Array(n + 2);
  visual = new Array(n + 2);
  for(let i = 0 ; i < n + 2; i ++){
    board[i] = new Array(m + 2);
    visual[i] = new Array(m + 2);
  }
  for(let i = 0 ; i < n + 2 ; i ++){
    for(let j = 0 ; j < m + 2 ; j ++){
      board[i][j] = 0;
      visual[i][j] = 0;
    }
  }
  restart();
}

function draw() {
  background(0);
  strokeWeight(1);
  stroke(200);
  fill(255);
  if(mouseIsPressed){
    let px = floor(mouseX/l) + 1;
    let py = floor(mouseY/l) + 1;
    if(!visual[px][py]){
      if(board[px][py] == -1){
        over = true;
      }else {
        visual[px][py] = 1;
      }
    }
  }
  for(let i = 1 ; i <= n ; i ++)
    for(let j = 1 ; j <= m ; j ++){
      if(!visual[i][j]){
        strokeWeight(1);
        stroke(200);
        fill(255);
        rect((i-1)*l + 1,(j-1)*l + 1, l - 2, l - 2);
      }else{
        textAlign(CENTER);
        textSize(16);
        fill(255);
        text(board[i][j],(i-1)*l + l/2,(j-1)*l + l/2);
      }
    }
  if(over){
    background(255);
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text("yeet", len/2, wid/2);
  }
}
function keyPressed(){
  over = false;
  restart();
}
function restart(){
  for(let i = 1 ; i <= n  ; i ++){
    for(let j = 1 ; j <= m ; j ++){
      //console.log(random(1));
      if(random(1) < 0.25)board[i][j] = -1;
      else board[i][j] = 0;
      visual[i][j] = 0;
    }
  }
  for(let i = 1 ; i <= n ; i ++)
    for(let j = 1 ; j <= m ; j ++){
      if(board[i][j] == 0)
      for(let x = -1 ; x <= 1 ; x ++)
        for(let y = -1 ; y <= 1 ; y ++)
          if((!(x == 0 && y == 0))&&(board[i+x][j+y] == -1))
            board[i][j] ++;
    }
}