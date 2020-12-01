class PileOfGold {
    /**
     * Creates a new PileOfGold
     *
     * @param {Number} amount Amount of gold we have
     */
    constructor(amount) {
        this._amount = amount;
    }

    add(amount) {
        this._amount += amount;
    }

    subtract(amount) {
        this.add(-amount);
    }
}

module.exports = PileOfGold;
