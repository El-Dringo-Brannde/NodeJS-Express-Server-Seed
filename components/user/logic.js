let valid = require('./validator')
let mongodb = require('./../../mongoDB/mongo')
let boom = require('boom')

let self = null;

const databaseName = 'CS493'
const collectionName = 'Users'

module.exports = class businessController extends mongodb {
   constructor() {
      super(databaseName, collectionName)

      self = this;
   }

   async getUsers(req, res) {
      let users = await self.readAll()
      res.json(users)
   }

   async createUser(req, res) {
      req.body.owns = []
      req.body.reviews = []
      req.body.photos = []
      let created = await self.create(req.body)
      res.json(created)
   }
}