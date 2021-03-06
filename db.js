var mysql = require('mysql'); 

var db = {};

db.query = function sqlback(sqllan,fn){
  var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'wbkt',
    port:3306
  });

  connection.connect(function(err){
      if(err){
          console.log(err);
          return;
      }
  });

  var sql = sqllan;

  if(!sql)return;

  connection.query(sql,function(err,rows,fields){
      if(err){
          console.log(err);
          return;
      }
      fn(rows);
  });

  connection.end(function(err){
      if(err){
          return;
      }else{
        console.log('连接关闭');
      }
  });
}

module.exports=db;