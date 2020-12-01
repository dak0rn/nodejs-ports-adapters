const assert = require('assert');
const CoffeeBeans = require('../CoffeeBeans');

describe('CoffeeBeans', () => {
    let sut;
    const MAX_BEANS = 1000;

    beforeEach(() => {
        sut = new CoffeeBeans(MAX_BEANS);
    });

    it('throws when setting negative stock', () => {
        const setInvalid = function () {
            sut.inStock = -1;
        };

        assert.throws(setInvalid);
    });

    it('throws when remove more than exists', () => {
        const setInvalid = function () {
            sut.remove(MAX_BEANS + 1);
        };

        assert.throws(setInvalid);
    });

    it('does not throw when setting stock >= 0', () => {
        const setValidZero = function () {
            sut.inStock = 0;
        };

        const setValidGreaterZero = function () {
            sut.inStock = 1;
        };

        assert.doesNotThrow(setValidZero);
        assert.doesNotThrow(setValidGreaterZero);
    });

    it('deducts removed stock correctly', () => {
        assert.strictEqual(sut.inStock, MAX_BEANS);

        sut.remove(1);

        assert.strictEqual(sut.inStock, MAX_BEANS - 1);
    });
});
