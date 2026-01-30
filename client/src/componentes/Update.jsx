import { useEffect, useRef, useState } from 'react';

export default function UpdateProduct({ produto, setUpdateProduto }) {
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('perfume');
    const [quantidade, setQuantidade] = useState(0);
    const [preco, setPreco] = useState(0);
    const formRef = useRef(null);

    function formatPrice(value) {
        const rawValue = value.toString().replace(/\D/g, '') / 100;
        return rawValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/produto/${produto.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo, tipo, quantidade, preco }),
            });

            const data = await response.json();

            if (!data.ok) {
                throw new Error(data.message);
            }

            alert('Produto atualizado com sucesso!');
            setUpdateProduto(false);
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        function handleClick(event) {
            if (!formRef.current?.contains(event.target)) {
                setUpdateProduto(false);
            }
        }

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setUpdateProduto(false);
            }
        }

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setUpdateProduto]);

    return (
        <article className='fixed inset-0 grid place-items-center bg-gray-800/10 backdrop-blur-sm'>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className='flex w-sm flex-col gap-4 border-2 border-black bg-white p-4 shadow-[5px_5px_0_black]'
            >
                <h2 className='text-4xl font-bold'>Editar Produto</h2>
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
                        onChange={e => setQuantidade(Number(e.target.value))}
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
                        value={formatPrice(preco)}
                        onChange={e => setPreco(Number(e.target.value.replace(/\D/g, '')))}
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
