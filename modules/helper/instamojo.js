let request= require('request');
let Promise = require('bluebird');
let API_KEY = '4845f9a7238467ba6b0bd781cc9d0e79';
let AUTH_TOKEN = 'e8edef158807f3de73a35f48e3eaf468';
let Insta = require('instamojo-nodejs');
Insta.setKeys(API_KEY, AUTH_TOKEN);

let createPaymentRequest= function(parameters){

    return new Promise(function(resolve, reject){

            let payload = {};
            if(parameters.purpose){
                payload.purpose = parameters.purpose;
            }
            if(parameters.amount){
                payload.amount = parameters.amount
            }else{
                return {success:false,data:[]};
            }

            if(parameters.phone){
                payload.phone = parameters.phone;
            }
            if(parameters.buyer_name){
                payload.buyer_name = parameters.buyer_name;
            }
            if(parameters.redirect_url){
                payload.redirect_url = parameters.redirect_url
            }
            if(parameters.email){
                payload.email = parameters.email
            }

            payload.send_email = true;
            payload.send_sms = true;
            payload.allow_repeated_payments = false;
            payload.redirect_url = 'http://172.21.4.98:3000/service/payment/approveRequest/';

            Insta.createPayment(payload, function(error, response) {
                if (error) {
                    // some error
                    reject(error);
                } else {
                    // Payment redirection link at response.payment_request.longurl
                    console.log(response);
                    resolve(response);
                }
            });

    }).catch(function(err){
        console.log(err);
    })
};


let getPaymentDetails = function(id,payment_id){

    return new Promise(function(resolve, reject){
        let headers = { 'X-Api-Key': API_KEY, 'X-Auth-Token': AUTH_TOKEN}

        let payload = {};

        let request_url = 'https://www.instamojo.com/api/1.1/payment-requests/' + id + "/" + payment_id;
        if(request_id){
            request.get(
                request_url,
                {form: payload,  headers: headers}, function(error, response, body){
                    if(!error && response.statusCode === 200){
                        console.log(body);
                        resolve(body);
                    }else{
                        reject(error)
                    }

                })
        }
    }).catch(function (err){
        console.log(err);
    });



}

module.exports = {
    createPaymentRequest:createPaymentRequest,
    getPaymentDetails:getPaymentDetails
}
