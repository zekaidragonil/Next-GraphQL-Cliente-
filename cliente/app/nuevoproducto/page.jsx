'use client'


import React, { useState } from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const NUEVO_PRODUCTO = gql`
mutation nuevoProducto($input: productoInput){
    nuevoProducto(input: $input){
      id
      nombre
      existencia
      precio
    }
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



const nuevoCliente = () => {
    const [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO,{
      update(cache, {data: nuevoProducto}){
        // obtenemos el nuevo cache que queremos actualizar
        const {ObtnerProducto} = cache.readQuery({query: OBTENER_PRODUCTO})
        // resscribimos el cache no se debe de modificar 
        cache.writeQuery({
          query:OBTENER_PRODUCTO,
          data :{
            ObtnerProducto : [
            ...ObtnerProducto, nuevoProducto
          ]

          }
        })
      }

    });
    const [mensaje, setMensaje] = useState(null)
    const router = useRouter()
    const formik = useFormik ({
        initialValues:{
            nombre: '',
            existencia:'',
            precio: '',
             
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            existencia: Yup.string().required('El apellido es obligatorio'),
            precio: Yup.string().required('El precio es obligatorio'),
          
        }),
        onSubmit: async valores =>{
         
          const {nombre, existencia, precio } = valores
            try {
           const { data } = await nuevoProducto({
                variables:{
                  input: {
                    nombre,
                    existencia,
                    precio,
    
                  }
                }
             })
          
        setMensaje(`se creo correctamente el Producto: ${data.nuevoProducto.nombre}`)
       setTimeout(()=>{
        setMensaje(null);
        router.push('/productos')
        
       },3000)
            } catch(error){
             
                setMensaje(error.message);
                setTimeout(()=>{
                    setMensaje(null)  
                   },3000)
                
        }
        }
    });



    const mostrarMensaje = () => {
        return(
          <div className='bg-white  py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
              <h1 className='text-black'>{mensaje}</h1> 
          </div>
        )
        
    }

    return ( 
      <>
     <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>
     {mensaje && mostrarMensaje()}
     <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                <form
                  onSubmit={formik.handleSubmit}
                >
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                            Nombre
                        </label>
                        <input value={formik.values.nombre} 
                         onBlur={formik.handleBlur} 
                         onChange={formik.handleChange}
                         name='nombre' type='text' id='nombre' placeholder='Nombre Producto' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                    {formik.errors.nombre && formik.touched.nombre ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.nombre}</p>

                      </div>
                    ): null}

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                            Existencia
                        </label>
                        <input onBlur={formik.handleBlur} 
                        onChange={formik.handleChange} 
                        value={formik.values.existencia}   
                       type='number' id='existencia' placeholder='existencia' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                    {formik.errors.existencia && formik.touched.existencia ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.existencia}</p>

                      </div>
                    ): null}

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Precio
                        </label>
                        <input onBlur={formik.handleBlur} 
                        value={formik.values.precio} 
                         onChange={formik.handleChange} 
                         name='precio' type='number' id='email' placeholder='precio' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                    
                    {formik.errors.precio && formik.touched.precio ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.precio}</p>

                      </div>
                    ): null}

                    <input
                       type='submit'
                       className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                       value='Registrar Producto'
                    />

                </form>

            </div>

        </div>

      </>

     );
}
 
export default nuevoCliente;


