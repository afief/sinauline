require('dotenv').load()
const ServerCore = require('./src/server')

const server = new ServerCore()
server.listen(process.env.PORT || 3000)
