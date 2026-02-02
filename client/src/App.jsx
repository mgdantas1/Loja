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
                <section className='flex flex-wrapjustify-center gap-6'>
                    {lista.map(produto => (
                        <div className='border-2 border-black rounded-xl p-3' >
                            <h1>{produto.titulo}</h1>
                            <p>Tipo: {produto.tipo}</p>
                            <p>Quantidade: {produto.quantidade}</p>
                            <p>Preço: R$ {(produto.preco / 100)}
                            </p>
                            <button className='primary-btn w-fit px-4' onClick={() => abrirEdicao(produto)}>
                                Editar
                            </button>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}
