/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++){
    board.push([]);
    for (let j = 0; j < WIDTH; j++){
      board[i].push(undefined);
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  //get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  //creates a variable for a new table row element
  var top = document.createElement("tr");
  //sets id to "column-top"
  top.setAttribute("id", "column-top");
  //adds a click listener 
  top.addEventListener("click", handleClick);
  //uses a loop to create a td element for each integer between 0 and width
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    //sets id of each td to the current value in the loop, basically assigning it a column id
    headCell.setAttribute("id", x);
    //appends each new td to the table row
    top.append(headCell);
  }
  //after loop, appends the table row to the html board
  htmlBoard.append(top);

  // TODO: add comment for this code
  //uses a loop to create a new tr element for each nteger between 0 and height 
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //within each iteration of the above loop, another loop is initiated that creates td elements within each new tr element for each integer between 0 and widht
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //the id of each td element is set to the current height and width values in the loop and it is appended to the table row
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    //each row is appended to the html board after each iteratin of the outer loop
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--){
    if (board[y][x] === undefined){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
  //make a div and insert into correct table cell
function placeInTable(y, x) {
  let newDiv = document.createElement("div");
  newDiv.setAttribute("class", "piece");
  newDiv.className += ` player${currPlayer}`;
  let boardPlace = document.getElementById(`${y}-${x}`);
  boardPlace.appendChild(newDiv);
  board[y][x] = currPlayer;
}

/** endGame: announce game end */

function endGame(msg) {
 alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
let fullArray = board.flat();
if (!fullArray.includes(undefined)){
  endGame("Tie Game!");
}
  // switch players
// switch currPlayer 1 <-> 2
  currPlayer = switchPlayer(currPlayer);
}

function switchPlayer(player){
  if (player === 1){
  player = 2;
  } else{
  player = 1;
  }
  return player;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  //loops through the entire grid of cells and checks for a winning combination
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //once a winning combination is found the function returns true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
