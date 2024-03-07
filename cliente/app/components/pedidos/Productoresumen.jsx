import PedidoContext from "@/context/pedidos/PedidosContext";
import { useContext, useEffect, useState } from "react";


const ResumenProducto = ({producto}) => {
    const [cantidad, setCantidad]= useState(0)
    const pedidoContext = useContext(PedidoContext)
    const { cantidadProductos, actualizarTotal } = pedidoContext;

   useEffect(()=> {
    actualizarCantidad();
    actualizarTotal();
   },[cantidad])

 const actualizarCantidad = () =>{
   const nuevoProducto = {...producto, cantidad:Number(cantidad)}
   cantidadProductos(nuevoProducto)
 }

    return (  
        <>
         <div>
            <div className="md:flex md:justify-between md:items-center mt-5">
                <div className="md:w-2/4 mb-2 md:mb-0">
                    <p className="text-sm text-black">{producto.nombre}</p>
                    <p  className=" text-black" >$ {producto.precio}</p>

                </div>
                <input type="number" 
                placeholder="cantidad"
                className="shadow appearance-none broder rounded w-full py-2 px-3 text-gray-700 leading-tight focu:outline-none focus:shadow md:ml-4"
                onChange={(e)=> setCantidad(e.target.value)}
                value={cantidad}
                />
            </div>           
         </div>
        </>
    );
}
 
export default ResumenProducto;