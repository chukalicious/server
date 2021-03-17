const db = require("../../data/db-config");

module.exports = {
  find,
  findTaskById,
  findTaskByUser,
  add,
  update,
  remove,
};

function find() {
  return db("tasks");
}

function findTaskById(id) {
  return db("tasks").where("id", id).first();
}

function findTaskByUser(userId) {}

async function add(task) {
  const [id] = await db("tasks").insert(task, "id");
  return findTaskById(id);
}

function update(changes, id) {
  return db("tasks").where("id", Number(id)).update(changes);
}

function remove(id) {
  return db("tasks").where("id", Number(id)).del();
}
