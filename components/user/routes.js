let router = require('express').Router();
let controller = require('./logic');
let validator = require('./validator');
let validate = require('express-validation')


module.exports = function () {

   controller = new controller();

   router.use((req, res, next) => next()); //init

   // [GET] section
   router.get('/', controller.getUsers)
   router.get('/:username', controller.getUsers)

   //[POST] section
   router.post('/', validate(validator.createUser()), controller.createUser)

   router.use('*', (req, res) => res.json({ err: `Oh nose, ${req.url} doesn't exist` }))

   return router;
}

