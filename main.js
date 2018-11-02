
var game = new Phaser.Game(852,480);

game.state.add('first', mainState);
game.state.add('second', secondLevel);
game.state.add('third', thirdLevel);
game.state.add('fourth', fourthLevel);
game.state.add('fifth', fifthLevel);
game.state.start('first');