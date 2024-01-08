const router = require("express").Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    loginUser,
} = require("../service/user.service");

router.get("/", async (req, res) => {
    try {
        res.status(200).send(await getAllUsers());
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).send(await getUserById(id));
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const userData = req.body;
        const data = await createUser(userData);

        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).send(await deleteUser(id));
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        res.status(200).send(await loginUser(email, password));
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;
