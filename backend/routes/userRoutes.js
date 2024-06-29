const router = require("express").Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcrypt");

const { User } = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const { Account } = require("../models/Account");

// SIGNUP
const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const { success } = signupSchema.safeParse({
      email,
      password,
      firstName,
      lastName,
    });

    if (!success)
      return res.status(403).json({ message: "Incorrect Inputs !" });

    const user = await User.findOne({ email });

    if (user) return res.status(403).json({ message: "Email already taken" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const { _id: userId } = await User.create({
      email,
      password: hash,
      firstName,
      lastName,
    });

    await Account.create({
      balance: 1 + Math.random() * 1000,
      userId,
    });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Registration Successfull !!", token });
  } catch (err) {
    console.log("Error in Registration !!");
    console.log(err);

    res.status(403).json({ message: "Error in Registration !!" });
  }
});

// SIGNIN
const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
router.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const { success } = signinSchema.safeParse({ email, password });
    if (!success) return res.status(403).json({ message: "Invalid Inputs !!" });

    const user = await User.findOne({ email });
    if (!user) return res.status(403).json({ message: "User Not Found !!" });

    const validate = await bcrypt.compare(password, user.password);

    if (!validate)
      return res.status(403).json({ message: "Incorrect Password !!" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Logged In Successfully !!", token });
  } catch (err) {
    console.log("Error in Logging In");
    console.log(err);
    res.status(403).json({ message: "Error in Logging In" });
  }
});

// UPDATE USER
const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { success } = updateSchema.safeParse(req.body);

    if (!success)
      return res.status(403).json({ message: "Incorrect Inputs !!" });

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await User.updateOne({ _id: req.userId }, { ...req.body });

    res.status(200).json({ message: "Updated Successfully !!" });
  } catch (err) {
    console.log("Error in Updating");
    console.log(err);
    res.status(403).json({ message: "Error in Updating" });
  }
});

// GET USERS
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: new RegExp(filter, "i"),
          },
        },
        {
          lastName: {
            $regex: new RegExp(filter, "i"),
          },
        },
      ],
      $and: [{ _id: { $ne: req.userId } }],
    });

    res.status(200).json({
      users: users.map((user) => {
        return {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }),
    });
  } catch (err) {
    console.log("Error in searching !!");
    console.log(err);
    res.status(403).json({ message: "Error in Searching !!" });
  }
});

module.exports = router;
