
'use client'
import React from 'react'
import Link from 'next/link';
import { usePathname  } from 'next/navigation'; 

const Sidebar = () => {
const router = usePathname ();  

    return (  
        <>
         <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            <div>
                 <p className='text-white font-black text-2xl' >CRM cliente</p>
                </div> 
                <nav className='mt-5 list-none'>
                  <li className={router === '/' ? 'bg-blue-800 p-2': 'p-2'}>
                  <Link href={'/'} className='text-white mb-2 block font-bold'>           
                    Clientes
                   </Link>
                  </li>
    
                  <li className={router === '/pedidos' ? 'bg-blue-800 p-2': 'p-2'}>
                  <Link href={'/pedidos'} className='text-white mb-2 block font-bold' >
                Pedidos
                   </Link>
                  </li>

                  <li className={router === '/productos' ? 'bg-blue-800 p-2': 'p-2'}>
                  <Link href={'/productos'}  className='text-white mb-2 block font-bold' >
                    Productos
                   </Link>
                  </li>
                  
                  
                </nav>

         </aside>
        </>
    );
}
 
export default Sidebar;