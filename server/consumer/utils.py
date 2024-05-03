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