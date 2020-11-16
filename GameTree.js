const textElement = document.getElementById("disp");
const optionButtons = document.getElementById('choices');
let state = {};

let playerPersonality = new personality("Good", 50, 50)
let player = new character("Jim", "Player", playerPersonality, null);

function startGame() {
    state = {};
    showText(0);
}

function showText(textIndex) {
    const textNode = storyPath.find(textNode => textNode.id === textIndex)
    textElement.innerText = textNode.text;
    while (optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild);
    }

    textNode.options.forEach(option => {
        if (option.type == weapon) {
            player.weapon = option;
            console.log('player has a weapon' + option.name);
        }

        if(showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.addEventListener('click', () => selectOption(option));
            optionButtons.appendChild(button);
        }
    })
}

function showOption(option) {
    return true;
}

function selectOption(option) {
    const nextTextNodeID = option.nextText;
    if (nextTextNodeID <= 0) {
        return startGame();
    }
    showText(nextTextNodeID);
}

const storyPath = [
    {
        id: 0,
        text: "Nordir is awoken after the funeral, he walks through his dwelling to find his father's chair, there's a letter there addressed to him.",
        options: [
            {
                text: "Read letter",
                nextText: 100
            }
        ]
    },
    {
      id: 100,
      text:   "Dearest Nordir, If you're reading this I am dead. In death, I leave you the Sword of Thundership " +
          "forged from the flames of Mount Furst, use it wisely. I haven't much time so I must tell you this, I am dead because of " +
          "a erronous breed called the Montcore ruled by Aant' El of Mont. They threaten the saftey of our realm. I failed in my mission " +
          "to stop him, you must finish the job. Travel across Elroy to there you find the Warlock Heimindon, he will help you. " +
          "I must leave you now, rememeber in my death I will always be with you. I love you very much my son, Geralt of Elroy. " +
          "Nordir puts down the letter and runs to the cellar to grab The Sword of Thundership. He packs a bag and hurrily runs out of his father's house. " +
          "No time to waste.",
        options: [
            {
                text: "Start quest",
                nextText: 1
            }
        ]
    },
    {
        id: 99,
        text: "Nordir has DIED, perhaps better choices won't seal your fate next time....",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },
    {
        id: 1,
        text: "How will you begin your journey?",
        options: [
            {
                text: "Begin the hunt",
                nextText: 2
            },
            {
                text: "Create a weapon",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "\"Which way should I go?\" Nordir thinks to himeslf.",
        options: [
            {
                text: "Left",
                nextText: 3
            },
            {
                text: "Right",
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: "Nordir wanders to the left into the Forrest of Ferrar, he only travels 500 paces before he encounters a " +
            "repulsive Ogre. Ogre: What be your buisness her' boy? ",
        options: [
            {
                text: "Fight",
                nextText: 5
            },
            {
                text: "Talk",
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: "Nordir headed right, past the meadow. He walked for a couple hours before spotting a villiage in the " +
            "distance, Hampt! Excited, Nordir made his way to the village hungry for the quest to commense!",
        nextText: 8
    },
    //ToDo when implementing combat make a way for him to live
    {
        id: 5,
        text: "Nordir: \"Shut up and fight you ugly beast!\"",
        options: [
            {
                text: "You died",
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: "Nordir: \"I mean no trouble, I'm travelling to a villiage outside Elroy called Hampt, please let me pass.\"  " +
            "Ogre: \"Hampt! Well thats not far out of this very forrest, just follow the setting Sun West and you shall reach Hampt before nightfall.\" " +
            "Nordir thanked the Ogre and continued on his way. Upon leaving the forrest, Nordir spots a village in the distance, " +
            "Hampt! Tired and ready for a rest he heads towards the humble village of Hampt.",
        options: [
            {
                text: "Go into the village",
                nextText: 8
            }
        ]
    },
    {
        id: 8,
        text: "Nordir reaches Hampt and enters a pub called the Eastman Seven. The rowdy aroma filled Nordir with wimbsy, his first adventure! " +
            "Nordir walks over to the bar to get a drink. Next to him was a tall slim man with pointy features. " +
            "Mysterious Stranger: Come here often, boy?",
        options: [
            {
                text: "Ignore the freak",
                nextText: 13
            },
            {
                text: "Engage with the man",
                nextText: 9
            }
        ]
    },
    {
        id: 13,
        text: "Nordir ignores the stranger's advances. Disturbed the stranger stands and freezes the roughhousing around Nordir. " +
            "Everyone around him lifeless, petrified in their place. " +
            "Mysterious Stranger: \"DARE YOU IGNORE HEIMINDON THE FAIR!\"  Hemindon casts a spell onto Nordir taking away his sight. " +
            "Heimindon: \"YOU DESERVE NOT TO SEE WHEN YOU ACT AS THOUGH YOU DO NOT GAZE UPON ME, BOY!\"",
        options: [
            {
                text: "Fight",
                nextText: 14
            },
            {
                text: "Apologize",
                nextText: 15
            }
        ]
    },
    {
        id: 14,
        text: "Nordir: \"I came to find a wizard! Who knew I'd have to kill one too!\" ",
        options: [
            {
                text: "Die",
                nextText: 99
            },
            {
                text: "Kill",
                nextText: 16
            }
        ]
    },
    {
        id: 16,
        text: "Nordir strikes down Heimindon with a final blow, upon his death, all of his spells reverse. " +
            "The pub breathes back to life. Nordir searches Heimindon's body and takes a *Random Weapon* out of his Endless Satchel. " +
            "In his bag he also had a diary that told of Aant' El and the Montcore dwelling in the Old Kingdom of York. Blood thirsty, " +
            "Nordir set out at once ready to slay Aant' El of Mont. Along his journey he meets the soul of a demonbeast. " +
            "The demonbeast is a cunning breed happy to outsmart its prey before serving them for dinner. Demonbeast: " +
            "\"HeLLo manBeast, I am FukLar the demonBeast\"",
        options: [
            {
                text: "Fight Demonbeast",
                nextText: 17
            },
            {
                text: "Talk to the Demonbeast",
                nextText: 18
            }
        ]
    },
    {
        id: 17,
        text: "Nordir: \"I haven't have time for riddles Fuklar, and you haven't much time to live left.\"",
        options: [
            {
                text: "die",
                nextText: 99
            },
            {
                text: "Kill",
                nextText: 19
            }
        ]
    },
    {
        id: 18,
        text: "Nordir: \"I haven't much time for this beast, but I know your riddling ways. If I must answer your riddle, " +
            "I shall, in order to pass.\" Fuklar: \"YeSSs manBeast... Hmmm how about this: A vessel have I, that is round as a pear, " +
            "moist in the middle, surrounded with hair; and often it happens, that water flows there?\"",
        options: [
            {
                text: "An eye",
                nextText: 20
            },
            {
                text: "A well near a brook",
                nextText: 21
            }
        ]
    },
    {
        id: 19,
        text: "Nordir slays the Demonbeast. As the soul withers, Nordir absorbs Fuklar's power and gains *Random Spell*. " +
            "Nordir continues on the path and reaches the gates of York. The land is shrowded in darkness and distruction. " +
            "\"No guards?\" Nordir thinks to himself. He enters opens the gates and heads in. The final battle is upon him."
    },
    {
        id: 20,
        text: "\"You are correcT manBeast, BuT you are not done yeT.\" Nordir: \"Hurry up Beast.\" " +
            "Fuklar: \"An eater lacking mouth and even maw; yet trees and beasts to it are daily bread. " +
            "Well fed it thrives and shows a lively life, but give it water and you do it dead.\"",
        options: [
            {
                text: "A fire",
                nextText: 21
            },
            {
                text: "A drought",
                nextText: 22
            }
        ]
    },
    {
        id: 21,
        text: "Fuklar: \"Ayee you are correct again.... One final test manBeast.\" " +
            "Nordir: \"Very well lets hear it.\" Fuklar: \"What speaks in all languages in his riding, and his mouth spits the poison of life or death? " +
            "It is silent when it rests, and is deaf like a boy or one of the poor.\"",
        options: [
            {
                text: "A pen",
                nextText: 23
            },
            {
                text: "Money",
                nextText: 24
            }
        ]
    }

    ]

startGame();




// function changeChoices(choice1, choice2) {
//     document.getElementById("choice1").innerHTML = choice1;
//     document.getElementById("choice2").innerHTML = choice2;
// }
//
// document.getElementById("choice1").addEventListener("click", function () {
//     document.getElementById("choice1").innerHTML = "Read letter";
//     document.getElementById("choice2").innerHTML = "";
//     document.getElementById("disp").innerHTML = "Letter";
// });

