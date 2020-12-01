/**
 * ConfigurationContainer is a wrapper about configuration provided
 * to the application.
 */
class ConfigurationContainer {
    /**
     * Creates a new ConfigurationContainer
     *
     * @param {Object} store Key-value mapping for configuration
     */
    constructor(store) {
        this._store = store;
    }

    /**
     * Returns a configuration item for the given key
     *
     * @param {string} key Key of the configuration item
     */
    get(key) {
        return this._store[key];
    }
}

/**
 * Creates a new ConfigurationContainer from configuration stored in environment
 *
 * @return {ConfigurationContainer}
 */
ConfigurationContainer.fromEnvironment = async function () {
    console.log('Reading from environment');

    return new ConfigurationContainer({});
};

module.exports = ConfigurationContainer;
