# Loja MCAD

Sistema desenvolvido para a matéria de **PSI** (Programação de Sistemas para a Internet).

<!-- Adicionar imagens -->

## 🛜 Endpoints

| Método     | URL                | Função                      |
| ---------- | ------------------ | --------------------------- |
| **GET**    | `/api/produto`     | Pegar produtos              |
| **POST**   | `/api/produto`     | Adicionar produtos          |
| **PUT**    | `/api/produto/:id` | Alterar multiplos dados     |
| **PATCH**  | `/api/produto/:id` | Alterar o status do produto |
| **DELETE** | `/api/produto/:id` | Delete produto              |

## ▶️ Como executar

O projeto usa `Flask` e `ReactJS`, ou seja, para executar o projeto é preciso ter o `Python` e o `Node` instalados.

1. **Instale as dependências**

    ```powershell
    # Back-end
    cd server
    pip install -r requirements.txt

    # Front-end
    cd ../client
    npm install
    ```

2. **Inicie ambos os servidores**

    ```powershell
    # Back-end
    cd ../server
    python app.py

    # Front-end
    cd ../client
    npm run dev
    ```

> [!TIP]
> Use ambiente virtual 😉

Após o passo a passo a aplicação será inicializado no seu navegador padrão em [`http://localhost:3000`](http://localhost:3000).

## 😁 Integrantes

| Integrante       | Papel no projeto        |
| ---------------- | ----------------------- |
| Ana Cecilya      | Pegar e exibir produtos |
| Ana Clara        | Deletar produtos        |
| Davi Francisco   | Adicionar produtos      |
| Maria das Graças | Atualizar produtos      |

## ⚖️ Licença

O projeto foi desenvolvido com fins educativos por alunos do **IFRN** campus Caicó.

- [Licença MIT](LICENSE)
