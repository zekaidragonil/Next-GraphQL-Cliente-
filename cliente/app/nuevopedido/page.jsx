'use client'

import PedidoContext from "@/context/pedidos/PedidosContext";
import { useContext } from "react";
import AsignarCliente from "../components/pedidos/asignarcliente";
import AsignarProducto from "../components/pedidos/asignarProductos";
import Resumen from "../components/pedidos/resumen";
import Total from "../components/pedidos/Total";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AGREGAR_PEDIDO = gql`
mutation nuevoPedido($input: pedidoInput){
  nuevoPedido(input: $input){
    id
  }
}

`
 

const nuevoPedido =   () => {
  // utilizar context y extraer sus fucniones y valores
   const pedidoContext = useContext(PedidoContext);
   const  { cliente, total, productos } =  pedidoContext;   
   const [nuevoPedido ]  = useMutation(AGREGAR_PEDIDO)
   const router = useRouter();

  const validarPedido = () =>{
   return !productos.every(producto => producto.cantidad > 0 ) || total === 0 ? 'opacity-50 cursor-not-allowed'  : ''

  }

  const  crearNuevoPedido = async () =>{
    const id = cliente?.id
    const pedido = productos.map(({existencia, __typename, ...producto})=> producto)
     try {
      const {data } = await nuevoPedido({
        variables:{
          input: {
            cliente: id,
            total,
            pedido
          }
         
        }
      })
      Swal.fire(
        'Correcto',
        'El pedido se registro correctamente',
        'success'
      )
      router.push('/pedidos')
      
     } catch (error) {
       console.log(error)
     }
  }
 
    return (  
      <>
      
      <h1 className="text-2xl text-gray-800 mb-4">Crear Nuevo pedido</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
  
          <AsignarCliente />
        <AsignarProducto />
         <Resumen/>
         <Total />

           <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900  ${validarPedido()}`}
            onClick={()=> crearNuevoPedido()}
           >
            Registrar Pedido</button>
          </div>

        </div>
       
      </>

    );
}
 
export default nuevoPedido;