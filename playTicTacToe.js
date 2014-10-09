'use strict';

var TicTacToe = require ('./tictactoe');

var readline = require('readline');
var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }
);

var game = new TicTacToe.Game(reader);
game.run(function (){
  reader.close();
});