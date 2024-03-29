class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }
    
    
    // returns the active player
	get activePlayer() {
        return this.players.find(player => player.active);
	}
    
    
    // create two player objects as an array
    createPlayers() {
        const players = [new Player('Player 1', 1, '#e15258', true),
                         new Player('Player 2', 2, '#e59a13')];
        return players;
    }
    
    
    // Initializes game
    startGame(){
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }
	
	

	// Branches code, depending on what key player presses
	handleKeydown(e) {
        if (this.ready) {
            if (e.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if (e.key === "ArrowDown") {
                this.playToken();
            }
        }
	}

    // will drop token if the target space in not null and will update the game state using game state method
    playToken(){
       let spaces = this.board.spaces;
       let activeToken = this.activePlayer.activeToken;
       let targetColumn = spaces[activeToken.columnLocation];
       let targetSpace = null;

       for(let space of targetColumn){
           if(space.token === null){
               targetSpace = space;
           } 
       }

       if(targetSpace !== null){
           game.ready = false;
           activeToken.drop(targetSpace, function(){
               game.updateGameState(activeToken, targetSpace);
           });
       }
    }

    // checks for win by looping through columns and rows and checking for 4 of the same tokens in a row
    checkForWin(target){
        const owner = target.token.owner;
        let win = false;


            // vertical
    for (let x = 0; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x][y+1].owner === owner && 
                this.board.spaces[x][y+2].owner === owner && 
                this.board.spaces[x][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++ ){
        for (let y = 0; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x+1][y].owner === owner && 
                this.board.spaces[x+2][y].owner === owner && 
                this.board.spaces[x+3][y].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x-1][y+1].owner === owner && 
                this.board.spaces[x-2][y+2].owner === owner && 
                this.board.spaces[x-3][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 3; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x-1][y-1].owner === owner && 
                this.board.spaces[x-2][y-2].owner === owner && 
                this.board.spaces[x-3][y-3].owner === owner) {
                    win = true;
            }           
        }
    }

    return win;
    }

    // switches active player 
    switchPlayers(){
        for(let player of this.players){
            player.active = player.active === true ? false : true;
        }
    };

    // method that will display message when game is over
    gameOver(message){
        const gameOver = document.getElementById('game-over');

        gameOver.style.display = 'block';
        gameOver.textContent = message;
    }

    updateGameState(token, target){
        // call mark() on specified space object to associate it with dropped token
        target.mark(token);

        // if game won create message else switch players and check if new player has enough tokens
        if(!this.checkForWin(target)){
            this.switchPlayers();

            if(this.activePlayer.checkTokens()){
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('No more tokens.');
            }
        } else {
            this.gameOver(`${target.owner.name} wins!`);
        }
    }
}