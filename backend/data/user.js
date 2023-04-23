const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PRIVATEKEY = "meomeomeo";
const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true, require: true },
    password: String,
    phone: String,
    role: Number,
});

const User = mongoose.model("User", UserSchema);

exports.isExisted = async (email) => {
    try {
        const data = await User.findOne({ email });
        if (!data) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

//get all Users
exports.getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        return { error: error.message, message: "cannot get users" };
    }
};

//get User
exports.getUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        if(user) return {error: null, user: user} ;
        return { error: 'something wrong', message: "cannot get user" };
    } catch (error) {
        return { error: error.message, message: "cannot get user" };
    }
};

//add a new user
exports.addNewUser = async (name, email, password, phone, role = 0) => {
    const user = new User({ name, email, password, phone, role });
    try {
        await user.save();
        return { error: null, message: "added successfully" };
    } catch (error) {
        return { error: error.message, message: "cannot add user" };
    }
};

//update an existed user
exports.updateUser = async (name, email, password, phone, role) => {
    try {
        const result = await User.updateOne(
            { email },
            {
                $set: {
                    name,
                    email,
                    password,
                    phone,
                    role,
                },
            }
        );
        if (result.modifiedCount === 1) {
            return { error: null, message: "updated successfully" };
        }
        return {
            error: "error",
            message: "nothing has changed - cannot updated",
        };
    } catch (error) {
        return { error: error.message, message: "cannot update user" };
    }
};

//delete an existed user
exports.deleteUser = async (email) => {
    try {
        const result = await User.deleteOne({ email });
        if (result.deletedCount === 1) {
            return { error: null, message: "deleted successfully" };
        }
        return { error: "error", message: "cannot delete user" };
    } catch (error) {
        return { error: error.message, message: "cannot delete user" };
    }
};

//user sign in
exports.userSignin = async (email, password) => {
    const result = await this.getUser(email);
    const user = result.user;
    const hashedpwrd = user.password;
    if (bcrypt.compareSync(password, hashedpwrd)) {
        const token = jwt.sign(
            {
                email: email,
                role: user.role,
                name: user.name,
                phone: user.phone,
            },
            PRIVATEKEY
        );
        return { error: null, message: "signed in successfully", token: token };
    }
    return { error: "error", message: "cannot sign in" };
};

