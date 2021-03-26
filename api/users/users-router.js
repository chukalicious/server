const router = require("express").Router();

const Users = require("./users-model");

router.get("/", async (req, res) => {
  const users = await Users.find();
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);
  if (user) {
    try {
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Could not find user by that Id" });
  }
});

router.get("/:id/tasks", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const task = await Users.findTaskByUserId(id);
  if (task) {
    try {
      res.status(200).json({ task });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  } else {
    status(400).json({ message: "Could not find task for the user" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  if (!change.name) {
    res.status(401).json({ message: "Please enter a name for the user" });
  } else {
    try {
      const editedUser = await Users.edit(change, id);
      res.status(201).json(editedUser);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
});

module.exports = router;
