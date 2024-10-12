from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String

db = SQLAlchemy()  # Initialize the SQLAlchemy object


class Movies(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date)
    user_rating = db.Column(db.Float)

    original_language = db.Column(db.String(50))
    overview = db.Column(db.String(255))
    production_company = db.Column(db.String(255))
    runtime = db.Column(db.Integer)
    tagline = db.Column(db.String(255))
    rating = db.Column(db.Float)
    credits = db.Column(db.String(255))
    poster_path = db.Column(db.String(255))
    backdrop_path = db.Column(db.String(255))

    # link Movies and the MovieGenres model
    movie_genres = db.relationship('MovieGenres', backref='movie', lazy=True)
    # relationship - Movie class will have access to related instances of the MovieGenres model
    
    # backref - every MovieGenres instance will have a .movie attribute, which will refer to the Movie object it is related to.

    # You can access a movie’s genres from the Movie instance.
    # You can also access the associated movie from a MovieGenres instance via the .movie attribute.

    # From the Movies side: You can access all genres related to a specific movie using movie.movie_genres
    # From the MovieGenres side: You can access the related movie using movie_genres.movie (thanks to backref='movie')

    def __repr__(self):
        return f"movie with title {self.title}" 
    


class Genre(db.Model):
    __tablename__ = 'genres'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    movie_genres = db.relationship('MovieGenres', backref='genre', lazy=True)
    # genre.movie_genre - all movies associated to a genre

    def _repr_(self):
        return f"<Genre {self.name}>"

class MovieGenres(db.Model):
    __tablename__ = 'movie_genres'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=False)

    # movie_genre.movie_id - You can access the related movie (thanks to backref='movie')
    # movie_genre.genre_id - You can access the related genre

    def _repr_(self):
        return f"<MovieGenres movie_id={self.movie_id}, genre_id={self.genre_id}>"
    

# # Query a specific movie and get all related genres through the relationship
    # movie = Movie.query.filter_by(title="Inception").first()
    # for genre in movie.movie_genres:
    #     print(genre.genre_id) 

# # Access the related movie from the MovieGenres instance
# movie_genre = MovieGenres.query.first()
# print(movie_genre.movie.title)



class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(200))
    password = db.Column(db.String(100))
    role = db.Column(db.String(100))

    def __repr__(self):
        return f"user {self.username}" 



class Watchlist(db.Model):
    _tablename_ = 'watchlist'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)

    # Relationship with Users and Movies tables
    user = db.relationship('Users', backref=db.backref('watchlists', lazy=True))
    movie = db.relationship('Movies', backref=db.backref('watchlists', lazy=True))

    

    def _repr_(self):
        return f"<Watchlist for user {self.user.username}, movie {self.movie.title}>"
    




class ImportStatus(db.Model):
    id = Column(Integer, primary_key=True)
    import_type = Column(String, unique=True)  # e.g., 'movies_imported'
    status = Column(Integer)  # 0 = not imported, 1 = imported