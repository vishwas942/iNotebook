const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    Name:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true,
       unique: true
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        dafault:Date.now,
    }
})


module.exports = mongoose.model('user', UserSchema); 