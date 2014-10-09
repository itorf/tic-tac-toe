'use strict';
var Board = require ('./board.js');

// var readline = require('readline');
// var reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   }
// );

function Game (reader){
  this.reader = reader;
  this.board;
}

Game.prototype.run = function (completionCallback){
  var that = this;
  this.board = new Board();
  
  var promptMove = function(current) {
    that.board.print();
    
    if (that.board.won()) {
      console.log(that.board.winner() + " won!");
      completionCallback();
    } else {
      that.reader.question("Player " + current + " Pick a tile:", 
        function(string){
          that.handleInput(string, current, promptMove);
        });
    }
  };
  
  promptMove('X');
};

Game.prototype.handleInput = function(string, current, promptMove){
  var vector = this.parseInput(string);

  if (!this.board.validMove(vector)) {
    console.log('Invalid move!');
  } else {
    this.board.set(vector, current);
    current = 'X' === current ? 'O' : 'X';
  }

  promptMove(current);
};

Game.prototype.parseInput = function(string) {
  var vector = string.trim().split(" ");
  vector[0] = parseInt(vector[0], 10);
  vector[1] = parseInt(vector[1], 10);
  return vector;
};

module.exports = Game;