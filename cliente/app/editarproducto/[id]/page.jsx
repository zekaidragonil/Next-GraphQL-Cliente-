
'use client'

import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const OBTENER_PRODUCTO_ESPECIFICO = gql`
query conseguirProducto($id: ID!){
    conseguirProducto(id:$id){
    nombre
    existencia
    precio
    
  }
}
`
const ACTUALIZAR_CLIENTE = gql`
mutation actualizarProducto($id: ID!, $input: productoInput){
    actualizarProducto(id: $id,  input: $input){
    nombre
    existencia
    precio
  }
}
`
const EditarCliente = () => {
    const {id} = useParams()
  const router = useRouter();
    const { data, loading, error } = useQuery(OBTENER_PRODUCTO_ESPECIFICO,{
        variables:{
            id
        }
    })
    const [actualizarProducto ] = useMutation(ACTUALIZAR_CLIENTE);

    const schemaValidacion =  Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      existencia: Yup.string().required('la existencia es obligatorio'),
      precio: Yup.string().required('El precio es obligatorio'),
    
  })

    if(loading) return 'Cargando...'

     const { conseguirProducto} = data
 
  const editarClienteDAtos = async (valores) =>{
 
    const {nombre, existencia, precio} = valores;             
    try {
      const { data } = await actualizarProducto({
        variables:{
          id,
          input: {
            nombre, 
            existencia,
            precio,
           
          }

        }
       }); 
     
      Swal.fire(
        'Cambio Exitoso',
         ' Actualizacion',
        'success'
      )
       router.push('/productos')

    } catch (error) {
      
    }
  }



    return ( 
        <>
     <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>
     {/* {mensaje && mostrarMensaje()} */}
     <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <Formik 
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={conseguirProducto}
            onSubmit={(valores, funciones ) =>{
               editarClienteDAtos(valores)
               

            }}
            >
            {props => {
               
               return(
            
                <form
                 onSubmit={props.handleSubmit}
                >
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                            Nombre
                        </label>
                        <input 
                        value={props.values.nombre} 
                         onBlur={props.handleBlur} 
                         onChange={props.handleChange}
                         name='nombre' type='text' id='nombre' placeholder='Nombre usuario' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                    {props.errors.nombre && props.touched.nombre ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.nombre}</p>

                      </div>
                    ): null}

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                        Existencia
                        </label>
                        <input 
                      value={props.values.existencia} 
                        onBlur={props.handleBlur} 
                         onChange={props.handleChange}  
                          type='number' id='existencia' placeholder='existencia ' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                    {props.errors.existencia && props.touched.existencia ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.existencia}</p>

                      </div>
                    ): null}

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>
                           Precio
                        </label>
                        <input 
                        value={props.values.precio} 
                       onBlur={props.handleBlur} 
                         onChange={props.handleChange}
                          type='number' id='precio' placeholder='precio' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                                          
                    {props.errors.precio && props.touched.precio ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.precio}</p>

                      </div>
                    ): null}

                   
                    <input
                       type='submit'
                       className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                       value='Editar Cliente'
                    />

                </form>
                   )
            }}
           </Formik>
            </div>

        </div>

      </>

     );
}
 
export default EditarCliente;


