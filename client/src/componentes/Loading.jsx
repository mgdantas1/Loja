export default function Loading() {
    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center gap-8'>
            <div className='relative aspect-square h-40 animate-spin rounded-full bg-conic from-transparent to-black'>
                <div className='absolute top-1/10 left-1/10 aspect-square h-4/5 rounded-full bg-white'></div>
            </div>
            <p className='text-xl font-semibold text-gray-500'>Carregando produtos...</p>
        </div>
    );
}
