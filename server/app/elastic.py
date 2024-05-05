from elasticsearch import Elasticsearch

def connect_eleasticsearch():
    es =  Elasticsearch(
        [
            {
                "host": "es",
                "port": 9200,
                "scheme": "http",
            }
        ]
    )   
    
    if es.ping():
        print('Connected to Elasticsearch')
    else:
        print('Could not connect to Elasticsearch')
    
    return es
    