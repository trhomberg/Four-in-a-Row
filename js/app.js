const game = new Game();

// listens for click on start button
document.getElementById('begin-game').addEventListener('click', function(){
    game.startGame();
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});

// listens for keyboard press
document.addEventListener('keydown', function(event){
    game.handleKeydown(event);
});
