const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/auth");

const tableUser = mongoose.model("user", {
    name: String,
    surname: String,
    email: String,
    password: String,
    age: String,
});

module.exports = {
    user: tableUser,
    ObjectId: mongoose.Types.ObjectId,
};
