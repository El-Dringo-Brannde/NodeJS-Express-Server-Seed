let crud = require('./CRUD');
let self = null;


module.exports = class mongoDB extends crud {
      constructor(mongo) {
            super(mongo)
            self = this;
      }

      get mongo() { return self.db }

      set database(dbName) { self.db.db(dbName) }

      set collection(collectionName) { self.db.collection(collectionName) }

      async aggregate(aggregation) {
            return await self.db.aggregate(aggregation);
      }

      async create(inserting) {
            if (Array.isArray(inserting))
                  return await self.createMany(inserting)
            else
                  return await self.createOne(inserting)
      }

      async getById(id) {
            let selector = {
                  _id: self.id(id)
            }
            return await self.read(selector)
      }

      async getAll() {
            return await self.read({});
      }

      async count(selector) {
            let retVal = await self.read(selector);
            return retVal.length
      }

      async removeById(id) {
            let selector = {
                  _id: self.id(id)
            }
            return await self.delete(selector);
      }

      async update(selector, updateVal, multi = false) {
            if (multi)
                  return await self.updateMany(selector, updateVal);
            else
                  return await self.updateOne(selector, updateVal);
      }

      async remove(selector, multi = false) {
            if (multi)
                  return await self.deleteMany(selector);
            else
                  return await self.deleteOne(selector);
      }

      aggregate(aggregate) {
            return new Promise((res, rej) => {
                  self.db.aggregate(aggregate)
                        .toArray((err, data) => {
                              if (err)
                                    res(err)
                              res(data)
                        });
            });
      }
}