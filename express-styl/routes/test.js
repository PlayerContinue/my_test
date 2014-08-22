var express = require('express');
var router = express.Router();
var async = require('async');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/goal', function(req, res) {

    res.render('index', {
        title: "indexPage",
        body: "front",
        language: ['hello', 'bye', 'mommy!']
    });

});


async.series([

    function(callback) {
        function render(page, req, res, next) {
            page = page.replace(/\/$/, '');

            res.render(page, function(err, html) {
                console.log("page", page, err);
                if (err) {
                    if (rc.proxyOrigin) {
                        // not an error -- fall through to the proxy over to the .NET site
                        next();
                    } else {
                        next(err);
                    }
                } else {
                    res.send(html);
                }
            });
        }
    
    //Get calls for partials and return the rendered version
    router.get('/partials/*', function(req, res, next) {
        render('partials/' + req.params[0], req, res, next);
    });

    callback();
    }
]);




module.exports = router;