let express = require('express');
let router = express.Router();
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let OrderController = require(__BASE__ + "modules/controller/OrderController");


router.post('/newOrder',function(req,res) {
    let parameters = {
        customerId:req.body.customerId,

    };

    if(req.body.type){
        parameters.type = req.body.type;
    }
    if(req.body.unit){
        parameters.unit = req.body.unit;
    }
    if(req.body.name){
      parameters.name = req.body.name
    }
    if(req.body.brand){
        parameters.code =req.body.brand
    }
    if(req.body.quantity){
        parameters.quantity = req.body.quantity
    }
    if(req.body.unit){
        parameters.quantity = req.body.unit
    }
    if(req.body.image_url){
        parameters.image_url = req.body.image_url
    }
    if(req.body.status){
        parameters.status = req.body.status
    }
    if(req.body.order){
        parameters.order = req.body.order;
    }

    OrderController.newOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                RESPONSE.sendOkay(res, {success: false,data:data});
                return false;
            }



        });
});

router.post('/getOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    OrderController.getOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/getOrderByUserId',function(req,res) {
    let parameters = {
        customerId:req.body.customerId,
        status: {$ne:"Completed"}
    };
    OrderController.getOrderByUserId(parameters)
        .then(function (data) {
            if (data) {
                data = data.reverse();
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});

router.post('/getTodayOrders',function(req,res) {
    let parameters = {
        sellerId:req.body.sellerId,
        day:req.body.day,
        month:req.body.month,
        year:req.body.year,
         status: { $ne: "Delivered" }
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/getUpcomingOrders',function(req,res) {
    let parameters = {
        sellerId:req.body.sellerId,
        status:'Recieved'
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/getConfirmedOrders',function(req,res) {
    let parameters = {
        sellerId:req.body.sellerId,
        status:'Confirmed'
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/getProcessedOrders',function(req,res) {
    let parameters = {
        sellerId:req.body.sellerId,
        status:'Processed'
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/getCompletedOrders',function(req,res) {

    let parameters = {};
    if(req.body.role){
        let role = req.body.role;

        if(role==='Customer'){
            parameters.customerId=req.body.customerId,
                parameters.status='Completed'
        }else if(role==='Seller'){
            parameters.sellerId=req.body.sellerId,
            parameters.status='Completed'
        }
    }


    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});
router.post('/updateOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };
    OrderController.updateOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});




router.post('/addRating',function(req,res){
    let parameters={};
    parameters._id = req.body._id;
    // if(req.body.rating){
    //     parameters.rating = req.body.rating;
    // }
    //

    let template = {$set:{rating:req.body.rating}};
    OrderController.addRating(parameters,template)
        .then(function(data){
            if(data){
                RESPONSE.sendOkay(res,{success:true,data:data});
            }else{
                RESPONSE.sendError(res,{success:false});
            }
        })
});

router.post('/confirmOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    var template={};
    if(req.body.comment){
        template.comment = req.body.comment;
    }
    if(req.body.total){
        template.total = req.body.total;
    }
    if(req.body.status){
        template.status = req.body.status;
    }

    console.log(template);
    OrderController.updateOrder(parameters,template)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});



router.post('/addSeller',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    var template = {};
    if(req.body.sellerId){
        template.sellerId = req.body.sellerId;
    }
    console.log("template:" , template);

    OrderController.updateOrder(parameters,template)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});


router.post('/processOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    var template = {};
    if(req.body.latitude){
        template.latitude = req.body.latitude;
    }
    if(req.body.longitude){
        template.longitude = req.body.longitude;
    }
    if(req.body.locality){
        template.locality = req.body.locality;
    }
    if(req.body.status){
        template.status = req.body.status;
    }
    if(req.body.time){
        template.time = req.body.time;
    }

    OrderController.updateOrder(parameters,template)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});
router.post('/refuseOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    OrderController.updateOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});



router.post('/verifyPickup',function (req,res) {
   let parameters = {
       _id:req.body._id
   };

   if(req.body.pickup_otp){
       parameters.pickup_otp = req.body.pickup_otp;
   }

   // if(req.body.delivered_otp){
   //     parameters.delivered_otp = req.body.delivered_otp;
   // }


   OrderController.verifyPickup(parameters)
       .then(function(data){
           console.log(data);
           if(data){
               RESPONSE.sendOkay(res,{success:true});
           }else{
               RESPONSE.sendOkay(res,{success:false});
           }
       })

});



router.post('/verifyDelivery',function (req,res) {
    let parameters = {
        _id:req.body._id
    };

    // if(req.body.pickup_otp){
    //     parameters.pickup_otp = req.body.pickup_otp;
    // }

    if(req.body.delivered_otp){
        parameters.delivered_otp = req.body.delivered_otp;
    }


    OrderController.verifyDelivery(parameters)
        .then(function(data){
            console.log(data);
            if(data){
                RESPONSE.sendOkay(res,{success:true});
            }else{
                RESPONSE.sendOkay(res,{success:false});
            }
        })

});
router.post('/cancelOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    OrderController.cancelOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});


router.post('/createOffer',function (req,res) {

    let parameters = {
        url:req.body.url,
    };

    OrderController.createOffer(parameters)
        .then(function(data){
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        })

});
router.post('/createDonation',function (req,res) {

    let parameters = {
        type:req.body.type,
        url:req.body.url,
        service:req.body.service,

    };

    OrderController.createDonation(parameters)
        .then(function(data){
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        })

})
router.post('/createUserOfferRelation',function (req,res) {

    let parameters = {
        offerid:req.body.offerid,
        user:req.body.user,
    };

    OrderController.createUserOfferRelation(parameters)
        .then(function(data){
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        })

})



router.post('/getOffer',function (req,res) {

    let parameters = {type:'Offer'};

    OrderController.getOffer(parameters)
        .then(function(data){
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        })

});

router.post('/getImages',function (req,res) {

    let parameters = {};

    OrderController.getImages(parameters)
        .then(function(data){
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting Images from the database");
                return false;
            }
        })

});

router.post('/checkIfUserHasUsedCoupon',function (req,res) {
   let parameters = {
        user:req.body.user,
        offerid:req.body.offerid
   };

   OrderController.checkIfUserHasUsedCoupon(parameters)
       .then(function(data){
            if(data.length>0){
                console.log(data);
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            }else{
                RESPONSE.sendOkay(res, {success: false,data:data});
                return true;
            }
       })
});



module.exports = router;
