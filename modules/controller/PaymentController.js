let Insta = require(__BASE__+"modules/helper/instamojo");

let createPaymentRequest = function(parameters){
    return Insta.createPaymentRequest(parameters)
        .then(function(data){
            if(data){
                return data;
            }
        }).catch(function(err){
            console.log(err);
        })
};


let getPaymentDetails = function(parameters) {
    return Insta.getPaymentDetails(parameters.id, parameters.payment_id)
        .then(function(data){
            if(data){
                return data;
            }
        }).catch(function(err){
            console.log(err);
        })
}



module.exports= {
    createPaymentRequest:createPaymentRequest,
    getPaymentDetails: getPaymentDetails
}

