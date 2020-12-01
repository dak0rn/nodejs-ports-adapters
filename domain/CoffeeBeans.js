/**
 * @class CoffeeBeans
 */
class CoffeeBeans {
    /**
     * Creates a new CoffeeBeans
     *
     * @param {Number} stock KG of coffee beans in stock
     */
    constructor(stock) {
        this._stock = stock;
    }

    get inStock() {
        return this._stock;
    }

    set inStock(value) {
        if (value < 0) throw new Error('Coffee beans in stock must be >= 0');

        this._stock = value;
    }

    /**
     * Removes the given amount of beans from the stock
     *
     * @param {Number} amount Amount of beans to remove
     */
    remove(amount) {
        this.inStock = this.inStock - amount;
    }
}

module.exports = CoffeeBeans;
