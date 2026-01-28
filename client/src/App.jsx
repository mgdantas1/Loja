import { useState } from 'react';
import NewProduct from './componentes/New';

export default function App() {
    const [addProduto, setAddProduto] = useState(false);

    return (
        <main className='grid min-h-screen place-items-center'>
            {addProduto && <NewProduct setAddProduto={setAddProduto} />}
            <button className='primary-btn w-fit px-4' onClick={() => setAddProduto(true)}>
                Adicionar produto
            </button>
        </main>
    );
}
