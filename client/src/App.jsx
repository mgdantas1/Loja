import { useState, useEffect } from 'react';
import NewProduct from './componentes/New';
import UpdateProduct from './componentes/Update';

export default function App() {
    const [addProduto, setAddProduto] = useState(false);
    const [lista, setProdutos] = useState([]);
    const [updateProduto, setUpdateProduto] = useState(false)
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    async function pegarproduto() {
        const response = await fetch('/api/produto', { credentials: 'include' });
        const data = await response.json();
        setProdutos(data);
    }
    useEffect(() => {
        pegarproduto();
        }, []);

    const abrirEdicao = (produto) => {
        setProdutoSelecionado(produto);
        setUpdateProduto(true);
    };

    return (
        <main className='grid min-h-screen place-items-center'>
            {addProduto && <NewProduct setAddProduto={setAddProduto} />}
            {updateProduto && produtoSelecionado && (
                <UpdateProduct setUpdateProduto={setUpdateProduto} produto={produtoSelecionado}/>
            )}
            <nav>
                <button className='primary-btn w-fit px-4' onClick={() => setAddProduto(true)}>
                    Adicionar produto
                </button>
            </nav>
            <section>
                {
                    lista.map(produto => (
                        <>
                            <p>{produto.titulo}</p>
                            <button className='primary-btn w-fit px-4' onClick={() => abrirEdicao(produto)}>Editar produto</button>
                        </>
                    ))
                }
            </section>
        </main>
    );
}
