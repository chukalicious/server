const router = require("express").Router();

const Tasks = require("./tasks-model");

router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Tasks.findTaskById(id);
  if (task) {
    try {
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Could not find task but the id" });
  }
});

router.post("/user/:id/add_task", async (req, res) => {
  const { id } = req.params;
  const task = {
    ...req.body,
    created_by: id,
    created_at: new Date().toLocaleDateString(),
    // assigned_to:
  };
  console.log(task);
  if (task) {
    try {
      const addedTask = await Tasks.add(task);
      res.status(201).json(addedTask);
    } catch (err) {
      res.status(500).json({
        message: "We could not add the task at this time",
        error: err.message,
      });
    }
  } else {
    res.status(402).json({ message: "please include all required fields" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (changes) {
    const updatedTask = await Tasks.update(changes, id);
    res.status(201).json(updatedTask);
  } else {
    res.status(401).json({ message: "Could not find task by id" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Tasks.remove(id).then((tsk) => {
    if (tsk) {
      res.status(204).json({ removed: tsk });
    } else {
      res.status().json({ message: "Could not find task by the id" });
    }
  });
});

router.get("/:id", async (req, res) => {});

module.exports = router;
