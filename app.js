
const canvas = document.getElementById("jsCanvas");
// get the class name by jsColor
const ctx = canvas.getContext("2d");

// get an HTML collections from .jsColor class
const colors = document.getElementsByClassName("jsColor");

// Get jsRange console that sets the range.
const range = document.getElementById("jsRange");

const mode = document.getElementById("jsMode");
const reset = document.getElementById("jsReset");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "##2c2c2c"
 
canvas.width = 650;
canvas.height = 550;


// need a white background when you save.
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);

ctx.stokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

// Event when mouse is clicked
function stopPainting() {
  painting = false;
}

// Event that starts when mouse is clicked
function startPainting(){
  painting = true;
}

// Event when Mouse pointer is on a canvas.
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  } else {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

// Event when the color is picked
function handleColorClicked(event) {
  // you want to get a background color for the event.target > color div
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

// Clean the canvas when the Reset button is clicked
function handleResetClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleCanvasClick() {
  if (filling)
  {
    ctx.fillRect(0,0,canvas.width, canvas.height);
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

// Get the data as am image; anchor.download to allow user download. (link has the download link.) 
function handleSaveClick() {
  
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if(canvas){
  // When the mouse is over, start onMouse()
  canvas.addEventListener("mousemove", onMouseMove);
  // When the mouse is clicked, start onMouseDown()
  canvas.addEventListener("mousedown", startPainting);
  // When the mouse is not clicked anymore, start onMouseUp()
  canvas.addEventListener("mouseup", stopPainting);
  // When the mouse leaves the canvas area, start onMouseLeave()
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}


// get the HTML collections from colors and convert into an array. > console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClicked))


// Make sure that variables are not null; add EventListeners.

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (reset) {
  reset.addEventListener("click", handleResetClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}