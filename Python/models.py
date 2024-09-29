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
    