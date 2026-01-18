function main() {
    readFile(result => {
        let mt = new MachineTuring(result);

        loadMtUI(mt)
    });
}



function loadMtUI(mt) {

    execution.innerHTML = "";
    removeAllCursors();

    const currentState = mt.getCurrentState();
    const tapes = mt.getTapes();
    const posCursors = mt.getPosCursor();

    for (let i=0; i<tapes.length; i++) {
        const tape = tapes[i];

        const ruban = document.createElement('div');
        ruban.id = "ruban" + i;

        const table = split(tape,i);
        ruban.appendChild(table);
        execution.appendChild(ruban);

        const currentPos = posCursors[i];

        const idCursor = getIdCursor(currentPos,i);
        const element = document.getElementById(idCursor);
        colorCursor(element);
    }

        const state = document.createElement('div');
        state.id = "state";

        const cState = document.createElement('div');
        cState.id = "cState";

        cState.innerText = "État courant : ";
        cState.append(currentState);

        const nextButton = document.createElement('button');
        nextButton.type = "button";
        nextButton.name = "Next";
        nextButton.innerText = "Suivant";
        nextButton.addEventListener("click", (event) => {
            mt.next();
            loadMtUI(mt);
        })

        state.appendChild(cState);
        state.appendChild(nextButton);
        execution.appendChild(state);

        if(mt.isDone()) {
            const recognized = document.createElement('div');
            recognized.id = "recognized";

            if(mt.isRecognized()) {
                recognized.innerText = "Mot reconnu !";
            } else {
                recognized.innerText = "Mot pas reconnu ...";
            }
            execution.appendChild(recognized);
    }
}

function split(tape, tapeIndex) {
    const table = document.createElement('div');
    table.id = "table";
    for (let i=0; i<tape.length; i++) {
        const tab = document.createElement('p');
        tab.id = "tape"+tapeIndex+"-tab"+i;

        tab.innerText = tape[i];
        table.appendChild(tab);
    }
    return table;
}

function getIdCursor(posCursor, tapeIndex) {
    return "tape"+tapeIndex+"-tab"+posCursor;
}

function removeAllCursors() {
    const previousCursors = document.querySelectorAll(".color");
    previousCursors.forEach(elem => elem.classList.remove("color"));
}

function colorCursor(element) {

    element.classList.add("color");
}


const title = document.createElement('h1');
title.innerText = 'Machine de Turing';

const div = document.createElement('div');

const inputFile = document.createElement('input');
inputFile.type = "file";
inputFile.id = "mtFileSelector";
inputFile.name = "file";
inputFile.accept = ".mt";

const execution = document.createElement('div');
execution.id = ("execution");

div.appendChild(inputFile);
div.appendChild(execution);

document.body.appendChild(title);
document.body.appendChild(div);


main();