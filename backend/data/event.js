const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    title: { type: String, require: true },
    startDate: Date,
    endDate: Date,
    location: String,
    image: String,
    description: String,
    createdDate: Date,
    createdBy: String,
    interested: Number,
    going: Number,
});

const Event = mongoose.model("Event", EventSchema);

export const getAllEvents = async () => {
    try {
        const events = await Event.find({});
        return events;
    } catch (error) {
        console.log(error);
    }
};

export const updateEvent = async (id, event) => {
    try {
        await Event.updateOne({_id: id}, {$set: {
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location,
            image: event.image,
            description: event.description,
            interested: event.interested,
            going: event.going
        }})
    } catch (error) {
        console.log(error);
    }
};

export const deleteEvent = async (id) => {
    try {
        await Event.deleteOne({_id: id});
    } catch (error) {
        console.log(error);
    }
};

export const addEvent = async (event) => {
    try {
        const newEvent = new Event(event);
        await newEvent.save();
    } catch (error) {
        console.log(error);
    }
};
