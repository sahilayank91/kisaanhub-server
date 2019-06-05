let Order = require(__BASE__ + 'modules/database/models/order');
let Offer = require(__BASE__ + 'modules/database/models/offer');


let customUUID = require(__BASE__ + "modules/utils/CustomUUID");
let Promise = require('bluebird');

//A template to input the data required at the registration of the user
let getCreateTemplate = function (parameters) {

    let template = {}
    for (let key in parameters) {
        switch (key) {
            case '_id':
            case 'phone':
            case 'permanent_address':
            case 'status':
            case 'address':
            case 'pickup_date':
            case 'order':
            case 'latitude':
            case 'longitude':
            case 'customerId':
            case 'total':
            case 'delivered_otp':
            case 'email':
            case 'day':
            case 'month':
            case 'type':
            case 'year':
            case 'image_url':
            case 'comment':
            case 'locality':
            case 'rating':
            case 'payment_method':
            case 'payment_status':
            case 'paymentId':
            case 'slot':
            case 'time':
                template[key] = parameters[key];
                break;
        }
    }


    template.created_at = new Date();

    template.pickup_otp  = customUUID.getOTP();

    template.delivered_otp = customUUID.getOTP();

    if(template.pickup_date){
        template.pickup_date = new Date(Number(template.pickup_date)).setHours(17,0,0,0);
    }

    if (!template._id) {
        template._id = customUUID.getOTP(8);
    }

    return template;
};

let getOfferCreateTemplate = function (parameters) {

    let template = {}
    for (let key in parameters) {
        switch (key) {
            case '_id':
            case 'url':
                template[key] = parameters[key];
                break;
        }
    }


    template.created_at = new Date();

    if (!template._id) {
        template._id = customUUID.getRandomString(6);
    }

    return template;
};


let createOrder = function (parameters) {
    return new Promise(function(resolve, reject) {
        let template = getCreateTemplate(parameters);
        /*Store the user using the template*/
        let order = new Order(template);
        order.save(function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createOffer failed'));
            }
        });
    });
};


let createOffer = function(parameters){
    return new Promise(function(resolve, reject) {
        let template = getOfferCreateTemplate(parameters);
        let offer = new Offer(template);
        offer.save(function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createOffer failed'));
            }
        });
    });
};

let getOrder = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Order.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};


let getOrderFullDetail = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Order.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};


let deleteOrder = function(rule,fields,options){
    return new Promise(function (resolve,reject){
        Order.remove(rule,fields, options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to delete Users"));
            }
        });
    });
};

let updateOrder = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.findOneAndUpdate(rule,{$set:fields}, {upsert: true}).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};

let cancelOrder = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.findOneAndUpdate(rule,{$set:{status:'Cancelled'}}, {upsert: true}).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};


let getOrderById = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get Order by Id"));
            }
        });
    });
};



let getOrderByUserId = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.find(rule,fields,options)
            .populate([
            {
                path: "customerId",
                select: '_id firstname lastname address flataddress city phone pincode latitude longitude'
            },

        ]).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get User"));
            }
        });
    });
};

let addWasherman = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.findOneAndUpdate(rule,fields, {upsert: true}).exec(function(err,data){
            if(!err){
                console.log(data);
                resolve(data);
            }else{
                reject(new Error("Failed to cancel Order"));
            }
        });
    });
};
let getOrderByDate = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.find(rule,fields,options)
            .populate([
                {
                    path: "customerId",
                    select: '_id firstname lastname address flataddress city phone pincode'
                },
                {
                    path: "sellerId",
                    select: '_id firstname lastname address flataddress city phone pincode'
                }
            ])
            .exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get order"));
            }
        });
    });
};

let getOffer = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Offer.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get Offer by Id"));
            }
        });
    });
};
let deleteOffer = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Offer.remove(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get Offer by Id"));
            }
        });
    });
};


let addRating = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.findOneAndUpdate(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to add Rating by Id"));
            }
        });
    });
};

let approvePayment = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.findOneAndUpdate(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to approve by Id"));
            }
        });
    });
};


module.exports = {
    createOrder: createOrder,
    getOrder: getOrder,
    updateOrder:updateOrder,
    getOrderById:getOrderById,
    getOrderFullDetail:getOrderFullDetail,
    getOrderByUserId:getOrderByUserId,

    getOrderByDate:getOrderByDate,
    addWasherman:addWasherman,
    createOffer:createOffer,
    getOffer:getOffer,
    cancelOrder:cancelOrder,
    addRating:addRating,
    deleteOffer:deleteOffer,
    approvePayment:approvePayment
};
