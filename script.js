var numSquares = 9;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
colorDisplay.textContent = pickedColor;
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setUpModeButtons();
  setUpSquares();
}

function setUpModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      // toggles back and forth mode buttons when clicked
      modeButtons.forEach(mode => mode.classList.remove("selected"));
      this.classList.add("selected");

      // adjust number of squares between modes
      if (this.textContent === "Easy") {
        numSquares = 3;
      } else if (this.textContent === "Hard") {
        numSquares = 6;
      } else {
        numSquares = 9;
      }
      // added reset inside the event listener to refresh colors switch or click
      reset();
    });
  }
}

function setUpSquares() {
  squares.forEach(function(square, i) {
    // square click event
    square.addEventListener("click", function() {
      var clickedColor = this.style.backgroundColor;
      // correct pick
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        // wrong pick
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  });
  // reset to to apply colors
  reset();
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  // match colorDisplay with picked Color
  colorDisplay.textContent = pickedColor;
  // remove message when clicked
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  // change colors of squares and remove each if no color in the colors array
  squares.forEach(function(square, i) {
    if (colors[i]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[i];
    } else {
      square.style.display = "none";
    }
  });
  h1.style.backgroundColor = "steelBlue";
}

resetButton.addEventListener("click", reset);

function changeColors(color) {
  squares.forEach(function(square) {
    square.style.backgroundColor = color;
  });
}

// pick a new random color from colors array
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  var arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  /* multiply by 256 and then floor it to generate num between 0 and 255 inclusive */
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
