from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URI = 'sqlite:///database/banco.db'

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

def init_database():
    Base.metadata.create_all(engine)
