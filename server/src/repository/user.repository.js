const { user, ObjectId } = require("../db");

async function getAllUsersDB() {
    return user.find();
}

async function getUserByIdDB(id) {
    return user.findOne({ _id: new ObjectId(id) });
}

async function createUserDB(userData) {
    return user.create(userData);
}

async function deleteUserDB(id) {
    return user.deleteOne({ _id: new ObjectId(id) });
}

async function getUserDB(email) {
    return user.findOne({ email });
}

module.exports = { getAllUsersDB, getUserByIdDB, createUserDB, deleteUserDB, getUserDB };
