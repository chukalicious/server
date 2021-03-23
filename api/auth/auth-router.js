const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Users = require("../users/users-model");

router.post("/register", async (req, res) => {
  const user = req.body;

  //need to create middleware to confirm the user fields have been filled

  if (user) {
    //create the variables you'll need to create the hash
    const rounds = process.env.BCRYPTJS_ROUNDS || 10;
    const hash = bcryptjs.hashSync(user.password, rounds);

    //turn the user password into that hash
    user.password = hash;
    try {
      const registered = await Users.add(user);
      const token = generateToken(registered);
      res
        .status(201)
        .json({ message: "Registration Successful", token, user: registered });
    } catch (err) {
      res.status(500).json({
        message: "We could not register you at this moment",
        error: err.message,
      });
    }
  } else {
    res
      .status(401)
      .json({ message: "Please provide required fields to register a user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (req.body) {
    Users.findBy({ email: email }).then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({
          message: `${user.name} successfully logged in!`,
          token,
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
        });
      } else {
        res.status(404).json({ message: "Invalid Credentials" });
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Please provide your credentials to access" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    name: user.name,
    role: user.admin,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1hr",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
