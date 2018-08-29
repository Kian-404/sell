var express = require('express');
var router = express.Router();

var goods = require('../data/goods.json')
var seller = require('../data/seller.json')
var ratings = require('../data/ratings.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/seller', function(req, res, next){
	res.json({
		data:seller
	})
});
router.get('/api/goods', function(req, res, next){
	res.json({
		data: goods
	})
});
router.get('/api/ratings', function(req, res, next){
	res.json({
		data: ratings
	})
});

module.exports = router;
