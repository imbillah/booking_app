import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { newError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });
    await newUser.save();
    res.status(200).json("User registered successful");
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(newError(404, "User not found!"));

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) return next(newError(400, "Password does not match"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...rest });
  } catch (error) {
    next(error);
  }
};
