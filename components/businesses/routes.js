let router = require('express').Router();
let controller = require('./logic');
let validator = require('./validator');
let validate = require('express-validation')

module.exports = function (mongo) {
   controller = new controller(mongo);
   router.use((req, res, next) => next()); //init

   // [GET] section
   router.get('/', controller.getBusinesses)
   router.get('/:id', validate(validator.CreatedBusiness()), controller.getBusinesses)

   //[POST] section
   router.post('/', validate(validator.CreatedBusiness()), controller.createBusiness)



   router.use('*', (req, res) => res.json({ err: `Oh nose, ${req.url} doesn't exist` }))

   return router;
}

