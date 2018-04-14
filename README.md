# Description
NodeJS server seed that uses express and mongoDB.

# Install 
Add a file under `config/mongo.js` exporting an object with the the key of `url` and value of the mongoDB instance you want to connect to. 

Then run `npm install` or `yarn install`

# Usage
Run `node index -p <PORT NUMBER>`

# To do 
1. Add testing framework
2. Set NODE_ENV that changes DB usage