const express = require('express'),
 morgan = require('morgan'), 
 fs = require('fs'), 
 path = require('path'),
bodyParser = require('body-parser'), 
mongoose = require('mongoose'), 
Models = require('./models.js');const { rest } = require('lodash');
;

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
const {ObjectId} = require("mongoose").Types;
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('debug', true);
  // GET requests


app.use('/public',express.static(__dirname + '/public'));

app.use(morgan('common'));

app.use(bodyParser.json());

app.get('/', (err,req, res, next) => {
    res.send('Welcome to the movie recommender!');
  });
  
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
// Get all movies5
app.get('/movies', (req, res) => {
    Movies.find()
      .then(Movies => {
        res.status(201).json(Movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// Return data about a single movie
app.get('/movies/:title', (req, res) => {
  console.log(req.params.title)
  Movies.findOne({ title : req.params.title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

  // Return data about a single user
  app.get('/users/:username', (req, res) => {
    Users.findOne({ username: req.params.username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// Return data about a single  genre
app.get('/movies/genre/:name',  (req, res) => {
  Movies.findOne({ 'genre.name': req.params.name }, {_id: 0,"genre":1})
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Return data about a single director
app.get('/movies/director/:name',  (req, res) => {
  Movies.findOne({ 'director.name': req.params.name }, {_id: 0,"director":1})
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


  // Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/

app.put('/users/:username', (req, res) => {
  console.log(req.body)
  Users.findOneAndUpdate({ username: req.params.username}, {
$set:
    {
      username : req.body.username,
      password: req.body.password,
      email: req.body.email,
      birth_date: req.body.birth_date
    }
  },
  
  
  {new: true}, // This line makes sure that the updated document is returned

    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
        }
      });
    });

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users', (req, res) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + ' already exists');
      } else {
        Users
          .create({
         
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birth_date: req.body.birth_date
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Add a movie to list of favourites
app.post('/users/:username/favourite_movies/:MovieID', (req, res) => {
  console.log(req.params.MovieID)
  Users.findOneAndUpdate({ Username: req.params.username }, {
    $push: { favourite_movies:mongoose.Types.ObjectId(req.params.MovieID.trim())} 
  }, 
  {new: true},
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// Delete movie from list of favourites
app.delete('/users/:username/favourite_movies/:MovieID', (req, res) => {
  console.log(req.params.MovieID)
  Users.findOneAndUpdate({ Username: req.params.username }, {
    $pull: { favourite_movies:mongoose.Types.ObjectId(req.params.MovieID.trim())} 
  }, 
  {new: true},
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// Allow a user to de-register
app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({username: req.params.username})
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.username + ' was not found');
    } else {
      res.status(200).send(req.params.username + ' was deleted.')
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

  
// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });