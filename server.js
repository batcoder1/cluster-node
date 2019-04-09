const session = require('express-session')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const cors = require('cors')
// Add helmet package in order to secure express
const helmet = require('helmet')

const port = 3000;
// environment var
const nodo = process.env.HOSTNAME
const nodeIP = process.env.NODE_IP || 'localhost'


const hostName = `http://${nodeIP}:${port}`
const host = `http://${nodeIP}`

exports.start = async (workerID) => {
    // Add cors middleware in order to allow just the origin domain
    // for security reasons
    app.use(cors({
        origin: ['http://localhost:8090', 'http://localhost', 'http://localhost:4200']
    }))


    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }))


    // Limit maximum size of payload for HTTP body in body in express
    app.use(bodyParser.json({
        limit: '2mb'
    }))
    // Add helmet middleware for securing HTTP response
    app.use(helmet())

    // Enable trust proxy in order to get real client IP address instead of
    // nginx reverse proxy IP address. This is useful for security in blacklist
    // of IP addresses
    app.set('trust proxy', 2)



    // define routes
    const router = express.Router()
    require('./routes/index.js')(router)

    router.route('/').get(function (req, res, next) {
        console.log('response by workerID:'+ workerID)
        res.json({
            'message': 'Cluster REST API from worker ' + workerID
        })
    })

    app.use('/api/v1', router)

    // listen for requests
    server.listen(port, '0.0.0.0', function () {
        console.log(new Date())
        console.log(`Connected to localhost on port ${port}`)
        console.log('hostname: ' + hostName)
        console.log('workerID: ' + workerID)
    })
}
