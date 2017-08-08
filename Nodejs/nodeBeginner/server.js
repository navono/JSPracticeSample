const http = require('http');

function start() {
  http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello');
    res.end();
  }).listen(8989);

  console.log('Server has started.');
}

module.exports.start = start;
