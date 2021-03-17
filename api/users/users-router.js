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

module.exports = router;
