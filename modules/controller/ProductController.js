let productOperations = require(__BASE__+"modules/database/accessors/product_operations");
let userOperations = require(__BASE__+"modules/database/accessors/user_operations");


let newProduct = function(parameters){
    console.log(parameters);
    return productOperations.createProduct(parameters)
        .then(function(data){
            return data;
        }).catch(function(error){
            console.log("Error in createProduct",error);
        })
};

let getProduct = function(parameters){
    return productOperations.getProduct(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant create user with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};



let updateProduct = function(parameters,template){
    return productOperations.updateProduct(parameters,template)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant update Product with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in updateProduct",error);
        })
};


let getProductById = function(parameters){
    return productOperations.getProductById(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant get Products with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};
let getProductBySellerId = function(parameters){
    return productOperations.getProductBySellerId(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant get Products with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};
let getProductByDate = function(parameters){

    return productOperations.getProductByDate(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant get Products with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};

let deleteProduct = function(parameters){
    return productOperations.deleteProduct(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant cancel Product with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in cancelProduct",error);
        })
};

module.exports = {
    newProduct:newProduct,
    getProduct:getProduct,
    updateProduct:updateProduct,
    getProductById:getProductById,
    getProductBySellerId:getProductBySellerId,
    getProductByDate:getProductByDate,
    deleteProduct:deleteProduct,


};
