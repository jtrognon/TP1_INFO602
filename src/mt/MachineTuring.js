class MachineTuring {
    mtFileContent;

    states = [];
    inputSymbols = [];
    tapeAlphabets = [];
    blankSymbol;
    initialState;
    finalStates = [];
    transitions = {}; // exemple : transition.q0.a = {nextState: "q1", nextSymbol: "A", direction: "R"}
    tapes = [];

    cursorPos = [];
    currentState

    mtIsDone = false; // There is no next step
    wordIsRecognized; // True if the given word is recognized

    constructor(mtFileContent) {
        this.mtFileContent = mtFileContent;

        this.load();

        this.currentState = this.initialState;
    }

    load(){
        // Get arrays data
        let sectionsArrays = /([^\n]+\n)+\n/g
        let sections = [...this.mtFileContent.matchAll(sectionsArrays)]; // array of the iterator

        // states, input symbols, tapes alphabet, final states

        this.loadArrays([sections[0], sections[1], sections[2], sections[5]]);

        // blank symbol, initial state
        this.blankSymbol = this.getStringValue(sections[3][0]);
        this.initialState = this.getStringValue(sections[4][0]);

        // sections[6][0] == transitions
        this.loadTransitions(sections[6][0])

        this.loadInitialTape();
    }

    loadArrays(sections){
        let arrays = [
        this.states,
        this.inputSymbols,
        this.tapeAlphabets,
        this.finalStates,
        ]

        for (let i = 0; i < arrays.length; i++) {
            sections[i][0].split("\n").forEach(line => {
                // Not a comment and not an empty line
                if (line != "" && line.match((/\/\*.*\*\//)) == null){
                    arrays[i].push(line);
                }
            });
        }
    }

    getStringValue(section){
        let res = "";
        section.split("\n").forEach(line => {
            // Not a comment and not an empty line
            if (line != "" && line.match((/\/\*.*\*\//)) == null){
                res = line;
            }
        });

        return res;
    }

    loadTransitions(transitions){
        let nbTapes = null;

        let regexTransition = /(.+),(.+)->(.+),(.+),(.+)/g
        
        transitions.matchAll(regexTransition).forEach(transition => {
            if (nbTapes != transition[2].length || nbTapes != transition[4].length || nbTapes != transition[5].length){
                if (nbTapes == null){
                    nbTapes = transition[2].length;
                } else {
                    console.error("There is a different number of tapes");
                }
            }
            
            if (transition != "" && transition.toString().match((/\/\*.*\*\//)) == null){
                // starts at 1 because transition[0] is the whole line
                if (transition[1] in this.transitions){ 
                    // impossible to have a nondeterministic Turing Machine so 'transition[2]' cannot already exist in 'this.transitions[transition[1]]'
                    this.transitions[transition[1]][transition[2]] = {nextState: transition[3], nextSymbol: transition[4], direction: transition[5]}
                } else {
                    this.transitions[transition[1]] = {};
                    this.transitions[transition[1]][transition[2]] = {nextState: transition[3], nextSymbol: transition[4], direction: transition[5]}
                }
            }
        })

        this.cursorPos = new Array(nbTapes).fill(0);
    }

    loadInitialTape(){
        let regexInitialTape = /([^\n]+$(?!.)|([^\n]+)\n+$(?!.))/
        // (?!) -> negative lookahead -> match only if it's not present
        // (?!.) -> match only if there is no character afterward
        // -> EOF

        
        this.tapes = [[...this.mtFileContent.match(regexInitialTape)[0]]]; // We are converting it to an array to be able to modify it

        // secondary tapes
        for (let i = 0; i < this.cursorPos.length-1; i++) {
            this.tapes.push(["#"]);
        }

    }

    getCurrentState(){
        return this.currentState;
    }

    getTapes(){
        return this.tapes;
    }

    getPosCursor(){
        return this.cursorPos;
    }

    next(){
        if (this.isDone()){
            this.wordIsRecognized = this.currentState in this.finalStates; // the word is recognized if the current state is a final state
        } else {           
            let nextStep = this.transitions[this.currentState][this.getCurrentSymbols()];
            
            this.currentState = nextStep.nextState;
            
            for (let i = 0; i < this.cursorPos.length; i++) {
                this.tapes[i][this.cursorPos[i]] = nextStep.nextSymbol[i];   
            }
            
            for (let i = 0; i < this.cursorPos.length; i++) {
                if (nextStep.direction[i] == "R"){
                    if (this.cursorPos + 1 == this.tapes.length){ // infinite blank symbols
                        this.tapes[i].push(this.blankSymbol);
                    }
                    
                    this.cursorPos += 1;
                } else {
                    if (this.cursorPos == 0){ // infinite blank symbols
                        this.tapes[i].unshift(this.blankSymbol);
                    }
                    
                    this.cursorPos -= 1;
                }
            }
        }
    }


    isDone(){
        return !(this.currentState in this.transitions) || !(this.getCurrentSymbols in this.transitions[this.currentState]);
    }

    isRecognized(){
        return this.wordIsRecognized;
    }

    getCurrentSymbols(){
        let currentSymbols = [];

        for (let i = 0; i < this.cursorPos.length; i++) {
            currentSymbols.push(this.tapes[i][this.cursorPos[i]]);
        }

        return currentSymbols;
    }
}