//Declaration of HTML
const textElement = document.getElementById("text-bar");
const optionButtons = document.getElementById('choices');
let state = {};
//Unimplemented personality feature here to be implemented later
let playerPersonality = new personality("Good", 50, 50)
//Player object initialization
let player = new character("Nordir", "Player", playerPersonality,
    new weapon("Sword of Thundership", "Sword", 40, 40, false, 12),
    [{
        text: "Strike",
        damage: 40,
        crit: 40
    },{
        text: "Dodge",
    },{
        text: "Brutality"
    }],200);
//Enemey Initialization
let ogre = new character("Ogre", "Monster", null,
    new weapon("Mace of Macedom", "Mace", 30, 0, false),
    [{
        text: "The ogre swings its mighty mace",
        damage: 30,
        crit: 0
    },{
        text: "The ogre smashes its mace onto the ground",
        damage: 50,
        crit: 0
    },{
        text: "The ogre throws out a devastating punch",
        damage: 20,
        crit: 0
    }], 600);

let wizard = new character("Heimindon the Fair", "NPC", null,
    new weapon("Staff of Power", "Staff", 50, 10, false),
    [{
        text: "Heimindon calls a storm of power",
        damage: 50,
        crit: 20
    },{
        text: "Heimindon shifts the ground below you",
        damage: 30,
        crit: 60
    },{
        text: "Heimindon bends the air currents around you",
        damage: 20,
        crit: 0
    }], 300);

let demonbeast = new character("Fuklar", "Monster", null,
    new weapon("Claws of the Hunter", "Demon claw", 40, 90, true),
    [{
        text: "The demonbeast swings it claws at your throat",
        damage: 40,
        crit: 90
    },{
        text: "The demonbeast swipes at your chest",
        damage: 20,
        crit: 100
    },{
        text: "The demonbeast calls to the shadows to strike you down",
        damage: 100,
        crit: 0
    }], 300);

let guard = new character("Montcore Guards", "Enemy", null,
    new weapon("Spear of the Servant", "Spear", 80, 0, false),
    [{
        text: "The Guard stabs at your throat",
        damage: 90,
        crit: 50
    },{
        text: "The Guard attempts to knock you off your feet",
        damage: 30,
        crit: 80
    },{
        text: "The guard attempts to bash you with his shield",
        damage: 100,
        crit: 0
    }], 400);

let boss = new character("Aant' El of Mont", "Boss", null,
    new weapon("The soul eater", "Legendary blade", 60, 60, false),
    [{
        text: "Aant withers your soul",
        damage: 50,
        crit: 100
    },{
        text: "Aant loosens your ties with the overworld",
        damage: 40,
        crit: 100
    },{
        text: "Aant awakens your most evil desires",
        damage: 70,
        crit: 50
    }], 700);
//Weapon Array with weapon initialization
const weapons = [
    new weapon("Hollow Blade", "Sword", 0, 0, false, 0),
    new weapon("Excalibur", "Sword", 40, 80, true, 1),
    new weapon("Sword of Hellfire", "Sword", 50, 60, true, 2),
    new weapon("Blade of Legion", "Sword", 40, 40, true, 3),
    new weapon("Fury Blade", "Sword", 40, 70, true, 4),
    new weapon("Blade of Erroneous Fate", "Sword", 90, 10, true, 5),
    new weapon("Steady Blade", "Sword", 50, 50, true, 6),
    new weapon("Warhammer of Might", "Axe", 80, 40, true, 7),
    new weapon("Durendal", "Sword", 100, 100, true, 8),
    new weapon("Thunderhammer of Ragnarok", "Axe", 100, 20, true, 9),
    new weapon("Stormforged Devil Cometh", "Axe", 150, 15, true, 10),
    new weapon("Blade of Godsfate", "Sword", 10, 100, true, 11),
];
//Method that randomly assigns a weapon at certain points of the game.
var weap = -1;
function randomFromArray(arr){
    weap =  Math.floor(Math.random() * arr.length);
    return weap;
}
//Starts driver function and initializes all health
function startGame() {
    state = {};
    player.health = 200;
    ogre.health = 600;
    wizard.health = 300;
    demonbeast.health = 300;
    guard.health = 700;
    boss.health = 900;
    showText(1);
}
//Method that allows players to switch weapons on certain nodes
function changeWeapon(oldWeapon, newWeapon) {
    if (player.weapon === oldWeapon) {
        player.weapon = newWeapon;
    } else {
        player.weapon = oldWeapon
    }
    //Displays in game message
    toWeapon(player.weapon.trans);
    console.log(textElement.innerText.indexOf("\nNordir swapped to the"));
    if (textElement.innerText.indexOf("\nNordir swapped to the") !== -1) {
        textElement.innerText = textElement.innerText.slice(0, textElement.innerText.indexOf("\nNordir swapped to the"));
    }
    textElement.innerText += " \nNordir swapped to the " + player.weapon.name;
    scrollBot();
    console.log(player.weapon);
}
//Scrolls to the bottom of text when attacking
function scrollBot(){
    var textL = document.getElementById("text-bar");
    textL.scrollTop = textL.scrollHeight;
}
//Method that handles all combat inputs
var dodgeCount = 0;
function attackMove(attack, enemy, playerWin, enemyWin) {
    let dodge = false;
    console.log(dodgeCount)
    //Ran if player chooses to strike
    if (attack.text === "Strike") {
        textElement.innerText += " \nNordir launches a strike at the enemy";
        //Scrolls to the bottom of text when attacking
        scrollBot();
        let damage = player.weapon.damage;
        //Rolls to determine critical strike chance for Nordir
        let crit = Math.floor(Math.random() * 100);
        //Determines if the roll is viable for critical strike
        if (crit <= player.weapon.critChance) {
            damage *= 2;
            textElement.innerText += " \nNordir's strike hits critically";
            var textL = document.getElementById("text-bar");
            textL.scrollTop = textL.scrollHeight;
        }
        enemy.health -= damage;
        //Prints text of enemy health after a strike
        textElement.innerText += " \nEnemy Health: " + enemy.health;
        scrollBot();
        //Ran if player chooses to dodge
    } else if (attack.text === "Dodge") {
        textElement.innerText += " \nNordir executes a dodge";
        scrollBot();
        dodge = true;
        dodgeCount++;
        //Checks the Dodge count runs
        if (dodgeCount === 3 || dodgeCount === 4) {
            if (dodgeCount === 3){
                //Gives message if player dodges too many times
                textElement.innerText += " \nThe enemy begins to understand your attacks";
                scrollBot();
            } else if (dodgeCount === 4) {
                textElement.innerText += " \nThe enemy is preparing to counter your attacks.";
                scrollBot();
            }
        }
        //Ran if player chooses to execute a brutality
    } else {
        textElement.innerText += " \nNordir attempts to launch a brutal strike at the enemy";
        var textL = document.getElementById("text-bar");
        textL.scrollTop = textL.scrollHeight;
        //Rolls to determine if brutality is success
        let esc = Math.floor(Math.random() * 100);
        if (esc <= 20) {
            textElement.innerText += " \nNordir's attempt is successful";
            scrollBot();
            sleep(5000)
            player.health = 250;
            dodgeCount = 0;
            return showText(playerWin);
        } else {
            textElement.innerText += " \nNordir's attempt fails";
            scrollBot();
            sleep(5000)
            return showText(enemyWin);
        }
    }
    //Run if the enemy dies
    if (enemy.health <= 0) {
        textElement.innerText += " \nNordir has slain the enemy";
        scrollBot();
        sleep(5000)
        dodgeCount = 0;
        player.health = 250;
        return showText(playerWin);
        //Begins enemy attack
    } else {
        //Kills Nordir if he's dodged 5 attacks
        if (dodgeCount === 5) {
            textElement.innerText += " \nThe enemy predicts your move and strikes you with a mighty blow";
            scrollBot();
            player.health = 0;
        }
        //Determines enemy attack
        let enemyAttack = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
        //Prints enemy attack
        textElement.innerText += " \n" + enemyAttack.text;
        //Run if Nordir doesn't dodge
        if (!dodge) {
            let damage = enemyAttack.damage;
            //Determines if enemy attacks critically
            let crit = Math.floor(Math.random() * 100);
            //Run if crit is rolled
            if (crit <= enemy.weapon.critChance) {
                damage *= 2;
                textElement.innerText += " \nThe enemy's strike hits critically";
                scrollBot();
            }
            //Subtracts damage from Nordir's health
            player.health -= damage;
            console.log(enemyAttack);
        }
        //Prints Nordir's health
        textElement.innerText += " \nNordir's Health: " + player.health;
        scrollBot();
        //Run if enemy kills Nordir
        if (player.health <= 0) {
            textElement.innerText += " \nNordir has been slain";
            scrollBot();
            sleep(5000)
            //Resets Nordir's weapon
            player.weapon = new weapon("Sword of Thundership", "Sword", 40, 40, false, 12);
            player.health = 200;
            return showText(enemyWin);
        }
    }
}

function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
//Begins combat and intializes the interface
function runCombat(currentNode) {
    textElement.innerText += "\nNordir faces " + currentNode.enemy.name;
    //Constructs buttons for interface
    currentNode.player.attacks.forEach(attack => {
        const button = document.createElement('button');
        button.innerText = attack.text;
        button.classList.add("choice");
        //Adds event listener on each button
        button.addEventListener('click', () => attackMove(attack, currentNode.enemy,
            currentNode.goNext[1].nextText, currentNode.goNext[0].nextText));
        optionButtons.appendChild(button);
    })
}
//Driver method which shows text
function showText(textIndex) {
    //Determines the current node and sets it
    const currentNode = storyPath.find(storyNode => storyNode.id === textIndex)
    textElement.innerText = currentNode.text;
    //Checks if the node fires an animation
    if (Number.isInteger(currentNode.trans)){
        toTrans(currentNode.trans);
    }
    //Makes sure scrollTop is set to 0 after combat
    var textL = document.getElementById("text-bar");
    textL.scrollTop = 0;
    //Removes all existing buttons
    while (optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild);
    }
    //Determines if node runs combat
    if (currentNode instanceof combatNode) {
        runCombat(currentNode);
    } else {
        let swapCheck = false;
        currentNode.options.forEach(option => {
            //Determines if node allows for a weapon switch
            if (currentNode instanceof weaponNode && swapCheck === false) {
                //Creates button for weapon exchange
                const button = document.createElement('button');
                button.innerText = "Exchange Your Weapon";
                let oldWeapon = player.weapon;
                button.addEventListener('click', () => changeWeapon(oldWeapon, weapons[currentNode.weaponID]));
                button.classList.add("choice");
                optionButtons.appendChild(button);
                swapCheck = true;
            }
            //Shows buttons
            if (showOption(option)) {
                const button = document.createElement('button');
                button.innerText = option.text;
                button.addEventListener('click', () => selectOption(option));
                button.classList.add("choice");
                optionButtons.appendChild(button);
            }
        })

        swapCheck = false;
    }
}
//Helper method
function showOption(option) {
    return true;
}
function selectOption(option) {
    const nextTextNodeID = option.nextText;
    //Restarts game when die or victory
    if (nextTextNodeID <= 0) {
        location.reload()
    }
    //Continues text to next node
    showText(nextTextNodeID);
}
//Array of Nodes of many kinds
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
        "an erroneous breed called the Montcore, ruled by Aant' El of Mont. They threaten the saftey of our realm. We are the last desendants of "+
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
            }], false, 0),
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
    new weaponNode(0, 3,
        "Nordir foges a mere Hollow Blade. Nordir never was a great blacksmith.",
        [{
            text: "Continue",
            nextText: 4
        }], true, 1),
    new storyNode(4,
        "\"Which way should I go?\" Nordir thinks to himeself.",
        [{
            text: "Left",
            nextText: 6
        },
            {
                text: "Right",
                nextText: 5
            }], false, 1),

    new storyNode(5,
        "Nordir headed right, past the meadow. He walked for a couple hours before spotting a villiage in the " +
        "distance, Hampt! Excited, Nordir made his way to the village, hungry for the quest to commense!",
        [{
            text: "Go to Pub",
            nextText: 11
        }], false, 3),

    new storyNode(6,
        "Nordir wanders to the left into the Forrest of Ferrar, he only travels 500 paces before he encounters a " +
        "repulsive Ogre. \nOgre: \"What be your buisness her' boy?\" ",
        [
            {
                text: "Fight",
                nextText: 8
            },
            {
                text: "Talk",
                nextText: 7
            }
        ], false, 2),

    new storyNode(7,
        "Nordir: \"I mean no trouble, I'm travelling to a village outside Elroy called Hampt, " +
        "please let me pass.\"\n Ogre: \"Hampt! Well thats not far out of this very forrest," +
        " just follow the setting sun, west and you shall reach Hampt before nightfall.\"\n " +
        "Nordir thanked the Ogre and continued on his way. Upon leaving the forrest, Nordir spots a village in the distance, " +
        "Hampt! Tired and ready for a rest, he heads towards the humble village.",
        [{
            text: "Go to Pub",
            nextText: 11
        }], false),

    new combatNode(8,
        player, ogre, "Nordir: \"Shut up and fight you ugly beast!\"",
        [
            {
                text: "You died",
                nextText: 9
            }, {
            text: "Win",
            nextText: 10
        }]),

    new storyNode(9,
        "Nordir has DIED, perhaps better choices won't seal your fate next time....",
        [
            {
                text: "Restart",
                nextText: -1
            }

        ], false, 17),
    new weaponNode(randomFromArray(weapons), 10,
        "The Ogre takes his last breath and perishes. " +
        ". Nordir walks into the Ogre's dwelling to find a chest. Inside there's a " + weapons[weap].name +
        " Nordir takes the weapon and carries on his way towards the village. Upon leaving the forrest, " +
        "Nordir spots a village in the distance, Hampt! Tired and ready for a rest, he heads towards the humble village.",
        [
            {
                text: "Go to pub",
                nextText: 11
            }
        ], true, 3),
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
        ], false, 4),
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

    new combatNode(14, player, wizard,
        " Nordir: \"I came to find a wizard! Who knew I'd have to kill one too!\" ",
        [
            {
                text: "Die",
                nextText: 9
            },
            {
                text: "Live",
                nextText: 20
            }
        ]),

    new weaponNode(randomFromArray(weapons), 15,
        " Nordir: \"Heimindon? My father sent me, Geralt of Elroy! I'm sorry, I do not regularly engage with strangers!\"" +
        " \nHeirmindon: \"Geralt of Elroy?! He must have failed his quest then... I'm sorry for your loss boy...\" " +
        "\nHeirmindon reverses the curse on Nordir. \nHeimindon: \"You must be off to kill Aant' El...\" " +
        "\nNordir: \"Yes I was told you could point me in the right direction. \nHeimindon: \"Yes of course, the journey is harrowing and dangerous.\" " +
        "\nNordir: \"I'm ready.\" \nHeimindon:\"I see, you must travel to the Old Kingdom of York.\" \nNordir: \"The fallen castle?\" " +
        "\nHeimindon: \"Yes, Aant' El dwells there, take this " + weapons[weap].name + " it will help you on your journey. Good luck, boy.\"" +
        "\nNordir thanked Heimindon and walked out of the pub.",
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
        "Nordir: \"I come for strumpets, I must calm qualms rumbling beneath my waist\" " +
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
        "\nNordir: \"I'm ready.\" Heimindon:\"I see, you must travel to the Old Kingdom of York.\" \nNordir: \"The fallen castle?\" " +
        "\nHeimindon: \"Yes, Aant' El dwells there, take this " + weapons[weap].name +  " it will help you on your journey. Good luck, boy.\" " +
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
        ], false, 7),

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
        ], false, 8),

    new weaponNode(randomFromArray(weapons), 20,
        "Nordir strikes down Heimindon with a final blow, upon his death, all of his spells reverse. " +
        "The pub breathes back to life. Nordir searches Heimindon's body and takes a " + weapons[weap].name + " out of his Endless Satchel. " +
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
        ], true, 5),
    new combatNode(21, player, demonbeast,
        "Nordir: \"I haven't much time for riddles Fuklar, and you haven't much time to live left.\"",
        [
            {
                text: "Die",
                nextText: 9
            },
            {
                text: "Live",
                nextText: 23
            }
        ], 8),

    new storyNode(22,
        "Nordir: \"I haven't much time for this beast, but I know your riddling ways. " +
        "If I must answer your riddle, I shall, in order to pass.\" \nFuklar: \"YeSSs manBeast... Hmmm howW abouT Thisss: A vessel have I, " +
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
        ], false, 8),

    new weaponNode(randomFromArray(weapons), 23,
        "Nordir slays the Demonbeast. As the soul withers, Nordir absorbs Fuklar's power and gains "+ weapons[weap].name +". " +
        "Nordir continues on the path and reaches the gates of York. The land is shrowded in darkness and distruction. \"No guards?\" " +
        "Nordir thinks to himself. He opens the gates and heads in. The final battle is upon him.",
        [
            {
                text: "Let's Go",
                nextText: 39
            }
        ], true, 11),

    new storyNode(24,
        "Fuklar: \"You are correcT manBeaST, BuT you are not done yeT.\" " +
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
        "\nFuklar swipes his sharp fingers into a daunting claw and rips out Nordir's throat. " +
        "Nordir expires. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 17),

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
        "\nFuklar possesses Nordir's body and forces Nordir to begining eating himself until there is no more meat on his bones. Nordir is left as bone for vultures.",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 17),

    new storyNode(28,
        "Fuklar: \"Aye, you are a cunning warrior and a keen mind, you shall pass Nordir of Elroy." +
        " Good luck on your quest.\"\n And like a friend, Fuklar departs from Nordir and wishes him well. " +
        "Nordir continues on the path and reaches the gates of York. The land is shrowded in darkness and distruction. " +
        "\"No guards?\" Nordir thinks to himself. He opens the gates and heads in. The final battle is upon him.",
        [
            {
                text: "Let's go",
                nextText: 39
            }
        ], false, 11),

    new storyNode(29,
        "Fuklar: \"You have lost man beast! Die as you are!\" " +
        "\nFuklar sends a clan of rats possessed rats that begin knawing away at Nordir. Nordir is eaten alive.",
        {
            text: "Restart",
            nextText: -1
        }, false, 17),

    new storyNode(30,
        "Nordir, caught in a lie, begins to actually desire a wonderful night away with the women of the street. " +
        "\nNordir: \"Send me your fairest prostitute in the inn tonight.\" " +
        "\nMysterious Stranger: \"Of course my lord, off to bed with you then.\" " +
        "\nNordir left the pub to stay the night in the inn, anxiously awaiting his night with an exotic woman. " +
        "A knock uttered from the door, Nordir answered to find a beautiful mistress dressed in tight rags. " +
        "\nStrumpet: \"Hello darling, I am Rose, may I come in?\" \nNordir: \"Of course.\" " +
        "\nNordir and Rose begin their intimate courtship. \nRose: \"What would you like to do tonight, handsome?\"",
        [
            {
                text: "Give me everything",
                nextText: 35
            },
            {
                text: "Let's talk",
                nextText: 36
            }
        ], false, 7),

    new weaponNode(randomFromArray(weapons), 31,
        "Nordir: \"Oh I'm afraid I interjected that in jest, I'm looking for a warlock called Heimindon the Fair, he is to guide me on a quest to slay Aant' El of Mont.\"\n Mysterious Stranger:"+
        "\" Do not speak his name here boy! He has spies...\"\n Nordir: \"You know of him?\"\n Mysterious Stranger: \"Yes boy, I am Heimindon the Fair, and you are?\"\n Nordir: \"Nordir, Son of Geralt.\"\n Heimindon:"+
        "\"Geralt's son? He must have passed then... I'm sorry boy.\"\n Nordir: \"In death he sent me on his quest.\"\n Heimindon:\"Yes of course, the journey is harrowing and dangerous.\"\n Nordir: \"I'm ready.\"\n" +
        " Heimindon:\"I see, you must travel to the Old Kingdom of York.\"\n Nordir: \"The fallen castle?\"\n Heimindon: \"Yes, Aant' El dwells there, take this "+ weapons[weap].name + " it will help you on your journey. Good luck, boy.\"\n"+
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

    new combatNode(32, player, guard,
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
        ], 10),

    new storyNode(33,
        "Nordir jumps out of his skin and runs back to his dwelling in Elroy. " +
        "Vengence will not be sought today. A few days later he is slain in his sleep by an assassin sent by " +
        "Aant' El of Mont. I suppose cowardice never pays...",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 17),

    new weaponNode(randomFromArray(weapons), 34,
        "Nordir slays the last of the guards. In one of the guard's bags there is a glowing elixer. " +
        "Nordir drinks the potion and finds "+ weapons[weap].name +" " +
        "Nordir opens the castle doors and enters. He's ready to face his final trial.",
        [
            {
                text: "Lets go!",
                nextText: 39
            }
        ], true, 11),

    new storyNode(35,
        "Nordir: \"I'll have it all beautiful.\" \nRose takes a small knife from her spruce undergarmet " +
        "covering her breast and stabs it deep into Nordir's heart. \nRose: \"Dare you take your father's quest in vain to seduce loose women. " +
        "DARE YOU TAKE HEIMINDON THE FAIR AS A MEER PIMP COMPARABLE TO THOSE IN THE STREETS. " +
        "YOU ARE UNWORTHY TO BE SLAYER OF AANT' EL OF MONT AND YOU ARE UNWORTHY TO HAVE FURTHER DESTINY. " +
        "DAMN YOU OF ALL TRANSGRESSIONS YOU FACE AS YOU REACH THE DOORS OF THE UNDERWORLD YOU ARSE OF MOTHER'S SADDLE-GOOSE\" " +
        "\nNordir quickly expires due to bleeding. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 17),

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
        ], false, 6),

    new storyNode(37,
        "Nordir: \"I'll have it all beautiful.\" \nRose takes a small knife from her spruce undergarmet " +
        "covering her breast and stabs it deep into Nordir's heart. \nRose: \"Dare you take your father's quest " +
        "in vain to seduce loose women. DARE YOU TAKE HEIMINDON THE FAIR AS A MEER PIMP COMPARABLE TO THOSE IN THE STREETS. " +
        "YOU ARE UNWORTHY TO BE SLAYER OF AANT' EL OF MONT AND YOU ARE UNWORTHY TO HAVE FURTHER DESTINY. DAMN YOU OF ALL " +
        "TRANSGRESSIONS YOU FACE AS YOU REACH THE DOORS OF THE UNDERWORLD YOU ARSE OF MOTHER'S SADDLE-GOOSE\" " +
        "\nNordir quickly expires due to bleeding. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 6),

    new storyNode(38,
        "Nordir: \"Perhaps we shall refrain from having too much fun my quest requires a night's rest, maybe just " +
        "the simple pleasure of foreplay tonight.\"\nRose takes a small knife from her spruce undergarmet covering her " +
        "breast and stabs it deep into Nordir's heart. \nRose: \"Dare you take your father's quest in vain to seduce " +
        "loose women. DARE YOU TAKE HEIMINDON THE FAIR AS A MEER PIMP COMPARABLE TO THOSE IN THE STREETS. YOU ARE " +
        "UNWORTHY TO BE SLAYER OF AANT' EL OF MONT AND YOU ARE UNWORTHY TO HAVE FURTHER DESTINY. DAMN YOU OF ALL " +
        "TRANSGRESSIONS YOU FACE AS YOU REACH THE DOORS OF THE UNDERWORLD YOU ARSE OF MOTHER'S SADDLE-GOOSE\" " +
        "\nNordir quickly expires due to bleeding. ",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 17),

    new storyNode(39,
        "Nordir looks around the grungy castle. The ground reeks of deadmeat and the walls speak of abuse. " +
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
        ], false, 12),

    new storyNode(40,
        "Nordir walks down the right hallway and encounters large doors. " +
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
        ], false, 12),

    new storyNode(41,
        "Nordir walks down the left hallway and encounters Aant' El laying in a pile of corpses. " +
        "Aant' El is gasping for air. \nAant' El: \"Nordir son of Geralt, spare me! Spare me for your " +
        "father was a noble warrior and left me alive. The spirits who took him were not soldiers of " +
        "my own they were men of the Elder Realm!\" \nNordir was skepical, the Montcore have a mastery of " +
        "tricks to decieve warriors, but this was different. Aant' El's eye was pleading for mercy. " +
        "\nAant' El: \"The Elder Realm's leader Tarbious Gailore is coming to take our realms and use" +
        " our bodies as guts for their dogs. Only with me will you be powerful enough to defeat this terrible realm.\" ",
        [
            {
                text: "Join him",
                nextText: 42
            },
            {
                text: "Doubt",
                nextText: 43
            }
        ], false, 13),

    new storyNode(42,
        "Nordir: \"I will fight with you against this greater threat. What shall be our first move?\" " +
        "\nAant' El: \"Silly boy, we have no time to plan you must act now, heal my wounds with a spell of life.\" " +
        "\nNordir begins the spell when suddenly his is stabbed in the back, the Aant' El in front of him mists away. " +
        "Nordir falls to the ground spitting blood. Aant' El is standing behind him. " +
        "\nAant' El: \"You were a fool to take me at my word now and you pay greatly for your mistake with your life. " +
        "Only a fool sympathizes with his enemies. Your father would be sick.\" \nNordir falls to the ground and expires." +
        " Aant' El lives. Perhaps a more worthy warrior will save this realm.",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 17),

    new storyNode(43,
        "Nordir: \"I trust not in your idle game as much as I fail to trust in your ghostly figure Aant' El.\" " +
        "\n\nNordir slices the projection's head clean off and Aant' El's illusion fades into smoke. " +
        "Aant' El comes behind Nordir. \nNordir: \"Resorting to smoke and mirrors Aant' El? I thought you were a " +
        "more cunning warrior that that.\" \nAant' El: \"As I thought of you to be more of a fool, nevertheless " +
        "I'll take your soul as you die by my real hands.\" ",
        [
            {
                text: "Fight him",
                nextText: 44
            },
            {
                text: "You just want my soul? No problem!",
                nextText: 45
            }
        ], false),

    new combatNode(44, player, boss,
        "Nordir: \"I'll crack thy head open like a damn melon of water.\"",
        [
            {
                text: "die",
                nextText: 9
            },
            {
                text: "win",
                nextText: 100
            }
        ]),

    new storyNode(45,
        "Nordir: \"If only my soul you're are after, I am happy to oblige. " +
        "Take it and leave me be.\" \nAant' El stepped up to Nordir and swiftly pulled out his heart." +
        "\nAant' El: \"Blistering fool, man cannot survive without his heart.\"" +
        "\nNordir expires. Maybe focus on vengance next time. ",
        [
            {
                text: "restart",
                nextText: -1
            }
        ], false, 17),

    new combatNode(46, player, boss,
        "Nordir slams open the door with his boot. Aant' El of Mont sits on a throne of corpses. " +
        "\nAant' El: \"Yes Nordir, there have been rumblings you've come to face me.\" " +
        "\nNordir: \"Your spies only prepared you for my arrival, nothing can prepare you for " +
        "the trials you will face in Hell.\" \nAant' El: \"You hold the secret to my " +
        "domination of this realm in your very soul. Give it to me and I will spare your life.\" " +
        "\nNordir: \"As long as I live my will, is to DESTROY you!\" " +
        "\nAant El': Then I'll rip your soul from your corpse, like your father before you.\" ",
        [
            {
                text: "die",
                nextText: 9
            },
            {
                text: "win",
                nextText: 100
            }
        ], 13),

    new storyNode(47,
        "Using a small air duct, Nordir jumps up onto a ledge and shimmies onto a platform before crouching under an airduct. " +
        "The passage leads to a large room where Aant' El sits on a throne of corpses. " +
        "\nAant' El: \"You're attempts at steath fail to entertain me, Nordir of Elroy.\" \nNordir: \"Pity," +
        " there won't be any chance of further entertainment when you are confined to Hell.\" \nAant' El: \"Even " +
        "in Hell I will haunt you Nordir, give me your soul and we won't worry with any of these matters.\"\n" +
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
        ], false, 13),

    new combatNode(48, player, boss,
        "Nordir: \"I very much like my soul thanks, why dont we work on sawing off that head of yours, now.\"",
        [
            {
                text: "die",
                nextText: 9
            },
            {
                text: "win",
                nextText: 100
            }
        ]),

    new storyNode(49,
        "Nordir: \"I grow tired of this quest, take my soul and let me go on my way.\" " +
        "\nAant' El swiftly slices Nordir's throat. Perhaps in your next life you won't turn your back on your quest.",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 17),

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
        ], false, 16),

    new storyNode(100, "Nordir makes a quick move and stabs Aant' El through the heart. \nNordir: \"You are done Aant' El,"+
        " the Montcore have no power here as long as I am here to protect it.\" "+
        "\nAant' El weakly forces out his final words. \nAant' El: \"Very well, the Montcore are a patient breed,"+
        " we'll have your soul soon. Like vultures circling meatbile we circle you Nordir.\"\n Nordir, tired of the"+
        " rumblings removes his sword from Aant' El's midsection on slices off his head. \nNordir: \"Enough of the "+
        "speculation, for I'm not finished yet. Let it be known by the slaying of Aant' El, I am a fierce warrior. "+
        "Only with permission shall death take me, and I will not grant it without first securing my people.\"\n"+
        " Nordir attaches Aant' El's head to his belt and retires to his home in Elroy.",
        [
            {
                text: "Restart",
                nextText: -1
            }
        ], false, 16)
];
//Class of strings which designate what ID is being edited
class pkg {
    //Background Transition
    bTrans;
    //Right Character Transition
    cTrans;
    //Left Character Transition
    ctrans2;

    constructor (bTrans, cTrans, cTrans2) {
        this.bTrans = bTrans;
        this.cTrans = cTrans;
        this.cTrans2 = cTrans2;
    }
}
//Array full of Transition packages
const fullTransitions = [
    new pkg("house_interior", "Nordir", "N"),
    new pkg("elroy", "Nordir","N"),
    new pkg("forest_day", "Nordir", "Ogre"),
    new pkg("forest_day", "Nordir", "N"),
    new pkg("pub_interior", "Nordir", "Heimindon"),
    new pkg("pub_interior", "Nordir", "N"),
    new pkg("room_inn", "Nordir", "Rose"),
    new pkg("room_inn", "Nordir", "N"),
    new pkg("forest_night", "Nordir", "Fuklar"),
    new pkg("forest_night", "Nordir", "N"),
    new pkg("york_e", "Nordir", "Guards"),
    new pkg("york_e", "Nordir", "N"),
    new pkg("york_i", "Nordir", "N"),
    new pkg("throne_room", "Nordir","Aant"),
    new pkg("throne_room", "Nordir", "N"),
    new pkg("house_interior", "N", "N"),
    new pkg("V", "N", "N"),
    new pkg("D","N","N")
]
//Method that takes in an index from a StoryNode and executes it
function toTrans(index){
    //Removes character on left if run
    if(fullTransitions[index].cTrans === "N"){
        console.log(fullTransitions[index].cTrans);
        //Removes all character on left if run for clean up
        for (var i = 0; i < fullTransitions.length; i++){
            //Makes sure ID exists
            if (fullTransitions[i].cTrans !== "N"){
                document.getElementById(fullTransitions[i].cTrans).style.display = "none";
            }
        }
    }
    //Removes character on right if run
    if(fullTransitions[index].cTrans2 === "N"){
        console.log(fullTransitions[index].cTrans2);
        //Removes of characters on the right for clean up
        for (var i = 0; i < fullTransitions.length; i++){
            //Makes sure ID exists
            if (fullTransitions[i].cTrans2 !== "N"){
                document.getElementById(fullTransitions[i].cTrans2).style.display = "none";
            }
        }
    }
    console.log(fullTransitions[index].bTrans);
    //Shows Background Transition
    document.getElementById(fullTransitions[index].bTrans).style.display = "block";
    var current = fullTransitions[index].bTrans
    //Removes all background transitions for cleanup
    for (var i = 0; i < fullTransitions.length; i++){
        //Doesn't remove current background
        if (i != index && current != fullTransitions[i].bTrans){
            document.getElementById(fullTransitions[i].bTrans).style.display = "none";
        }
    }
    //Shows character on the left transition
    if (fullTransitions[index].cTrans !== "N"){
        document.getElementById(fullTransitions[index].cTrans).style.display = "block";
        //Shows animation
        document.getElementById(fullTransitions[index].cTrans).className ='classLeftIn';
        console.log(fullTransitions[index].cTrans);
        var current = fullTransitions[index].cTrans
        //Removes all character on left if run for clean up
        for (var i = 0; i < fullTransitions.length; i++){
            //Doesn't remove current character
            if (i != index && current != fullTransitions[i].cTrans){
                //Makes sure character exists
                if (fullTransitions[i].cTrans !== "N"){
                    document.getElementById(fullTransitions[i].cTrans).style.display = "none";
                }
            }
        }
    }
    //Shows charater on the right transition
    if (fullTransitions[index].cTrans2 !== "N"){
        document.getElementById(fullTransitions[index].cTrans2).style.display = "block";
        //Shows animation
        document.getElementById(fullTransitions[index].cTrans2).className ='classRightIn';
        console.log(fullTransitions[index].cTrans2);
        var current = fullTransitions[index].cTrans2
        //Removes all character on right if run for clean up
        for (var i = 0; i < fullTransitions.length; i++){
            //Doesn't remove current character
            if (i != index && current != fullTransitions[i].cTrans2){
                //Makes sure character exists
                if (fullTransitions[i].cTrans2 !== "N"){
                    document.getElementById(fullTransitions[i].cTrans2).style.display = "none";
                }
            }
        }
    }
}
var timesclick = 0;
var timesclick2 = 0;
//Function to open weapon box
function openWeap() {
    if (timesclick >= 1){
        document.getElementById("wea").style.display = "none";
        timesclick = 0;

    } else {
        document.getElementById("wea").style.display = "block";
        timesclick++;

    }
}
//Function to open Bestiary box
function openBest() {
    if (timesclick2 >= 1){
        document.getElementById("bes").style.display = "none";
        timesclick2 = 0;

    } else {
        document.getElementById("bes").style.display = "block";
        timesclick2++;

    }
}
//Function that shows weapon animation for indexed weapon
function toWeapon(index) {
    switch (index){
        case 0:
            weaponAnimation("hollow");
            break;
        case 1:
            weaponAnimation("Ex");
            break;
        case 2:
            weaponAnimation("Hellfire");
            break;
        case 3:
            weaponAnimation("Legion");
            break;
        case 4:
            weaponAnimation("Fury");
            break;
        case 5:
            weaponAnimation("Fate");
            break;
        case 6:
            weaponAnimation("Steady");
            break;
        case 7:
            weaponAnimation("Might");
            break;
        case 8:
            weaponAnimation("Durendal");
            break;
        case 9:
            weaponAnimation("Ragnarok");
            break;
        case 10:
            weaponAnimation("Cometh");
            break;
        case 11:
            weaponAnimation("Godsfate");
            break;
        case 12:
            weaponAnimation("Thundership");
            break;
    }


}
//Runs animation and removes class
function weaponAnimation(weaponName){
    //Executes animation
    document.getElementById(weaponName).className = "classWeaponOut";
    //resets animation after 2 seconds
    setTimeout(function(){
        document.getElementById(weaponName).classList.remove("classWeaponOut")
    }, 2000);
}
//Shows opening title screen
document.getElementsByClassName("title-screen")[0].style.display = "block";
document.getElementsByClassName("title-screen")[1].style.display = "block";
//Begins game when clicked
document.getElementById("start").addEventListener('click', function() {
    document.getElementById("screen1").style.display = "block";
    document.getElementsByClassName("title-screen")[0].style.display = "none";
    document.getElementsByClassName("title-screen")[1].style.display = "none";
    startGame();
});