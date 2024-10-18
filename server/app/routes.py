import json, logging
from flask import Blueprint, request
from .models import Log
from flask import current_app as app, jsonify
from server.custom_queue import logs_queue
from flask_socketio import emit, send

main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def index():
    return json.dumps({"message": "Hello, World!"})


@main_bp.route("/logs", methods=["GET"])
def logs():
    search_query = json.loads(request.args.get("q") or '{"query":{"match_all": {}}}')
    logging.info("search query %s", search_query)
    
    try:
        logs = app.elasticsearch.search(
            index="logs",
            body=search_query,
            size=1000,
        )
    except Exception as e:
        # return 500 if there is an error
        return json.dumps({"message": str(e)}), 500
    
    # logs is not JSON serializable, so we convert it to a list
    logs = [log for log in logs["hits"]["hits"]]

    # use json stringfy to convert the list to a JSON string
    return jsonify(logs)


@main_bp.route("/logs", methods=["POST"])
def add_log():
    logs = request.get_json()

    for log in logs:
        # Push the logs to logs queue
        logs_queue.put(log)

    return json.dumps({"message": "Log added successfully!"})


@main_bp.route("/logs", methods=["DELETE"])
def delete_logs():
    # Delete all logs from elasticsearch
    app.elasticsearch.indices.delete(index="logs", ignore=[400, 404])
    return json.dumps({"message": "Logs deleted successfully!"})


@main_bp.route("/test-socket", methods=["POST"])
def test_socket():
    message = request.get_json()
    logging.info("Test route called")
    # print connected clients
    emit("log", message, namespace="/", broadcast=True)
    return json.dumps({"message": "Log sent!"})