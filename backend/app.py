from flask import Flask
from flask_mongoengine import MongoEngine
from routes.auth import auth_bp
from routes.notes import notes_bp
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()  # loads .env file

app = Flask(__name__)
CORS(app)

# MongoDB connection (edit with your DB details)
app.config["MONGODB_SETTINGS"] = {
    "db": os.getenv("MONGO_DB", "inotebook"),
    "host": os.getenv("MONGO_URI", "mongodb://localhost:27017/inotebook")
}

db = MongoEngine()
db.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(notes_bp, url_prefix="/api/notes")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
