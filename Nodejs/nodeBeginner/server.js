const http = require('http');
const url = require('url');

function start(route) {
  http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received`);

    route(pathname);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello');
    res.end();
  }).listen(8989);

  console.log('Server has started.');
}

module.exports.start = start;
