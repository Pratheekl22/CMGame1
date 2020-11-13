class character {
    name;
    type;
    personality;
    weapon;

    constructor(name, type, personality, weapon) {
        this.name = name;
        this.type = type;
        this.personality = personality;
        this.weapon = weapon;
    }

    updatePersonality(anger, charisma) {
        this.personality.increaseAnger(anger);
        this.personality.increaseCharisma(charisma);
        this.personality.updateNature();
    }
}