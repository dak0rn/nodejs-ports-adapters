const fs = require('fs');

function addRoute(list, klass, method, path, handlerName) {
    let slot = list.find(s => s.klass === klass);

    // Nothing registered for that controller class yet
    if (!slot) {
        slot = { klass, routes: [] };
        list.push(slot);
    }

    slot.routes.push({ method, path, handlerName });

    console.log(`\t${method} ${path} -> ${klass.constructor.name}.${handlerName}`);
}

function createRouteRegistrant(list, method) {
    // Decorator generator
    return function (path) {
        // Parameterized decorator @XYZ('/path')
        return function (klass, name) {
            // Decorator impl
            addRoute(list, klass, method, path, name);
            return klass;
        };
    };
}

function handleRequest(dic, klass, routeInfo) {
    return function (req, res) {
        // Create a new controller and serve the request
        const ctrl = dic.instantiate(klass.constructor);

        ctrl.serve(req, res, routeInfo.handlerName, routeInfo.method, routeInfo.path);
    };
}

module.exports = {
    /**
     * Loads all controllers and registers them within the express app.
     * Uses route registrations through temporarily available annotations
     * and instantiates the controllers through the dependency injection container
     *
     * @param {Object} app express server app
     * @param {Object} dic Dependency container
     */
    registerControllers(app, dic) {
        const registry = [];

        // Handler functions
        global.GET = createRouteRegistrant(registry, 'get');
        global.POST = createRouteRegistrant(registry, 'post');
        global.PUT = createRouteRegistrant(registry, 'put');
        global.DELETE = createRouteRegistrant(registry, 'delete');

        const files = fs.readdirSync(__dirname + '/../web/controllers');
        files.forEach(file => {
            if (!file.endsWith('.js')) return;

            require(`${__dirname}/../web/controllers/${file}`);
        });

        delete global.GET;
        delete global.POST;
        delete global.PUT;
        delete global.DELETE;

        // Walk through collected controllers, instantiate through DI and
        // register handler functions with express
        for (let slot of registry) {
            //const instance = dic.instantiate(slot.klass.constructor);

            for (let handler of slot.routes) {
                app[handler.method](handler.path, handleRequest(dic, slot.klass, handler));
                //app[handler.method](handler.path, instance[handler.handlerName].bind(instance));
            }
        }
    }
};
