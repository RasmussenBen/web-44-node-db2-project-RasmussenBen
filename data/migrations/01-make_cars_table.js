exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments()
      tbl.string('vin').unique().notNullable()
      tbl.string('make').notNullable()
      tbl.string('model').notNullable()
      tbl.integer('mileage').notNullable()
      tbl.string('title')
      tbl.string('transmission')
      tbl.timestamp('created_at').defaultTo(knex.fn.now())
      tbl.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
}
