class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }
    
    
    // returns an array of tokens based off the number in parameter
    createTokens(num) {
        const tokens = [];
        
        for (let i = 0; i < num; i++) {
            let token = new Token(i, this);
            tokens.push(token);
        }
        
        return tokens;
    }

    // checks if there are any unused tokens left
    checkTokens(){
        return this.unusedTokens.length === 0 ? false : true;
    }
    
    // Gets all tokens that have not been used
    get unusedTokens(){
        return this.tokens.filter(token => !token.dropped);
    }
    
    
    // gets active token by returning the first token of the unused tokens array
	get activeToken() {
        return this.unusedTokens[0];
	}
}