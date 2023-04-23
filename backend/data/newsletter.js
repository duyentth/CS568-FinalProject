const mongoose = require("mongoose");
const NewsletterSchema = mongoose.Schema({
    email: { type: String, require: true },
    subcribedDate: Date,
    isSubscribed: { type: Boolean, default: true },
});

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

const subscribe = async (email) => {
    const subscriber = new Newsletter({
        email,
        subscribedDate: new Date("<YYYY-mm-dd>"),
        isSubscribed: true,
    });
    try {
        const sub = await Newsletter.findOne({ email });
        if (sub && sub.isSubscribed) {
            return { message: "you've already subcribed", error: null };
        }
        if (sub && !sub.isSubscribed) {
            const result = await Newsletter.updateOne(
                { email },
                { $set: { isSubscribed: true } }
            );
            if (result.modifiedCount === 1) {
                return { message: "subcribed successfully", error: null };
            }
            return { message: "cannot subcribe", error: "something wrong" };
        } else {
            await subscriber.save();
            return { message: "subcribed successfully", error: null };
        }
    } catch (error) {
        return { message: "cannot subcribe", error: error.message };
    }
};

const unSubscribe = async (email) => {
    try {
        await Newsletter.updateOne(
            { email },
            { $set: { isSubscribed: false } }
        );
        return { message: "unsubcribed successfully", error: null };
    } catch (error) {
        return { message: "cannot unsubcribe", error: error.message };
    }
};

module.exports = { subscribe, unSubscribe };
