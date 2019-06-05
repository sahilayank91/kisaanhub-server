var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var TYPE = ENUMS.type;
var UNIT = ENUMS.unit;
var ProductSchema = new mongoose.Schema({
    _id: String,
    created_at: {type: Date, default: new Date()},
    name:{type:String},
    hindiname:{type:String},
    price:{type:String},
    brand:{type:String},
    type:{type:String, enum:[TYPE.VEGETABLE,TYPE.FRUIT, TYPE.GRAIN], required: true},
    // unit:{type:String,enum:[UNIT.KILOGRAM,UNIT.LITRE], default: UNIT.KILOGRAM},
    unitlist:[{
        price: {type: String},
        quantity:{type:String},
        unit:{type:String,enum:[UNIT.KILOGRAM,UNIT.LITRE, UNIT.GRAM]}
    }
    ],
    unit:{type:String},
    imageurl:{type:String},
    twofiftygram:{type:String},
    fivehundredgram:{type:String},
    onekg:{type:String},

    minimize: false,

});
ProductSchema.index({created_at: -1});

module.exports = mongoose.model('Product', ProductSchema);
