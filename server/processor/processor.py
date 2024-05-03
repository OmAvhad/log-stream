import logging
from server.custom_queue import logs_queue
from server.app.models import Log

def processor():
    logging.info("Starting log dequeuing")
    while True:
        # This will block until a log is available, when a log is available, it will be enqueued
        message = logs_queue.get()  
        logging.info(f"Log received: {message}")
        
        # Save the log to the database
        log = Log(**message)
        log.save()
        
        # Notify the queue that the message has been processed
        logs_queue.task_done()
        logging.info(f"Log saved: {message}")