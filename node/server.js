var express = require('express');
var serv = express();
var body_parser = require('body-parser');

serv.use(body_parser.json());
serv.use(body_parser.urlencoded({extended: false}));


var ingredients = [
    {
        "id" : "1234",
        "name" : "eggs"
    },
    {
        "id" : "afesdhli",
        "name" : "milk"
    },
    {
        "id" : "2t543ybn89",
        "name" : "bacon"
    }
];

serv.get('/ingredients', function(req,res) {
    res.send(ingredients);
});

serv.post('/ingredients', function(req,res) {
    var ingredient = req.body;
    if (!ingredient || ingredient.name === "" || ingredient.id === "") {
        res.status(500).send({error: "No ingredient"});
    }
    else {
        ingredients.push(ingredient);
        res.status(200).send(ingredients);
    }
});

serv.put('/ingredients/:ingredientID', function(req,res) {
    var ingredientID = req.params.ingredientID;
    var name = req.body.name;

    if (!ingredientID || ingredientID === "" ||
        !name || name === "") {
            res.status(500).send({error:"gotta provide"});
    }
    else {
        for (var ii = 0; ii < ingredients.length; ii++) {
            var i = ingredients[ii];
            if (i.id === req.params.ingredientID) {
                ingredients[ii].name = name;
                break;
            }
        }
        res.send(ingredients);
    }

});

serv.listen(27017, function() {
    console.log('Running');
});
