class weapon {
    name;
    type;
    damage;
    critChance;
    smite;

    typeArray = ["Sword", "Bow", "Axe"];

    constructor(name, type, damage, critChance, smite) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.critChance = critChance;
        this.smite = smite;
    }
}