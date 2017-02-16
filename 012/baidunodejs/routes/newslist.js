var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('./db');


//新闻列表
router.get('/', function(req, res, next) {
	var type = req.query.type;

	var connection = mysql.createConnection(dbconfig);
	connection.connect();
	if (type=="-1"||type==null) {
		var sql="select * from news";  
	}
	else{
		var sql="select * from news where src='"+type+"'";  
	}
	connection.query(sql,[],function(err,rows,fields){
		//console.log(rows);
		res.json(rows);

	});

});

module.exports = router;
