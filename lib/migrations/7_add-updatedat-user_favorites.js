exports.up = function(knex) {
  return knex.schema.alterTable('user_favorites', function(table) {
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('user_favorites', function(table) {
    table.dropColumn('updatedAt');
  });
};