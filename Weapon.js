class weapon {
    name;
    type;
    damage;
    critChance;
    smite;
    trans;

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