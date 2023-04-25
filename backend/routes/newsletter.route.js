const express = require("express");
const router = express.Router();
const { subscribe, unSubscribe, unsubscribe, getAllSubscriber } = require("../data/newsletter");

router.get('/', async (req, res) => {
    try {
        const result = await getAllSubscriber();
        if (result ){
            res.status(200).send(result);
        }
    } catch (error) {
        res.send({message: error.message, status:400});
    }
})

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
