const express = require("express");
const router = express.Router();
const {
    getAllEvents,
    updateEvent,
    deleteEvent,
    addEvent,
    isExisted,
} = require("../data/event");

//get all events
router.get("/", async (req, res) => {
    try {
        const events = await getAllEvents();
        if (events.length === 0) {
            res.send({ status: 400, message: "not found" });
            return;
        }
        res.status(200).send(events);
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

//add new event
router.post("/new", async (req, res) => {
    const event = req.body;
    try {
        const result = await addEvent(event);
        if (!result.error) {
            res.send({ message: "added successfully", status: 200 });
        }
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

//update an existed event
router.patch("/:eventId", async (req, res) => {
    const event = req.body;
    const { eventId } = req.params;
    if (!(await isExisted(eventId))) {
        res.send({ message: "not found", status: 400 });
        return;
    }
    try {
        const result = await updateEvent(eventId, event);
        if (!result.error) {
            res.send({ message: "updated successfully", status: 200 });
            return;
        } return res.send({message: result.message, error: result.error});
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

//delete an existed event
router.delete("/:eventId", async (req, res) => {
    const { eventId } = req.params;
    if (!(await isExisted(eventId))) {
        res.send({ message: "not found", status: 400 });
        return;
    }
    try {
        const result = await deleteEvent(eventId);
        if (!result.error) {
            res.send({ message: "deleted successfully", status: 200 });
        }
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
});

module.exports = router;
