class HTTPController {
    constructor() {
        this._req = null;
        this._res = null;
    }

    async serve(req, res, handlerName /*, method, path */) {
        this._req = req;
        this._res = res;

        try {
            const result = await this[handlerName](req);

            res.json(result);
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.json({ err: true });
        }
    }
}

module.exports = HTTPController;
