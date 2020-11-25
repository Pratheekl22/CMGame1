class character {
    name;
    type;
    personality;
    weapon;
    attacks;
    health;

    constructor(name, type, personality, weapon, attacks, health) {
        this.name = name;
        this.type = type;
        this.personality = personality;
        this.weapon = weapon;
        this.attacks = attacks;
        this.health = health;
    }

    updatePersonality(anger, charisma) {
        this.personality.increaseAnger(anger);
        this.personality.increaseCharisma(charisma);
        this.personality.updateNature();
    }
}