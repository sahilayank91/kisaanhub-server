let express = require('express');
let router = express.Router();
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let DataValidator = require(__BASE__ + "modules/utils/DataValidator");
let PaymentController = require(__BASE__ + "modules/controller/PaymentController");

router.post('/createPaymentRequest', function(req, res) {

    let payload = {};

    if(req.body.purpose){
        payload.purpose = req.body.purpose;
    }

    if(req.body.amount){
        payload.amount = req.body.amount
    }else{
        RESPONSE.sendError(res, {success:false,data:'Please specify the amount'});
    }

    if(req.body.phone){
        payload.phone = req.body.phone;
    }

    if(req.body.buyer_name){
        payload.buyer_name = req.body.buyer_name;
    }

    if(payload.redirect_url){
        payload.redirect_url = req.body.redirect_url
    }

    if(payload.email){
        payload.email = req.body.email
    }

    PaymentController.createPaymentRequest(payload)
        .then(function (data) {
            console.log(data);
            if (data) {
                console.log("In router:",data);
                RESPONSE.sendOkay(res, data);
            } else {
                console.log("Some error occured while getting data from the database");
            }
        }).catch(function (err) {
        console.log(err);
    });



});


router.post('/getPaymentDetails',function(req,res){
    let parameters = {};
    if(req.body.id){
        parameters.id = req.body.id;
    }else{
        RESPONSE.sendError(res,{success:false, data:'ID not specified'});
    }


    if(req.body.pid){
        parameters.pid = req.body.pid;
    }else{
        RESPONSE.sendError(res,{success:false,data:'PID not specified'});
    }


    PaymentController.getPaymentDetails(parameters)
        .then(function(data){
            if(data){
                console.log(data);
                RESPONSE.sendOkay(res, {success:true,data:data});
            }else{
                RESPONSE.sendError(res,{success:false,data:data});
            }
        })

});


module.exports = router;
