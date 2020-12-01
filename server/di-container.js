const { Injector } = require('didi');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

function findJavaScriptFiles() {
    return glob.sync('**/*.js', { cwd: path.resolve(__dirname, '..'), ignore: ['**/node_modules/**', '**/server/**'] });
}

function findFilesWithDIAnnotations(filenames) {
    console.log('Scanning project for DI annotations...');
    const providers = [];

    for (const filename of filenames) {
        const contents = fs.readFileSync(path.resolve(__dirname, '..', filename), { encoding: 'utf-8' });

        if (contents.includes('@provides(')) {
            providers.push(filename);
        }
    }

    return providers;
}

function registerProviders(providers) {
    const provided = [];

    console.log('Found DI providers:');
    global.provides = function (...names) {
        return function (klass) {
            if (0 === names.length) throw new Error('@provides must provide at least one');

            const provisionMap = {};

            console.log(`\t${klass.prototype.constructor.name} -> ${names}`);

            for (const name of names) {
                provisionMap[name] = ['type', klass];
            }

            provided.push(provisionMap);

            return klass;
        };
    };

    for (const provider of providers) {
        require(path.resolve(__dirname, '..', provider));
    }

    delete global.provides();

    return provided;
}

function findAndSetupProviders() {
    const targets = findJavaScriptFiles();
    const providers = findFilesWithDIAnnotations(targets);

    return registerProviders(providers);
}

/**
 * Decorator function that sets the necessary DI property to have values injected
 * from the DI container.
 *
 * @param  {...any} names Names of injectables from the DI container
 */
function inject(...names) {
    return function injectDecorator(target) {
        target.$inject = names;

        return target;
    };
}

module.exports = {
    inject,

    /**
     * Creates a new DI container using the provided modules
     *
     * @param {object[]} preloaded List of preloaded/parsed modules
     */
    createContainer(preloaded = []) {
        global.inject = inject;

        const providers = findAndSetupProviders();

        return new Injector(providers.concat(preloaded));
    }
};
