import { useState, useEffect } from 'react';
import NewProduct from './componentes/New';
import UpdateProduct from './componentes/Update';
import Loading from './componentes/Loading';
import { GET } from './api/produtos';

export default function App() {
    const [addProduto, setAddProduto] = useState(false);
    const [lista, setProdutos] = useState([]);
    const [updateProduto, setUpdateProduto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [loading, setLoading] = useState(true);

    async function pegarProduto() {
        try {
            const data = await GET();
            if (!data.ok) {
                throw new Error(data.message);
            }
            setProdutos(data.produtos);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        pegarProduto();
    }, []);

    const abrirEdicao = produto => {
        setProdutoSelecionado(produto);
        setUpdateProduto(true);
    };

    if (loading) return <Loading />;
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
                <section className='flex flex-wrap justify-center gap-6 m-6'>
                    {lista.map(produto => (
                        <div className='border-2 border-black rounded-xl p-4 min-w-80 max-w-100 flex-1 flex flex-col gap-2' >
                            <h1 className='font-bold border-b-2 border-b-gray-400 pb-2 mb-4 text-xl'>{produto.titulo}</h1>
                            <p>Tipo: {produto.tipo}</p>
                            <p>Quantidade: {produto.quantidade}</p>
                            <p>Preço:<strong> R$ {(produto.preco / 100)}</strong>
                            </p>
                            <button className='primary-btn w-fit px-6 py-0.5 self-end' onClick={() => abrirEdicao(produto)}>
                                Editar
                            </button>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}
