from flask import Flask, render_template, request,redirect, session, url_for, jsonify
from sqlalchemy import inspect
from datetime import date
from flask_migrate import Migrate
from models import Users,Movies,db


app = Flask(__name__) #cretae instance of flask

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY']='pacman'


db.init_app(app) # Initialize the db with the app
migrate = Migrate(app,db)

def initial_data():
    if not Movies.query.all():
        movie1 = Movies(title="Inception",genre="Sci-fi",release_date=date(2010,7,16), rating=8.8)
        db.session.add(movie1)
        db.session.commit()

    if not Users.query.all():
        user1 = Users(username="jrgopika", password="123456")
        db.session.add(user1)
        db.session.commit()

    db.create_all()


with app.app_context():
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()

    if not tables:
        initial_data()


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


@app.route('/login', methods=['POST','GET'])
def login():
    if 'user_id' in session:
        return redirect(url_for('index'))
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = Users.query.filter_by(username=username).first()
        print(user)
        if user and user.password == password:
            session['user_id'] = user.id
            session['username'] = user.username
            return redirect(url_for('index'))
        else:
            return render_template('login.html')

    #if GET renders this page
    return render_template('login.html')
    


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
    session['user_id'] = new_user.id 
    session['username'] = new_user.username


    return redirect(url_for('index'))


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/view_session')
def view_session():
    if 'user_id' in session:
        return f"User ID: {session['user_id']}, Username: {session.get('username')}"
    else:
        return "No user is currently logged in."
    

#table functions
@app.route('/add_movie')
def add_movie():
    title = "The Dark Knight"
    genre="Action"
    release_date=date(2008,7,18)
    rating=9

    existing_movie = Movies.query.filter_by(title=title, genre=genre, release_date=release_date).first()

    if existing_movie:
        return "Movie already exists"

    new_movie=Movies(title=title,genre=genre,release_date=release_date, rating=rating)

    db.session.add(new_movie)
    db.session.commit()
    return "success"

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
        m_list.append({
            "id": movie.id,
            "title": movie.title,
            "genre": movie.genre,
            "release_date": movie.release_date.isoformat(),
            "rating": movie.rating
        })

    return jsonify(m_list)

@app.route('/delete_movie/<int:id>')
def delete_movie(id):
    movie = Movies.query.filter_by(id=id).first()
    if not movie:
        return "movie not found"
    db.session.delete(movie)
    db.session.commit()
    return "success"

@app.route('/update_movie/<int:id>')
def update_movie(id):
    movie = Movies.query.filter_by(id=id).first()
    if not movie:
        return "movie not found"
    
    data = request.get_json()
    movie.title = data.get('title', movie.title)
    movie.genre = data.get('genre', movie.genre)
    movie.release_date = date.fromisoformat(data.get('release_date')) if data.get('release_date') else movie.release_date
    movie.rating = data.get('rating', movie.rating)

    db.session.commit()
    return "success"

    

if __name__=='__main__':
    app.run(debug=True)




# flask db init - initialize , only do first time
#- do this everytime you update tables
# flask db migrate
# flask db update