let crud = require('./CRUD');


module.exports = class mongoDB extends crud {
      constructor(db, collName) {
            super(db, collName)
      }


      async aggregate(aggregation) {
            return await this.mongo.aggregate(aggregation);
      }

      async create(inserting) {
            if (Array.isArray(inserting))
                  return await this.createMany(inserting)
            else
                  return await this.createOne(inserting)
      }

      async readById(id) {
            let selector = {
                  _id: this.id(id)
            }
            return await this.read(selector)
      }

      async readAll() {
            return await this.read({});
      }

      async count(selector) {
            let retVal = await this.read(selector);
            return retVal.length
      }

      async deleteById(id) {
            let selector = {
                  _id: this.id(id)
            }
            return await this.delete(selector);
      }

      async update(selector, updateVal, multi = false) {
            if (multi)
                  return await this.updateMany(selector, updateVal);
            else
                  return await this.updateOne(selector, updateVal);
      }

      async delete(selector, multi = false) {
            if (multi)
                  return await this.deleteMany(selector);
            else
                  return await this.deleteOne(selector);
      }
}