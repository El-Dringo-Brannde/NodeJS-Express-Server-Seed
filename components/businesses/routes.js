let router = require('express').Router();
let controller = require('./logic');
let validator = require('./validator');
let validate = require('express-validation')


module.exports = function() {
   controller = new controller();

   router.use((req, res, next) => next()); //init

   // [GET]
   router.get('/id/:businessID', validate(validator.getBusiness), controller.getBusiness)

   //[PATCH]


   //[POST]
   router.post('/', validate(validator.createdBusiness), controller.createBusiness)


   // [DELETE]



   router.use('*', (req, res) => res.json({ err: `Oh nose, ${req.originalUrl} doesn't exist` }))
   return router;
}

