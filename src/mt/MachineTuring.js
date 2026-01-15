export class MachineTuring {
    mtFileContent;

    states;
    inputSymbols;
    tapeAlphabet;
    blankSymbol;
    initialState;
    finalStates;
    transitions;
    initialTape;

    constructor(mtFileContent) {
        this.mtFileContent = mtFileContent;

        this.loadStates();

        this.loadInputSymbols();

        this.loadTapeAlphabet();

        this.loadBlankSymbol();

        this.loadInitialState();

        this.loadFinalStates();

        this.loadTransitions();

        this.loadInitialTape();
    }

    loadStates(){
        // Get first part (before empty line)
        const firstPart = /(.*)\n\n/.exec(this.mtFileContent);

        console.log("first part : ", firstPart);
        
    }

    loadInputSymbols(){
        
    }

    loadTapeAlphabet(){
        
    }

    loadBlankSymbol(){
        
    }

    loadInitialState(){
        
    }

    loadFinalStates(){
        
    }

    loadTransitions(){
        
    }

    loadInitialTape(){
        
    }

    getCurrentState(){
        return "q0";
    }

    getTape(){
        return "##abababababababa##";
    }

    getPosCursor(){
        return 5;
    }
}