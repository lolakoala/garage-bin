
exports.seed = function(knex, Promise) {
  return knex('garageItems').del()
    .then(function () {
      return knex('garageItems').insert([
        {
          name: 'basketball',
          reasonForLingering: 'momento from highschool games',
          itemCleanliness: 'Dusty'
        },
        {
          name: 'tire iron',
          reasonForLingering: 'needed for car maintenance',
          itemCleanliness: 'Dusty'
        },
        {
          name: 'old couch',
          reasonForLingering: 'neglected to declutter',
          itemCleanliness: 'Rancid'
        },
        {
          name: 'trophy',
          reasonForLingering: 'no room in house',
          itemCleanliness: 'Sparkling'
        }
      ]);
    })
    .then(() => console.log('Dev seed success!'))
    .catch(error => { throw error; });
};
