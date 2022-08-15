const express = require('express'),
 morgan = require('morgan'), 
 fs = require('fs'), 
 path = require('path'),
bodyParser = require('body-parser'), 
mongoose = require('mongoose'), 
Models = require('./models.js');const { rest } = require('lodash');

;

const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// const cors = require('cors');

// let allowedOrigins = ['http://localhost:8080', '82.11.35.21/32'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//       let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//       return callback(new Error(message ), false);
//     }
//     return callback(null, true);
//   }
// }));

/* rest of code goes here*/

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
const {ObjectId} = require("mongoose").Types;

// mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://alexander:Xander07@aamongodb.1ekxf91.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("myFlixDB").collection("users");
//   // perform actions on the collection object
//   client.close();
// });

// const db = process.env.CONNECTION_URI;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//     });
//     console.log("MongoDB is Connected...");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(process.env.CONNECTION_URI);


// mongoose.connect(process.env.CONNECTION_URI, (err) => {
//   if (err) throw err;
//   console.log('Connected to MongoDB!!!');
// }); 

mongoose.set('debug', true);
  // GET requests


app.use('/public',express.static(__dirname + '/public'));

app.use(morgan('common'));

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to MyFlix!');
});
  
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
// Get all movies
app.get('/movies', passport.authenticate('jwt', { session: false}), (req, res) => {
    Movies.find()
      .then(Movies => {
        res.status(201).json(Movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  // Get all movies
app.get('/users', (req, res) => {
  console.log(Users.find()),
  Users.find()
    .then(Users => {
      res.status(201).json(Users);
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

app.post('/users',
  //Validatin logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min:5}) which means
  //mininum value of 5 characters are only allowed
  [
    check('username', 'Username is required').isLength({ min: 5 }),
    check(
      'username','Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail(),
  ],
  (req, res) => {
    //check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashPassword = Users.hashPassword(req.body.password);
    Users
      .findOne({ username: req.body.username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //if the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              username: req.body.username,
              password: hashPassword,
              email: req.body.email,
              birth_date: req.body.birth_date,
            })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error:' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error:' + error);
      });
  }
);

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

app.use(express.static('public'));

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

  
// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});