from kafka import KafkaConsumer
import logging
import time
import json
from server.queue import logs_queue

# All topics
topics = ["auth", "database", "email", "payment", "server", "services"]


# Kafka consumer
def kafka_consumer():
    consumer = None
    while True:
        try:
            if consumer is None:
                consumer = KafkaConsumer(
                    *topics,  # Subscribe to all topics
                    bootstrap_servers="kafka:9092",
                    group_id="flask-group",
                    auto_offset_reset="earliest",
                    enable_auto_commit=True,
                    auto_commit_interval_ms=1000,
                )
                logging.info("Kafka ready")

            for message in consumer:
                logging.info(
                    "Message received: {}".format(message.value.decode("utf-8"))
                )

                # Convert to dictionary
                json_object = json.loads(message.value.decode("utf-8"))

                # Parse the JSON object
                data = transform_keys(json_object)
                logging.info(type(data))

                # Put the data in the queue
                logs_queue.put(data)

        except Exception as e:
            logging.error("Error while consuming messages: {}".format(e))
            logging.info("Reconnecting to Kafka in 5 seconds...")
            time.sleep(5)
            consumer = None


def transform_keys(message):
    data = {
        "level": message.get("level"),
        "message": message.get("message"),
        "resource_id": message.get("resourceId"),
        "timestamp": message.get("timestamp"),
        "trace_id": message.get("traceId"),
        "span_id": message.get("spanId"),
        "commit": message.get("commit"),
        "meta_data": message.get("metadata"),
    }
    return data
