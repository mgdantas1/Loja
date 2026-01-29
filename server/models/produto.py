from sqlalchemy import Enum, String
from sqlalchemy.orm import Mapped, mapped_column
from database import Base

class Produtos(Base):
    __tablename__ = 'produtos'

    id:Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    titulo:Mapped[str] = mapped_column(String(30), nullable=False)
    tipo:Mapped[str] = mapped_column(Enum('perfume', 'hidratante'), nullable=False)
    status:Mapped[bool] = mapped_column(nullable=False)
    quantidade:Mapped[int] = mapped_column(nullable=False)
    preco:Mapped[int] = mapped_column(nullable=False) # Armazenar o preço em centavos para evitar problemas com ponto flutuante

    def transformar_dic(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'status': self.status, 
            'quantidade': self.quantidade, 
            'preco': self.preco
        }



        
