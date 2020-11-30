//Defines node which starts a combat encounter
class combatNode {
    id;
    player;
    enemy;
    text;
    goNext;
    trans;

    constructor(id, player, enemy, text, goNext, trans) {
        this.id = id;
        this.player = player;
        this.enemy = enemy;
        this.text = text;
        this.goNext = goNext;
        this.trans = trans;
    }


}