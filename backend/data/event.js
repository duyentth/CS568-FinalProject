const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    title: { type: String, require: true },
    startDate: String,
    endDate: String,
    location: String,
    image: String,
    description: String,
    createdDate: String,
    createdBy: String,
    interested: Number,
    going: Number,
});

const Event = mongoose.model("Event", EventSchema);

const getAllEvents = async () => {
    try {
        const events = await Event.find({});
        return events;
    } catch (error) {
        return { error: error.message, message: "cannot get users" };
    }
};

const getEvent = async (id) => {
    try {
        const event = await Event.findOne({ _id: id });
        return event;
    } catch (error) {
        return { error: error.message, message: "cannot get user" };
    }
};

const updateEvent = async (id, event) => {
    try {
        const result = await Event.updateOne(
            { _id: id },
            {
                $set: {
                    title: event.title,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    location: event.location,
                    image: event.image,
                    description: event.description,
                    interested: event.interested,
                    going: event.going,
                },
            }
        );
        if (result.modifiedCount === 1) {
            return { error: null, message: "updated successfully" };
        }
        return { error: "error", message: "nothing has changed-cannot update" };
    } catch (error) {
        return { error: error.message, message: "cannot update user" };
    }
};

const deleteEvent = async (id) => {
    try {
        const result = await Event.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            return { error: null, message: "deleted successfully" };
        }
        return { error: "error", message: "cannot delete" };
    } catch (error) {
        return { error: error.message, message: "cannot delete user" };
    }
};

const addEvent = async (event) => {
    try {
        const newEvent = new Event(event);
        await newEvent.save();
        return { error: null, message: "added successfully" };
    } catch (error) {
        return { error: error.message, message: "cannot add user" };
    }
};

const isExisted = async (id) => {
    try {
        const event = await Event.findOne({ _id: id });
        if (!event) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllEvents,
    updateEvent,
    deleteEvent,
    addEvent,
    isExisted,
    getEvent,
};
