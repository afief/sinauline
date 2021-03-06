const db = require('../../Helpers/DB')

module.exports = class Questions {
  async prepareForAnswer (userId, questionId) {
    const result = await db.table('user_answers').insert({
      user_id: userId,
      question_id: questionId,
      choice_id: null,
      correct: null
    })
    return result
  }

  async checkWaitingQuestion (userId) {
    const result = await db.table('user_answers')
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .first(['id', 'question_id', 'choice_id'])
    if (result && result.id && !result.choice_id) {
      return result
    }
    return false
  }

  async getScore (userId) {
    const score = (await db.table('user_answers')
      .where('user_id', userId)
      .where('correct', true)
      .where('deleted_at', null)
      .count()
      .first()
    )['count']
    return score
  }

  async answer (row, text) {
    const choice = await db.table('choices')
      .where({
        question_id: row.question_id,
        text
      })
      .first()

    if (choice) {
      await db.table('user_answers')
        .where('id', row.id)
        .update({
          choice_id: choice.id,
          correct: choice.correct
        })
      return [choice.correct]
    }

    /*
    [] for not on the list
    [false] for wrong answer
    [true] for correct answer
    */

    return []
  }
}
