const line = require('@line/bot-sdk')
const client = new line.Client({
  channelAccessToken: process.env.LINE_TOKEN
})

module.exports = { client }
