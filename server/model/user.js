const mongoose = require('mongoose');
const Schema = mongoose.Schema


let userSchema = new Schema({
    username: {type : String, unique : true},
    password: {type : String, minlength: 6},
})

let User = mongoose.model('User',userSchema)
module.exports = User