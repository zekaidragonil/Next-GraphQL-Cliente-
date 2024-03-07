
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";


const ACTUALIZAR_ESTADO = gql`
mutatuin actualizarPedido($id: ID!, $input: pedidoInput){
    actualizarPedido(id: $id, input: $input){
        estado
    }
}

`

const PedidosDa = ({pedido}) => {
    const {  id, cliente:{nombre, apellido, email, telefono}, estado, total, cliente  } = pedido
    const  [ actualizarPedido] = useMutation(ACTUALIZAR_ESTADO)
    
    const [ estadoPedido , setEstadoPedido ] = useState(estado)
    const [ clase , setClase ] = useState('')


  useEffect(()=>{
    if(estadoPedido){
        setEstadoPedido(estadoPedido)
    }
    clasePedido();
  },{estadoPedido})
  

  // modifcar el color de pedido 

  const clasePedido = () =>{
    if(estadoPedido === 'PENDIENTE'){
          setClase('border-yellow-500')
    }else if(estadoPedido === 'COMPLETADO'){
        setClase('border-green-500')
    }else{
        setClase('border-red-800')
    }
  }

  const cambiarEstado =async estadoNuevo =>{
       try {
         const { data} = await actualizarPedido({
            variables:{
                id,
                input:{
                   estado: estadoNuevo,
                   cliente: cliente.id
                }

            }

         })

         setEstadoPedido(data.actualizarPedido.estado)
       } catch (error) {
        console.log(error)
       }

  }

    return ( 
      <div className={` ${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg  `}>
        <div>
           <p className="font-bold text-gray-800">Cliente: {nombre} {apellido}</p>
           <h2 className="text-gray-800 font-bold mt-10">Estado Pedido </h2>
           <select onChange={e => cambiarEstado(e.target.value)} 
           value={estado} className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600  focus:border-blue-500 uppercase text-xs font-bold">
            <option value="COMPLETADO">COMPLETADO</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="CANCELADO">CANCELADO</option>

           </select>
        </div>
        <div>
            <h2 className="text-gray-800 font-bold mt-2 ">Resumen del pedido</h2>
            {pedido.pedido.map(articulo => (
                <div key={articulo.id} className="mt-4">
                     <p className="text-sm text-gray-600" >Producto: {articulo.nombre}</p>
                     <p className="text-sm text-gray-600" >Cantidad: {articulo.cantidad} </p>

                </div>
            ))}

            <p className="text-gray-800 mt-3 font-bold">Total a pagar: 
               <span className=" font-light "> ${total} </span>
            </p>

            <button className="flex items-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight  font-bold uppercase text-xs  ">
                 eliminar
            </button>
        </div>
      </div>

     );
}
 
export default PedidosDa;