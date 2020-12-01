/**
 * @file Interface definition for the use case of selling coffee beans
 */

/**
 * @interface ISellBeansUseCase
 */

/**
 * @function
 * @name ISellBeansUseCase#sell
 * @param {Number} amount Amount of beans to sell
 * @return {Number} Remaining amount
 */

/**
 * Confirms that the given object adheres to the interface definition
 *
 * @param {Object} obj Object to test
 */
module.exports = function (obj) {
    return 'function' === typeof obj.sell;
};
