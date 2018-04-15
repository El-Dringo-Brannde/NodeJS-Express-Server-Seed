let app = require('express')();
let initBusinesses = require('./components/businesses/routes')
let initUsers = require('./components/user/routes')
let bodyParser = require('body-parser')
let commandLineArgs = require('command-line-args')

var mongoClient = require('mongodb').MongoClient
let { url } = require('./config/mongo');

class server {
   constructor() {
      this.mongo = null;
      this.onInit();
   }

   async onInit() {
      this.addMiddleware();
      await this.grabRoutes();
      let CLA = this.pullCLA()

      app.listen(CLA.port, () => console.log(`Server running at port ${CLA.port}`))
   }

   pullCLA() {
      const options = [
         { name: 'port', alias: 'p', type: Number }
      ]
      let args = commandLineArgs(options)
      if (process.env.NODE_ENV == 'production')
         args.port = args.port ? args.port : process.env.PORT
      else
         args.port = args.port ? args.port : 3000
      return args
   }

   async grabRoutes() {

      app.use('/businesses', initBusinesses());
      app.use('/users', initUsers());
   }


   addMiddleware() {
      app.use(bodyParser.json())

      app.use(function (err, req, res, next) {
         console.log(err)
         res.status(400).json(err);
      }); // error handler for validator
   }
}

new server() // start