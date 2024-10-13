import pandas as pd
from flask import Flask, render_template, request,redirect, session, url_for, jsonify, abort
from flask_cors import CORS
from sqlalchemy import inspect,func
from datetime import date,datetime,timedelta
from flask_migrate import Migrate
from models import Users,Movies,Genre,MovieGenres,Watchlist,ImportStatus,db
import sqlalchemy



app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']='pacman'


db.init_app(app) 
migrate = Migrate(app,db)

csv_file = "C:\\Users\\hp\\Downloads\\last.csv"



#df = pd.read_csv(csv_file, usecols=[
    #'title', 'genres', 'original_language', 'overview', 'production_companies', 
    #'release_date','runtime', 'tagline', 'vote_average', 'credits', 'poster_path', 'backdrop_path'
#], encoding='latin1') 


def import_movies():
    # Check if movies have already been imported
    import_status = ImportStatus.query.filter_by(import_type='movies_imported').first()
    
    if import_status and import_status.status == 1:
        print("Movies have already been imported.")
        return  # Exit if movies are already imported

    for index, row in df.iterrows():
        print(f"Processing row {index}: {row.to_dict()}")
        
        existing_movie = Movies.query.filter(
            Movies.title == row['title'].strip(),
            Movies.release_date == datetime.strptime(row['release_date'], "%d-%m-%Y").date()

        ).first()

        if not existing_movie:
            release_date = datetime.strptime(row['release_date'], "%d-%m-%Y").date()  # Adjust format
            new_movie = Movies(
                title=row['title'].strip(),
                release_date=release_date,
                original_language=row['original_language'],
                overview=row['overview'],
                production_company=row['production_companies'],
                runtime=int(row['runtime']),
                tagline=row['tagline'],
                rating=float(row['vote_average']),
                credits=row['credits'],
                poster_path=row['poster_path'],
                backdrop_path=row['backdrop_path']
            )
            db.session.add(new_movie)
            db.session.flush()

            genre_value = row['genres']
            if isinstance(genre_value, str):
                genre_list = genre_value.split('-')
            else:
                genre_list = []

            for genre_name in genre_list:
                genre_name = genre_name.strip()
                genre = Genre.query.filter(Genre.name.ilike(genre_name)).first()
                if not genre:
                    genre = Genre(name=genre_name)
                    db.session.add(genre)
                    db.session.flush()

                movie_genre = MovieGenres(movie_id=new_movie.id, genre_id=genre.id)
                db.session.add(movie_genre)

            db.session.commit()
        else:
            print(f"Movie already exists: {existing_movie.title} ({existing_movie.release_date})")

    # Set the import status to indicate that movies have been imported
    if not import_status:
        import_status = ImportStatus(import_type='movies_imported', status=1)
        db.session.add(import_status)
    else:
        import_status.status = 1
    db.session.commit()



def initial_data():
    db.create_all()

    if not db.session.query(ImportStatus).first():
        db.session.add(ImportStatus(import_type='movies_imported', status=0))  # Set initial status to not imported
        db.session.commit()


with app.app_context():
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    import_movies()

    if not tables:
        initial_data()

    print(f"Tables created: {tables}")


@app.route('/')
def index():
    print(session)
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('index.html', username=session['username'])



    
@app.route('/login', methods=['POST'])
def login():
    email= request.json['email'].lower()
    password = request.json['password']
    role = request.json['role'].lower()

    user = Users.query.filter(Users.email.ilike(email)).first()

    if user and user.password == password and user.role.lower() == role:
        session['user_id'] = user.id
        session['email'] = user.email
        return jsonify({
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role
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
    email = request.json['email'].lower()
    password = request.json['password']
    cpassword = request.json['cpassword']
    role=request.json['role'].lower()

    if password!=cpassword:
        return "Passwords do not match"

    ex_user = Users.query.filter(Users.email.ilike(email)).first()
    
    if ex_user:
        return jsonify({"error": "User already exists"}), 409
    
    new_user = Users(name=name, email=email,password=password,role=role)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id 
    session['email'] = new_user.email

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "name":new_user.name,
        "role":new_user.role
    })


@app.route('/logout')
def logout():
    session.clear()
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
            "original_language": movie.original_language, 
            "overview": movie.overview,
            "production_company": movie.production_company,
            "release_date": movie.release_date.isoformat(), 
            "runtime": movie.runtime,
            "rating": movie.rating,
            "credits": movie.credits,
            "poster_path": movie.poster_path,
            "backdrop_path": movie.backdrop_path,
            "genres" : genre_names
        })

    return jsonify(m_list)



@app.route('/movies/genre/<genre_name>', methods=['GET'])
def get_movies_by_genre(genre_name):
    limit = request.args.get('limit', type=int) #the limit from query params if provided
    movies = Movies.query.join(MovieGenres).join(Genre).filter(Genre.name.ilike(genre_name))

    if limit:
        movies = movies.limit(limit) 

    movies = movies.all()  # Fetch all movies after applying any limit

    m_list=[]

    for movie in movies:
        genre_ids =  [g.genre_id for g in movie.movie_genres]
        genres = Genre.query.filter(Genre.id.in_(genre_ids)).all()
        genre_names = [g.name for g in genres]

        m_list.append({
            "id": movie.id,
            "title": movie.title, 
            "original_language": movie.original_language, 
            "overview": movie.overview,
            "production_company": movie.production_company,
            "release_date": movie.release_date.isoformat(), 
            "runtime": movie.runtime,
            "rating": movie.rating,
            "credits": movie.credits,
            "poster_path": movie.poster_path,
            "backdrop_path": movie.backdrop_path,
            "genres" : genre_names
            })
        
    return jsonify(m_list)


@app.route('/must_watch',methods=['GET'])
def must_watch():
    # movies= Movies.query.join(MovieGenres).join(Genre).filter(Movies.rating >= 8.0).filter(~Genre.name == 'Documentary').order_by(Movies.rating.desc()).limit(8).all()
    
    documentary_movies = db.session.query(MovieGenres.movie_id).join(Genre).filter(Genre.name == 'Documentary').subquery()
    # Fetch movies with rating >= 8 excluding documentary movies
    movies = Movies.query.filter(Movies.rating >= 8) \
        .filter(~Movies.id.in_(documentary_movies)) \
        .order_by(Movies.rating.desc()) \
        .limit(20) \
        .all()
    
    m_list=[]

    for movie in movies:
        genre_ids =  [g.genre_id for g in movie.movie_genres]
        genres = Genre.query.filter(Genre.id.in_(genre_ids)).all()
        genre_names = [g.name for g in genres]

        m_list.append({
            "id": movie.id,
            "title": movie.title, 
            "original_language": movie.original_language, 
            "overview": movie.overview,
            "production_company": movie.production_company,
            "release_date": movie.release_date.isoformat(), 
            "runtime": movie.runtime,
            "rating": movie.rating,
            "credits": movie.credits,
            "poster_path": movie.poster_path,
            "backdrop_path": movie.backdrop_path,
            "genres" : genre_names
            })
        
    return jsonify(m_list)


@app.route('/new_releases',methods=['GET'])
def new_releases():
    movies= Movies.query.order_by(Movies.release_date.desc()).limit(20).all()
    m_list=[]

    for movie in movies:
        genre_ids =  [g.genre_id for g in movie.movie_genres]
        genres = Genre.query.filter(Genre.id.in_(genre_ids)).all()
        genre_names = [g.name for g in genres]

        m_list.append({
            "id": movie.id,
            "title": movie.title, 
            "original_language": movie.original_language, 
            "overview": movie.overview,
            "production_company": movie.production_company,
            "release_date": movie.release_date.isoformat(), 
            "runtime": movie.runtime,
            "rating": movie.rating,
            "credits": movie.credits,
            "poster_path": movie.poster_path,
            "backdrop_path": movie.backdrop_path,
            "genres" : genre_names
            })
        
    return jsonify(m_list)



@app.route('/random_movies',methods=['GET'])
def random_movies():  
    documentary_movies = db.session.query(MovieGenres.movie_id).join(Genre).filter(Genre.name == 'Documentary').subquery()
    movies = Movies.query.filter(~Movies.id.in_(documentary_movies)).order_by(func.random()).limit(20).all()
    
    m_list=[]

    for movie in movies:
        genre_ids =  [g.genre_id for g in movie.movie_genres]
        genres = Genre.query.filter(Genre.id.in_(genre_ids)).all()
        genre_names = [g.name for g in genres]

        m_list.append({
            "id": movie.id,
            "title": movie.title, 
            "original_language": movie.original_language, 
            "overview": movie.overview,
            "production_company": movie.production_company,
            "release_date": movie.release_date.isoformat(), 
            "rating": movie.rating,
            "runtime": movie.runtime,
            "credits": movie.credits,
            "poster_path": movie.poster_path,
            "backdrop_path": movie.backdrop_path,
            "genres" : genre_names
            })
        
    return jsonify(m_list)



@app.route('/movies/search', methods=['GET'])
def search_movies():
    query = request.args.get('query')
    # movies = Movies.query.filter(Movies.title.ilike(f'%{query}%')).all()
    movies = Movies.query.join(MovieGenres).join(Genre).filter(Movies.title.ilike(f'%{query}%')).all()
    m_list=[]

    for movie in movies:
        genre_ids =  [g.genre_id for g in movie.movie_genres]
        genres = Genre.query.filter(Genre.id.in_(genre_ids)).all()
        genre_names = [g.name for g in genres]

        m_list.append({
            "id": movie.id,
            "title": movie.title, 
            "original_language": movie.original_language, 
            "overview": movie.overview,
            "production_company": movie.production_company,
            "release_date": movie.release_date.isoformat(), 
            "runtime": movie.runtime,
            "rating": movie.rating,
            "credits": movie.credits,
            "poster_path": movie.poster_path,
            "backdrop_path": movie.backdrop_path,
            "genres" : genre_names
            })
        
    return jsonify(m_list)



@app.route('/add_movie',methods=['POST'])
def add_movie():
    data = request.get_json()
    title = data['title']
    genres = data['genres']
    release_date = date.fromisoformat(data['release_date'])  # {"release_date": "2014-11-07"} to datetime.date(2014, 11, 7) python object
    rating = data['rating']
    original_language = data['original_language']
    overview = data['overview']
    prod_company = data.get('prod_company', None) # If prod_company is not provided, it defaults to None
    runtime = data.get('runtime',0)
    tagline = data.get('tagline', None)
    credits = data.get('credits', '')
    poster_path = data['poster_path']
    backdrop_path = data.get('backdrop_path','')

    existing_movie = Movies.query.filter(Movies.title.ilike(title), Movies.release_date == release_date).first()

    if existing_movie:
        return jsonify({"message":"Movie already exists"}),409

    new_movie = Movies(
        title=title,
        release_date=release_date,
        rating=rating,
        original_language=original_language,
        overview=overview,
        production_company=prod_company,
        runtime=runtime,
        tagline=tagline,
        credits=credits,
        poster_path=poster_path,
        backdrop_path=backdrop_path
    )
    db.session.add(new_movie)
    db.session.commit()

    for g in genres:
        genre=Genre.query.filter(Genre.name.ilike(g)).first()
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

    Watchlist.query.filter(Watchlist.movie_id == id).delete()

    MovieGenres.query.filter(MovieGenres.movie_id == id).delete()
    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message":"Movie deleted"}),200


# @app.route('/update_movie/<int:id>',methods=['POST'])
# def update_movie(id):
#     movie = Movies.query.filter_by(id=id).first()
#     if not movie:
#         return jsonify({"error":"Movie not found"}),404
    
#     data = request.get_json()
#     movie.title = data.get('title', movie.title)
#     movie.release_date = date.fromisoformat(data.get('release_date')) if data.get('release_date') else movie.release_date
#     movie.rating = data.get('rating', movie.rating)
#     movie.original_language = data.get('original_language', movie.original_language)
#     movie.overview = data.get('overview', movie.overview)
#     movie.prod_company = data.get('prod_company', movie.production_company)  # Defaults to existing value if not provided
#     movie.runtime = data.get('runtime', movie.runtime)
#     movie.tagline = data.get('tagline', movie.tagline)
#     movie.credits = data.get('credits', movie.credits)
#     movie.poster_path = data.get('poster_path', movie.poster_path)
#     movie.backdrop_path = data.get('backdrop_path', movie.backdrop_path)

#     new_genres = data.get('genres',[])  #either data send or []  

#     #fetch ids of existing new_genres
#     ex_genres = Genre.query.filter(Genre.name.ilike(any(new_genres))).all()
#     # ex_genres = Genre.query.filter(Genre.name.in_(new_genres)).all()
#     ex_gids = [g.id for g in ex_genres]

#     #fetch ids of current genres
#     current_movie_genres_objects = MovieGenres.query.filter(MovieGenres.movie_id == id).all()
#     current_movie_gids = [mg.genre_id for mg in current_movie_genres_objects]

#     #delete 
#     for mg in current_movie_genres_objects:
#         if mg.genre_id not in ex_gids:
#             db.session.delete(mg)
    
#     #add
#     for g in ex_genres:
#         if g.id not in current_movie_gids:
#             new_mg = MovieGenres(movie_id = id, genre_id = g.id)
#             db.session.add(new_mg)
            
#     #add - new genres
#     for genre_name in new_genres:
#         if genre_name not in [g.name for g in ex_genres]: 
#             new_genre = Genre(name=genre_name) 
#             db.session.add(new_genre) 
#             db.session.flush()  

#             new_mg = MovieGenres(movie_id=id, genre_id=new_genre.id)
#             db.session.add(new_mg)
            
#     db.session.commit()
#     return jsonify({"message": f"Movie {movie.title} modified"}),200

@app.route('/update_movie/<int:id>', methods=['POST'])
def update_movie(id):
    movie = Movies.query.filter_by(id=id).first()
    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    data = request.get_json()
    movie.title = data.get('title', movie.title)
    movie.release_date = date.fromisoformat(data.get('release_date')) if data.get('release_date') else movie.release_date
    movie.rating = data.get('rating', movie.rating)
    movie.original_language = data.get('original_language', movie.original_language)
    movie.overview = data.get('overview', movie.overview)
    movie.production_company = data.get('prod_company', movie.production_company)  # Defaults to existing value if not provided
    movie.runtime = data.get('runtime', movie.runtime)
    movie.tagline = data.get('tagline', movie.tagline)
    movie.credits = data.get('credits', movie.credits)
    movie.poster_path = data.get('poster_path', movie.poster_path)
    movie.backdrop_path = data.get('backdrop_path', movie.backdrop_path)

    new_genres = data.get('genres', [])  # either data send or []

    # Fetch ids of existing genres case-insensitively
    ex_genres = Genre.query.filter(sqlalchemy.func.lower(Genre.name).in_([g.lower() for g in new_genres])).all()
    ex_gids = [g.id for g in ex_genres]

    # Fetch ids of current genres
    current_movie_genres_objects = MovieGenres.query.filter(MovieGenres.movie_id == id).all()
    current_movie_gids = [mg.genre_id for mg in current_movie_genres_objects]

    # Delete
    for mg in current_movie_genres_objects:
        if mg.genre_id not in ex_gids:
            db.session.delete(mg)

    # Add existing genres
    for g in ex_genres:
        if g.id not in current_movie_gids:
            new_mg = MovieGenres(movie_id=id, genre_id=g.id)
            db.session.add(new_mg)

    # Add new genres
    for genre_name in new_genres:
        if genre_name.lower() not in [g.name.lower() for g in ex_genres]:
            new_genre = Genre(name=genre_name)
            db.session.add(new_genre)
            db.session.flush()

            new_mg = MovieGenres(movie_id=id, genre_id=new_genre.id)
            db.session.add(new_mg)

    db.session.commit()
    return jsonify({"message": f"Movie {movie.title} modified"}), 200



@app.route('/add_list/<int:user_id>/<int:movie_id>', methods=['POST'])
def add_list(user_id, movie_id):
    ex = Watchlist.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if ex:
        return jsonify({"error":"Movie already in watchlist"}),409
    
    new_entry = Watchlist(user_id=user_id, movie_id=movie_id)
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({"message": "Movie added to watchlist"}), 200


@app.route('/remove_list/<int:user_id>/<int:movie_id>', methods=['POST'])
def remove_list(user_id, movie_id):
    ex = Watchlist.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if not ex:
        return jsonify({"error":"Movie not found in watchlist"}),404
    
    db.session.delete(ex)
    db.session.commit()
    return jsonify({"message": "Movie removed from watchlist"}), 200


@app.route('/view_list/<int:user_id>', methods=['GET'])
def view_list(user_id):
    ex = Watchlist.query.filter_by(user_id=user_id).all()

    if not ex:
        return jsonify({"message":"Your watchlist is empty."}),404
    
    movies =[]
    for entry in ex:
        movie = Movies.query.get(entry.movie_id)
        if movie:
            genre_ids = [genre.genre_id for genre in movie.movie_genres]
            genres = Genre.query.filter(Genre.id.in_(genre_ids)).all()
            genre_names = [g.name for g in genres]

            movies.append({
                "id": movie.id,
                "title": movie.title,
                "original_language": movie.original_language,
                "overview": movie.overview,
                "production_company": movie.production_company,
                "release_date": movie.release_date.isoformat(),
                "runtime": movie.runtime,
                "rating": movie.rating,
                "credits": movie.credits,
                "poster_path": movie.poster_path,
                "backdrop_path": movie.backdrop_path,
                "genres": genre_names
            })

    return jsonify(movies)

@app.route('/check_list/<int:user_id>/<int:movie_id>', methods=['GET'])
def check_list(user_id, movie_id):
    ex = Watchlist.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    return jsonify({"exists": bool(ex)})

if __name__=='__main__':
    app.run(debug=True)




# flask db init - initialize , only do first time
#- do this everytime you update tables
# flask db migrate
# flask db upgrade



#flask db init
#flask db current
#flask db migrate
#flask db stamp head
#flask db migrate
#flask db upgrade
