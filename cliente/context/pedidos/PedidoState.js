import React, { useReducer } from 'react'
import PedidoReducer from './PedidoReducer'
import PedidoContext from './PedidosContext'

import {
    SELECIONAR_CLIENTE,
    SELECIONAR_PRODUCTO,
    CANTIDAD_PRODUCTO,
    ACTUALIZAR_TOTAL

}from '../../types'


const PedidoState = ({children}) =>{
     const initialState = {
        cliente: {},
        productos: [],
        total: 0
     } 

     const [state, dispatch ] = useReducer(PedidoReducer, initialState )

const agregarCliente =  cliente => {
 dispatch({
    type: SELECIONAR_CLIENTE,
    payload: cliente
 })

}

const agregarProducto = productosSelecionado => {
    let nuevoState;
    if(state.productos.length > 0){
        // tomar una coopu
        nuevoState = productosSelecionado.map(producto => {
            const nuevoObjecto = state.productos.find(produductState =>  produductState.id === producto.id);
            return {...producto, ...nuevoObjecto}
        })

    }else{
        nuevoState = productosSelecionado;
    }


    dispatch({
        type: SELECIONAR_PRODUCTO,
        payload: nuevoState
    })
   
} 

  // modifica la cantidad de los productos 
  const cantidadProductos = nuevoProducto =>{
   
    dispatch({
        type: CANTIDAD_PRODUCTO,
        payload: nuevoProducto
    })
     
  }

  const actualizarTotal = () =>{
   
    dispatch({
        type: ACTUALIZAR_TOTAL,
      
    })
  }

    return(
     <PedidoContext.Provider
      value={{
        cliente: state.cliente,
        total: state.total,
        productos: state.productos,
        agregarCliente,
        agregarProducto,
        cantidadProductos,
        actualizarTotal
      }}
     >

         {children}
     </PedidoContext.Provider>

     )
}

export default PedidoState