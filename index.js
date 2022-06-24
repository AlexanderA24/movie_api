const express = require('express'), 
    morgan = require('morgan')
    fs = require('fs'), // import built in node modules fs and path 
     path = require('path');


const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})


let topMovies = [
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling'
    },
    {
      title: 'Lord of the Rings',
      author: 'J.R.R. Tolkien'
    },
    {
      title: 'Twilight',
      author: 'Stephanie Meyer'
    }
  ];

  // GET requests


app.use('/public',express.static(__dirname + '/public'));

app.use(morgan('common'));

app.get('/', (err,req, res, next) => {
    res.send('Welcome to the movie recommender!');
  });
  
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
app.get('/movies', (req, res) => {
    res.json(topMovies);
  });
  
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

  
// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });