import { readFile } from "./../mt/utils.js";
import { MachineTuring } from "./../mt/MachineTuring.js";


function main() {
    readFile(result => {
        let mt = new MachineTuring(result);

        loadMtUI(mt)
    });
}



function loadMtUI(mt) {
    const currentState = mt.getCurrentState();
    const tape = mt.getTape();
    const posCursor = mt.getPosCursor();

    const table = split(tape);
    execution.appendChild(table);

    const state = document.createElement('div');
    state.id = "state";

    const cState = document.createElement('div');

    cState.innerText = "État courant : ";
    cState.append(currentState);

    const nextButton = document.createElement('button');
    nextButton.type = "button";
    nextButton.name = "Next";
    nextButton.innerText = "Suivant";

    console.log(nextButton);

    state.appendChild(cState);
    state.appendChild(nextButton);

    execution.appendChild(state);

    const idCursor = getIdCursor(posCursor);
    const element = document.getElementById(idCursor);
    colorCursor(element);
}

function split(tape) {
    const table = document.createElement('div');
    table.id = "table";
    for (let i=0; i<tape.length; i++) {
        const tab = document.createElement('p');
        tab.id = "tab"+i;

        tab.innerText = tape[i];
        table.appendChild(tab);
    }
    return table;
}

function getIdCursor(posCursor) {
    return "tab"+posCursor;
}

function removeClass() {
    const previousCursor = document.querySelector(".color");

    if (previousCursor) {
        previousCursor.classList.remove("color");
    }
}

function colorCursor(element) {
    removeClass();

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