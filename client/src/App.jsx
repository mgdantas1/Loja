import { useState, useEffect } from 'react';
import NewProduct from './componentes/New';
import UpdateProduct from './componentes/Update';
import Loading from './componentes/Loading';
import Filter from './componentes/Filters';
import { GET } from './api/produtos';
import { DELETE } from './api/produtos';
import { PATCH } from './api/produtos';

export default function App() {
    const [lista, setProdutos] = useState([]);
    const [addProduto, setAddProduto] = useState(false);
    const [updateProduto, setUpdateProduto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [filter, setFilter] = useState({ type: 'all', status: 'all' });
    const [isLoading, setLoading] = useState(true);

    async function pegarProduto() {
        try {
            const data = await GET(filter);
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

    async function deletarProduto(id) {
        if (!confirm('Você tem certeza?')) return;
        const data = await DELETE(id);
        if (data.ok) {
            pegarProduto();
        }
        alert(data.message);
    }

    async function mudarStatus(id) {
        if (!confirm('Você tem certeza?')) return;
        const data = await PATCH(id);
        if (data.ok) {
            pegarProduto();
        }
        alert(data.message);
    }

    useEffect(() => {
        pegarProduto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const abrirEdicao = produto => {
        setProdutoSelecionado(produto);
        setUpdateProduto(true);
    };

    if (isLoading) return <Loading />;
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
                <section className='p-6'>
                    <Filter filter={filter} setFilter={setFilter} buscar={pegarProduto} />
                    <article className='flex flex-wrap justify-center gap-6'>
                        {lista.map(produto => (
                            <div className='flex max-w-100 min-w-80 flex-1 flex-col gap-2 rounded-xl border-2 border-black p-4'>
                                <h1 className='mb-4 border-b-2 border-b-gray-400 pb-2 text-xl font-bold'>
                                    {produto.titulo}
                                </h1>
                                <p>Tipo: {produto.tipo}</p>
                                <p>Quantidade: {produto.quantidade}</p>
                                <p>
                                    Preço:<strong> R$ {produto.preco / 100}</strong>
                                </p>
                                {produto.status ? (
                                    <p className='text-green-500'>Ativo</p>
                                ) : (
                                    <p className='text-gray-500'>Inativo</p>
                                )}
                                <button
                                    className='primary-btn w-fit self-end px-6 py-0.5'
                                    onClick={() => abrirEdicao(produto)}
                                >
                                    Editar
                                </button>
                                <button
                                    className='primary-btn w-fit self-end px-6 py-0.5'
                                    onClick={() => deletarProduto(produto.id)}
                                >
                                    Deletar
                                </button>
                                <button
                                    className='primary-btn w-fit self-end px-6 py-0.5'
                                    onClick={() => mudarStatus(produto.id)}
                                >
                                    Mudar status
                                </button>
                            </div>
                        ))}
                    </article>
                </section>
            </main>
        </div>
    );
}
