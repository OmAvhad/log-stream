from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://postgres:password@postgres:5432/dev"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_BINDS"] = {
        "dev": "postgresql://postgres:password@postgres:5432/dev"
    }
    app.debug = True

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db, directory="./server/migrations")

    # Import blueprints
    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app
