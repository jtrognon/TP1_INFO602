class MachineTuring {
    mtFileContent;

    states = [];
    inputSymbols = [];
    tapeAlphabet = [];
    blankSymbol = [];
    initialState = [];
    finalStates = [];
    transitions = {}; // exemple : transition.q0.a = {nextState: "q1", nextSymbol: "A", direction: "R"}
    tape;

    constructor(mtFileContent) {
        this.mtFileContent = mtFileContent;

        this.load();
    }

    load(){
        
        // Get arrays data
        let sectionsArrays = /([^\n]+\n)+\n/g
        let sections = [...this.mtFileContent.matchAll(sectionsArrays)]; // array of the iterator

        this.loadArrays(sections);
        
        // sections[6][0] == transitions
        this.loadTransitions(sections[6][0])

        this.loadInitialTape();
        
    }

    loadArrays(sections){
        let arrays = [
        this.states,
        this.inputSymbols,
        this.tapeAlphabet,
        this.blankSymbol,
        this.initialState,
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

        
        this.tape = this.mtFileContent.match(regexInitialTape)[0] // We only need the whole line
    }

    getCurrentState(){
        return "q0";
    }

    getTape(){
        return this.tape;
    }

    getPosCursor(){
        return 0;
    }
}