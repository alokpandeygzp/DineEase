const mongoose = require('mongoose')
const {Schema} =mongoose;
const ProductSchema = new Schema({
    CategoryName:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    options:{
        type: Array,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    img:{
        type: String,
        default: ""
    },
});

module.exports = mongoose.model('food_items',ProductSchema)