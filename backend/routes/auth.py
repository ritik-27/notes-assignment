from flask import Blueprint, request, jsonify
import jwt, os, datetime, bcrypt
from models.user import Users  # ✅ use Users model

auth_bp = Blueprint("auth", __name__)
JWT_SECRET = os.getenv("JWT_SECRET", "Harryisagoodb$oy")

# ROUTE 1: Create a User
@auth_bp.route("/createuser", methods=["POST"])
def create_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if Users.objects(email=email).first():
        return jsonify({"error": "Sorry a user with this email already exists"}), 400

    # bcrypt hashing (same as Node.js)
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    user = Users(name=name, email=email, password=hashed_pw).save()

    payload = {
        "user": {"id": str(user.id)},
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    authtoken = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

    return jsonify({"authtoken": authtoken})


# ROUTE 2: Login User
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = Users.objects(email=email).first()
    if not user:
        return jsonify({"success": False, "error": "Please try to login with correct credentials"}), 400

    # bcrypt password check
    if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        return jsonify({"success": False, "error": "Please try to login with correct credentials"}), 400

    payload = {
        "user": {"id": str(user.id)},
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    authtoken = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

    return jsonify({"success": True, "authtoken": authtoken})


# ROUTE 3: Get User (Protected)
from middleware.fetch_user import fetch_user

@auth_bp.route("/getuser", methods=["POST"])
@fetch_user
def get_user():
    user_id = request.user["id"]
    user = Users.objects(id=user_id).exclude("password").first()
    return jsonify(user)
