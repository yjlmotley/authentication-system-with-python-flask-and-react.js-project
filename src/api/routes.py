"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/sign-up', methods=['POST'])
def handleSignup():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return jsonify({"msg": "Missing email or password"}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 400
    
    hashed_password = generate_password_hash(password)
    new_user= User(email=email, password=hashed_password, is_active=True)
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/log-in', methods=['POST'])
def handleLogIn():

    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email = email).first()
    if user is None or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid username or password"}), 401
    
    expiration = datetime.timedelta(days = 7)
    access_token = create_access_token(identity = user.email, expires_delta = expiration)
    return jsonify({"token": access_token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def privateRoute():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify(logged_in_as = current_user), 200
