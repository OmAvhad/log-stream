import json
from flask import Blueprint, render_template
from .models import Log

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return json.dumps({"message": "Hello, World!"})	
