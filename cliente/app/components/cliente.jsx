
import { gql, useMutation } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id: ID!){
    eliminarCliente(id:$id)
}

`

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

const Cliente = ({cliente}) => {

  const router = useRouter();

const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE,{
    update(cache){
        const { ObtnerCliente } = cache.readQuery({ query: OBTENER_CLIENTES })

        // rescribir el cache 
        cache.writeQuery({
            query: OBTENER_CLIENTES,
            data: {
                ObtnerCliente: ObtnerCliente.filter(clientActual => clientActual.id !== cliente.id )
            }
        })
    }
})



    // eliminar un cliente
    const eliminarClient = (id) =>{
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
                const {data} = await eliminarCliente({
                    variables:{
                        id
                    }
                })
                Swal.fire({
                    title: "Eliminado!",
                    text: data.eliminarCliente,
                    icon: "success"
                  });

               } catch (error) {
                console.log(error)
               }
             
            }
          });

    }

 const editarClient = (id) => { 
  router.push(`/editarcliente/${id}`)
 } 


    return ( 

        <tr key={cliente.id}>
        <td  className=" border mr-4 px4 py-2 text-black">{cliente.nombre} {cliente.apellido}</td>
        <td className=" ml-4 border px-4 py-2  text-black">{cliente.empresa}</td>
        <td className=" ml-4 border px-4 py-2  text-black">{cliente.email}</td>
        <td className="border px-4 py-2">
           <button onClick={()=> eliminarClient(cliente.id)}
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
        <button onClick={()=> editarClient(cliente.id)}
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
 
export default Cliente;