const CoffeeBeans = require('../../domain/CoffeeBeans');
const AbstractRepository = require('./AbstractRepository');

/**
 * @implements IUpdateBeanStock
 * @implements IRetrieveBeanStock
 */
@inject('Database')
@provides('IUpdateBeanStock', 'IRetrieveBeanStock')
class CoffeeBeanRepository extends AbstractRepository {
    constructor(db) {
        super(db);
    }

    // see IRetrieveBeanStock#getBeans
    getBeans() {
        console.log('Retrieving coffee beans...');
        return new CoffeeBeans(1000);
    }

    // see IUpdateBeanStock#saveBeans
    saveBeans(beans) {
        console.log('Saved coffee beans', beans);
    }
}
