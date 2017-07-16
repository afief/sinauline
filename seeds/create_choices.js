
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('choices').del()
    .then(function () {
      // Inserts seed entries
      return knex('choices').insert([
        {question_id: 1, text: 'Tjut Meutia', correct: false},
        {question_id: 1, text: 'M Husni Thamrin', correct: true},
        {question_id: 1, text: 'Frans Kaisiepo', correct: false},
        {question_id: 1, text: 'B.J. Habibie', correct: false},
        {question_id: 2, text: '1987', correct: false},
        {question_id: 2, text: '1878', correct: true},
        {question_id: 2, text: '2132', correct: false},
        {question_id: 2, text: '49', correct: false},
        {question_id: 3, text: 'Kornea', correct: false},
        {question_id: 3, text: 'Pupil', correct: false},
        {question_id: 3, text: 'Lensa', correct: true},
        {question_id: 3, text: 'retina', correct: false},
        {question_id: 4, text: '20 cm ', correct: false},
        {question_id: 4, text: '20 √2 cm ', correct: false},
        {question_id: 4, text: '25 √3 cm', correct: false},
        {question_id: 4, text: '25 cm', correct: true},
        {question_id: 5, text: 'Proton', correct: false},
        {question_id: 5, text: 'Neutron', correct: false},
        {question_id: 5, text: 'Elektron', correct: false},
        {question_id: 5, text: 'Semua jawaban', correct: true}
      ])
    })
}
