const http = require('http');
const url = require('url');

function start(route, handle) {
  http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received`);
    
    route(handle, pathname, res, req);
  }).listen(8989);

  console.log('Server has started.');
}

module.exports.start = start;
