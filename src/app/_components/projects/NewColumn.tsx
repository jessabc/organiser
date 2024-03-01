import AddNewColumnModal from './modals/AddNewColumnModal'


export default function NewColumn() {

    return (
        <>
            <div className='rounded-lg bg-gray-300 dark:bg-zinc-700 mt-20 h-screen'>
                <div className='text-gray-500 hover:text-gray-600 mt-20 mx-10  text-center w-44 font-semibold text-xl '>
                    <button >
                        <AddNewColumnModal/>
                    </button>
                </div>
            </div>
        </>
    )
}