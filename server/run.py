import threading
from server.app import create_app
from server.consumer.kafka_consumer import kafka_consumer
from server.processor.processor import processor
from flask_cors import CORS

app = create_app()
CORS(app)

def process_logs():
    with app.app_context():
        processor()

# Start the Kafka consumer thread
reader_thread = threading.Thread(target=kafka_consumer)
reader_thread.daemon = True
reader_thread.start()

# Start the log deueuing thread
processor_thread = threading.Thread(target=process_logs)
processor_thread.daemon = True
processor_thread.start()

if __name__ == "__main__":
    app.run(debug=True)
