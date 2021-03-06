const url = require('url'),
http = require('http'),
fs = require('fs')


// http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('Hello Node!\n');
// }).listen(8080);


http.createServer((request, response) => {
    let addr = request.url,
        q = url.parse(addr, true),
        filepath = '';

    fs.appendFile('log.txt', '  URL: ' + addr + '  \Timestamp: ' + new Date() + '\n\n', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Add to log.');
        }
    });
        
    if(q.pathname.includes('documentation')) {
        filepath = (__dirname + '/documentation.html');
    } else {
        filepath = (__dirname + '/index.html');
    }

    fs.readFile(filepath, (err, data) => {
        if (err) {
            throw err;
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();

    });

    }).listen(8080);

console.log('My first Node test server is running on port 8080.');