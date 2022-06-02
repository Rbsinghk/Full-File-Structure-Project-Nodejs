const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const new_mongoose = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        // required:true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    email: {
        type: String,
        // required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:{Admin:'Admin',User:'User'}
    }

});

//Generating tokens
new_mongoose.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, "mynameisrajbirsinghkhokharmanjitsingh")
        // this.tokens = this.tokens.concat({token:token})
        // await this.save();
        return token;
    } catch (error) {
        res.send("the error part" + error)
    }
}

const userSchema = new mongoose.model("userSchema", new_mongoose);
module.exports = userSchema