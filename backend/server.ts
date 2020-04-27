import * as jsonServer from 'json-server'
import { Express } from 'express'

import * as fs from 'fs'
import * as https from 'https'

import * as path from 'path'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.use(jsonServer.bodyParser)

// Use default router
server.use(router)

const options = {
    cert: fs.readFileSync(path.resolve('../meat-app-starter/backend/keys/cert.pem')),
    key: fs.readFileSync(path.resolve('../meat-app-starter/backend/keys/key.pem'))
}

https.createServer(options, server)
    .listen(3001, () => {
        console.log('JSON Server is running on https://localhost:3001')
    })