const PRIVATEKEY = "meomeomeo";
const jwt = require("jsonwebtoken");
const { getOwner } = require("../data/event");

//middleware validateToken
exports.validateToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.send({
            message: "Please provide the valid token",
            status: 401,
        });
    }
    const splits = req.headers.authorization.split(" ");
    if (splits.length != 2) {
        res.send({ message: "Please use bearer schema", status: 300 });
        return;
        //return next(new Error("Please use bearer schema"));
    }
    const token = splits[1];
    try {
        const user = jwt.verify(token, PRIVATEKEY);
        //console.log('user from token is: ', user);
        req.password = user.password;
        req.email = user.email;
        req.role = user.role;
        next();
    } catch (error) {
        res.send({ message: "Forbidden. Wrong JWT", status: 403 });
        return;
    }
};

//check role of user after validating the given token
exports.ValidateRole = async (req, res, next) => {
    const role = req.role;
    const email = req.email;
    const { eventId } = req.params;
    const owner = await getOwner(eventId);
    if (role === 0 && email !== owner) {
       res.send({
           message: "Sorry. You don't have permission.",
           status: 403,
       });
    } else {
        next();
    }
};
