export default function Filter({ filter, setFilter, buscar }) {
    return (
        <article className='mb-6'>
            <h2 className='mb-3 text-3xl font-bold'>Filtros</h2>
            <div className='flex flex-wrap gap-6'>
                <select
                    id='type'
                    className='border-2 border-black px-4 py-2 text-lg'
                    value={filter.type}
                    onChange={e => setFilter(prev => ({ ...prev, type: e.target.value }))}
                >
                    <option value='all'>Todos os tipos</option>
                    <option value='perfume'>Perfumes</option>
                    <option value='hidratante'>Hidratantes</option>
                </select>
                <select
                    id='status'
                    className='border-2 border-black px-4 py-2 text-lg'
                    value={filter.status}
                    onChange={e => setFilter(prev => ({ ...prev, status: e.target.value }))}
                >
                    <option value='all'>Todos os status</option>
                    <option value='ativo'>Ativos</option>
                    <option value='inativo'>Inativos</option>
                </select>
                <button className='primary-btn w-fit px-6' onClick={buscar}>
                    Buscar
                </button>
            </div>
        </article>
    );
}
