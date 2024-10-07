from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Initialize the SQLAlchemy object


class Movies(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(100))
    release_date = db.Column(db.Date)
    rating = db.Column(db.Float)

    def __repr__(self):
        return f"movie with title {self.title}" 
    

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(200))
    password = db.Column(db.String(100))

    def __repr__(self):
        return f"user {self.username}" 

# class Watchlist(db.Model):
#     _tablename_ = 'watchlist'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
#     added_at = db.Column(db.DateTime, default=db.func.current_timestamp())

#     # Relationship with Users and Movies tables
#     user = db.relationship('Users', backref=db.backref('watchlists', lazy=True))
#     movie = db.relationship('Movies', backref=db.backref('watchlists', lazy=True))

#     def _repr_(self):
#         return f"<Watchlist for user {self.user.username}, movie {self.movie.title}>"

# class Genre(db.Model):
#     _tablename_ = 'genres'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False, unique=True)

#     def _repr_(self):
#         return f"<Genre {self.name}>"

# class MovieGenres(db.Model):
#     _tablename_ = 'movie_genres'
#     id = db.Column(db.Integer, primary_key=True)
#     movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
#     genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=False)

#     # Relationship with Movies and Genres tables
#     movie = db.relationship('Movies', backref=db.backref('movie_genres', lazy=True))
#     genre = db.relationship('Genre', backref=db.backref('movie_genres', lazy=True))

#     def _repr_(self):
#         return f"<MovieGenres movie_id={self.movie_id}, genre_id={self.genre_id}>"