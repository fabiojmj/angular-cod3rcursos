"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var path = require("path");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser);
// Use default router
server.use(router);
var options = {
    cert: fs.readFileSync(path.resolve('../meat-app-starter/backend/keys/cert.pem')),
    key: fs.readFileSync(path.resolve('../meat-app-starter/backend/keys/key.pem'))
};
https.createServer(options, server)
    .listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
//# sourceMappingURL=server.js.map