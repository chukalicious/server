exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.text("name", 128).notNullable();
      tbl.text("email").notNullable().unique();
      tbl.text("password").notNullable();
      tbl.boolean("admin").defaultTo("true").notNullable();
      tbl.text("department");
    })
    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl.text("name").notNullable().unique();
      tbl.text("description");
      tbl.boolean("completed").defaultTo("false");
      tbl
        .integer("created_by")
        .references("id")
        .inTable("users")
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("assigned_to")
        .references("id")
        .inTable("users")
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .date("created_at")
        .defaultTo(knex.raw("current_timestamp"))
        .notNullable();
      tbl.datetime("date_completed");
      tbl.datetime("due_date");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tasks").dropTableIfExists("users");
};
