const _ = require('lodash')
const { client } = require('../../Services/LineService')

const QuestionsClass = require('../Repositories/Questions')
const questions = new QuestionsClass()
const AnswerClass = require('../Repositories/Answer')
const answer = new AnswerClass()

const sendQuestion = async function (replyToken, userId) {
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

    try {
      await client.replyMessage(replyToken, message)
      await answer.prepareForAnswer(userId, question.id)
      return true
    } catch (e) {
      console.log(e.message)
    }
  }

  return false
}

const sendException = async function (replyToken) {
  try {
    await client.replyMessage(replyToken, {
      type: 'text',
      text: 'Silakan balas \'HAI\' untuk mendapatkan pertanyaan selanjutnya!'
    })
    return true
  } catch (e) {
    console.log(e.message)
  }
  return false
}

const sendForCorrectAnswer = async function (replyToken) {
  const replyMessage = [{
    type: 'sticker',
    packageId: 1,
    stickerId: _.sample([13, 14, 15, 4, 2, 106, 119, 120, 134, 132, 137, 138, 407, 410, 426])
  },
  {
    type: 'text',
    text: _.sample(['Benar!!!!', 'Tepat Sekali!', 'Yay, Kamu Benar!', 'Betul, Hebat!', 'Yak, Tepat!'])
  }]
  console.log(replyMessage)
  const result = await client.replyMessage(replyToken, replyMessage)
  return result
}

const sendForWrongAnswer = async function (replyToken) {
  const replyMessage = [{
    type: 'sticker',
    packageId: 1,
    stickerId: _.sample([3, 7, 10, 104, 107, 111, 118, 133, 127, 420, 422, 403])
  },
  {
    type: 'text',
    text: _.sample(['Yah, Salah.', '', 'Salah!', 'Jawaban kamu belum benar', 'Wah, salah.'])
  }]
  console.log(replyMessage)
  const result = await client.replyMessage(replyToken, replyMessage)
  return result
}

module.exports = async function (event) {
  console.log('MESSAGE', event)

  let result = false

  const { replyToken, source } = event
  const { userId } = source

  if (event.message.type !== 'text') {
    sendException(replyToken)
    return false
  } else if (event.message.text.toLowerCase() === 'hai') {
    /* ASK NEW QUESTION */
    result = await sendQuestion(replyToken, userId)
    return result
  } else {
    const waitingQuestion = await answer.checkWaitingQuestion(userId)
    if (waitingQuestion) {
      /* ANSWER QUESTION */
      const answerResult = await answer.answer(waitingQuestion, event.message.text)
      if (answerResult.length > 0) {
        if (answerResult[0]) {
          await sendForCorrectAnswer(replyToken)
          return true
        } else {
          await sendForWrongAnswer(replyToken)
          return false
        }
      } else {
        await client.replyMessage(replyToken, {type: 'text', text: 'Jawaban kamu tidak ada dalam pilihan.'})
        return false
      }
    } else {
      sendException(replyToken)
      return false
    }
  }
}
