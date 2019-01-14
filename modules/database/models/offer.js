let mongoose = require('mongoose');
let ENUMS = require(__BASE__ + "config/enums");


let OfferSchema = new mongoose.Schema(
    {
        _id:{type:String},
        url:{type:String},
        type:{type:String, default:'Offer'},
        created_at:{type:Date,default:new Date()}

    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('Offer', OfferSchema);
