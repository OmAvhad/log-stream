<div align="center">
  <a href="https://github.com/OmAvhad/log-stream/">
    <img src="images/logo.png" alt="Logo" width="100" height="80">
  </a>

  <h3 align="center">Log Stream</h3>

  <p align="center">
    Harness the power of real-time log data management with ease and efficiency.
    <br />
  </p>
</div>

## Architecture
![log-stream-v1](https://github.com/user-attachments/assets/2bbc925a-664d-4711-af0e-080f6e6c7354)


## Prerequisites
[![Docker](https://img.shields.io/badge/-Docker-blue?logo=docker)](https://www.docker.com/)

## Technologies Used
[![Kafka](https://img.shields.io/badge/-Kafka-black?logo=apache-kafka)](https://kafka.apache.org/)
[![Flask](https://img.shields.io/badge/-Flask-black?logo=flask)](https://flask.palletsprojects.com/)
[![Elasticsearch](https://img.shields.io/badge/-Elasticsearch-black?logo=elasticsearch)](https://www.elastic.co/)
[![Kibana](https://img.shields.io/badge/-Kibana-black?logo=kibana)](https://www.elastic.co/kibana/)

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
4. Make migrations for the database.
    ```
    docker-compose run --rm flask flask db upgrade
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
    docker-compose run --rm flask python producer/producer.py --topic TOPIC_NAME
    ```

- View logs (Consume logs of a topic)
    ```
    docker exec -it kafka kafka-console-consumer --bootstrap-server localhost:9092 --topic TOPIC_NAME --from-beginning
    ```
 

[![Built with Love](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
