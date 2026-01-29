import { useState, useEffect } from 'react';
// import NewProduct from './componentes/New';

export default function App() {
    const [addProduto, setAddProduto] = useState(false);
    const [lista, setProdutos] = useState([]);
    async function pegarproduto() {
        const response = await fetch('/api/produto', { credentials: 'include' });
        const data = await response.json();
        setProdutos(data);
    }
    useEffect(() => {
        pegarproduto();
        }, []);

    return (
        <main className='grid min-h-screen place-items-center'>
            {addProduto && <NewProduct setAddProduto={setAddProduto} />}
            <nav>
                <button className='primary-btn w-fit px-4' onClick={() => setAddProduto(true)}>
                    Adicionar produto
                </button>
            </nav>
            <section>
                {
                    lista.map(produto => (
                        <p>{produto.id}</p>
                    ))
                }
            </section>
        </main>
    );
}
