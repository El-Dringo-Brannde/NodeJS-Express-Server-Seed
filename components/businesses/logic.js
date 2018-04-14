let _ = require('lodash')
let valid = require('./validator')
let mongodb = require('./../../mongoDB/mongo')
let self = null;


module.exports = class businessController extends mongodb {
    constructor(mongo) {
        super(mongo)
        this.db = this.db.collection('Assignment1')
        self = this;
    }

    getBusinesses(req, res) {
        res.json({ foo: 'bar' })
    }

    async createBusiness(req, res) {
        let f = await self.create({ bar: 'foo' })
        res.json(f)
    }
}