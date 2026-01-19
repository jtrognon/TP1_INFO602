const translations = {
    "en": {
        "title": "Turing Machine Simulator",
        "currentState": "Current state",
        "button": {
            "previous": "Previous",
            "next": "Next",
        },
        "error": "Error",
        "errorCode": {
            "nbTapes": "There is a different number of tapes.",
            "unknownState": "A state isn't in the states list.",
            "unknownSymbol": "A symbol isn't part of the alphabet.",
            "unknownDirection": "Unknown direction.",
            "nondeterministicTM": "Transition already exists. Cannot have a nondeterministic TM.",
            "unusedState": "There is at least one unused state.",
            "unknownInitialSymbol": "Unknown initial symbol in one of the tapes."
        },
        "recognized" : {
            "true" : "Recognized word !!",
            "false" : "Unrecognized word...",
        }
    },
    "fr" : {
        "title": "Simulateur de Machine de Turing",
        "currentState": "État courant",
        "button": {
            "previous": "Précédent",
            "next": "Suivant",
        },
        "error": "Error",
        "errorCode": {
            "nbTapes": "Il y a un nombre de rubans différent.",
            "unknownState": "Un état ne fais pas parti de la liste des états.",
            "unknownSymbol": "Un symbole ne fait pas parti de l'alphabet.",
            "unknownDirection": "Direction inconnue.",
            "nondeterministicTM": "Une transition contient le même état et les mêmes symboles. Le simulateur ne prend pas en compte les machines de Turing non déterministes.",
            "unusedState": "État non utilisé.",
            "unknownInitialSymbol": "Symbole initial inconnu."
        },
        "recognized" : {
            "true" : "Mot reconnu !!",
            "false" : "Mot non reconnu...",
        }
    }
}