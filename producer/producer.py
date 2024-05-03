import os
import json
import time
import argparse
from kafka import KafkaProducer

# Logs path
logs_path = "./producer/logs"

# Argument parser
parser = argparse.ArgumentParser(description="Kafka producer")
parser.add_argument("--topic", required=True, help="Topic name", default="auth")
parser.add_argument(
    "--bootstrap_servers", help="Bootstrap server", default="kafka:9092"
)
args = parser.parse_args()

# Create a Kafka producer
producer = KafkaProducer(bootstrap_servers=args.bootstrap_servers)

# Define the topic to which you want to send messages
topic = args.topic

# File to read the logs from
file_path = f"{logs_path}/{topic}.json"

print(f"Producing messages to topic {topic}...")
print(f"Reading logs from {file_path}...")

# Read the logs from the file
with open(file_path, "r") as file:
    logs = json.load(file)

    for log in logs:
        message = json.dumps(log).encode("utf-8")
        producer.send(topic, message)
        producer.flush()
        time.sleep(1)  # Delay in order to simulate a real-time scenario
        print(f"Produced ({topic}): {message}\n")

# Close the producer
producer.close()

print(f"Messages sent to topic {topic}")
