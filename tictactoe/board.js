'use strict';

var Board = function () {
  this.board = [[],[],[]];
  
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      this.board[i][j] = "_";
    } 
  }
};

Board.WINS = [
  [[0,0], [0,1], [0,2]], 
  [[1,0], [1,1], [1,2]], 
  [[2,0], [2,1], [2,2]],
  [[0,0], [1,0], [2,0]],
  [[1,0], [1,1], [1,2]],
  [[2,0], [2,1], [2,2]],
  [[0,0], [1,1], [2,2]],
  [[0,2], [1,1], [2,0]]
  ];

Board.prototype.print = function() {
  for(var i =0; i < 3; i++){
    var row = 2 - i + " ";
    
    for(var j=0; j< 3; j++){
      row += this.get( [j, 2 - i] );
      row += '|';
    }
    console.log(row);
  }
  console.log("  0 1 2");
};

Board.prototype.get = function(vector) {
  return this.board[vector[1]][vector[0]];
};

Board.prototype.set = function (vector, value) {
  this.board[vector[1]][vector[0]] = value;
};

Board.prototype.empty = function (vector){
  return this.get(vector) === "_";
};

Board.prototype.validMove = function(vector) {
  var inX = 0 <= vector[1] && vector[1] < 3;
  var inY = 0 <= vector[0] && vector[0] < 3;
    
  return inX && inY && this.empty(vector);
};

Board.prototype.won = function (){
  var winner = "";
  var that = this;
  
  Board.WINS.forEach(function(line){
    var count = {
      _: 0,
      X: 0,
      O: 0
    };
    
    line.forEach(function(vector){
      count[that.get(vector)] += 1;
    });
    
    if (count["X"] === 3){
      winner = "X";
    } 
    else if (count["O"] === 3){
      winner = "O";
    }
  });
  
  return winner;
};

Board.prototype.winner = function (){
  return this.won();
};

module.exports = Board;