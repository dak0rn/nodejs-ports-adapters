const MSSQLDatabaseConnection = require('./MSSQLDatabaseConnection');

/**
 * Creates a new MSSQLDatabaseConnection from the configuration
 *
 * @param {ConfigurationContainer} config Configuration
 * @return {Object} Provision object
 */
module.exports = function (config) {
    const dsn = config.get('DATABASE_URL');

    return {
        Database: ['value', new MSSQLDatabaseConnection(dsn)]
    };
};
