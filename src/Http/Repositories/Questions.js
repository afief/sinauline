const _ = require('lodash')
const db = require('../../Helpers/DB')

module.exports = class Questions {
  async getRandomQuestion () {
    const questionCount = (await db.table('questions').where('deleted_at', null).count().first())['count']
    if (questionCount) {
      const randomNumber = _.random(questionCount - 1)
      const question = await db.table('questions')
        .where('deleted_at', null)
        .offset(randomNumber)
        .limit(1)
        .first(['id', 'question'])
      return question
    }
  }

  async getChoices (questionId) {
    const choices = await db.table('choices')
      .where('question_id', questionId)
      .where('deleted_at', null)
      .select('id', 'question_id', 'text', 'correct')

    return choices
  }

  async getRandom () {
    const question = await this.getRandomQuestion()

    if (!question) {
      return false
    }

    const choices = await this.getChoices(question.id)

    return {
      question,
      choices
    }
  }
}
