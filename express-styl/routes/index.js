var express = require('express');
var router = express.Router();
var path = require('path');
var traffic = require(__dirname + '\\server_attachments\\api');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/goal', function(req, res) {

    res.render('front.jade',{
        title:"indexPage",
        body:"front",
        language:['hello','bye','mommy!']
    });

});

router.get("/enter",function(req,res){
	res.render('map.jade');
});

router.get('/testing', function(req,res){
	console.log(traffic);
	var test = JSON.stringify(traffic.traffic(req));
	res.send("<p>" + test + "</p>");
});

module.exports = router;
