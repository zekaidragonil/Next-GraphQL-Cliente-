"use client";
import { gql, useQuery } from "@apollo/client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cliente from "./components/cliente";


const OBTENER_CLIENTES = gql`
query ObtnerCliente{
  ObtnerCliente{
    id
    nombre
    apellido
    empresa
    email
  }
}

`
export default function   index() {
  // consulta de Apollo
  const { loading, error, data } =  useQuery(OBTENER_CLIENTES);
  const router = useRouter();
  if(loading) return 'Cargando...'

  if(!data.ObtnerCliente){
    return router.push('/login')
 }

  return (
    <>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
      <Link href={'/nuevoCliente'} 
      className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-sm text-white 
      hover:bg-gray-800 mb-3 uppercase font-bold"
      > 
       Nuevo cliente
      </Link>   

    <table className="table-auto shadow-md mt-10 w-full w-lg">
      <thead className="bg-gray-800">
        <tr className="text-white">
          <th className="w-1/5 py-2">Nombre</th>
          <th className="w-1/5 py-2">Empresa</th>
          <th className="w-1/5 py-2">Email</th>
          <th className="w-1/5 py-2">Opciones</th>
          <th className="w-1/5 py-2">Editar</th>
  
        </tr>
      </thead>
      <tbody>
        {data.ObtnerCliente.map(cliente => (
          <Cliente 
            key={cliente.id}
          cliente={cliente} />
        ))}
        
      </tbody>
    </table>
    </>  
   
  )
}
