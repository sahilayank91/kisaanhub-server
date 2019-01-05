let request= require('request');
let Promise = require('bluebird');
let API_KEY = 'b89ac8b2978fd72b07fe14c3a3ee7c9d';
let AUTH_TOKEN = 'cfc4f6f965c8173793dbed98bcbfddcb';

let createPaymentRequest= function(parameters){

    return new Promise(function(resolve, reject){


            let headers = { 'X-Api-Key': API_KEY, 'X-Auth-Token': AUTH_TOKEN}
            // let payload = {
            //     purpose: 'FIFA 16',
            //     amount: '2500',
            //     phone: '9999999999',
            //     buyer_name: 'John Doe',
            //     redirect_url: 'http://www.example.com/redirect/',
            //     send_email: true,
            //     webhook: 'http://www.example.com/webhook/',
            //     send_sms: false,
            //     email: 'foo@example.com',
            //     allow_repeated_payments: false}

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
            if(payload.redirect_url){
                payload.redirect_url = parameters.redirect_url
            }
            if(payload.email){
                payload.email = parameters.email
            }

            payload.send_email = true;
            payload.send_sms = false;
            payload.allow_repeated_payments = false;

            request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
                if(!error && response.statusCode === 201){
                    console.log(body);
                    resolve(body);
                }else{
                    reject(error);
                }
            })
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
