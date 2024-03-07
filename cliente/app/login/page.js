'use client'
import React, { useState } from 'react'
import { useFormik  } from 'formik'
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput){
    autenticarUsuario(input: $input){
        token
    }
}

`

const Login = () => {
    const router = useRouter();
    const [mensaje, setMensaje] = useState(null)
    // mutation para logeear nuevo usuarios 

    const [ autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)

    const formik = useFormik ({
        initialValues:{
            email: '',
            password:''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('el email no es valido').email('El email es obligatorio'),
            password: Yup.string().required('El password es obligatorio')
          
        }),
        onSubmit: async valores =>{
          const { email, password } = valores;  
            try {
                const {data} = await autenticarUsuario({
                    variables: {
                        input:{
                         email,
                         password
                        }
                    
                    }
                });
                setMensaje('Autenticando...')
             const token = data.autenticarUsuario.token  
             
             localStorage.setItem('token', token)

             if(token){
                setTimeout(()=>{
                    setMensaje(null);
                    router.push('/')      
                   },2000)
             }
             

            } catch (error) {
                setMensaje(error.message);
          
          setTimeout(()=>{
           setMensaje(null)  
          },3000)
            }
        }
 })

 const mostrarMensaje = () => {
    return(
      <div className='bg-white  py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
          <h1 className='text-black'>{mensaje}</h1> 
      </div>
    )
    
}

    return (  
        <>
        
        <h1 className='text-center text-2xl text-white font-light'>login</h1>
        {mensaje && mostrarMensaje()}
        <div className='flex justify-center mt-5'>
            <div className='w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                <form 
               onSubmit={formik.handleSubmit}
                >
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input  onBlur={formik.handleBlur}   
                        onChange={formik.handleChange}
                          value={formik.values.email}  
                        type='email' id='email' placeholder='Email usuario' 
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
                        <input onBlur={formik.handleBlur}  
                        value={formik.values.password}  onChange={formik.handleChange}
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
                       value={'Iniciar sesion'}
                    />

                </form>

            </div>

        </div>
        </>
    );
}
 
export default Login;