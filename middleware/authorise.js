const jwt = require("jsonwebtoken");
const register = require('../models/userSchema')

const auth = async (req, res, next) => {
    try {
        const token = req.headers['auth-token'];
        const verifyUser = jwt.verify(token, "mynameisrajbirsinghkhokharmanjitsingh");
        const user = await register.findOne({ _id: verifyUser._id })
        // console.log(user.role.value)
    
        req.token = token;
        req.user = user;
        
        next();

    } catch (error) {
        res.status(400).send(error)
    }

}
module.exports = auth;