function start() {
  console.log(`Request handler 'start' was called.`);
  return 'Hello Start';
}

function upload() {
  console.log(`Request handler 'upload' was called.`);
  return 'Hello Upload'
}

module.exports.start = start;
module.exports.upload = upload;
