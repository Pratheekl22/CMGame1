//Defines a node which pushes the story
class storyNode {
    id;
    text;
    options;
    foundWeapon;

    constructor(id, text, options, foundWeapon, trans) {
        this.id = id;
        this.text = text;
        this.options = options;
        this.foundWeapon = foundWeapon;
        this.trans = trans
    }
}

