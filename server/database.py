from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@postgres:5432/dev'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_BINDS'] = {
    'dev': 'postgresql://postgres:password@postgres:5432/dev'
}
db = SQLAlchemy(app)
    
class Logs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(10), nullable=False)
    message = db.Column(db.String(100), nullable=False)
    resource_id = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    trace_id = db.Column(db.String(100), nullable=False)
    span_id = db.Column(db.String(100), nullable=False)
    commit = db.Column(db.String(100), nullable=False)
    meta_data = db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def __repr__(self):
        return f'<Log {self.message}>'

# Create application context
app.app_context().push()

db.create_all()
