import logging
from server.custom_queue import logs_queue
from server.app.models import Log
from flask import current_app as app

def processor():
    logging.basicConfig(level=logging.INFO)
    while True:
        # This will block until a log is available, when a log is available, it will be enqueued
        message = logs_queue.get()  
        logging.info(f"Log received: {message}")
        
        # Save the log to the database
        log = Log(**message)
        log.save()
        
        # Save the log to Elasticsearch
        app.elasticsearch.index(index="logs", body=message)
        
        # Notify the queue that the message has been processed
        logs_queue.task_done()
        logging.info(f"Log saved: {message}")