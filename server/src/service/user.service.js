const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    getAllUsersDB,
    createUserDB,
    getUserByIdDB,
    deleteUserDB,
    getUserDB,
} = require("../repository/user.repository");

async function getAllUsers() {
    return await getAllUsersDB();
}

async function getUserById(id) {
    return await getUserByIdDB(id);
}

async function createUser(userData) {
    const findUser = await getUserDB(userData.email);

    if (findUser) throw new Error("user already exist");
    if (userData.password.length < 8) throw new Error("password cant be less then 8 letters");

    const hashPassword = await bcrypt.hash(userData.password, 1);
    const data = await createUserDB({ ...userData, password: hashPassword });

    if (!data) throw new Error("user not created");

    return data;
}

async function deleteUser(id) {
    return await deleteUserDB(id);
}

async function loginUser(email, password) {
    const findUser = await getUserDB(email);
    if (!findUser) throw new Error("no have user");

    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) throw new Error("incorrect password");

    const token = jwt.sign(
        JSON.stringify({ email, id: { ...findUser._doc }._id }, { expiresIn: "3h" }),
        process.env.SECRET
    );

    return { accessToken: token };
}

module.exports = { getAllUsers, getUserById, createUser, deleteUser, loginUser };
