import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

export const signup_post = [
  body("firstName", "First name must be specified").trim().isLength({ min: 1 }).escape(),
  body("lastName", "Last name must be specified").trim().isLength({ min: 1 }).escape(),
  body("username", "Username must be specified").trim().isLength({ min: 1 }).escape(),
  body("password", "Password must be specified").trim().isLength({ min: 6 }).escape(),
  body("confirmPassword", "Password confirmation must be filled")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    try {
      const { firstName, lastName, username, password } = req.body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName,
        lastName,
        username,
        password: hashedPassword,
      });

      res.status(201).send("User registered successfully.");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error registering new user");
    }
  },
];
