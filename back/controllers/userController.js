const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//@desc Get all Users 
//@route GET /api/User
//@access  public
const getUsers = asyncHandler(async (req, res) => {
    const Users = await User.find({ id });
    res.status(200).json(Users);
});

//@desc Create New User
//@route POST /api/User
//@access  public
const createUser = asyncHandler(async (req, res) => {
    console.log("The req body is:", req.body);
    const { id, name, username, email, phone } = req.body;
    if (!id || !username || !name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const User = await User.create({
        id,
        name,
        username,
        email,
        phone,
    })
    res.status(201).json(User);
});
//@desc Get User
//@route GET /api/User:id
//@access  public
const getUser = asyncHandler(async (req, res) => {
    const User = await User.findById(req.params.id);
    if (!User) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(User);
});

//@desc Update User
//@route POST /api/User/:id
//@access  public
const updateUser = asyncHandler(async (req, res) => {
    const User = await User.findById(id);
    if (!User) {
        res.status(404);
        throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedUser);
});

//@desc Delete User
//@route DELETE /api/User/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
    const User = await User.findById(id);
    if (!User) {
        res.status(404);
        throw new Error("User not found");
    }
    await User.deleteOne({ id });
    res.status(200).json(User);
});


module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
};