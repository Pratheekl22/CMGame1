//Class which defines weapon objects and attributes
class weapon {
    name;
    type;
    damage;
    critChance;
    smite;
    trans;

    //Array of weapon types
    typeArray = ["Sword", "Bow", "Axe"];

    constructor(name, type, damage, critChance, smite, trans) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.critChance = critChance;
        this.smite = smite;
        this.trans = trans;
    }
}