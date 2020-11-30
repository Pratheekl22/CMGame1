//Class that defines character objects and their attributes
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
    //Unimplemented code which will be implemented later
    updatePersonality(anger, charisma) {
        this.personality.increaseAnger(anger);
        this.personality.increaseCharisma(charisma);
        this.personality.updateNature();
    }
}