from flask import Flask
from sqlalchemy import inspect
from datetime import date
from models import Movies,db


app = Flask(__name__) #cretae instance of flask

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app) # Initialize the db with the app


with app.app_context():
    db.drop_all()   # This will drop all tables 
    db.create_all() # This will recreate them- SQLAlchemy will look at the imported models and create tables

    movie1 = Movies(title="Inception",genre="Sci-fi",release_date=date(2010,7,16), rating=8.8)
    db.session.add(movie1)
    db.session.commit()

    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    print(f"Tables created: {tables}")

    movies = Movies.query.all()
    print(f"Movies in the database: {[movie.title for movie in movies]}")

@app.route('/')
def index():
    m = Movies.query.all()
    return str(m)

if __name__=='__main__':
    app.run(debug=True)


