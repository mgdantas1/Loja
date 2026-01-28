import { useEffect, useRef, useState } from 'react';

export default function Form({ title, setAddProduto }) {
    const [titulo, setTitulo] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [tipo, setTipo] = useState('perfume');
    const [preco, setPreco] = useState(0);
    const formRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/produto', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo, quantidade, tipo, preco }),
            });
            const data = await response.json();
            if (!data.ok) {
                throw new Error(data.message);
            }

            setAddProduto(false);
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        function handleClick(event) {
            if (!formRef.current?.contains(event.target)) {
                setAddProduto(false);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [setAddProduto]);

    return (
        <article className='fixed inset-0 grid place-items-center bg-gray-800/10 backdrop-blur-sm'>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className='flex w-sm flex-col gap-4 border-2 border-black bg-white p-4 shadow-[5px_5px_0_black]'
            >
                <h2 className='text-4xl font-bold'>{title}</h2>
                <div>
                    <label htmlFor='titulo' className='mb-1 block'>
                        Titulo
                    </label>
                    <input
                        type='text'
                        id='titulo'
                        className='min-h-12 w-full border border-black px-4 outline'
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='tipo' className='mb-1 block'>
                        Tipo
                    </label>
                    <select
                        id='tipo'
                        className='min-h-12 w-full border border-black px-4 outline'
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                    >
                        <option value='perfume'>Perfume</option>
                        <option value='hidratante'>Hidratante</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='quantidade' className='mb-1 block'>
                        Quantidade
                    </label>
                    <input
                        type='number'
                        id='quantidade'
                        className='min-h-12 w-full border border-black px-4 outline'
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                        min={1}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='preco' className='mb-1 block'>
                        Preço
                    </label>
                    <input
                        type='text'
                        id='preco'
                        className='min-h-12 w-full border border-black px-4 outline'
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='primary-btn'>
                    Adicionar
                </button>
            </form>
        </article>
    );
}
