const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
    },
    contant :{
        type: String,
        required : true,

    },
    createdAt:{
        type: Date,
        default : Date.now,
    },
});

module.exports = mongoose.model('Post', PostSchema);