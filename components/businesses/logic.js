let valid = require('./validator')
let mongodb = require('./../../mongoDB/mongo')
let mongoID = require('mongodb').ObjectID
let self = null;
let boom = require('boom')
let uuid = require('uuid/v4')


// Change as needed
const databaseName = 'CS493'
const collectionName = 'Businesses'
module.exports = class businessController extends mongodb {
   constructor() {
      super(databaseName, collectionName)
      self = this;
   }

   //GET Section
   async getBusiness(req, res) {
      let business = await self.readById(req.params.businessID)
      res.json(business)
   }


   //[POST] Section
   async createBusiness(req, res) {
      req.body.reviews = [];
      req.body.photos = [];
      req.body.uuid = uuid();
      let user = await self.getUser(req.body.owner)

      await self.checkCategories(req, res)

      if (user) {
         self.switchCollection('Businesses')
         let { ops } = await self.create(req.body)
         ops = ops[0] // get user out of the array
         self.switchCollection('Users')
         let userObj = {
            uuid: ops.uuid,
            url: `${self.url}/businesses/id/${ops._id}`
         }
         await self.addToSet({ owner: 'dringb' }, { owns: userObj })
         res.json(ops)
      } else
         res.json(boom.badRequest('No user found').output)

      self.switchCollection('Businesses')
   }
}