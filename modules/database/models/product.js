var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var TYPE = ENUMS.type;
var UNIT = ENUMS.unit;
var ProductSchema = new mongoose.Schema({
    _id: String,
    created_at: {type: Date, default: new Date()},
    name:{type:String},
    price:{type:String},
    brand:{type:String},
    type:{type:String, enum:[TYPE.VEGETABLE,TYPE.FRUIT, TYPE.GRAIN], required: true},
    unit:{type:String,enum:[UNIT.KILOGRAM,UNIT.LITRE], default: UNIT.KILOGRAM},
    imageurl:{type:String},
    minimize: false,

});
ProductSchema.index({created_at: -1});

module.exports = mongoose.model('Product', ProductSchema);
