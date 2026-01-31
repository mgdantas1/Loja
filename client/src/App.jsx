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
        <div className='wrapper'>
            <main className='flex min-h-screen flex-col'>
                {addProduto && <NewProduct setAddProduto={setAddProduto} pegarProdutos={pegarProduto} />}
                {updateProduto && produtoSelecionado && (
                    <UpdateProduct
                        setUpdateProduto={setUpdateProduto}
                        produto={produtoSelecionado}
                        pegarProdutos={pegarProduto}
                    />
                )}
                <nav className='flex flex-col items-center justify-between gap-4 border-b-2 border-b-black p-8 sm:flex-row'>
                    <h1 className='text-4xl font-bold text-balance'>Loja de Cosméticos</h1>
                    <button className='primary-btn w-fit px-4' onClick={() => setAddProduto(true)}>
                        Adicionar produto
                    </button>
                </nav>
                <section className='flex-1 p-8'>
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
        </div>
    );
}
