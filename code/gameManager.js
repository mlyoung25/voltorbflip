function GameManager (HTMLManager) {
  this.htmlManager = new HTMLManager;
  this.inputManager = new InputManager;
  this.level = 1
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
  this.htmlManager.addListeners(this);
  this.totalCoins = 0;
  this.currentCoins = 0;
  this.gameOver = false;

  if (("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0) { //supports touch
    this.cursorPos = null;
  } else {
    this.resetCursor();
  }
  this.inputManager.listen(this);
}

GameManager.prototype.flip = function (pos) {
  result = this.board.flip(pos)
  if (result == 0) {
    this.currentCoins = 0;
    this.gameOver = true;
    this.htmlManager.setCurrentCoins(this.currentCoins);
    this.htmlManager.gameOverMessage(this.currentCoins, false, this);
  } else if (result != null) {
    this.currentCoins = (this.currentCoins ? this.currentCoins * result : result);
    this.htmlManager.setCurrentCoins(this.currentCoins);
    if (this.currentCoins == this.board.totalCoins) {
      this.gameOver = true;
      this.htmlManager.gameOverMessage(this.currentCoins, true, this);
    }
  }
  return result;
}

GameManager.prototype.getTile = function (pos) {
  return this.board.tiles[pos.row][pos.col].value
}

GameManager.prototype.updateCursorPos = function (dir) {
  if (this.cursorPos) {
    switch (dir) {
      case 0: //up
      case 2: //down
        if (this.cursorPos.col != 5) {
          this.cursorPos.row = (this.cursorPos.row + (-dir+1))%5;
        }
        break;
      case 1: //right
      case 3: //left
        this.cursorPos.col = (this.cursorPos.col + (-dir+2))%6;
        break;
    }
  } else {
    this.cursorPos = {row:0, col:0};
  }
  this.htmlManager.setCursor(this);
}

GameManager.prototype.resetCursorPos = function () {
  this.cursorPos = {row:0, col:0};
  this.htmlManager.setCursor(this);
}

GameManager.prototype.levelUp = function () {
  this.totalCoins = Math.min(this.totalCoins+this.currentCoins, 99999);
  this.htmlManager.setTotalCoins(this.totalCoins);
  this.currentCoins = 0;
  var oldlevel = this.level;
  this.level = Math.min(this.level+1, 7);
  this.board = new Board(this.level);
  this.gameOver = false;
  this.resetCursorPos();
  this.htmlManager.setBoard(this);
  this.htmlManager.displayNextLevel(this.level, this.level-oldlevel, this);
}

GameManager.prototype.relative = function (x, n) {
  return -Math.sqrt(x)+Math.sqrt(n)+1
}

GameManager.prototype.levelDown = function () {
  this.currentCoins = 0;
  var nextlevel = chance.weighted(
    Array.from({ length: this.level }, (_, i) => i+1), 
    Array.from({ length: this.level }, (_, i) => this.relative(i+1, this.level))
    );
  var difference = nextlevel - this.level;
  this.level = nextlevel;
  this.board = new Board(this.level);
  this.gameOver = false;
  this.resetCursorPos();
  this.htmlManager.setBoard(this);
  this.htmlManager.displayNextLevel(this.level, difference, this);
}