
'use client'

import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import PedidosDa from "../components/PedidosDas";


const OBTENER_PEDIDOS = gql`
query ObtnerPedido{
  ObtnerPedido{
      id
       pedido{
        id
        cantidad
        nombre
       },
       cliente{
        id
        nombre
        apellido
        email
        telefono
       }
       vendedor
       total
       estado
    }
}

`

export default function Pedidos() {
 
  const {data , error, loading } = useQuery(OBTENER_PEDIDOS);

  if(loading) return 'cargando'
  
  console.log(data)

  // const { ObtnerPedido } = data

    return (
      <>
      <h1 className="text-2xl text-gray-800">desde Pedidos</h1>
    
      <Link href={'/nuevopedido'} 
        className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-sm text-white 
        hover:bg-gray-800 mb-3 uppercase font-bold"
        > 
         Nuevo Pedido
        </Link>  

        {/* {ObtnerPedido.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos aun</p>
        
          ):(
            ObtnerPedido.map(pedido => (
              <PedidosDa 
                key={pedido.id}
                pedido={pedido}
              />
            ))
        )} */}
      </>  
     
    )
  }
  