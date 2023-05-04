const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: { //scam
        type: Number,
        require: true,
    },
    name: {
        type: String,
        required: [true, "Please add the user name"],
    },
    username: {
        type: String,
        required: [true, "Please add the user username"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email adress"],
        unique: [true, "Email adress already taken"],
    },
    phone: {
        type: String,
        required: [true, "Please add the user phone"],
    },
}, {
    timestamps: true,
}
);

module.exports=mongoose.model("User", userSchema);
