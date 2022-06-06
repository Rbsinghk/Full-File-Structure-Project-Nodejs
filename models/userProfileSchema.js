const mongoose = require('mongoose');

const imageModel = mongoose.Schema({
    name: {
        type: String,
        require: true,
        // unique:true
    },
    image: {
        data: Buffer,
        contentType: String
    },
})
const imageSchema = new mongoose.model("imageSchema", imageModel);
module.exports = imageSchema;