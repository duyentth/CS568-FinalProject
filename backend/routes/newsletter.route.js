const express = require("express");
const router = express.Router();
const { subscribe, unSubscribe, unsubscribe } = require("../data/newsletter");

router.post("/subscribe", async (req, res, next) => {
    const { email } = req.body;
    try {
        const result = await subscribe(email);
        if (!result.error) res.send({ status: 200, message: result.message });
    } catch (error) {
        res.send({ status: 400, message: "cannot subscribe" });
    }
});

router.patch("/unsubscribe", async (req, res, next) => {
    const { email } = req.body;
    try {
        const result = await unSubscribe(email);
        if (!result.error) res.send({ status: 200, message: result.message });
    } catch (error) {
        res.send({ status: 400, message: "cannot unsubscribe" });
    }
});

module.exports = router;
