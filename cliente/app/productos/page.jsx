'use client'



import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Productos from "../components/producto";

const OBTENER_PRODUCTO = gql`
query ObtnerProducto{
    ObtnerProducto{
      id
    nombre
    existencia
    precio
    }
}

`
const Producto = () => {
 const {data , error, loading } = useQuery(OBTENER_PRODUCTO);

 if(loading) return 'Cargando...'


    return ( 
        <>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
        <Link href={'/nuevoproducto'} 
        className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-sm text-white 
        hover:bg-gray-800 mb-3 uppercase font-bold"
        > 
         Nuevo Producto
        </Link>   
  
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">existencia</th>
            <th className="w-1/5 py-2">precio</th>
            <th className="w-1/5 py-2">eliminar</th>
            <th className="w-1/5 py-2">Editar</th>
    
          </tr>
        </thead>
        <tbody>
          {data.ObtnerProducto.map(producto => (
            <Productos 
              key={producto.id}
            producto={producto} />
          ))}
          
        </tbody>
      </table>
      </>  
        
     );
}
 
export default Producto;