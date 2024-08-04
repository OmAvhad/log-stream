import time 
from elasticsearch import Elasticsearch

def connect_eleasticsearch():
    es = Elasticsearch(
        [
            {
                "host": "es",
                "port": 9200,
                "scheme": "http",
            }
        ]
    )

    while not es.ping():
        print("Connecting to Elasticsearch...")
        time.sleep(1)
        print("Connected to Elasticsearch")
        # Create an index in Elasticsearch
    if not es.indices.exists(index="logs"):
        es.indices.create(index="logs")


    return es
