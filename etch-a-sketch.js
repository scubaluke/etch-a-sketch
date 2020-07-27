// select the elements on page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

let hue = Math.random() * 360;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
// set up our canvas for drawing
const { width, height } = canvas;
// create random x and y starting point
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// wrie a draw function
function draw({ key }) {
  // increment the hue
  hue += 4;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  console.log(key);
  // start key path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x and y values based on user input
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}
// handler for the keys
function handleKey(event) {
  if (event.key.includes('Arrow')) {
    event.preventDefault();
    draw({ key: event.key });
  }
}
// clear/ shake fuction
function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
  canvas.classList.add('shake');
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}
// event listener for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);
