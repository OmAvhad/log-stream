from flask import Flask
from server.consumer.kafka_consumer import kafka_consumer
import threading
import logging
from server.queue import logs_queue
from server.database import Logs

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://postgres:password@postgres:5432/dev"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_BINDS"] = {
    "dev": "postgresql://postgres:password@postgres:5432/dev"
}

# connect to postgresql
from server.database import db

db.init_app(app)


@app.route("/")
def hello():
    print("Hello, World!")
    return "Hello, World!"


def start_consumer_thread():
    logging.info("Starting Kafka consumer thread")
    kafka_consumer()


def enqueue_logs():
    logging.info("Starting log enqueuing")
    with app.app_context():
        while True:
            message = logs_queue.get()  # This will block until a log is available
            logging.info(f"Log received: {message}")
            # Save the log to the database
            log = Logs(**message)
            log.save()
            # Notify the queue that the message has been processed
            logs_queue.task_done()


def start_enqueue():
    logging.info("Starting log enqueuing thread")
    enqueue_logs()


# Start the Kafka consumer thread
reader_thread = threading.Thread(target=start_consumer_thread)
reader_thread.daemon = True
reader_thread.start()

# Start the log enqueuing thread
processor_thread = threading.Thread(target=start_enqueue)
processor_thread.daemon = True
processor_thread.start()

if __name__ == "__main__":

    app.run(debug=True)
