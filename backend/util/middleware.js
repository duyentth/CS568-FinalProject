//middleware validateToken
exports.validateToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Please provide the valid token");
    }
    const splits = req.headers.authorization.split(" ");
    if (splits.length != 2) {
        return next(new Error("Please use bearer schema"));
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
        res.status(403).send("Forbidden. Wrong JWT");
        return;
    }
};

//check role of user after validating the given token
exports.ValidateRole = async (req, res, next) => {
    const role = req.role;
    if (role === 0) {
        res.status(403).send("Sorry. You don't have permission to go forward");
        return;
    } else {
        next();
    }
};
