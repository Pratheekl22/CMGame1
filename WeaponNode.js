class weaponNode {
    id;
    text;
    options;
    weaponID;
    foundWeapon;

    constructor(weaponID, id, text, options, foundWeapon, trans) {
        this.weaponID = weaponID;
        this.id = id;
        this.text = text;
        this.options = options;
        this.foundWeapon = foundWeapon;
        this.trans = trans;
    }
}