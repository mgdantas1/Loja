from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class Produtos(Base):
    __tablename__ = 'produtos'

    id:Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    titulo:Mapped[str] = mapped_column(String(30), nullable=False)
    tipo:Mapped[str] = mapped_column(String(30), nullable=False)
    status:Mapped[bool] = mapped_column(nullable=False)
    quantidade:Mapped[int] = mapped_column(nullable=False)
    preco:Mapped[float] = mapped_column(nullable=False)