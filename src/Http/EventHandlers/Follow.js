const { client } = require('../../Services/LineService')

module.exports = async function (event) {
  console.log('FOLLOW', event)

  const welcomeMessages = [
    'Selamat Datang di Sinauline!',
    'Yuk mulai tebak-tebakan. Silakan balas \'HAI\' untuk mulai.'
  ]
  const { replyToken } = event
  let isSend = false
  try {
    isSend = await client.pushMessage(replyToken, welcomeMessages)
  } catch (e) {
    console.log('FOLLOW FAILEDREPLY', e.message)
  }

  return {
    replied: isSend
  }
}
