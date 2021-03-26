exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.text("name", 128).notNullable();
      tbl.text("email").notNullable().unique();
      tbl.text("password").notNullable();
      tbl.boolean("role").notNullable();
      tbl.text("department");
      tbl.text("position");
    })
    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl.text("task").notNullable().unique();
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
    })
    .createTable("users_tasks", (tbl) => {
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      tbl
        .integer("task_id")
        .references("id")
        .inTable("tasks")
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("another_column");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users_tasks")
    .dropTableIfExists("tasks")
    .dropTableIfExists("users");
};
