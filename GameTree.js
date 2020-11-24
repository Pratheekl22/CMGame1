const textElement = document.getElementById("disp");
const optionButtons = document.getElementById('choices');
let state = {};
let playerPersonality = new personality("Good", 50, 50)
let player = new character("Jim", "Player", playerPersonality, null);

const weapons = [
                 new weapon("Hollow Blade", "Sword", 0, 0, false),
                 new weapon("Excalibur", "Sword", 40, 80, true),
                 new weapon("Sword1", "Sword", 40, 80, true),
                 new weapon("Sword2", "Sword", 40, 80, true),
                 new weapon("Sword3", "Sword", 40, 80, true),
                 new weapon("Sword4", "Sword", 40, 80, true),
                 new weapon("Sword5", "Sword", 40, 80, true),
                 new weapon("Sword6", "Sword", 40, 80, true),
                 new weapon("Durendal", "Sword", 100, 100, true),
                ];

var weap = -1;
function randomFromArray(arr){
    weap =  Math.floor(Math.random() * arr.length);
    return weap;
}

function startGame() {
    state = {};
    showText(1);
}

function changeWeapon(oldWeapon, newWeapon) {
    if (player.weapon === oldWeapon) {
        player.weapon = newWeapon;
    } else {
        player.weapon = oldWeapon
    }

    console.log(textElement.innerText.indexOf("You swapped to"));
    if (textElement.innerText.indexOf("You swapped to") !== -1) {
        textElement.innerText = textElement.innerText.slice(0, textElement.innerText.indexOf("You swapped to"));
    }

    textElement.innerText += " You swapped to " + player.weapon.name;
    console.log(player.weapon);
}

function showText(textIndex) {
    console.log(player.weapon)
    const currentNode = storyPath.find(storyNode => storyNode.id === textIndex)
    textElement.innerText = currentNode.text;
    while (optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild);
    }

    let swapCheck = false;
    currentNode.options.forEach(option => {
        if (currentNode.id === 1) {
            player.weapon = new weapon("Sword of Thundership", "Sword", 10, .33, false);
        }

        if (currentNode instanceof weaponNode && swapCheck === false) {
            const button = document.createElement('button');
            button.innerText = "Exchange Your Weapon";
            let oldWeapon = player.weapon;
            button.addEventListener('click', () => changeWeapon(oldWeapon, weapons[currentNode.weaponID]));
            optionButtons.appendChild(button);
            swapCheck = true;
        }

        if(showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.addEventListener('click', () => selectOption(option));
            optionButtons.appendChild(button);
        }
    })

    swapCheck = false;
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
        new storyNode(1,
            "Nordir is awoken after the funeral, he walks through his dwelling to find his father's chair, there's a letter there addressed to him.",
            [{
                text: "Read letter",
                nextText: 2
            }], false),
        new storyNode(2,
            "Dearest Nordir,\n If you're reading this I am dead. In death, I leave you the Sword of Thundership " +
            "forged from the flames of Mount Furst, use it wisely. I haven't much time so I must tell you this, I am dead because of " +
            "an erronous breed called the Montcore, ruled by Aant' El of Mont. They threaten the saftey of our realm. We are the last desendants of "+
            "the Thunder Breed so you are the sole defense against the Montcore. Aant' El desires your soul so that he can use the Thunder Breed's power for domination. I failed in my mission " +
            "to stop him, you must finish the job. Travel across Elroy to the town of Hampt, there you will find the warlock Heimindon the Fair, he will help you. " +
            "I must leave you now, rememeber in my death I will always be with you.\n\n I love you very much my son,\n\t Geralt of Elroy\n\n" +
            "Nordir puts down the letter and runs to the cellar to grab The Sword of Thundership. He packs a bag and hurrily runs out of his father's house. " +
            "No time to waste.",
            [{
                    text: "Start quest",
                    nextText: 4
                },
                {
                    text: "Forge another weapon",
                    nextText: 3
                }], false),
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
        new storyNode(3,
            "Nordir forges a meer Hollow Blade. Nordir never was a great blacksmith",
            [{
                text: "Continue",
                nextText: 4
            }], false),
        new storyNode(4,
            "\"Which way should I go?\" Nordir thinks to himeslf.",
            [{
                    text: "Left",
                    nextText: 6
                },
                {
                    text: "Right",
                    nextText: 5
                }], false),

    new storyNode(5,
        "Nordir headed right, past the meadow. He walked for a couple hours before spotting a villiage in the " +
        "distance, Hampt! Excited, Nordir made his way to the village, hungry for the quest to commense!",
        [{
            text: "Go to Pub",
            nextText: 11
        }], false),

        new storyNode(6,
            "Nordir wanders to the left into the Forrest of Ferrar, he only travels 500 paces before he encounters a " +
            "repulsive Ogre. \nOgre: What be your buisness her' boy? ",
            [
                {
                    text: "Fight",
                    nextText: 8
                },
                {
                    text: "Talk",
                    nextText: 7
                }
            ], false),

    new storyNode(7,
        "Nordir: \"I mean no trouble, I'm travelling to a village outside Elroy called Hampt, " +
        "please let me pass.\"\n Ogre: \"Hampt! Well thats not far out of this very forrest," +
        " just follow the setting Sun West and you shall reach Hampt before nightfall.\"\n " +
        "Nordir thanked the Ogre and continued on his way. Upon leaving the forrest, Nordir spots a village in the distance, " +
        "Hampt! Tired and ready for a rest he heads towards the humble village of Hampt.",
        [{
        text: "Go to Pub",
        nextText: 11
    }], false),

    new storyNode(8,
        "Nordir: \"Shut up and fight you ugly beast!\"",
         [
            {
                text: "You died",
                nextText: 9
            }, {
                 text: "Win",
                 nextText: 10
    }], false),

    new storyNode(9,
        "Nordir has DIED, perhaps better choices won't seal your fate next time....",
        [
            {
                text: "Restart",
                nextText: -1
            }

        ], false),
        new weaponNode(randomFromArray(weapons), 10,
        "The Ogre takes his last breath and perishes. " +
        "Nordir walks into the Ogre's dwelling to find a chest. Inside there is: " + weapons[weap].name +
        " Nordir takes the weapon and carries on his way towards the village. Upon leaving the forrest, " +
        "Nordir spots a village in the distance, Hampt! Tired and ready for a rest he heads towards the humble village of Hampt.",
        [
            {
                text: "Go to pub",
                nextText: 11
            }
        ], true),
    new storyNode(11,
        "Nordir reaches Hampt and enters a pub called the Eastman Seven. " +
        "The rowdy aroma filled Nordir with wimbsy, his first adventure! " +
        "Nordir walks over to the bar to get a drink. Next to him was a tall slim man with pointy features. " +
        "\nMysterious Stranger: \"Come here often, boy?\"",
        [
            {
                text: "Ignore the freak",
                nextText: 12
            },
            {
                text: "Engage with the man",
                nextText: 13
            }
        ], false),
    new storyNode(12,
        "Nordir ignores the stranger's advances. " +
        "Disturbed the stranger stands and freezes the roughhousing around Nordir. " +
        "Everyone around him lifeless, petrafied in their place. " +
        "\nMysterious Stranger: \"DARE YOU IGNORE HEIMINDON THE FAIR!\"  " +
        "\nHemindon casts a spell onto Nordir taking away his sight. " +
        "\nHeimindon: \"YOU DESERVE NOT TO SEE WHEN YOU ACT AS THOUGH YOU DO NOT GAZE UPON ME, BOY!\"",
        [
            {
                text: "Fight",
                nextText: 14
            },
            {
                text: "Apologize",
                nextText: 15
            }
        ], false),

    new storyNode(13,
        "Nordir: \"No, actually, I'm a stranger to this place.\" \nMysterious Stranger: \"Oh, what brings you to this pub then boy?\"",
        [
            {
                text: "Lie",
                nextText: 16
            },
            {
                text: "Tell the truth",
                nextText: 17
            }
        ], false),

    new storyNode(14,
        "Nordir: \"I came to find a wizard! Who knew I'd have to kill one too!\" ",
        [
            {
                text: "Die",
                nextText: 9
            },
            {
                text: "Live",
                nextText: 20
            }
        ], false),

    new weaponNode(randomFromArray(weapons), 15,
        " Nordir: \"Heimindon? My father sent me, Geralt of Elroy! I'm sorry, I do not regularly engage with strangers!\"" +
        "\nHeirmindon: \"Geralt of Elroy?! He must have failed his quest then... I'm sorry for your loss boy...\"\n " +
        "Heirmindon reverses the curse on Nordir.\n Heimindon: \"You must be off to kill Aant' El...\" " +
        "Nordir: \"Yes I was told you could point me in the right direction. Heimindon: \"Yes of course, the journey is harrowing and dangerous.\" " +
        "Nordir: \"I'm ready.\" \nHeimindon:\"I see, you must travel to the Old Kingdom of York.\" \nNordir: \"The fallen castle?\" " +
        "Heimindon: \"Yes, Aant' El dwells there, take this " + weapons[weap].name + " it will help you on your journey. Good luck, boy.\"\n" +
        " Nordir thanked Heimindon and walked out of the pub.",
        [
            {
                text: "Rest at the pub",
                nextText: 18
            },
            {
                text: "Begin Journey",
                nextText: 19
            }
        ], true),

    new storyNode(16,
        "Nordir: \"I come for strumpets, I must calm qualms rumbling beneath my waist.\" " +
        "\nMysterious Strangers: \"Strumpets you say! Oh yes I can help with thy wishes. Do you wish to solicit my client service?\"",
        [
            {
                text: "Solicit",
                nextText: 30
            },
            {
                text: "Admit to lying",
                nextText: 31
            }
        ], false),

    new weaponNode(randomFromArray(weapons), 17,
        "Nordir: \"I'm looking for a warlock called Heimindon the Fair, he is to guide me on a quest to slay Aant' El of Mont. " +
        "\nMysterious Stranger:\"Do not speak his name here boy! He has spies...\" \nNordir: \"You know of him?\" " +
        "\nMysterious Stranger: \"Yes boy, I am Heimindon the Fair, and you are?\" \nNordir: \"Nordir, Son of Geralt.\" " +
        "\nHeimindon: \"Geralt's son? He must have passed then... I'm sorry boy.\" " +
        "\nNordir: \"In death he sent me on his quest.\" \nHeimindon:\"Yes of course, the journey is harrowing and dangerous.\" " +
        "\nNordir: \"I'm ready.\" \nHeimindon:\"I see, you must travel to the Old Kingdom of York.\" \nNordir: \"The fallen castle?\" " +
        "\nHeimindon: \"Yes, Aant' El dwells there, take this " + weapons[weap].name + " it will help you on your journey. Good luck, boy.\" " +
        "\nNordir thanked Heimindon and walked out of the pub.",
        [
            {
                text: "Rest at the inn",
                nextText: 18
            },
            {
                text: "Begin Journey",
                nextText: 19
            }
        ], true),

    new storyNode(18,
        "Nordir stays the night in the inn adjacent to the pub. " +
        "The next morning he sets off to the Old Kingdom of York. " +
        "Around the sun's midpoint, Nordir approaches York. The castle is mangled and broken, darkness lies within. " +
        "Before reaching the the castle doors, a group of Montcore guards spot Nordir. Overtaken with fear Nordir makes his next move wisely...",
        [
            {
                text: "Fight the guards",
                nextText: 32
            },
            {
                text: "Flee",
                nextText: 33
            }
        ], false),

    new storyNode(19,
        "Nordir begins his journey at once and heads down the lane towards York. " +
        "Along his journey he meets the soul of a demonbeast. The demonbeast " +
        "is a cunning breed happy to outsmart its prey before serving them for dinner. " +
        "\nDemonbeast: \"HeLLo manBeast, I am FukLar the demonBeast\"",
        [
            {
                text: "Fight the demonbeast",
                nextText: 21
            },
            {
                text: "Talk to the demonbeast",
                nextText: 22
            }
        ], false),

    new weaponNode(randomFromArray(weapons), 20,
        "Nordir strikes down Heimindon with a final blow, upon his death, all of his spells reverse. " +
        "The pub breathes back to life. Nordir searches Heimindon's body and takes a " + weapons[weap].name +" out of his Endless Satchel. " +
        "In his bag, he also had a diary that told of Aant' El and the Montcore dwelling in the Old Kingdom of York. " +
        "Blood thirsty, Nordir set out at once ready to slay Aant' El of Mont. Along his journey, he meets the soul of a demonbeast. " +
        "The demonbeast is a cunning breed happy to outsmart its prey before serving them for dinner. " +
        "\nDemonbeast: \"HeLLo manBeast, I am FukLar the demonBeast\"",
        [
            {
                text: "Fight the demonbeast",
                nextText: 21
            },
            {
                text: "Talk to the demonbeast",
                nextText: 22
            }
        ], true),
    new storyNode(21,
        "Nordir: \"I haven't have time for riddles Fuklar, and you haven't much time to live left.\"",
        [
            {
                text: "Die",
                nextText: 9
            },
            {
                text: "Live",
                nextText: 23
            }
        ], false),

    new storyNode(22,
        "Nordir: \"I haven't much time for this beast, but I know your riddling ways. " +
        "If I must answer your riddle, I shall, in order to pass.\" \nFuklar: \"YeSSs manBeast... Hmmm howW abouT This: A vessel have I, " +
        "that is round as a pear, moist in the middle, surrounded with hair; and often it happens, that water flows there?\"",
        [
            {
                text: "An eye",
                nextText: 24
            },
            {
                text: "A well near a brook",
                nextText: 25
            }
        ], false),

    new storyNode(23,
        "Nordir slays the Demonbeast. As the soul withers, Nordir absorbs Fuklar's power and gains " + player.weapon + ". " +
        "Nordir continues on the path and reaches the gates of York. The land is shrowded in darkness and distruction. \"No guards?\" " +
        "Nordir thinks to himself. He opens the gates and heads in. The final battle is upon him.",
        [
            {
                text: "Let's go",
                nextText: 39
            }
        ], false),

    new storyNode(24,
        "Fuklar: \"You are correcT manBeaSt, BuT you are not done yeT.\" " +
        "\nNordir: \"Hurry up Beast.\" " +
        "\nFuklar: \"An eater lacking mouth and even maw; yet trees and beasts to it are daily bread. " +
        "Well fed it thrives and shows a lively life, but give it water and you do it dead.\"",
        [
            {
                text: "A drought",
                nextText: 27
            },
            {
                text: "A fire",
                nextText: 26
            }
        ], false),

    new storyNode(25,
        "Fuklar: \"You have lost man beast! Die as you are!\" " +
        "\nFuklar swipes his sharp fingers into a daunting claw and rips out Nordir's throat." +
        "Nordir expires.",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false),

    new storyNode(26,
        "Fuklar: \"Ayee you are correct again.... One final test manBeast.\" " +
        "\nNordir: \"Very well lets hear it.\"" +
        "\nFuklar: \"What speaks in all languages in his riding, and his mouth spits the poison of life or death? " +
        "It is silent when it rests, and is deaf like a boy or one of the poor.\"",
        [
            {
                text: "Money",
                nextText: 29
            },
            {
                text: "A pen",
                nextText: 28
            }
        ], false),

    new storyNode(27,
        "Fuklar: \"You have lost man beast! Die as you are!\" " +
        "\nFuklar possesses Nordir's body and forces Nordir to begining eating himself until there is no more. Nordir is left as bone for vultures.",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false),

    new storyNode(28,
        "Fuklar: \"Aye, you are a cunning warrior and a keen mind, you shall pass, Nordir of Elroy." +
        " Good luck on your quest.\"\n And like a friend, Fuklar departs from Nordir and wishes him well. " +
        "Nordir continues on the path and reaches the gates of York. The land is shrowded in darkness and distruction. " +
        "\"No guards?\" Nordir thinks to himself. He opens the gates and heads in. The final battle is upon him.",
        [
            {
                text: "Let's go",
                nextText: 39
            }
        ], false),

    new storyNode(29,
        "Fuklar: \"You have lost man beast! Die as you are!\" " +
        "\nFuklar sends a clan of rats possessed rats that begin knawing away at Nordir. Nordir is eaten alive.",
        {
            text: "Restart",
            nextText: -1
        }),

    new storyNode(30,
        "Nordir, caught in a lie, begins to actually desire a wonderful night away with the women of the street. " +
        "\nNordir: \"Send me your fairest prostitute in the inn tonight.\" " +
        "\nMysterious Stranger: \"Of course my lord, off to bed with you then.\" " +
        "\nNordir left the pub to stay the night in the inn, anxiously awaiting his night with an exotic woman. " +
        "A knock uttered from the door, Nordir answered to find a beautiful mistress dressed in tight rags. " +
        "\nStrumpet: \"Hello darling, I am Rose, may I come in?\"\n Nordir: \"Of course.\" " +
        "\n\nNordir and Rose begin their intimate courtship.\n\n Rose: \"What would you like to do tonight, handsome?\"",
        [
            {
                text: "Give me everything",
                nextText: 35
            },
            {
                text: "Let's talk",
                nextText: 36
            }
        ], false),

    new storyNode(31, "Nordir: \"Oh I'm afraid I interjected that in jest, I'm looking for a warlock called Heimindon the Fair, he is to guide me on a quest to slay Aant' El of Mont.\"\n Mysterious Stranger:"+
        "\" Do not speak his name here boy! He has spies...\"\n Nordir: \"You know of him?\"\n Mysterious Stranger: \"Yes boy, I am Heimindon the Fair, and you are?\"\n Nordir: \"Nordir, Son of Geralt.\"\n Heimindon:"+ 
        "\"Geralt's son? He must have passed then... I'm sorry boy.\"\n Nordir: \"In death he sent me on his quest.\"\n Heimindon:\"Yes of course, the journey is harrowing and dangerous.\"\n Nordir: \"I'm ready.\"\n" +
        " Heimindon:\"I see, you must travel to the Old Kingdom of York.\"\n Nordir: \"The fallen castle?\"\n Heimindon: \"Yes, Aant' El dwells there, take this "+ player.weapon + " it will help you on your journey. Good luck, boy.\"\n"+
        "Nordir thanked Heimindon and walked out of the pub.",
        [
            {
                text: "Rest at the Inn",
                nextText: 18
            },
            {
                text: "Begin journey",
                nextText: 19
            }
        ], false),

    new storyNode(32,
        "Nordir: \"Hello uglies, I'm here to free your head from your disgusting body.\" ",
        [
            {
                text: "Die",
                nextText: 9
            },
            {
                text: "Live",
                nextText: 34
            }
        ], false),

    new storyNode(33,
        "Nordir jumps out of his skin and runs back to his dwelling in Elroy. " +
        "Vengence will not be sought today. A few days later he is slain in his sleep by an assassin sent by " +
        "Aant' El of Mont. I suppose cowardice never pays...",
        [
            {
                text: "restart",
                nextText: -1
            }
        ], false),

    new storyNode(34,
        "Nordir slays the last of the guards. In one of the guard's bags there is a glowing elixer. " +
        "Nordir drinks the potion and is granted " + player.weapon + ". " +
        "Nordir opens the castle doors and enters. He's ready to face his final trial.",
        [
            {
                text: "The castle",
                nextText: 39
            }
        ], false),

    new storyNode(35,
        "Nordir: \"I'll have it all beautiful.\"\n\n Rose takes a small knife from her spruce undergarmet " +
        "covering her breast and stabs it deep into Nordir's heart. \n\nRose: \"Dare you take your father's quest in vain to seduce loose women. " +
        "DARE YOU TAKE HEIMINDON THE FAIR AS A MEER PIMP COMPARABLE TO THOSE IN THE STREETS. " +
        "YOU ARE UNWORTHY TO BE SLAYER OF AANT' EL OF MONT AND YOU ARE UNWORTHY TO HAVE FURTHER DESTINY. " +
        "DAMN YOU OF ALL TRANSGRESSIONS YOU FACE AS YOU REACH THE DOORS OF THE UNDERWORLD YOU ARSE OF MOTHER'S SADDLE-GOOSE\" " +
        "Nordir quickly expires due to bleeding. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false),

    new storyNode(36,
        "Nordir: \"I'm very happy your here, but I shant loose my chivalry with a lady of the night." +
        " Lets us have a fore-conversation before I smother you with my physical love among other things. " +
        "\nRose: \"Oh but Nordir, I mustn’t waste time, I have other men to make happy tonight.\" ",
        [
            {
                text: "Give me it all",
                nextText: 37
            },
            {
                text: "Just a little",
                nextText: 38
            }
        ], false),

    new storyNode(37,
        "Nordir: \"I'll have it all beautiful.\"\n\n Rose takes a small knife from her spruce undergarmet " +
        "covering her breast and stabs it deep into Nordir's heart. \n\nRose: \"Dare you take your father's quest " +
        "in vain to seduce loose women. DARE YOU TAKE HEIMINDON THE FAIR AS A MEER PIMP COMPARABLE TO THOSE IN THE STREETS. " +
        "YOU ARE UNWORTHY TO BE SLAYER OF AANT' EL OF MONT AND YOU ARE UNWORTHY TO HAVE FURTHER DESTINY. DAMN YOU OF ALL " +
        "TRANSGRESSIONS YOU FACE AS YOU REACH THE DOORS OF THE UNDERWORLD YOU ARSE OF MOTHER'S SADDLE-GOOSE\"\n " +
        "Nordir quickly expires due to bleeding. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false),

    new storyNode(38,
        "Nordir: \"Perhaps we shall refrain from having too much fun my quest requires a night's rest, maybe just " +
        "the simple pleasure of foreplay tonight.\"\n\n  Rose takes a small knife from her spruce undergarmet covering her " +
        "breast and stabs it deep into Nordir's heart. \n\nRose: \"Dare you take your father's quest in vain to seduce " +
        "loose women. DARE YOU TAKE HEIMINDON THE FAIR AS A MEER PIMP COMPARABLE TO THOSE IN THE STREETS. YOU ARE " +
        "UNWORTHY TO BE SLAYER OF AANT' EL OF MONT AND YOU ARE UNWORTHY TO HAVE FURTHER DESTINY. DAMN YOU OF ALL " +
        "TRANSGRESSIONS YOU FACE AS YOU REACH THE DOORS OF THE UNDERWORLD YOU ARSE OF MOTHER'S SADDLE-GOOSE\"\n " +
        "Nordir quickly expires due to bleeding. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false),

    new storyNode(39,
        "Nordir looks around the grungy castle. The ground reeks of deadmeat and the walls speaks of abuse. " +
        "The Old Kingdom of York has seen better days. Nordir starts down the main corridor but he does not " +
        "advance too quickly as he decides its better to keep a low profile. The less trouble the better. " +
        "Nordir reaches a fork in the hall with two corridor options. Funny the decison that started his quest begins " +
        "the end of it as well. ",
        [
            {
                text: "Right",
                nextText: 40
            },
            {
                text: "Left",
                nextText: 41
            }
        ], false),

    new storyNode(40,
        "Nordir walks down the right hallway and encounters two large doors. " +
        "The huge archway creates a doorway fit for kings and the noise behind the doors leads Nordir to believe " +
        "Aant' El of Mont lies behind them. He must be smart with his next move...",
        [
            {
                text: "Barge in to slay Aant' El",
                nextText: 46
            },
            {
                text: "Sneak in",
                nextText: 47
            }
        ], false),

    new storyNode(41,
        "Nordir walks down the left hallway and encounters Aant' El laying in a pile of corpses. " +
        "Aant' El is gasping for air. \nAant' El: Nordir son of Geralt, spare me! Spare me for your " +
        "father was a noble warrior and left me alive. The spirits who took him were not soldiers of " +
        "my own they were men of the Elder Realm!\"\n Nordir was skepical, the Montcore have a mastery of " +
        "tricks to decieve warriors, but this was different. Aant' El's eye was pleading for mercy. " +
        "\nAant' El: \"The Elder Realm's leader, Tarbious Gailore, is coming to take our realms and use" +
        " our bodies as guts for their dogs. Only with me, will you be powerful enough to defeat this terrible realm.\" ",
        [
            {
                text: "Join him",
                nextText: 42
            },
            {
                text: "Doubt him",
                nextText: 43
            }
        ], false),

    new storyNode(42,
        "Nordir: \"I will fight with you against this greater threat. What shall be our first move?\" " +
        "\nAant' El: \"Silly boy, we have no time to plan, you must act now. heal my wounds with a spell of life.\" " +
        "\nNordir begins the spell when suddenly his is stabbed in the back, the Aant' El in front of him mists away. " +
        "Nordir falls to the ground spitting blood. Aant' El is standing behind him. " +
        "\nAant' El: \"You were a fool to take me at my word and you pay greatly for your mistake with your life. " +
        "Only a fool sympathizes with his enemies. Your father would be sick.\"\n Nordir falls to the ground and expires." +
        " Aant' El lives. Perhaps a more worthy warrior will save this realm.",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false),

    new storyNode(43,
        "Nordir: \"I trust not in your idle game as much as I fail to trust in your ghostly figure Aant' El.\" " +
        "Nordir slices the projection's head clean off and Aant' El's illusion fades into smoke. " +
        "Aant' El comes behind Nordir. \nNordir: \"Resorting to smoke and mirrors Aant' El? I thought you were a " +
        "more cunning warrior that that.\" \nAant' El: \"As I thought of you to be more of a fool, nevertheless, " +
        "I'll take your soul as you die by my real hands.\" ",
        [
            {
                text: "Fight him",
                nextText: 44
            },
            {
                text: "Sacrifice your soul",
                nextText: 45
            }
        ], false),

    new storyNode(44,
        "Nordir: \"I'll crack thy head open like a damn melon of water.\"",
        [
            {
                text: "win",
                nextText: 98
            },
            {
                text: "die",
                nextText: 9
            }
        ], false),

    new storyNode(45,
        "Nordir: If only my soul you're are after, I am happy to oblige. " +
        "Take it and leave me be.\" \nAant' El stepped up to Nordir and swiftly pulled out his heart." +
        " \nAant' El: \"Blistering fool, man cannot survive without his heart.\" " +
        "Nordir expires. Maybe focus on vengance next time. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false),

    new storyNode(46,
        "Nordir slams open the door with his boot. Aant' El of Mont sits on a throne of corpses. " +
        "\nAant' El: \"Yes Nordir, there have been rumblings you've come to face me.\" " +
        "\nNordir: \"Your spies only prepared you for my arrival, nothing can prepare you for " +
        "the trials you will face in Hell.\" \nAant' El: \"You hold the secret to my " +
        "domination of this realm in your very soul. Give it to me and I will spare your life.\" " +
        "\nNordir: \"As long as I live, my will is to DESTROY you.\" " +
        "\nAant El': I'll rip your soul from your corpse then, like your father before you.\" ",
        [
            {
                text: "win",
                nextText: 98
            },
            {
                text: "die",
                nextText: 9
            }
        ], false),

    new storyNode(47,
        "Using a small air duct, Nordir jumps up onto a ledge and shimmies onto a platform before crouching under an airduct. " +
        "The passage leads to a large room where Aant' El sits on a throne of corpses. " +
        "\nAant' El: \"You're attempts at steath fail to entertain me, Nordir of Elroy.\"\n Nordir: \"Pity," +
        " there won't be any chance of further entertainment when you're confined to Hell.\"\n Aant' El: \"Even " +
        "in Hell I will haunt you Nordir, give me your soul and we worry of none of these matters.\"\n" +
        "\"Give me your soul and you live.\" ",
        [
            {
                text: "Give him your soul",
                nextText: 45
            },
            {
                text: "Fight him",
                nextText: 48
            }
        ], false),

    new storyNode(48,
        "Nordir: \"I very much like my soul thanks, time to die, ugly.\"",
        [
            {
                text: "win",
                nextText: 98
            },
            {
                text: "die",
                nextText: 9
            }
        ], false),

    new storyNode(49,
        "Nordir: \"I grow tired of this quest, take my soul and let me go on my way.\"\n " +
        "Aant' El swiftly slices Nordir's throat. Perhaps in your next life you won't turn your back on your quest.",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false),

    new storyNode(98,
        "Nordir makes a quick move and stabs Aant' El through the heart. \nNordir: \"You are done Aant' El,"+
        " the Montcore have no power here as long as I am here to protect it.\" "+
        "\nAant' El weakly forces out his final words. \nAant' El: \"Very well, the Montcore are a patient breed,"+
        " we'll have your soul soon. Like vultures circling meatbile we circle you Nordir.\"\n Nordir, tired of the"+
        " rumblings removes his sword from Aant' El's midsection on slices off his head. \nNordir: \"Enough of the "+
        "speculation, for I'm not finished yet. Let it be known by the slaying of Aant' El, I am a fierce warrior. "+
        "Only with permission shall death take me, and I will not grant it without first securing my people.\"\n"+
        " Nordir attaches Aant' El's head to his belt and retires to his home in Elroy. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false)
    ]

startGame();

