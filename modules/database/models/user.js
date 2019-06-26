var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var ROLES = ENUMS.roles;
var BRANCH = ENUMS.branch;
var CATEGORY = ENUMS.category;
var GENDER = ENUMS.gender;
var YEAR = ENUMS.year;
var UserSchema = new mongoose.Schema({
    _id: {type:String},
	firstname: {type: String, required: true}, //change the keys whenever firstname changes
	middlename:{type:String},
	lastname: {type: String}, //change the keys whenever lastname changes
	name:{type:String},
	phone:{type:String},
	secondary_phoneno:{type:String},
    email: {type:String, unique:false},
	dob:{type:Date},
    role:{
        type:String,
        enum:[ROLES.CUSTOMER,ROLES.SELLER,ROLES.AGENT],
    },
    password: {type: String, required: false},
	gender: {
		type:String,
		enum:[GENDER.MALE,GENDER.FEMALE,GENDER.OTHER]
	},
    address:{type:String},
    flataddress:{type:String},
    locality:{type:String},
    city:{type:String},
    pincode:{type:String},
    profilePic: {type:String},
    activated: {type: Boolean, default: false},
    created_at: {type: Date, default: new Date()},
    created_by: {type: String, ref: 'User'},
    occupation:{type:String},
    latitude:{type:String},
    longitude:{type:String},

    landline:{type:String},
    shop:{type:String},
    bankaccount:{type:String},
    ifsc:{type:String},
    gst:{type:String},
    about: String,
    credit:{type:Number}
    }, {
    minimize: false,
    autoIndex:false
});

// UserSchema.index( {phone: 1});

module.exports = mongoose.model('User', UserSchema);
