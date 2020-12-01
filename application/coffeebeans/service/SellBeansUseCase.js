/**
 * @implements {ISellBeansUseCase}
 */
@inject('IUpdateBeanStock', 'IRetrieveBeanStock', 'Database')
@provides('ISellBeansUseCase')
class SellBeansUseCase {
    /**
     * Creates a new SellBeansUseCase
     *
     * @param {IUpdateBeanStock} update Updater
     * @param {IRetrieveBeanStock} retrieve Retriever
     * @param {Database} db Database connection
     */
    constructor(update, retrieve, db) {
        this._updateBeans = update;
        this._retrieveBeans = retrieve;
        this._db = db;
    }

    sell(amount) {
        // Set up a fake db transaction
        let transaction = 'banana';

        this._updateBeans.db = transaction;
        this._retrieveBeans.db = transaction;

        const availableBeans = this._retrieveBeans.getBeans();
        availableBeans.remove(amount);

        this._updateBeans.saveBeans(availableBeans);

        // TODO: PileOfGold

        // "COMMIT" transaction
        transaction = null;

        this._updateBeans.db = this._db;
        this._retrieveBeans.db = this._db;
    }
}

module.exports = SellBeansUseCase;
