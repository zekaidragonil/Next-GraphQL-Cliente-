'use client'

import PedidoContext from '@/context/pedidos/PedidosContext';
import { gql, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import ReactSelect from 'react-select';

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
const AsignarProducto = () => {
    const [productos,  setProducto] = useState([])
    // context de pedidos
  const pedidosContext = useContext(PedidoContext)
  const { agregarProducto }  = pedidosContext;
  
  // consulta de apollo
   const { loading, error, data } =  useQuery(OBTENER_PRODUCTO);
  
      useEffect(()=>{
        agregarProducto(productos)
      },[productos])
  
        const selecionarProducto = productos =>{
            setProducto(productos)
        }
  
      if(loading)return 'Cargando..'  
      
         const { ObtnerProducto} = data
  


    return ( 
     <>
       <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 p-2 text-sm text-gray-800 font-bold'>2.- Asigna un Productos al pedido</p>

       <ReactSelect className='text-black mt-3' 
         options={ ObtnerProducto}
         isMulti={true}
         onChange={ opcion => selecionarProducto(opcion)}
         getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
         getOptionValue={opciones => opciones.id}
         placeholder="Busque o seleciona el producto "
         noOptionsMessage={()=> "No hay resultados "}
       />
    </>


     );
}
 
export default AsignarProducto;