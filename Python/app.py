from flask import Flask, render_template, request,redirect, session, url_for, jsonify, abort
from flask_cors import CORS
from sqlalchemy import inspect
from datetime import date
from flask_migrate import Migrate
from models import Users,Movies,Genre,MovieGenres,db


app = Flask(__name__) #cretae instance of flask
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']='pacman'


db.init_app(app) # Initialize the db with the app
migrate = Migrate(app,db)

def initial_data():
    if not Movies.query.all():
        movie1 = Movies(title="Inception",release_date=date(2010,7,16), rating=8.8)
        db.session.add(movie1)
        db.session.commit()

    if not Users.query.all():
        user1 = Users(username="jrgopika", password="123456")
        db.session.add(user1)
        db.session.commit()

    db.create_all()

def initial_genre():
    genre1 = Genre(name="Sci-fi")
    db.session.add(genre1)
    db.session.commit()
    
    movie = Movies.query.filter_by(title="Inception").first()

    mg1 = MovieGenres(movie_id=movie.id, genre_id=genre1.id)
    db.session.add(mg1)
    db.session.commit()
    print(f"Movie '{movie.title}' has been linked to genre '{genre1.name}'.")


with app.app_context():
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()

    if not tables:
        initial_data()

    if not MovieGenres.query.all():
        initial_genre()


    print(f"Tables created: {tables}")

    movies = Movies.query.all()
    print(f"Movies in the database: {[movie.title for movie in movies]}")

@app.route('/')
def index():
    # m = Movies.query.all()
    # return str(m)
    print(session)
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('index.html', username=session['username'])



    
@app.route('/login', methods=['POST'])
def login():
    email= request.json['email']
    password = request.json['password']

    user = Users.query.filter_by(email=email).first()

    if user and user.password == password:
        session['user_id'] = user.id
        session['email'] = user.email
        return jsonify({
            "id": user.id,
            "email": user.email,
            "name":user.name
        })
    else:
        return jsonify({"error": "Unauthorized"}), 401
    
@app.route('/@me', methods=['GET'])
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error":"Unauthorized"}), 401
    
    user = Users.query.filter_by(id = user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email,
        "name":user.name
    })


#a cookie will be set when logging in, /@me checks the cookie and return info

@app.route('/signup', methods=['POST'])
def signup():
    name= request.json['name']
    email = request.json['email']
    password = request.json['password']
    cpassword = request.json['cpassword']

    if password!=cpassword:
        return "Passwords do not match"

    ex_user = Users.query.filter_by(email = email).first()
    
    if ex_user:
        return jsonify({"error": "User already exists"}), 409
    
    new_user = Users(name=name, email=email,password=password,role='user')
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id 
    session['email'] = new_user.email


    # return redirect(url_for('index'))
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "name":new_user.name
    })


@app.route('/logout')
def logout():
    session.clear()
    # return redirect(url_for('login'))
    return jsonify({"message": "Logged out success"})

@app.route('/view_session')
def view_session():
    if 'user_id' in session:
        return f"User ID: {session['user_id']}, Username: {session.get('username')}"
    else:
        return "No user is currently logged in."
    

#table functions
@app.route('/view_users')
def view_users():
    users = Users.query.all()
    u_list=[]
    
    for user in users:
        u_list.append({
            "id": user.id,
            "username": user.username,
        })

    return jsonify(u_list)


@app.route('/view_movies')
def view_movies():
    movies = Movies.query.all()
    m_list=[]
    
    for movie in movies:
        genre_ids = [genre.genre_id for genre in movie.movie_genres] # returns all genre ids associated with the movie
        
        genres = Genre.query.filter(Genre.id.in_(genre_ids)).all() # in_() - checks if the Genre.id is within the list of genre_ids
        genre_names = [g.name for g in genres]
        m_list.append({
            "id": movie.id,
            "title": movie.title,
            "release_date": movie.release_date.isoformat(),
            "genres":genre_names,
            "rating": movie.rating
        })

    return jsonify(m_list)


@app.route('/add_movie',methods=['POST'])
def add_movie():
    title = request.json['title']
    genres= request.json['genres']
    release_date=date.fromisoformat(request.json['release_date']) #{"release_date": "2014-11-07"} to datetime.date(2014, 11, 7) python object
    rating= request.json['rating']

    existing_movie = Movies.query.filter_by(title=title, release_date=release_date).first()

    if existing_movie:
        return jsonify({"message":"Movie already exists"}),409

    new_movie=Movies(title=title,release_date=release_date, rating=rating)
    db.session.add(new_movie)
    db.session.commit()

    for g in genres:
        genre=Genre.query.filter_by(name=g).first()
        if not genre:
            genre=Genre(name=g)
            db.session.add(genre)
            db.session.commit()

        mg = MovieGenres(movie_id=new_movie.id, genre_id=genre.id)
        db.session.add(mg)
    
    db.session.commit()

    return jsonify({"message": f"Movie {new_movie.title} added"})


@app.route('/delete_movie/<int:id>')
def delete_movie(id):
    movie = Movies.query.filter_by(id=id).first()
    if not movie:
        return jsonify({"error":"Movie not found"}),404
    

    MovieGenres.query.filter(MovieGenres.movie_id == id).delete()
    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message":"Movie deleted"}),200


@app.route('/update_movie/<int:id>',methods=['POST'])
def update_movie(id):
    movie = Movies.query.filter_by(id=id).first()
    if not movie:
        return jsonify({"error":"Movie not found"}),404
    
    data = request.get_json()
    movie.title = data.get('title', movie.title)
    movie.release_date = date.fromisoformat(data.get('release_date')) if data.get('release_date') else movie.release_date
    movie.rating = data.get('rating', movie.rating)
    new_genres = data.get('genres',[])  #either data send or []  

    #fetch already existing genres from genre db
    ex_genres = Genre.query.filter(Genre.name.in_(new_genres)).all()
    ex_gids = [g.id for g in ex_genres]

    #fetch genres of the movie
    current_movie_genres_objects = MovieGenres.query.filter(MovieGenres.movie_id == id).all()
    current_movie_gids = [mg.genre_id for mg in current_movie_genres_objects]

    #delete 
    for mg in current_movie_genres_objects:
        if mg.genre_id not in ex_gids:
            db.session.delete(mg)
    
    #add
    for g in ex_genres:
        if g.id not in current_movie_gids:
            new_mg = MovieGenres(movie_id = id, genre_id = g.id)
            db.session.add(new_mg)
            
    #add - new genres
    for genre_name in new_genres:
        if genre_name not in [g.name for g in ex_genres]: 
            new_genre = Genre(name=genre_name) 
            db.session.add(new_genre) 
            db.session.flush()  

            new_mg = MovieGenres(movie_id=id, genre_id=new_genre.id)
            db.session.add(new_mg)
            
    db.session.commit()
    return jsonify({"message": f"Movie {movie.title} modified"}),200

    

if __name__=='__main__':
    app.run(debug=True)




# flask db init - initialize , only do first time
#- do this everytime you update tables
# flask db migrate
# flask db upgrade