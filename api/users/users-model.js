const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  findTaskByUserId,
  findBy,
  add,
  edit,
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

function findTaskByUserId(userId) {
  return db("users_tasks").where(Number(userId), "task_id");
}
async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

async function edit(change, id) {
  const editedUser = await db("users").where({ id }).update(change);
  return findById(id);
}
