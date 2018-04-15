let Joi = require('joi')

class userValidator {
   constructor() { }

   createUser() {
      return {
         body: Joi.object().keys({
            username: Joi.string().required()
         }).unknown(false),

      }
   }
}

module.exports = new userValidator()