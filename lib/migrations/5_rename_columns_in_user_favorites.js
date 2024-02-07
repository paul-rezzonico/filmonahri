exports.up = function(knex) {
  return knex.schema.table('user_favorites', function(table) {
    table.renameColumn('userId', 'user_id');
    table.renameColumn('filmId', 'film_id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('user_favorites', function(table) {
    table.renameColumn('user_id', 'userId');
    table.renameColumn('film_id', 'filmId');
  });
};
