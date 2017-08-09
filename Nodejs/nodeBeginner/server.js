const http = require('http');
const url = require('url');

function start(route, handle) {
  http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received`);
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const content = route(handle, pathname);
    res.write(content);
    res.end();
  }).listen(8989);

  console.log('Server has started.');
}

module.exports.start = start;
