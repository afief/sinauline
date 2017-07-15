const _ = require('lodash')
const { client } = require('../../Services/LineService')
const QuestionsClass = require('../Repositories/Questions')
const questions = new QuestionsClass()

const sendQuestion = async function (replyToken) {
  const q = await questions.getRandom()
  console.log('RANDOMIZE QUESTION', JSON.stringify(q, null, 2))

  if (q) {
    const { question, choices } = q

    const templateActions = []
    _.each(choices, (choice, i) => {
      templateActions.push({
        type: 'message',
        label: _.trim(choice.text),
        text: _.trim(choice.text)
      })
    })

    let message = {
      type: 'template',
      altText: 'Sinauline, Pertanyaan baru!',
      template: {
        type: 'buttons',
        text: question.question,
        actions: templateActions
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(JSON.stringify(message, null, 2))
    }

    const result = await client.replyMessage(replyToken, message)
    if (result) {
      return true
    }
  }

  return false
}

const sendException = async function (replyToken) {
  const result = await client.replyMessage(replyToken, {
    type: 'text',
    text: 'Silakan balas \'HAI\' untuk mendapatkan pertanyaan selanjutnya!'
  })
  if (result) {
    return true
  }
  return false
}

module.exports = async function (event) {
  console.log('MESSAGE', event)

  const { replyToken } = event

  if (event.message.type !== 'text' || event.message.text.toLowerCase() !== 'hai') {
    sendException(replyToken)
    return false
  }

  return sendQuestion(replyToken)
}
