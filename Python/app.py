from flask import Flask, render_template, request
from sqlalchemy import inspect
from datetime import date
from models import Users,Movies,db


app = Flask(__name__) #cretae instance of flask

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app) # Initialize the db with the app

def initial_data():
    if not Movies.query.all():
        movie1 = Movies(title="Inception",genre="Sci-fi",release_date=date(2010,7,16), rating=8.8)
        db.session.add(movie1)
        db.session.commit()

    if not Users.query.all():
        user1 = Users(username="jrgopika", password="123456")
        db.session.add(user1)
        db.session.commit()


with app.app_context():
    db.drop_all()   # This will drop all tables 
    db.create_all() # This will recreate them- SQLAlchemy will look at the imported models and create tables

    initial_data()

    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    print(f"Tables created: {tables}")

    movies = Movies.query.all()
    print(f"Movies in the database: {[movie.title for movie in movies]}")

@app.route('/')
def index():
    # m = Movies.query.all()
    # return str(m)
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    user = Users.query.filter_by(username=username).first()
    print(user)
    if user and user.password == password:
        return "success"
    else:
        return "invalid"

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    cpassword = request.form['cpassword']

    if password!=cpassword:
        return "Passwords do not match"

    ex_user = Users.query.filter_by(username = username).first()
    if ex_user:
        return "User already exists"
    
    new_user = Users(username=username, email=email,password=password)
    db.session.add(new_user)
    db.session.commit()

    return "success"


if __name__=='__main__':
    app.run(debug=True)


