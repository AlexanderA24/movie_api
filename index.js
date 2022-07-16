const express = require('express'), morgan = require('morgan'), fs = require('fs'), path = require('path'),
bodyParser = require('body-parser'), mongoose = require('mongoose'), Models = require('./models.js');;

const Movies = Models.Movie;
const Users = Models.User;

const app = express();
// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})


let     movies = [
    {
      title: 'The Shawshank Redemptio',
      descritption : 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      director: 'Frank Darabont',
      imageURL: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i',
      genre: 'Drama'
    },
    {
        title: 'The Godfather',
        descritption : 'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
        director: 'Francis Ford Coppola',
        imageURL: 'https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i',
        genre:'Crime Drama'
    },
    {
        title: 'The Dark Knight',
        descritption : 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        director: 'Christopher Nolan',
        imageURL: 'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i',
        genre: 'Action Crime Drama'
    },
    {
        title: 'The Godfather Part II',
        descritption : 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
        director: 'Francis Ford Coppola',
        imageURL: 'https://www.imdb.com/title/tt0071562/mediaviewer/rm4159262464/?ref_=tt_ov_i',
        genre: 'Crime Drama'
    },
    {
        title: '12 Angry Men',
        descritption : 'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
        director: 'Sidney Lumet',
        imageURL: 'https://www.imdb.com/title/tt0050083/mediaviewer/rm2927108352/?ref_=tt_ov_i',
        genre: 'Crime Drama'
    },
    {
        title: 'Schindlers List',
        descritption : 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
        director: 'Steven Spielberg',
        imageURL: 'https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/?ref_=tt_ov_i',
        genre: 'Biography Drama History'
    },
    {
        title: ' The Lord of the Rings: The Return of the King',
        descritption : 'Gandalf and Aragorn lead the World of Men against Saurons army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
        director: ' Peter Jackson',
        imageURL: 'https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i',
        genre: 'Action Adventure Drama'
    },
    {
        title: 'Pulp Fiction',
        descritption : 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        director: 'Quentin Tarantino',
        imageURL: 'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i',
        genre: 'Crime Drama'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        descritption : 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
        director: 'Peter Jackson',
        imageURL: 'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/?ref_=tt_ov_i',
        genre: 'Action Adventure Drama'
    },
    {
        title: 'The Good, the Bad and the Ugly',
        descritption : 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
        director: 'Sergio Leone  ',
        imageURL: 'https://www.imdb.com/title/tt0060196/mediaviewer/rm1383786241/?ref_=tt_ov_i',
        genre: 'Adventure Western'
    }
  ];

  let directors = [
    {
        name:'Frank Darabont',
        bio:'Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. ',
        birthYear:'1959',
        deathYear:''
        
    },
    {
        name:'Francis Ford Coppola',
        bio:' Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family. His father, Carmine Coppola, was a composer and musician. His mother, Italia Coppola (née Pennino), had been an actress. Francis Ford Coppola graduated with a degree in drama from Hofstra University',
        birthYear:'1939',
        deathYear:''
        
    },
    {
        name:'Peter Jackson',
        bio:'Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously.',
        birthYear:'1961',
        deathYear:''
        
    }

  ]

  let users = [ 
    {
        id:1,
        name:'Goku',
        username: 'Goku2022',
        favourites:
            [
                'Pulp Fiction', 'Schindlers List', '12 Angry Men'
            ]
    },

    {
        id:2,
        name:'Gohan',
        username: 'Gohan2022',
        favourites:
            [
                'The Lord of the Rings: The Fellowship of the Ring', 'Schindlers List'
            ]
    }
  ]

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
    res.json(movies);
  });

// Return data about a single movie
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
  });

// Get all directors
app.get('/directors', (req, res) => {
    res.json(directors);
  });

// Return data about a single director
app.get('/directors/:name', (req, res) => {
    res.json(directors.find((director) =>
    { return director.name === req.params.name }));
  });

  // Update user info
app.put('/users/:name', (req, res) => {
  res.send('Successful Update request updating username');
});


  // Add a new user
app.post('/users', (req, res) => {
    res.send('Successful post request adding new user');
  });

   // Add a movie to list of favourites
app.post('/users/:name/:movies/:favourites', (req, res) => {
  res.send('Successful post adding movies to list of favourites');
});

// Delete movie from list of favourites
app.delete('/users/:name/:movies/:favourites', (req, res) => {
  res.send('Successfully deleted movie from list of favourites');
});

// Allow a user to de-register
app.delete('/users', (req, res) => {
  res.send('Successfully deregistered');
});

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something broke!');
});

  
// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });