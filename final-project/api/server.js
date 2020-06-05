var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27018/shop')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Product = require('./model/product');
var Wishlist = require('./model/wishlist');

app.post('/product', function(req,res) {
    var product = new Product();
    product.title = req.body.title;
    product.price = req.body.price;
    product.save(function(err,savedProduct) {
        if (err) {
            res.status(500).send({error:"Could not save product"});
        }
        else {
            res.send(savedProduct);
        }
    })
});

app.get('/product', function(req,res) {
    Product.find({},function(err,products) {
        if (err) {
            res.status(500).send({error:"Couldn't find product"});
        }
        else {
            res.send(products);
        }
    });
});

app.post('/wishlist', function(req,res) {
    var wishlist = new Wishlist();
    wishlist.title = req.body.title;
    wishlist.save(function(err,newWishlist) {
        if (err) {
            res.status(500).send({error:"Could not create wishlist"})
        }
        else {
            res.send(newWishlist);
        }
    });
});

app.get('/wishlist', function(req,res) {
    Wishlist.find({}).populate({path:'products',model:'Product'}).exec(function(err,wishlists) {
        if (err) {
            res.status(500).send({error:"Could not fetch wishlists"});
        }
        else {
            res.send(wishlists);
        }
    });
});

app.put('/wishlist/product/add', function(req,res) {
    Product.findOne({_id: req.body.productId}, function(err,product) {
        if (err) {
            res.status(500).send({error:"Could not add item"});
        }
        else {
            Wishlist.update({_id:req.body.wishlistId}, 
                {$addToSet: {products: product._id}},
                function(err,wishlist) {
                    if (err) {
                        res.status(500).send({error:"Could not update wishlist"});
                    }
                    else {
                        res.send(wishlist);
                    }
                }
            );
        }
    });
});

app.listen(8000, function() {
    console.log("Project running on port 8000");
});