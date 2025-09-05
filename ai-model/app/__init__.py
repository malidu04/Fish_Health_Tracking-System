# File: ai-model/app/__init__.py
from flask import Flask
from flask_cors import CORS
from .routes import bp as api_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.register_blueprint(api_bp, url_prefix='/api/v1')
    
    return app