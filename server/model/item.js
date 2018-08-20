const mongoose = require('mongoose');
const Schema = mongoose.Schema


let itemSchema = new Schema({
    name: String,
    price: Number,
    stock : Number,
    tags : Array,
})

let Item = mongoose.model('Item',itemSchema)
module.exports = Item