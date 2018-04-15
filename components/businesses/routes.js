let router = require('express').Router();
let controller = require('./logic');
let validator = require('./validator');
let validate = require('express-validation')


module.exports = function () {
   controller = new controller();

   router.use((req, res, next) => next()); //init

   // [GET] section
   router.get('/', controller.getBusinesses)
   router.get('/:id', controller.getBusinesses)

   //[POST] section
   router.post('/', validate(validator.createdBusiness()), controller.createBusiness)

   router.use('*', (req, res) => res.json({ err: `Oh nose, ${req.url} doesn't exist` }))
   console.log(1)
   return router;
}

