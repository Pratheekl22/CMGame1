//Unimplemented personality class
class personality {
    nature;
    anger;
    charisma;

    constructor(nature, anger, charisma) {
        this.nature = nature;
        this.anger = anger;
        this.charisma = charisma;
    }

    increaseAnger(increment) {
        this.anger += increment;
    }

    updateNature() {
        if (this.anger < 75) {
            this.nature = "Good";
        } else {
            this.nature = "Bad";
        }
    }

    increaseCharisma(increment) {
        this.charisma += increment;
    }

}