let app = require('express')();
let initBusinesses = require('./components/businesses/routes')
let bodyParser = require('body-parser')
let mongodb = require('mongodb').MongoClient
let { url } = require('./config/mongo');
let commandLineArgs = require('command-line-args')

class server {
   constructor() {
      this.mongo = null;
      this.onInit();
   }

   async onInit() {
      let client = await this.connectToMongo();
      this.addMiddleware();
      this.grabRoutes(client);
      let CLA = this.pullCLA()

      app.listen(CLA.port, () => console.log(`Server running at port ${this.port}`))
   }

   pullCLA() {
      const options = [
         { name: 'port', alias: 'p', type: Number }
      ]
      let args = commandLineArgs(options)
      args.port = args.port ? args.port : 3000
      return args
   }

   async connectToMongo() {
      let client = await mongodb.connect(url)
      return client.db('CS493')
   }

   grabRoutes(client) {
      app.use('/businesses', initBusinesses(client));
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