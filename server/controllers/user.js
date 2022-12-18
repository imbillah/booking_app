import User from "../models/User.js";

// UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
// DELETE
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted successful");
  } catch (error) {
    next(error);
  }
};

// GET
export const getUser = async (req, res, next) => {
  try {
    const filteredUser = await User.findById(req.params.id);
    res.status(200).json(filteredUser);
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};
