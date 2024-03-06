export default function Loading() {
 
    return (
        <div className="w-2/3 mx-auto">
            <div className='m-5'>
                <p className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-5" ></p>
                <form className='flex flex-col gap-2'>
                    <label className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3" ></label>
                    <input 
                        className=' rounded-sm py-1 my-1  pl-2 outline-none  mb-2 bg-gray-200  dark:bg-gray-700 animate-pulse'/>
                    <label className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3" ></label>
                    <ul>
                        <li  className='flex items-center'>
                            <input
                                className=' rounded-sm py-1 my-1 text-gray-900 pl-2 outline-none  w-full mr-1  bg-gray-200  dark:bg-gray-700 animate-pulse'/>
                        </li>
                    </ul>
                        <input 
                            className='text-gray-50 py-2 my-2 cursor-pointer w-full bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse' 
                        />
                        <input 
                            className='text-gray-50 py-2 my-2 cursor-pointer w-full bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse' 
                        />
                </form>
            </div>
        </div>
    )
}

