
const mongoose = require("mongoose");

//define schema
const MusicSchema = new mongoose.Schema({
    singer: {
        type: String,
        trim: true,
        required: true,

    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

//Make model
//model(model name, schema)
//model(model name,schema,collection name)
const Music = mongoose.model("music", MusicSchema);
module.exports = Music;
