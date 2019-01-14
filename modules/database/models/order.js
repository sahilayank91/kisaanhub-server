var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var ROLES = ENUMS.roles;
var BRANCH = ENUMS.branch;
var CATEGORY = ENUMS.category;
var GENDER = ENUMS.gender;
var YEAR = ENUMS.year;
var STATUS = ENUMS.status;
var SERVICE = ENUMS.service_type;
var TYPE = ENUMS.type;

var OrderSchema = new mongoose.Schema({
    _id: String,
    name:{type:String},
    quantity:{type:String},
    brand:{type:String},
    pickup_date: {type: Date},
    created_at: {type: Date, default: new Date()},
    customerId: {type: String, ref: 'User'},
    sellerId:{type:String, ref:'User'},
    pickup_otp:{type:String},
    delivered_otp:{type:String},
    image_url:{type:String},
    comment:{type:String},
    type:{type:String},
    total:{type:String},
    order:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    locality:{type:String},
    payment_method:{type:String},
    rating:{type:Number},
    updated_at:{type:Date, default: new Date()},
    time:{type:String,enum:['Morning','Afternoon','Evening','Express']},
    status:{type:String,enum:[STATUS.RECIEVED,STATUS.COMPLETED,STATUS.DELIVERED,STATUS.CANCELLED,STATUS.PICKED],required:true},
    minimize: false,

});
OrderSchema.index({updated_at: -1});

module.exports = mongoose.model('Order', OrderSchema);
