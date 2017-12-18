
exports.seed = function(knex, Promise) {
  return knex('garageItems').del()
    .then(function () {
      return knex('garageItems').insert([
        {
          name: 'test-basketball',
          reasonForLingering: 'momento from highschool games',
          itemCleanliness: 'Dusty'
        },
        {
          name: 'test-tire iron',
          reasonForLingering: 'needed for car maintenance',
          itemCleanliness: 'Dusty'
        },
        {
          name: 'test-old couch',
          reasonForLingering: 'neglected to declutter',
          itemCleanliness: 'Rancid'
        },
        {
          name: 'test-trophy',
          reasonForLingering: 'no room in house',
          itemCleanliness: 'Sparkling'
        }
      ]);
    })
    .then(() => console.log('Test seed success!'))
    .catch(error => { throw error; });
};
