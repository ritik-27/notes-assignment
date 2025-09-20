from flask import request, jsonify
import jwt
import os

JWT_SECRET = os.getenv("JWT_SECRET", "Harryisagoodb$oy")

def fetch_user(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get("auth-token")
        if not token:
            return jsonify({"error": "Please authenticate using a valid token"}), 401
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            request.user = data["user"]  # attach user like in Express
        except Exception:
            return jsonify({"error": "Please authenticate using a valid token"}), 401
        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper
