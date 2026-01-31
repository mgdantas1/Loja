import { useState, useEffect } from 'react';
import NewProduct from './componentes/New';
import UpdateProduct from './componentes/Update';

export default function App() {
    const [addProduto, setAddProduto] = useState(false);
    const [lista, setProdutos] = useState([]);
    const [updateProduto, setUpdateProduto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    async function pegarProduto() {
        try {
            const response = await fetch('/api/produto', { credentials: 'include' });
            const data = await response.json();
            if (!data.ok) {
                throw new Error(data.message);
            }
            setProdutos(data.produtos);
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        pegarProduto();
    }, []);

    const abrirEdicao = produto => {
        setProdutoSelecionado(produto);
        setUpdateProduto(true);
    };

    return (
        <main className='flex min-h-screen flex-col items-center justify-center gap-8'>
            {addProduto && <NewProduct setAddProduto={setAddProduto} pegarProdutos={pegarProduto} />}
            {updateProduto && produtoSelecionado && (
                <UpdateProduct
                    setUpdateProduto={setUpdateProduto}
                    produto={produtoSelecionado}
                    pegarProdutos={pegarProduto}
                />
            )}
            <nav>
                <button className='primary-btn w-fit px-4' onClick={() => setAddProduto(true)}>
                    Adicionar produto
                </button>
            </nav>
            <section>
                {lista.map(produto => (
                    <>
                        <p>{produto.titulo}</p>
                        <button className='primary-btn w-fit px-4' onClick={() => abrirEdicao(produto)}>
                            Editar
                        </button>
                    </>
                ))}
            </section>
        </main>
    );
}
