
exports.seed = function(knex, Promise) {
  return knex('garageItems').del()
    .then(function () {
      return knex('garageItems').insert([
        {
          name: 'test-basketball',
          reasonForLingering: 'momento from highschool games',
          itemCleanliness: 'Dusty',
          id: 1
        },
        {
          name: 'test-tire iron',
          reasonForLingering: 'needed for car maintenance',
          itemCleanliness: 'Dusty',
          id: 2
        },
        {
          name: 'test-old couch',
          reasonForLingering: 'neglected to declutter',
          itemCleanliness: 'Rancid',
          id: 3
        },
        {
          name: 'test-trophy',
          reasonForLingering: 'no room in house',
          itemCleanliness: 'Sparkling',
          id: 4
        }
      ]);
    })
    .then(() => console.log('Test seed success!'))
    .catch(error => { throw error; });
};
