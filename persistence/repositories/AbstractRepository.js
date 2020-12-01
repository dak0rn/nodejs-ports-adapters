/**
 * AbstractRepository provides general functionality for persistence repositories
 */
class AbstractRepository {
    /**
     * Creates a new AbstractRepository
     * @param {DatabaseConnection} db Connection to the database
     */
    constructor(db) {
        this._db = db;
    }

    get db() {
        return this._db;
    }

    set db(db) {
        this._db = db;
    }
}

module.exports = AbstractRepository;
