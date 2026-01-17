class MachineTuring {
    mtFileContent;

    states = [];
    inputSymbols = [];
    tapeAlphabet = [];
    blankSymbol;
    initialState;
    finalStates = [];
    transitions = {}; // exemple : transition.q0.a = {nextState: "q1", nextSymbol: "A", direction: "R"}
    tape;

    cursorPos = 0;
    currentState

    constructor(mtFileContent) {
        this.mtFileContent = mtFileContent;

        this.load();

        this.currentState = this.initialState;
    }

    load(){
        // Get arrays data
        let sectionsArrays = /([^\n]+\n)+\n/g
        let sections = [...this.mtFileContent.matchAll(sectionsArrays)]; // array of the iterator

        // states, input symbols, tape alphabet, final states

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
        this.tapeAlphabet,
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
        let regexTransition = /(.+),(.+)->(.+),(.+),(.+)/g
        
        transitions.matchAll(regexTransition).forEach(transition => {
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
    }

    loadInitialTape(){
        let regexInitialTape = /([^\n]+$(?!.)|([^\n]+)\n+$(?!.))/
        // (?!) -> negative lookahead -> match only if it's not present
        // (?!.) -> match only if there is no character afterward
        // -> EOF

        
        this.tape = [...this.mtFileContent.match(regexInitialTape)[0]]; // We are converting it to an array to be able to modify it
    }

    getCurrentState(){
        return this.currentState;
    }

    getTape(){
        return this.tape;
    }

    getPosCursor(){
        return this.cursorPos;
    }

    next(){
        if (!(this.currentState in this.transitions) || !(this.tape[this.cursorPos] in this.transitions[this.currentState])){
            console.log("mot reconnu ", this.currentState in this.finalStates);
            
        } else {           
            let nextStep = this.transitions[this.currentState][this.tape[this.cursorPos]];
            
            this.currentState = nextStep.nextState;
            
            this.tape[this.cursorPos] = nextStep.nextSymbol;
            
            if (nextStep.direction == "R"){
                if (this.cursorPos + 1 == this.tape.length){ // infinite blank symbols
                    this.tape.push(this.blankSymbol);
                }
                
                this.cursorPos += 1;
            } else {
                if (this.cursorPos == 0){ // infinite blank symbols
                    this.tape.unshift(this.blankSymbol);
                }
                
                this.cursorPos -= 1;
            }
        }
    }
}