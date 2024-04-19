# log-stream

## Prerequisites
[![Docker](https://img.shields.io/badge/-Docker-blue?logo=docker)](https://www.docker.com/)

## Technologies Used
[![Kafka](https://img.shields.io/badge/-Kafka-black?logo=apache-kafka)](https://kafka.apache.org/)
[![Flask](https://img.shields.io/badge/-Flask-black?logo=flask)](https://flask.palletsprojects.com/)

## Installation and Setup
1. Clone this repository.
    ```
    git clone https://github.com/OmAvhad/log-stream.git
    ```
2. Navigate to the project directory.
    ```
    cd log-stream
    ```
3. Run the following command to build and start the application:
    ```
    docker-compose up -d --build
    ```

## Producer
- Topics
    - auth
    - database
    - email
    - payment
    - server
    - services

- Produce logs (Publish logs to a topic)
    ```
    docker-compose run --rm flask python producers/producer.py --topic TOPIC_NAME
    ```

- View logs (Consume logs of a topic)
    ```
    docker exec -it kafka kafka-console-consumer --bootstrap-server localhost:9092 --topic TOPIC_NAME --from-beginning
    ```
 

[![Built with Love](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)