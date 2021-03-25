const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  findTaskByUser,
  findBy,
  add,
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function findTaskByUser(userId) {
  return db("tasks").where(userId, "user_id").first();
}
async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}
