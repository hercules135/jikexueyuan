var express = require('express');
var router = express.Router();
var xss = require('xss');
// require('./db.js');
var mysql = require('mysql');
var dbconfig = require('./db');
var connection = mysql.createPool(dbconfig);


//保存修改
router.post('/editnews', function(req, res, next) {
	console.log(req);
	var id = xss(req.body.id);
	var title = xss(req.body.title),
	picturesrc = xss(req.body.picturesrc),
	src = xss(req.body.src),
	time = xss(req.body.time);

	var sql="update `news` set `title`='"+title+"',`picturesrc`='"+picturesrc+"',`src`='"+src+"',`time`='"+time+"' where id = '"+id+"'";  
	console.log(sql);
	connection.query(sql,[],function(err,rows){
		
		res.json(true);
	});
});

//添加
router.post('/addnews', function(req, res, next) {

	console.log(req.body);
	connection.query('',[],function(err,rows){

		var title = xss(req.body.title);
		var picturesrc = xss(req.body.picturesrc);
		var src = xss(req.body.src);
		var time = xss(req.body.time);

		var sql="INSERT INTO `news` (`title`,`picturesrc`,`src`,`time`) VALUES ('"+title+"', '"+picturesrc+"','"+src+"','"+time+"')";  
		console.log(sql);
		connection.query(sql,[],function(err,rows){
			
			res.json(true);
		});

	});
});

//删除
router.post('/delnews', function(req, res, next) {
	connection.query('',[],function(err,rows){


		var id=req.body.id;
		var sql="delete from news where id = '"+id+"'"; 
		console.log(sql);
		connection.query(sql,[],function(err,rows){
			
			res.json(true);
		});
	});
});

module.exports = router;
