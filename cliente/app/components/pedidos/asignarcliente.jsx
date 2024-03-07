'use client'

import PedidoContext from '@/context/pedidos/PedidosContext';
import { gql, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import ReactSelect from 'react-select';

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

const AsignarCliente = () => {
  const [cliente, setCliente] = useState()
  // context de pedidos
const pedidosContext = useContext(PedidoContext)
const { agregarCliente }  = pedidosContext;

// consulta de apollo
 const { loading, error, data } =  useQuery(OBTENER_CLIENTES);

    useEffect(()=>{
      agregarCliente(cliente)
    },[cliente])

      const selecionarCliente = clientes =>{
        setCliente(clientes)
      }

    if(loading)return 'Cargando..'  
    
       const { ObtnerCliente} = data

    return (  
   <>
     <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 p-2 text-sm text-gray-800 font-bold'>1.- Asigna un Cliente al pedido</p>
     <ReactSelect className='text-black mt-3' 
         options={ ObtnerCliente}
         onChange={ opcion => selecionarCliente(opcion)}
         getOptionLabel={opciones => opciones.nombre}
         getOptionValue={opciones => opciones.id}
         placeholder="Busque o seleciones el cliente "
         noOptionsMessage={()=> "No hay resultados "}
       />
    </>

    );
}
 
export default AsignarCliente;