let express = require('express');
let router = express.Router();
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let OrderController = require(__BASE__ + "modules/controller/OrderController");
let UserController = require(__BASE__ + "modules/controller/UserController");


router.post('/newOrder',function(req,res) {
    let parameters = {
        customerId:req.body.customerId,

    };
    if(req.body.payment_status){
        parameters.payment_status = req.body.payment_status;
    }

    if(req.body.type){
        parameters.type = req.body.type;
    }
    if(req.body.time){
        parameters.time = req.body.time;
    }
    if(req.body.slot){
        parameters.slot = req.body.slot;
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

    if(req.body.image_url){
        parameters.image_url = req.body.image_url
    }
    if(req.body.status){
        parameters.status = req.body.status
    }
    if(req.body.order){
        parameters.order = req.body.order;
    }
    if(req.body.locality) {
        parameters.locality = req.body.locality;
    }
    if(req.body.payment_method){
        parameters.payment_method = req.body.payment_method;
    }
    if(req.body.total){
        parameters.total =req.body.total;
    }
    if(req.body.latitude){
        parameters.latitude = req.body.latitude;
    }
    if(req.body.longitude){
        parameters.longitude = req.body.longitude;
    }
    if(req.body.credit){
        parameters.credit = req.body.credit;
    }
    if(req.body.discount){
        parameters.discount = req.body.discount;
    }
    console.log(req.body.order);
    OrderController.newOrder(parameters)
        .then(function (data) {
            if (data) {
                UserController.setCredit({_id:req.body.customerId},Math.round(-1 * Math.round(data.discount)|0))
                    .then(function(data){
                        RESPONSE.sendOkay(res, {success: true,data:data});
                        return true;
                    }).catch(function(err){
                    console.log(err);
                })
                // RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                RESPONSE.sendOkay(res, {success: false,data:data});
                return false;
            }



        });
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

    let template = {

    }

    if(req.body.payment_status){
        template.payment_status = req.body.payment_status;
    }
    let discount;
    let credit;
    let customerId;
    if(req.body.discount){
        discount = req.body.discount;
    }
    if(req.body.credit){
        credit = req.body.credit;
    }
    if(req.body.customerId){
        customerId = req.body.customerId;
    }

    template.status = "Completed";


    OrderController.verifyDelivery(parameters,template)
        .then(function(data){
            console.log(data);
            if(data){
                UserController.setCredit({_id:customerId},(credit))
                    .then(function(data){
                        RESPONSE.sendOkay(res, {success: true,data:data});
                        return true;
                    }).catch(function(err){
                    console.log(err);
                });
                // RESPONSE.sendOkay(res,{success:true});
            }else{
                RESPONSE.sendOkay(res,{success:false});
            }
        })

});
router.post('/cancelOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    let credit;
    let discount;
    if(req.body.credit){
        credit = req.body.credit;
    }
    if(req.body.discount){
        discount = req.body.discount;
    }
    OrderController.cancelOrder(parameters)
        .then(function (data) {
            if (data) {
                let rule = {
                    _id:data.customerId
                };

                UserController.setCredit(rule,Math.round(Math.round(data.discount)|0))
                    .then(function(data){
                        RESPONSE.sendOkay(res, {success: true,data:data});
                        return true;
                    }).catch(function(err){
                    console.log(err);
                })

            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});


router.post('/getOrderById',function(req,res) {
   let parameters = {
       _id:req.body._id
   }

    OrderController.getOrder(parameters)
        .then(function (data) {
            if (data) {
                data = data.reverse();

                RESPONSE.sendOkay(res, {success: "true",data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});


router.post('/getOrder',function(req,res) {
    // let parameters = {
    //     status: {$ne:"Completed"}
    // };
    let query = {
        $and: [ { status: { $ne: "Cancelled" } }, { status: { $ne: "Completed" } } ]
    };

    OrderController.getOrder(query)
        .then(function (data) {
            if (data) {
                data = data.reverse();
console.log(data);
                RESPONSE.sendOkay(res, {success: "true",data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});






router.post('/getOrderForApp',function(req,res) {
    // let parameters = {
    //     status: {$ne:"Completed"}
    // };
    let query = {
            status:'Processed'
    };

    OrderController.getOrder(query)
        .then(function (data) {
            if (data) {
                data = data.reverse();
                RESPONSE.sendOkay(res, {success: "true",data:data});
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
        $and: [ { status: { $ne: "Completed" } }, { status: { $ne: "Cancelled" } } ]

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

router.post('/getTotalOrder',function(req,res) {
    let parameters = {
        customerId:req.body.customerId,
        status: {$ne:"Completed"}
    };
    OrderController.getOrderByUserId(parameters)
        .then(function (data) {
            if (data) {
                console.log(data.length);
                RESPONSE.sendOkay(res, {success: true,data:data.length});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});


router.post('/getTodayOrders',function(req,res) {
    let parameters = {
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

router.post('/getReceivedOrders',function(req,res) {
    let parameters = {
        status:'Received'
    };
    OrderController.getOrder(parameters)
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

router.post('/getConfirmedOrders',function(req,res) {
    let parameters = {

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


router.post('/getConfirmedOrdersLength',function(req,res) {
    let parameters = {

        status:'Confirmed'
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data.length});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/getProcessedOrders',function(req,res) {
    let parameters = {
        status:'Processed'
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                console.log(data);
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/getProcessedOrdersLength',function(req,res) {
    let parameters = {

        status:'Processed'
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                console.log(data.length);
                RESPONSE.sendOkay(res, {success: true,data:data.length});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});
router.post('/getCompletedOrders',function(req,res) {

    let parameters = {};
    parameters.status = 'Completed';

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



router.post('/getCompletedOrderByUserId',function(req,res) {

    let parameters = {};
    parameters.status = 'Completed';
    parameters.customerId = req.body.customerId;

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
router.post('/updateOrderStatus',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };
    let template = {
        status:'Processed'
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




router.post('/updatePaymentId',function(req,res) {
    let parameters = {
        _id:req.body._id,

    };
    let template = {
        paymentId:req.body.paymentId
    };
    OrderController.updateOrder(parameters, template)
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
    if(req.body.payment_method){
        template.payment_method = req.body.payment_method;
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

router.post('/deleteOffer',function (req,res) {

    let parameters = {
        _id:req.body._id,
    };

    OrderController.deleteOffer(parameters)
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
