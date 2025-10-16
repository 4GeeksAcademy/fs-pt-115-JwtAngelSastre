"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route("/signup", methods=["POST"])
def create_user():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({'msg': 'Faltan espacios por rellenar'}), 400

    user_exists = db.session.execute(db.select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user_exists:
        return jsonify({'msg': 'Ya existe una cuenta con éste email'}), 400

    new_user = User(
        email=data.get("email"),
        is_active=True
    )
    new_user.set_password(data.get("password"))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg': 'user created successfully',
                    'new user': new_user.serialize()}), 200


@api.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({'msg': 'Faltan espacios por rellenar'}), 400

    user = db.session.execute(db.select(User).where(
        User.email == data.get("email"))).scalar_one_or_none()

    if user is None:
        return jsonify({'msg': 'No existe una cuenta con los datos otorgados'}), 400

    if user.check_password(data.get("password")):
        token = create_access_token(str(user.id))
        return jsonify({'msg': 'ok,', "token": token}), 200

    else:
        return jsonify({'msg': 'No existe una cuenta con los datos otorgados'}), 400
    

@api.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify({"user": user.serialize()}), 200
