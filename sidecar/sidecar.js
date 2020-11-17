const http = require('http');
const setup = require('proxy');
 
const server = setup(http.createServer());
server.listen(9000, function () {
  var port = server.address().port;
  console.log('HTTP(s) proxy server listening on port %d', port);
});