# Use the official Python image as base
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./server/requirements.txt /app/server/requirements.txt
COPY ./compose/flask/docker-entrypoint.sh /usr/local/bin/

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r /app/server/requirements.txt

# Copy the rest of the application code into the container at /app
COPY . /app

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=server.app

# Run the script when the container launches
CMD ["docker-entrypoint.sh"]
