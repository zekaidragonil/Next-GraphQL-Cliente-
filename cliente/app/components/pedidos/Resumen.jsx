import PedidoContext from "@/context/pedidos/PedidosContext";
import { useContext } from "react";
import ResumenProducto from "./Productoresumen";


const Resumen = () => {

   const pedidoContext = useContext(PedidoContext)
   const { productos } = pedidoContext
   
    return ( 
        <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 p-2 text-sm text-gray-800 font-bold'>3.- Ajusta la cantidades del producto</p>
      
          {productos.length > 0 ? (
             <>
               {productos.map(producto => (
                <ResumenProducto
                  key={producto.id}
                  producto={producto}
                />
               ))}
             </>
          ):(
            <p className="mt-5 text-sm text-black">Aun no hay productos</p>
          )}
        </>
     );
}
 
export default Resumen;