var mongoObj = require('mongodb')
   .ObjectID;
let self = null;


module.exports = class CRUD {
   constructor(mongo) {
      this.db = mongo;
      self = this;
   }

   async delete(selector) {
      return await self.db.deleteMany(selector)
   }

   async createOne(insertObj) {
      return await self.db.insertOne(insertObj);
   }

   async createMany(insertObjects) {
      return await self.db.insertMany(insertObjects);
   }

   async read(searchObj) {
      return await self.db.find(searchObj).toArray();
   }

   async updateOne(searchObj, updateVal) {
      return await self.db.updateOne(searchObj, { $set: updateVal }, {
         upsert: true
      });
   }

   async updateMany(searchObj, updateVal) {
      return await self.db.updateMany(searchObj, { $set: updateVal }, {
         upsert: true
      });
   }

   async deleteOne(searchObj) {
      return await self.db.deleteOne(searchObj);
   }

   async deleteMany(searchObj) {
      return await self.db.deleteMany(searchObj);
   }

};