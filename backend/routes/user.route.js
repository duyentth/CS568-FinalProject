const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    addNewUser,
    userSignin,
    validateToken,
    ValidateRole,
    isExisted,
} = require("../data/user");

router.get("/", async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

router.get("/:email", async (req, res, next) => {
    const { email } = req.params;
    if (!(await isExisted(email))) {
        res.send({ status: 400, message: "Not found" });
        return;
    }
    try {
        const result = await getUser(email);
        if (!result.error) {
            res.status(200).send(result.user);
            return;
        }
        res.send({ status: 400, message: result.message });
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    if (!(await isExisted(email))) {
        res.send({ status: 400, message: "Wrong email" });
        return;
    }
    try {
        const result = await userSignin(email, password);
        if (!result.error) {
            res.send({
                status: 200,
                message: result.message,
                token: result.token,
            });
        } else {
            res.send({ status: 400, message: result.message });
        }
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

router.post("/signup", async (req, res, next) => {
    const { name, email, password, phone, role } = req.body;
    const hashedpwrd = bcrypt.hashSync(password, 10);
    if (await isExisted(email)) {
        res.send({ status: 300, message: "this email is already used. " });
        return;
    }
    try {
        const result = await addNewUser(name, email, hashedpwrd, phone, role);
        if (!result.error) {
            res.send({ status: 200, message: result.message });
        }
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

router.post("/new", async (req, res, next) => {
    const { name, email, password, phone, role } = req.body;
    if (await isExisted(email)) {
        res.send({ status: 300, message: "This email is existed" });
        return;
    }
    const hashedpwrd = bcrypt.hashSync(password, 10);
    try {
        const result = await addNewUser(name, email, hashedpwrd, phone, role);
        if (!result.error) {
            res.send({ status: 200, message: result.message });
        }
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

router.delete("/:email", async (req, res, next) => {
    const { email } = req.params;
    if (!(await isExisted(email))) {
        res.send({ status: 400, message: "Not found" });
        return;
    }
    try {
        const result = await deleteUser(email);
        if (!result.error) {
            res.send({ status: 200, message: result.message });
        }
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

router.patch("/:email", async (req, res, next) => {
    const { email } = req.params;
    if (!(await isExisted(email))) {
        res.send({ status: 400, message: "Not found" });
        return;
    }
    const { name, password, phone, role } = req.body;
    const hashedpwrd = bcrypt.hashSync(password, 10);
    try {
        const result = await updateUser(name, email, hashedpwrd, phone, role);
        if (!result.error) {
            res.send({ status: 200, message: result.message });
        }
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

module.exports = router;
