
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {id: 1, question: 'Siapakah nama pahlawan yang ada pada uang pecahan 2000 yang baru?'},
        {id: 2, question: 'Jumlah semua bilangan ganjil antara 50 dan 100 adalah ... .'},
        {id: 3, question: 'Bagian pada mata yang berfungsi sebagai penerima cahaya adalah ...'},
        {id: 4, question: 'Dua buah vektor A = 15 cm dan B = 20 cm mengapit sudut 90°. Resultan kedua vektor tersebut adalah ... .'},
        {id: 5, question: 'Inti atom terdiri dari... .'}
      ])
    })
}
