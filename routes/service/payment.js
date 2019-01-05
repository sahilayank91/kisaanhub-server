let express = require('express');
let router = express.Router();
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let DataValidator = require(__BASE__ + "modules/utils/DataValidator");
let PaymentController = require(__BASE__ + "modules/controller/PaymentController");
let OrderController = require(__BASE__ + "modules/controller/OrderController");

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

    if(req.body.redirect_url){
        payload.redirect_url = req.body.redirect_url
    }

    if(req.body.email){
        payload.email = req.body.email
    }
    console.log("payload: ",payload);

    PaymentController.createPaymentRequest(payload)
        .then(function (data) {
            if (data) {



                data = data.replace(/(\r\n|\n|\r)/gm," ");
                console.log(data);

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

router.post('/approvePayment',function(req,res){
    let parameters = {};

    if(req.body.orderId){
        parameters._id = req.body.orderId
    }else{
        RESPONSE.sendError(res,{success:false});
    }
    let template = {$set:{"status":"Processed"}}

    OrderController.approvePayment(parameters,template)
        .then(function(data){
            if(data){
                console.log(data);
                RESPONSE.sendOkay(res,{success:true,data:data});
            }else{
                RESPONSE.sendError(res,{success:false});
            }

        })


});


module.exports = router;
