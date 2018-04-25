let valid = require('./validator')
let mongodb = require('./../../mongoDB/mongo')
let boom = require('boom')
let self = null;

//Change as needed
const databaseName = 'CS493'
const collectionName = 'Users'
module.exports = class userController extends mongodb {
   constructor() {
      super(databaseName, collectionName)
      self = this;
   }

   async getUsers(req, res) {
      let users = await self.readAll()
      if (req.query.page && req.query.limit) {
         self.paginate(req, users, res)
      } else
         res.json(users)
   }
}