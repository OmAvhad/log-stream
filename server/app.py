from flask import Flask
from server.consumer.kafka_consumer import kafka_consumer
import threading
import logging

app = Flask(__name__)


@app.route("/")
def hello():
    print("Hello, World!")
    return "Hello, World!"


def start_consumer_thread():
    logging.basicConfig(level=logging.INFO)
    logging.info("Starting Kafka consumer thread")
    kafka_consumer()


# Start the Kafka consumer thread
thread = threading.Thread(target=start_consumer_thread)
thread.daemon = True
thread.start()

if __name__ == "__main__":
    # Start the Flask app
    app.run()
