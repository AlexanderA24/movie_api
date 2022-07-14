

COPY (SELECT row_to_json(results)
FROM (
SELECT movieid,title,description,imageurl, 

    (
      SELECT array_to_json(array_agg(g))
      FROM (
        SELECT genreid,name,description
        FROM genres
        WHERE movies.genreid = genres.genreid
      ) g
    ) AS genre,
	
	   (
      SELECT array_to_json(array_agg(d))
      FROM (
        SELECT directorid,name,bio,birthyear,deathyear
        FROM directors
        WHERE movies.directorid = directors.directorid
      ) d
    ) AS director
	
FROM movies) results) TO 'C:\Users\Admin\Documents\mongodb\movies.json' WITH (FORMAT text, HEADER FALSE);