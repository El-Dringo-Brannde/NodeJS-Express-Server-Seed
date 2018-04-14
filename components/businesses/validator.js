let Joi = require('joi')

class businessValidator {
    constructor() { }

    CreatedBusiness() {
        return {
            body: {
                id: Joi.string().required()
            }
        }
    }
}

module.exports = new businessValidator()