let valid = require('./validator')
let mongodb = require('./../../mongoDB/mongo')
let self = null;
let boom = require('boom')

const databaseName = 'CS493'
const collectionName = 'Businesses'
module.exports = class businessController extends mongodb {
    constructor() {
        super(databaseName, collectionName)
        self = this;
    }

    async getBusinesses(req, res) {
        let business = await self.readAll()
        res.json(business)
    }

    async createBusiness(req, res) {
        self.switchCollection('Users')
        let users = await self.read({ username: req.body.owner })
        self.switchCollection('Businesses')

        if (users.length != 0) {
            let result = await self.create(req.body)
            res.json(result)
        } else
            res.json(boom.badRequest('No user found').output)
    }
}