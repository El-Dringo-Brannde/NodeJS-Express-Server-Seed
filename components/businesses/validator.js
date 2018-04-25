let Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

class businessValidator {
   constructor() { }

   get createdBusiness() {
      return {
         body: Joi.object().keys({
            name: Joi.string().required(),
            owner: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zip: Joi.number().required(),
            phone: Joi.string().required(),
            category: Joi.array().items(Joi.string()).required(),
            subCategory: Joi.array().items(Joi.string()).required(),
            website: Joi.string().uri(),
            email: Joi.string().email()
         }).unknown(false)
      }
   }

   get getBusiness() {
      return {
         params: {
            businessID: Joi.objectId()
         }
      }
   }

}

module.exports = new businessValidator()