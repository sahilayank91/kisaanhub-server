let express = require('express');
let router = express.Router();
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let ProductController = require(__BASE__ + "modules/controller/ProductController");


router.post('/newProduct',function(req,res) {
    let parameters = {
        name:req.body.name,
        unitlist:req.body.unitlist,
        type:req.body.type,
        hindiname:req.body.hindiname,
        brand:req.body.brand,
        imageurl:req.body.imageurl,
        outofstock:false,
    };

    if(req.body.discount){
        parameters.discount = req.body.discount;
    }else{
        parameters.discount = 0;
    }
    ProductController.newProduct(parameters)
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

router.post('/getProduct',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    ProductController.getProduct(parameters)
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

router.post('/getAllProducts',function(req,res) {
    let parameters = {

    };

    ProductController.getProduct(parameters)
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
router.post('/getProductByType',function(req,res) {
    let parameters = {
        type:req.body.type,
    };

    ProductController.getProduct(parameters)
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

router.post('/getProductBySellerId',function(req,res) {
    let parameters = {
        sellerId:req.body.sellerId,
    };
    ProductController.getProductBySellerId(parameters)
        .then(function (data) {
            if (data) {

                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting product from the database");
                return false;
            }


        });
});

router.post('/getTodayOrders',function(req,res) {
    let parameters = {
        washerman_id:req.body.washerman_id,
        day:req.body.day,
        month:req.body.month,
        year:req.body.year,
        status: { $ne: "Delivered" }
    };
    ProductController.getProductByDate(parameters)
        .then(function (data) {
            if (data) {
                console.log("today",data);
                data = data.reverse();
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/updateProduct',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };
    let template = {};
    if(req.body.name){
        template.name = req.body.name;
    }
    if(req.body.hindiname){
        template.hindiname = req.body.hindiname
    }
    if(req.body.brand){
        template.brand = req.body.brand;
    }
    if(req.body.imageurl){
        template.imageurl = req.body.imageurl;
    }
    if(req.body.unitlist){
        template.unitlist = req.body.unitlist;
    }
    if(req.body.outofstock!==undefined){
        template.outofstock = req.body.outofstock;
    }
    if(req.body.discount){
        template.discount = req.body.discount;
    }
    console.log(req.body.outofstock);
    template.updated_at = new Date();


    console.log(parameters);
    console.log(template);
    ProductController.updateProduct(parameters, template)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting product from the database");
                return false;
            }


        });
});



router.post('/deleteProduct',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    ProductController.deleteProduct(parameters)
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


module.exports = router;
