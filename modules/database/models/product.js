var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var UNIT = ENUMS.unit;
var ProductSchema = new mongoose.Schema({
    _id: String,
    created_at: {type: Date, default: new Date()},
    sellerId: {type: String, ref: 'User'},
    name:{type:String},
    price:{type:String},
    brand:{type:String},
    unit:{type:String,enum:[UNIT.KILOGRAM,UNIT.LITRE]},
    minimize: false,

});
ProductSchema.index({created_at: -1});

module.exports = mongoose.model('Product', ProductSchema);
