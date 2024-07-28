const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    username: {
        type: String,
        required : true,
        min:3,
        max:50,
        unique: true,
    },
    email: {
        type: String,
        required : true,
        unique: true,
        max:50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },
    Date: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model("Users" , userSchema );