var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io'); // 加入 Socket.IO
var io = require('./db.js'); // 加入 Socket.IO



var server = http.createServer(function (request, response) {


   var path = url.parse(request.url).pathname;

   switch (path) {
    	case '/':
		      response.writeHead(200, {'Content-Type': 'text/html'});
		      response.write('Hello, World.');
		      response.end();
		      break;
    	case '/socket.html':
		      fs.readFile(__dirname +"/view"+ path, function(error, data) {
		        if (error){
		          response.writeHead(404);
		          response.write("opps this doesn't exist - 404");
		        } else {
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");
		        }
		        response.end();
		      });
		      break;
		case '/send.html':
		      fs.readFile(__dirname +"/view"+ path, function(error, data) {
		        if (error){
		          response.writeHead(404);
		          response.write("opps this doesn't exist - 404");
		        } else {
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");
		        }
		        response.end();
		      });
      		break;
    	default:
	      response.writeHead(404);
	      response.write("opps this doesn't exist - 404");
	      response.end();
	      break;
  }
	
});
server.listen(8888);

serv_io = io.listen(server);
serv_io.set('log level', 1);


serv_io.sockets.on('connection', function(socket) {
  // 傳送時間訊息給瀏覽器
  setInterval(function() {
    socket.emit('date', {'date': new Date()});
  }, 1000);

  // 接收來自於瀏覽器的資料
  socket.on('client_data', function(data) {
  	    socket.emit('date2', {'date': data.letter});
		process.stdout.write(data.letter);
  });

});
