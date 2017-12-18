
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('garageItems', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('reasonForLingering');
      table.string('itemCleanliness');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('garageItems')
  ]);
};
