CREATE TABLE Genres (
  GenreID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Description varchar(1000)
);

CREATE TABLE Directors (
  DirectorID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Bio varchar(1000),
  Birthyear date,
  Deathyear date
);

CREATE TABLE Movies (
  MovieId serial PRIMARY KEY,
  Title varchar(50) NOT NULL,
  Description varchar(1000),
  DirectorID integer NOT NULL,
  GenreID integer NOT NULL,
  ImageURL varchar(300),
  Featured boolean,
  CONSTRAINT GenreKey FOREIGN KEY (GenreID)
    REFERENCES Genres (GenreID),
  CONSTRAINT DirectorKey FOREIGN KEY (DirectorID)
    REFERENCES Directors (DirectorID)
);

  
CREATE TABLE Users (
  UserID serial PRIMARY KEY,
  Username varchar(50) NOT NULL,
  Password varchar(50) NOT NULL,
  Email varchar(50) NOT NULL,
  Birth_date date
);

CREATE TABLE Favourite_Movies (
  FavouriteMovieID serial PRIMARY KEY,
  UserID integer,
  MovieID integer,
  CONSTRAINT UserKey FOREIGN KEY (UserID)
    REFERENCES Users(UserID),
  CONSTRAINT MovieKey FOREIGN KEY (MovieID)
    REFERENCES Movies(MovieID)
);

INSERT INTO Directors(Name, Bio,Birthyear,Deathyear) 
VALUES('Spike Lee',
	   'Spike Lee was born Shelton Jackson Lee on March 20, 1957, in Atlanta, Georgia. At a very young age, he moved from pre-civil rights Georgia, to Brooklyn, New York. Lee came from artistic, education-grounded background; his father was a jazz musician, and his mother, a schoolteacher. ',
	   '01/01/1957',
	   NULL);

INSERT INTO Directors(Name, Bio,Birthyear,Deathyear) 
VALUES('Francis Ford Coppola',
	   'Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family. His father, Carmine Coppola, was a composer and musician. His mother, Italia Coppola (née Pennino), had been an actress. Francis Ford Coppola graduated with a degree in drama from Hofstra University',
	   '01/01/1939',
	   NULL);
	   
INSERT INTO Directors(Name, Bio,Birthyear,Deathyear) 
VALUES('Peter Jackson',
	   'Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously.',
	   '01/01/1961',
	   NULL);
	   
INSERT INTO Directors(Name, Bio,Birthyear,Deathyear) 
VALUES('Quentin Tarantino',
	   'Quentin Jerome Tarantino was born in Knoxville, Tennessee.',
	   '01/01/1963',
	   NULL);
	   
INSERT INTO Directors(Name, Bio,Birthyear,Deathyear) 
VALUES('Sidney Lumet',
	   'Sidney Lumet was a master of cinema, best known for his technical knowledge and his skill at getting first-rate performances from his actors -- and for shooting most of his films in his beloved New York',
	   '01/01/1924',
	   NULL);
	   
INSERT INTO Directors(Name, Bio,Birthyear,Deathyear) 
VALUES('Sergio Leone',
	   'Sergio Leone was virtually born into the cinema - he was the son of Roberto Roberti (A.K.A. Vincenzo Leone), one of Italys cinema pioneers, and actress  Bice Valerian.',
	   '01/01/1929',
	   NULL);
	   
INSERT INTO Directors(Name, Bio,Birthyear,Deathyear) 
VALUES('Christopher Nolan',
	   'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.',
	   '01/01/1970',
	   NULL);

INSERT INTO Users(Username, Password,Email,Birth_date) 
VALUES('Goku','sayain','goku@dragonball.com','01/01/1960');

INSERT INTO Users(Username, Password,Email,Birth_date) 
VALUES('Gohan','masenko','gohan@dragonball.com','01/01/1990');

INSERT INTO Users(Username, Password,Email,Birth_date) 
VALUES('Goten','supersayain','goten@dragonball.com','01/01/1997');

INSERT INTO Genres(Name, Description) 
VALUES('Thriller', 
	   'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves 
	   excitement and suspense in the audience.');
	   
INSERT INTO Genres(Name, Description) 
VALUES('Crime Drama', 
	   'Crime drama is a sub-genre of drama that focuses on crimes, the criminals that commit them and the police that catch them');

INSERT INTO Genres(Name, Description) 
VALUES('Action Adventure Drama', 
	   'featuring characters involved in exciting and usually dangerous activities and adventures');  

INSERT INTO Genres(Name, Description) 
VALUES('Biography Drama History', 
	   'A Biography drama incorporates dramatic elements into a biographical film. These films differ from Historical and “based in truth” films because they specifically chronicle the life of a person or a group of people');  

INSERT INTO Genres(Name, Description) 
VALUES('Adventure Western', 
	   'Should contain numerous scenes and/or a narrative where the portrayal is similar to that of frontier life in the American West during 1600s to contemporary times. ');  
   
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('Inside Man',
	   'A police detective, a bank robber, and a high-power broker enter high-stakes negotiations after the criminals brilliant heist spirals into a hostage situation.',
	   1,
	   1,
	   'https://www.imdb.com/title/tt0454848/mediaviewer/rm4151512576/?ref_=tt_ov_i',
	   True);
	   
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('The Godfather',
	   'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son',
	   2,
	   2,
	   'https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i',
	   True);
	   
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('The Godfather II',
	   'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
	   2,
	   2,
	   'https://www.imdb.com/title/tt0071562/mediaviewer/rm4159262464/?ref_=tt_ov_i',
	   True);

INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('The Lord of the Rings: The Return of the King',
	   'Gandalf and Aragorn lead the World of Men against Saurons army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
	   3,
	   3,
	   'https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i',
	   True);
	   

	   
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('Pulp Fiction',
	   'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
	   2,
	   4,
	   'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i',
	   True);
	   
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('12 Angry Men',
	   'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
	   2,
	   4,
	   'https://www.imdb.com/title/tt0050083/mediaviewer/rm2927108352/?ref_=tt_ov_i',
	   True);
	   
	   
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('Schindlers List',
	   'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
	   4,
	   5,
	   'https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/?ref_=tt_ov_i',
	   True);

INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('The Good, the Bad and the Ugly',
	   'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
	   5,
	   6,
	   'https://www.imdb.com/title/tt0060196/mediaviewer/rm1383786241/?ref_=tt_ov_i',
	   True);

INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('The Dark Knight',
	   'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
	   2,
	   7,
	   'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i',
	   True);
	   
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) 
VALUES('The Lord of the Rings: The Fellowship of the Ring',
	   'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
	   3,
	   3,
	   'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976/?ref_=tt_ov_i',
	   True);
	   

INSERT INTO Favourite_Movies(UserID, MovieID) 
VALUES(1,1);

INSERT INTO Favourite_Movies( UserID, MovieID) 
VALUES(1,2);

INSERT INTO Favourite_Movies(UserID, MovieID) 
VALUES(2,2);

INSERT INTO Favourite_Movies(UserID, MovieID) 
VALUES(2,3);

INSERT INTO Favourite_Movies( UserID, MovieID) 
VALUES(3,2);

INSERT INTO Favourite_Movies(UserID, MovieID) 
VALUES(3,8);

INSERT INTO Favourite_Movies(UserID, MovieID) 
VALUES(3,5);