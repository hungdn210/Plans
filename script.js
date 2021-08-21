const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const planesCanvas = document.getElementById("planesCanvas");
const planesCtx = planesCanvas.getContext("2d");
const WIDTH = 550;
const HEIGHT = 550;
const BG_COLOR = '#F4F4D9';
const BG_COLOR_TEXT = 'black';
const GRID_AMOUNT = 11;
const GRID_SIZE = WIDTH / GRID_AMOUNT;
const GRID_BORDER = 2;
const GRID_START = 1;
const PLANE_TYPES = 4;
const PLANE_PARTS = 7;
const PLANE_AMOUNT = 3;
const PLANE_COLOR = 'cyan';
const PLANE_COLOR_TEST = 'lime';
const SYMBOL_AMOUNT = 4;
const SYMBOL_RADIUS = 18;
const SYMBOL_LINEWIDTH = 7;

const IC_PLAYGAME = document.getElementById("IC-playGame");
const IC_RUNGAME = document.getElementById("IC-runGame");
const IC_DELETE = document.getElementById("IC-delete");
const CV_DIV = document.getElementById("canvas-div");
const INSTRUCTION = document.getElementById("instruction");
const CV_EMPTY = document.getElementById("canvas-empty");
const INS_TEXT = document.getElementById("ins-text");

var BG, DATA, PLANES;
var planesStyle = [], planesList = [], grid_planes = [], grid_player = [];
var arrowPlane = 0, preX = 0, preY = 0;

//set the value
var planeColors = [
  'cyan',
  'orange',
  'pink'
]
var symbolColors = [
  'green',
  'red',
  'blue'
]
var lettersList = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J'
]

//change the display style of the components
var disIC = (icon, style) => {
  icon.style.display = style;
}

//change the display of elements when play game
var clickPlay = () => {
  disIC(IC_PLAYGAME, 'none');
  disIC(CV_DIV, 'inline'); 
  disIC(INSTRUCTION, 'inline-block');
  disIC(planesCanvas, 'inline-block');
  disIC(IC_RUNGAME, 'inline-block');
  disIC(IC_DELETE, 'inline-block');
}

//change the display of elements when the user chose the location of their airplanes
var selectedPlanes = () => {
  if(planesList.length == PLANE_AMOUNT) {
    disIC(IC_RUNGAME, 'none');
    disIC(IC_DELETE, 'none')
    disIC(CV_EMPTY, 'inline-block');
    disIC(canvas, 'inline-block');
    INS_TEXT.textContent = 'Enjoy The Game <3';
  }
}

//delete all the current airplanes when clicking delete icon
var deletePlanes = () => {
  //delete all planes
  planesList.length = 0;
  //set the initial value
  for(let y = 0; y < GRID_AMOUNT; y++) {
    for(let x = 0; x < GRID_AMOUNT; x++) {
      grid_planes[y][x].chosen = 0;
    }
  }
  //delete planes and draw main background again
  planesCtx.clearRect(0, 0, WIDTH, HEIGHT);
  BG.draw_planesCV();
}

function Bg() {
  //draw the planes canvas background
  this.draw_myCV = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for(let y = 1; y < GRID_AMOUNT; y++) {
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.moveTo(0, y * GRID_SIZE);
      ctx.lineTo(WIDTH, y * GRID_SIZE);
      ctx.stroke(); 
      ctx.beginPath();
      ctx.font = "30px tahoma";
      ctx.fillStyle = BG_COLOR_TEXT;
      ctx.fillText(lettersList[y - 1],GRID_SIZE / 3, y * GRID_SIZE + GRID_SIZE * 2/3);
    }

    for(let x = 0; x < GRID_AMOUNT; x++) {
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.moveTo(x * GRID_SIZE, 0);
      ctx.lineTo(x * GRID_SIZE, HEIGHT);
      ctx.stroke();
      ctx.beginPath();
      ctx.font = "30px tahoma";
      ctx.fillStyle = BG_COLOR_TEXT;
      ctx.fillText(x, x * GRID_SIZE + GRID_SIZE / 4, GRID_SIZE * 2/3);
    }
  }
  //draw main canvas background
  this.draw_planesCV = () => {
    for(let y = 1; y < GRID_AMOUNT; y++) {
      planesCtx.beginPath();
      planesCtx.strokeStyle = 'black';
      planesCtx.moveTo(0, y * GRID_SIZE);
      planesCtx.lineTo(WIDTH, y * GRID_SIZE);
      planesCtx.stroke(); 
      planesCtx.beginPath();
      planesCtx.font = "30px tahoma";
      planesCtx.fillStyle = BG_COLOR_TEXT;
      planesCtx.fillText(lettersList[y - 1],GRID_SIZE / 3, y * GRID_SIZE + GRID_SIZE * 2/3);
    }
    for(let x = 0; x < GRID_AMOUNT; x++) {
      planesCtx.beginPath();
      planesCtx.strokeStyle = 'black';
      planesCtx.moveTo(x * GRID_SIZE, 0);
      planesCtx.lineTo(x * GRID_SIZE, HEIGHT);
      planesCtx.stroke();
      planesCtx.beginPath();
      planesCtx.font = "30px tahoma";
      planesCtx.fillStyle = BG_COLOR_TEXT;
      planesCtx.fillText(x, x * GRID_SIZE + GRID_SIZE / 4, GRID_SIZE * 2/3);
    }
  }

  this.draw_symbols = (curCtx, x, y, type) => {
    //delete the symbol of (x,y) grid (coordinate of this gird)
    ctx.clearRect(x + GRID_BORDER, y + GRID_BORDER, GRID_SIZE - GRID_BORDER * 2, GRID_SIZE - GRID_BORDER * 2);

    //draw the symbol of this coordinate (x,y)
    switch(type) {
      case 0:
        //circle symbol
        curCtx.beginPath();
        curCtx.fillStyle = symbolColors[type];
        curCtx.arc(x + GRID_SIZE / 2, y + GRID_SIZE / 2, SYMBOL_RADIUS, 0, 2 * Math.PI);
        curCtx.fill();
        break;
      case 1:
        // X symbol
        curCtx.lineWidth = SYMBOL_LINEWIDTH;
        curCtx.strokeStyle = symbolColors[type];
        curCtx.beginPath();
        curCtx.moveTo(x + GRID_SIZE / 4, y + GRID_SIZE / 4);
        curCtx.lineTo(x + GRID_SIZE * 3/4, y + GRID_SIZE * 3/4);
        curCtx.stroke();
        curCtx.beginPath();
        curCtx.moveTo(x + GRID_SIZE * 3/4, y + GRID_SIZE / 4);
        curCtx.lineTo(x + GRID_SIZE / 4, y + GRID_SIZE * 3/4);
        curCtx.stroke();
        break;
      case 2:
        //triangle symbol
        curCtx.lineWidth = SYMBOL_LINEWIDTH;
        curCtx.strokeStyle = symbolColors[type];
        curCtx.beginPath();
        curCtx.moveTo(x + GRID_SIZE / 2, y + GRID_SIZE / 4);
        curCtx.lineTo(x + GRID_SIZE * 3/4, y + GRID_SIZE * 3/4);
        curCtx.lineTo(x + GRID_SIZE / 4, y + GRID_SIZE * 3/4);
        curCtx.lineTo(x + GRID_SIZE / 2, y + GRID_SIZE / 4);
        curCtx.stroke();
        break;
      case 3:
        //empty symbol
        break;
    }
  }
}

function Planes () {
  //update the location of all current airplanes
  this.updateLocation = () => {
    planesCtx.clearRect(0, 0, WIDTH, HEIGHT);
    for(let i = 0; i < planesList.length; i++) {
      this.drawPlanes(planesList[i].x, planesList[i].y, planesList[i].arrow, planeColors[i], 1);
    }
    BG.draw_planesCV();
  }
  //draw the planes on the coordinate (x,y) 
  this.drawPlanes = (curX, curY, arrow, color, drawPLanes) => {
    if(!drawPLanes) this.updateLocation();
    for(let i = 0; i < planesStyle[arrow].length; i++) {
      var tempX = curX + planesStyle[arrow][i].x;
      var tempY = curY + planesStyle[arrow][i].y;
      planesCtx.beginPath();
      planesCtx.fillStyle= color;
      planesCtx.rect(tempX * GRID_SIZE, tempY * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      planesCtx.fill();
    }
  }
}
function setUpValue() {
  arrowPlane = 0;
  preX = Math.floor(GRID_AMOUNT / 2); preY = Math.floor(GRID_AMOUNT / 2);
  //set the value for each grid
  for(let y = 0 ; y < GRID_AMOUNT; y++) {
    grid_planes[y] = [];
    for(let x = 0; x < GRID_AMOUNT; x++) {
      grid_planes[y][x] = {
        chosen: 0,
        symbol: -1
      }
    }
  }
  for(let y = 0 ; y < GRID_AMOUNT; y++) {
    grid_player[y] = [];
    for(let x = 0; x < GRID_AMOUNT; x++) {
      grid_player[y][x] = {
        symbol: -1
      }
    }
  }
}

function start() {
  setUpValue();
  BG = new Bg();
  DATA = new Data();
  PLANES = new Planes();

  //draw the background for 2 canvas
  BG.draw_myCV();
  BG.draw_planesCV();
  //get the data
  DATA.getData();
}

var correctLocation = (x, y) => {
  //check if this coordinate is on the grid board
  if(x < GRID_START || x >= GRID_AMOUNT) return 0;
  if(y < GRID_START || y >= GRID_AMOUNT) return 0;
  return 1;
}

var checkGoodCoor = (startX, startY, arrow, checkChosen) => {
  //if the coordinate of the components of the current plane
  for(let i = 0; i < planesStyle[arrow].length; i++) {
    var tempX = startX + planesStyle[arrow][i].x;
    var tempY = startY + planesStyle[arrow][i].y;
    if(!correctLocation(tempX, tempY)) return 0;
    //check this coordinate to make sure that it is a good plane to select
    if(checkChosen) if(grid_planes[tempY][tempX].chosen) return 0;
  }
  return 1;
}
planesCanvas.addEventListener('mousemove', function(event) {
  //if the user can have another plane
  if(planesList.length < PLANE_AMOUNT) {
    //get the coordinate of the movement
    var rectPLanes = planesCanvas.getBoundingClientRect();
    var tempX = Math.floor((event.clientX - rectPLanes.left) / GRID_SIZE);
    var tempY = Math.floor((event.clientY - rectPLanes.top) / GRID_SIZE);

    //change the position of the plane in the direction of the mouse
    var testX = preX;
    while(testX != tempX) {
      if(testX < tempX) testX++;
      else testX--;
      if(checkGoodCoor(testX, preY, arrowPlane, 0)) preX = testX;
      else break;
    }
    var testY = preY;
    while(testY != tempY) {
      if(testY < tempY) testY++;
      else testY--;
      if(checkGoodCoor(preX, testY, arrowPlane, 0)) preY = testY;
      else break;
    }
    //draw the current plane
    PLANES.drawPlanes(preX, preY, arrowPlane, PLANE_COLOR_TEST, 0);
  }
})
//update the current plane when the mouse is moving
planesCanvas.addEventListener('contextmenu', function(event) { 
  event.preventDefault();
  if(planesList.length < PLANE_AMOUNT) {
    var tempArrow = arrowPlane;
    tempArrow < PLANE_TYPES - 1 ? tempArrow++ : tempArrow = 0;
    if(checkGoodCoor(preX, preY,tempArrow, 0)) {
      arrowPlane = tempArrow;    
      PLANES.drawPlanes(preX, preY, arrowPlane, PLANE_COLOR_TEST, 0);
    }
  }
});

//select the current plane
planesCanvas.addEventListener('click', printMousePos = (event) => {
  //check if this is a location of plane to select
  if(planesList.length < PLANE_AMOUNT && checkGoodCoor(preX, preY,arrowPlane, 1)) {
    //add the planes
    planesList.push({x: preX, y:preY, arrow: arrowPlane});
    //update the new planes on the board
    PLANES.updateLocation();
    //mark the chosen location of the components of this plane
    for(let i = 0; i < planesStyle[arrowPlane].length; i++) {
      var tempX = preX + planesStyle[arrowPlane][i].x;
      var tempY = preY + planesStyle[arrowPlane][i].y;  
      grid_planes[tempY][tempX].chosen = 1;
    }
    //change the style of mouse if the user can not have any plane anymore
    if(planesList.length == PLANE_AMOUNT) planesCanvas.style.cursor = 'auto';
  }
});
//add the symbol on myCanvas
canvas.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  //get the coordinate of mouse on the grids
  var rect = canvas.getBoundingClientRect();
  var tempX = Math.floor((event.clientX - rect.left) / GRID_SIZE);
  var tempY = Math.floor((event.clientY - rect.top) / GRID_SIZE);
  //if this coordinate is on the board
  if(correctLocation(tempX, tempY)) {
    //change the symbol
    if(grid_player[tempY][tempX].symbol < SYMBOL_AMOUNT - 1) grid_player[tempY][tempX].symbol++;
    else grid_player[tempY][tempX].symbol = 0;
    //delete the previous symbol and add a new symbol on this coordinate
    BG.draw_symbols(ctx, tempX * GRID_SIZE, tempY * GRID_SIZE, grid_player[tempY][tempX].symbol);
  }
})


// canvas.addEventListener('mousemove', function(event) {
//   //check canvas
//     //check planes canvas
//     // var rectPLanes = canvas.getBoundingClientRect();
//     // var tempX = Math.floor((event.clientX - rectPLanes.left) / GRID_SIZE);
//     // var tempY = Math.floor((event.clientY - rectPLanes.top) / GRID_SIZE);
//     // console.log(tempX, tempY);
//     // if(checkGoodCoor(tempX, tempY, GRID_AMOUNT, GRID_AMOUNT)) console.log("good");
// })
