const http = require('http');
const url = require('url');

function start(route, handle) {
  http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} received`);
    
    let postData = '';
    req.setEncoding('utf8');
    req.addListener('data', dataChunk => {
      postData += dataChunk;
      console.log(`Received POST data chunk: ${dataChunk}`);
    });
    req.addListener('end', () => {
      route(handle, pathname, res, postData);
    });
  }).listen(8989);

  console.log('Server has started.');
}

module.exports.start = start;
