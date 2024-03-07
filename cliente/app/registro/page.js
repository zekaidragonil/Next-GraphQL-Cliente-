'use client'

import React, { useState } from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const NUEVA_CUENTA = gql`
mutation nuevoUsuario($input: usuarioInput){
  nuevoUsuario(input: $input){
    id
    nombre
    apellido
    email
  }
}   
`;

const Registro = () => {
 // mutation para crear nuevo usuarios
 const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA);
 const [mensaje, setMensaje] = useState(null)
 const router = useRouter();

    const formik = useFormik ({
    initialValues:{
        nombre: '',
        apellido:'',
        email: '',
        password:''
    },
    validationSchema: Yup.object({
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido: Yup.string().required('El apellido es obligatorio'),
        email: Yup.string().required().email('El email es obligatorio'),
        password: Yup.string().required('El password es obligatorio').min(6, 'El password debe ser minimo 6 caracteres'),
      
    }),
    onSubmit: async valores =>{
      const {nombre, apellido, email, password } =valores
        try {
       const { data } = await nuevoUsuario({
            variables:{
              input: {
                nombre,
                apellido,
                email,
                password

              }
            }
         })

      
       // Usuario creado corretamente el usuario

       setMensaje(`se creo correctamente el Usuario: ${data.nuevoUsuario.nombre}`)
       setTimeout(()=>{
        setMensaje(null);
        router.push('/login')
        
       },3000)
    

        } catch (error) {
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
        {mensaje && mostrarMensaje()}
        <h1 className='text-center text-2xl text-white font-light'>Registro</h1>

        <div className='flex justify-center mt-5'>
            <div className='w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
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
                         name='nombre' type='text' id='nombre' placeholder='Nombre usuario' 
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
                            Apeliido
                        </label>
                        <input onBlur={formik.handleBlur} 
                        onChange={formik.handleChange} 
                        value={formik.values.apellido}   
                        name='apellido' type='text' id='apellido' placeholder='apellido usuario' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                    {formik.errors.apellido && formik.touched.apellido ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.apellido}</p>

                      </div>
                    ): null}

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input onBlur={formik.handleBlur} 
                        value={formik.values.email} 
                         onChange={formik.handleChange} 
                         name='email' type='email' id='email' placeholder='Email usuario' 
                         className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>

                    
                    {formik.errors.email && formik.touched.email ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.email}</p>

                      </div>
                    ): null}

                    <div className='mb-4'>
                        <label 
                        className='block text-gray-700 text-sm font-bold mb-2 ' htmlFor='password '>
                            Passowrd
                        </label>
                        <input value={formik.values.password} 
                         onBlur={formik.handleBlur} 
                         onChange={formik.handleChange}
                        type='password' id='password' placeholder='password usuario'  
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ' />
                    </div>
                    
                    {formik.errors.password && formik.touched.password ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.password}</p>

                      </div>
                    ): null}

                    <input
                       type='submit'
                       className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
                       value='Registrar'
                    />

                </form>

            </div>

        </div>
        </>
    );
}
 
export default Registro;