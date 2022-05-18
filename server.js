const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer((request, response) => {

  const file = request.url === '/' ? 'index.html' : request.url;
  const filePath = path.join(__dirname, 'public', file);
  const extname = path.extname(filePath);
  
  const allowedFileTypes = ['.html', '.css', '.js'];
  const allowed = allowedFileTypes.find(item => item == extname);

  if (!allowed) return
  
  fs.readFile(
    filePath,
    (err, content) => {
      if(err) throw err;

      response.end(content);
    }
  )

}).listen(5000, () => console.log('Server is running...'));