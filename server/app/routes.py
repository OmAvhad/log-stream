import json
from flask import Blueprint, request
from .models import Log
from flask import current_app as app, jsonify
from server.custom_queue import logs_queue

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return json.dumps({"message": "Hello, World!"})	

@main_bp.route('/logs', methods=["GET"])
def logs():
    # Get logs from elasticsearch
    logs = app.elasticsearch.search(index="logs")
    
    # logs is not JSON serializable, so we convert it to a list
    logs = [log for log in logs["hits"]["hits"]]
    
    # use json stringfy to convert the list to a JSON string
    return jsonify(logs)

@main_bp.route('/logs', methods=["POST"])
def add_log():
    logs = request.get_json()
    
    for log in logs:
        # Push the logs to logs queue
        logs_queue.put(log)
        
    return json.dumps({"message": "Log added successfully!"})