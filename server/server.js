const fs = require('fs');
const express = require('express');
const di = require('./di-container');
const ConfigurationContainer = require('../configuration/ConfigurationContainer');
const { registerControllers } = require('./controllers');

/**
 * Loads and sets up stateful components of the system
 *
 * @param {ConfigurationContainer} config System configuration
 */
function wireStatefulComponents(config) {
    return ['mssql'].map(name => {
        const setup = require(`../persistence/external/${name}/setup`);

        return setup(config);
    });
}

function wireConfigurationContainer() {
    // TODO: Load things from places
    return new ConfigurationContainer({ DATABASE_URL: '....' });
}

/**
 * Sets up the application
 */
async function boot() {
    console.log('BOOTING...');

    const server = express();
    const config = wireConfigurationContainer();

    const stateful = wireStatefulComponents(config);

    stateful.push({
        $provide: { Config: ['value', config] }
    });

    const dic = di.createContainer(stateful);

    server.set('di', dic);

    console.log('Loading controllers');
    registerControllers(server, dic);

    console.log('Serving...');
    server.listen(3000);
}

module.exports = { boot };
