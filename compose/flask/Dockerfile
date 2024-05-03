# Use the official Python image as base
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./server/requirements.txt /app/server/requirements.txt

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r /app/server/requirements.txt

# Copy the rest of the application code into the container at /app
COPY . /app

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=server.run.py
ENV FLASK_ENV=development

# Run the script when the container launches
CMD ["flask", "run", "--host=0.0.0.0", "--debug"]