import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

const OBTENER_USER = gql`
  query obtenerUsuario{
    obtenerUsuario{
        id
        nombre
        apellido
    }
  }
 
`
const Header = () => {
 const { data, loading } = useQuery(OBTENER_USER)
 const router = useRouter();
 // proteger que no accedamos a data antes de tener resultados
  if(loading) return null;
  
  if(!data){
    return router.push('/login')
 }


 const {nombre, apellido} = data.obtenerUsuario 

 // Su no hay informacuion 


 const cerrarSesion = () =>{
    localStorage.removeItem('token')
    router.push('/login')
}

    return (  
    <div className="flex justify-between mb-6">
        <p className="mr-2 text-black ">Hola: {nombre} {apellido }</p>
        <button onClick={()=> cerrarSesion()} 
        type="button" 
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">
            cerrar Sesion
        </button>
        
    </div>  

    );
}
 
export default Header;