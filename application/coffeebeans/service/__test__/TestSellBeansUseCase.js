const assert = require('assert');
const sinon = require('sinon');

const isISellBeansUseCase = require('../../ports/in/ISellBeansUseCase');
const SellBeansUseCase = require('../SellBeansUseCase');
const CoffeeBeans = require('../../../../domain/CoffeeBeans');

const MAX_BEANS = 1000;
const TheBeans = new CoffeeBeans(MAX_BEANS);
const DummyUpdate = { saveBeans() {}, get db() {}, set db(somthing) {} };
const DummyRetrieve = {
    getBeans() {
        return TheBeans;
    },

    get db() {},
    set db(something) {}
};
const DummyDB = null;

describe('SellBeansUseCase', () => {
    const sandbox = sinon.createSandbox();
    let sut = null;

    beforeEach(function () {
        sut = new SellBeansUseCase(DummyUpdate, DummyRetrieve, DummyDB);

        sandbox.spy(DummyUpdate);
        sandbox.spy(DummyRetrieve);
        sandbox.spy(TheBeans);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('conforms the interface', () => {
        // const sut = new SellBeansUseCase(DummyUpdate, DummyRetrieve, DummyDB);

        assert(isISellBeansUseCase(sut));
    });

    it('uses the RetrieveBeanStock repository to retrieve beans', () => {
        // const sut = new SellBeansUseCase(DummyUpdate, DummyRetrieve, DummyDB);
        sut.sell(0);

        assert(DummyRetrieve.getBeans.calledOnce);
    });

    it('uses the UpdateBeanStock repository to update the beans', () => {
        sut.sell(0);

        assert(TheBeans.remove.calledOnce);
        assert.strictEqual(0, TheBeans.remove.firstCall.args[0]);
    });

    it('provides all repositories with a database transaction', () => {
        const duSet = sandbox.spy(DummyUpdate, 'db', ['set']);
        const drSet = sandbox.spy(DummyRetrieve, 'db', ['set']);

        sut.sell(0);

        // First time setting it, second time unsetting it
        assert.strictEqual(2, duSet.set.callCount);
        assert.strictEqual(2, drSet.set.callCount);
    });
});
