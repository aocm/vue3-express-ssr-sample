const serverlessExpress = require("@vendia/serverless-express");
const {createProdServer} = require("./dist/server");
const app = createProdServer();
module.exports.handler = serverlessExpress(app);
