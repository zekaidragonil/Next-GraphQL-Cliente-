

import { gql, useMutation } from "@apollo/client";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";




const ELIMINAR_PRODUCTO = gql`
mutation eliminarProducto($id: ID!){
  eliminarProducto(id:$id)
}

`
const OBTENER_PRODUCTO = gql`
query ObtnerProducto{
    ObtnerProducto{
    nombre
    existencia
    precio
  }
}
`




const Productos = (producto) => {
  const router = useRouter();
 const { nombre, existencia, precio, id } = producto.producto;
 

 const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO,{
     update(cache){
         const { ObtnerProducto } = cache.readQuery({ query: OBTENER_PRODUCTO })
 
         // rescribir el cache 
         cache.writeQuery({
             query: OBTENER_PRODUCTO,
             data: {
              ObtnerProducto: ObtnerProducto.filter(clientActual => clientActual.id !== id)
             }
         })
     }
 })
 

 // eliminar un producto
 const eliminarProduct = (id) =>{
  Swal.fire({
      title: "Estas seguro",
      text: "Estas opcion no puede ser reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!"
    }).then(async(result) => {
      if (result.isConfirmed) {
         try {
          
          const {data} = await eliminarProducto({
              variables:{
                  id
              }
          })
          
          Swal.fire({
              title: "Eliminado!",
              text: data.eliminarProducto,
              icon: "success"
            });

         } catch (error) {
          console.log(error)
         }
       
      }
    });

}

const editarProducto = (id) => { 
  router.push(`/editarproducto/${id}`)
 } 
   
    return ( 
        <tr key={id}>
        <td  className=" border mr-4 px4 py-2 text-black">{nombre} </td>
        <td className=" ml-4 border px-4 py-2  text-black">{existencia}</td>
        <td className=" ml-4 border px-4 py-2  text-black">{precio}</td>
        <td className="border px-4 py-2">
           <button onClick={()=> eliminarProduct(id)}
             type="button"
              className="flex justify-center  items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          >
            eliminar
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
         <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
          
           </button>
         

        </td>
        <td>
        <button onClick={()=> editarProducto(id)}
             type="button"
              className="flex justify-center  items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          >
            Editar
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
         <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
          
           </button>
        </td>
      </tr>

     );
}
 
export default Productos;