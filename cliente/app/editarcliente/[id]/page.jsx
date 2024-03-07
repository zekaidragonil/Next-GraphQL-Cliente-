'use client'

import { gql, useMutation, useQuery } from '@apollo/client';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const OBTENER_CLIENTES = gql`
query clienteEspecifico($id: ID!){
clienteEspecifico(id:$id){
    nombre
    apellido
    empresa
    email
    telefono
    
  }
}
`
const ACTUALIZAR_CLIENTE = gql`
mutation actualizarClinte($id: ID!, $input: clienteInput){
  actualizarClinte(id: $id,  input: $input){
    nombre
    apellido
    email
    empresa
    telefono
  }
}
`
const EditarCliente = () => {
    const {id} = useParams()
  const router = useRouter();
    const { data, loading, error } = useQuery(OBTENER_CLIENTES,{
        variables:{
            id
        }
    })
    const [actualizarClinte ] = useMutation(ACTUALIZAR_CLIENTE);

    const schemaValidacion =  Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      apellido: Yup.string().required('El apellido es obligatorio'),
      email: Yup.string().required().email('El email es obligatorio'),
      empresa: Yup.string().required('La empresa es obligatorio'),
    
  })

    if(loading) return 'Cargando...'

     const { clienteEspecifico} = data
 
  const editarClienteDAtos = async (valores) =>{
 
    const {nombre, apellido, empresa, email , telefono } = valores;             
    try {
      const { data } = await actualizarClinte({
        variables:{
          id,
          input: {
            nombre, 
            apellido,
            empresa,
            email,
            telefono
          }

        }
       }); 
     
      Swal.fire(
        'Cambio Exitoso',
         ' Actualizacion',
        'success'
      )
       router.push('/')

    } catch (error) {
      
    }
  }



    return ( 
        <>
     <h1 className="text-2xl text-gray-800 font-light">Editar Clientes</h1>
     {/* {mensaje && mostrarMensaje()} */}
     <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <Formik 
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={clienteEspecifico}
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
                            Apeliido
                        </label>
                        <input 
                      value={props.values.apellido} 
                        onBlur={props.handleBlur} 
                         onChange={props.handleChange} 
                        name='apellido' type='text' id='apellido' placeholder='apellido usuario' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                    {props.errors.apellido && props.touched.apellido ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.apellido}</p>

                      </div>
                    ): null}

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input 
                        value={props.values.email} 
                       onBlur={props.handleBlur} 
                         onChange={props.handleChange}
                         name='email' type='email' id='email' placeholder='Email usuario' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                                          
                    {props.errors.email && props.touched.email ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.email}</p>

                      </div>
                    ): null}

                    <div className='mb-4'>
                        <label 
                        className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='empresa '>
                            Empresa
                        </label>
                        <input
                       value={props.values.empresa} 
                         onBlur={props.handleBlur} 
                         onChange={props.handleChange}
                        type='text' id='empresa' placeholder='empresa usuario'  
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>
                    
                    {props.errors.empresa && props.touched.empresa ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.empresa}</p>

                      </div>
                    ): null}

                     <div className='mb-4'>
                        <label 
                        className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='telefono '>
                            Telefono
                        </label>
                        <input 
                       value={props.values.telefono} 
                         onBlur={props.handleBlur} 
                         onChange={props.handleChange}
                        type='text' id='telefono' placeholder='telefono usuario'  
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>
                    
                    {props.errors.telefono && props.touched.telefono ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{props.errors.telefono}</p>

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