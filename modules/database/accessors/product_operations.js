let Product = require(__BASE__ + 'modules/database/models/product');
let Promise = require('bluebird');
let customUUID = require(__BASE__ + "modules/utils/CustomUUID");

//A template to input the data required at the registration of the user
let getCreateTemplate = function (parameters) {

    let template = {}
    for (let key in parameters) {
        switch (key) {
            case 'name':
            case 'price':
            case 'unit':
            case 'brand':
            case 'type':
            case 'imageurl':
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

let createProduct = function (parameters) {
    return new Promise(function(resolve, reject) {
        let template = getCreateTemplate(parameters);
        /*Store the user using the template*/
        let product = new Product(template);
        product.save(function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createProduct failed'));
            }
        });
    });
};


let getProduct = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Product.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Product'));
            }
        });
    });
};


let getProductFullDetail = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Product.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Product'));
            }
        });
    });
};


let deleteProduct = function(rule,fields,options){
    return new Promise(function (resolve,reject){
        Product.remove(rule,fields, options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to delete Product"));
            }
        });
    });
};

let updateProduct = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Product.findOneAndUpdate(rule,fields, {upsert: true}).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Product"));
            }
        });
    });
};

let getProductById = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Product.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get Product by Id"));
            }
        });
    });
};



let getProductBySellerId = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Product.find(rule,fields,options)
            .populate([
                {
                    path: "sellerId",
                    select: '_id firstname lastname address city phone pincode'
                }
            ]).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get User"));
            }
        });
    });
};


let getProductByDate = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Product.find(rule,fields,options)
            .populate([
                {
                    path: "sellerId",
                    select: '_id firstname lastname address city phone pincode'
                }
            ])
            .exec(function(err,data){
                if(!err){
                    resolve(data);
                }else{
                    reject(new Error("Failed to get Product"));
                }
            });
    });
};



module.exports = {
    createProduct: createProduct,
    getProduct: getProduct,
    updateProduct:updateProduct,
    getProductById:getProductById,
    deleteProduct:deleteProduct,
    getProductFullDetail:getProductFullDetail,
    getProductByDate:getProductByDate,
    getProductBySellerId:getProductBySellerId
};
