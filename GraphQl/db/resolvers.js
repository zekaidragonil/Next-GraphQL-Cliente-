const Usuario = require('../models/usuarios');
const Producto = require('../models/productos');
const Cliente = require('../models/cliente');
const Pedido = require('../models/pedido');
const bcryptjs = require('bcryptjs')
require('dotenv').config({path: './.env'})
const jwt = require('jsonwebtoken');


 const crearToken = (usuario, secreta, expiresIn) => {
 
  const { id, email, nombre, apellido } = usuario; 

  return jwt.sign({id, email, nombre, apellido}, secreta, {expiresIn})
}

// Resolver
const resolvers = {
    Query: {
        obtenerUsuario: async (_, {}, ctx) => {
           return ctx.usuario
        },
        ObtnerProducto: async () => {
            try {
                const productoID = await Producto.find({})

                return productoID;
            } catch (error) {
                console.log(error)
            }
        
        },
        conseguirProducto: async (_, {id}) =>{
            const  producto = await Producto.findById(id);

         
            if(!producto){
                throw new Error('Producto no encontrado');
            } 
            return producto;
        },
        ObtnerCliente: async () => {
            try {
                const ClienteID = await Cliente.find({})

                return ClienteID;
            } catch (error) {
                console.log(error)
            }
        
        },
        conseguirCliente: async (_, {}, ctx) =>{
            try {
                const ClienteID = await Cliente.find({vendedor: ctx.usuario.id.toString() })

                return ClienteID;
            } catch (error) {
                console.log(error)
            }
        },

        clienteEspecifico: async (_, {id}, ctx) =>{
            const  cliente = await Cliente.findById(id);

         
            if(!cliente){
                throw new Error('Cliente no encontrado');
            } 

            //  quien lo creo puede verlo

            if(cliente.vendedor.toString() !== ctx.usuario.id){
                throw new Error('no tiene la credenciales');
            }

            return cliente;
        },
        ObtnerPedido: async () => {
           try {
           const pedidos = await Pedido.find({});
           
           return pedidos   

           } catch (error) {
            console.log(error)
           }
        },
        obtenerPedidosVendedor: async (_,{}, ctx) => {
            try {
                const pedidos = await Pedido.find({vendedor: ctx.usuario.id});
                console.log(pedidos)
                return pedidos   
     
                } catch (error) {
                 console.log(error)
                }
 
        },
        obtenerPedido: async (_,{id}, ctx) => {
            
          const pedido = await Pedido.findById(id)

          if(!pedido){
            throw new Error('Pedido no enctrado')
          }

          if(pedido.vendedor.toString() !== ctx.usuario.id){
            throw new Error('Opcion no permitidas');
          }
         
          // retornar el resultado
          return pedido

        },
        obtenerPedidoEstado: async (_,{ estado}, ctx) => {
          const pedidos = await Pedido.find({vendedor: ctx.usuario.id, estado: estado});

          return pedidos
        },
        mejoresClientes: async () => {
         const clientes = await Pedido.aggregate([
              {$match : {estado: "COMPLETADO"} },
              { $group : {
                 _id : "$cliente",
                 total: { $sum: '$total'}
              }},
              {
                $lookup: {
                    from : 'cliente',
                    localFiel: '_id',
                    foreingFiel: "_id",
                    as: "cliente"
                }
              },
              {
                $limit: 10
              },
              {
                $sort : { total : -1}
              }
         ])
         return clientes
        },
        mejoresVendedor:async () => {
          const vendedores = await Pedido.aggregate([
            {$match : {estado: "COMPLETADO"} },
            { $group : {
               _id : "$vendedor",
               total: { $sum: '$total'}
            }},
            {
                $lookup: {
                    from : 'usuarios',
                    localFiel: '_id',
                    foreingFiel: "_id",
                    as: "vendedor"
                }
              },
              {
                $limit: 3
              },
              {
                $sort : { total : -1}
              }

          ])
          return vendedores
        },
        buscarProducto: async(_,{texto}) => {
         const productos = await Producto.find({$text: { $search: texto }}).limit(10)  
         return productos
        }

        },

        Mutation: {
            nuevoUsuario: async (_, {input}) => {

            const { email, password } = input;     
              
           // Revisarsielusuario ya esta registrado
            const exiteUsuario = await Usuario.findOne({email});
            if(exiteUsuario){
             throw new Error('el  Usuarios ya esta registrado ')
            }

            const salt = await bcryptjs.genSaltSync(10);
            input.password = await bcryptjs.hashSync(password, salt);      

              
             try {
                const usuarios = new Usuario(input)
                usuarios.save();
                return usuarios
             } catch (error) {
                console.log(error)
             }

            },
            autenticarUsuario : async (_, {input}) => {
                const {email, password} = input
                // si el usuario existe 
                const existeUsuario = await Usuario.findOne({email});
                if(!existeUsuario){
                    throw new Error('el  Usuarios no existe ')
                   }
                   // revisar si el password existe 
                const passworCorrecto = await bcryptjs.compare(password,existeUsuario.password  )
                if(!passworCorrecto){
                    throw new Error('el  password es incorrecto ')
                   }

                   return{
                   token: crearToken(existeUsuario,process.env.SECRETA, '24h')
                   }

            },

            nuevoProducto: async(_,{input}) => {
               try {
                const producto = new Producto(input)
                 const resultado = await producto.save();
                 return resultado
                
               } catch (error) {
                console.log(error)
               }
            },
            actualizarProducto: async (_, {id, input}) => {
               let  producto = await Producto.findById(id);

                if(!producto){
                    throw new Error('Producto no encontrado');
                } 

                //actualizar en la base de datos
                producto = await Producto.findOneAndUpdate({_id : id}, input, {new: true})


            },
            eliminarProducto: async (_, {id}) =>{
                let  producto = await Producto.findById(id);

                if(!producto){
                    throw new Error('Producto no encontrado');
                } 

                //eliminar
                await Producto.findOneAndDelete({_id: id});

                return "Producto Eliminado...";
            },

            nuevoCliente: async (_, {input}, ctx) => {

                const { email } = input

             const cliente = await Cliente.findOne({email});
             if(cliente){
               throw new Error('El cliente ya esta registtrado')
             }

             const nuevoCliente = new Cliente(input)

             //asignaar el vendedor
             nuevoCliente.vendedor = ctx.usuario.id

              // guardar en labase de dato

              try {
                const resultado = await nuevoCliente.save();
                return resultado;
              } catch (error) {
                console.log(error)
              }
            },

            actualizarClinte: async (_, {id, input}) => {
           

                let  cliente = await Cliente.findById(id);
 
                 if(!cliente){
                     throw new Error('Cliente no encontrado');
                 } 
 
                 //actualizar en la base de datos
                 cliente = await Cliente.findOneAndUpdate({_id : id}, input, {new: true})
                
             },
             eliminarCliente: async (_, {id}, ctx) =>{
                let  cliente = await Cliente.findById(id);

                if(!cliente){
                    throw new Error('Cliente no encontrado');
                } 
                
                if(cliente.vendedor.toString() !== ctx.usuario.id){
                    throw new Error('No tienes la credenciales');
                }

                //eliminar
                await Cliente.findOneAndDelete({_id: id});

                return "Cliente Eliminado...";
            },

            nuevoPedido: async (_, {input}, ctx) => {
          
               const { cliente  } = input
                // verifciar si el cliente exite 
                let  existeCliente = await Cliente.findById(cliente);
                if(!existeCliente){
                    throw new Error('Cliente no encontrado');
                } 
                 console.log(cliente)
                
                // verifcar si es cliente del vendedor
                // if(cliente.vendedor.String() !== ctx.usuario.id){
                //     throw new Error('No tienes la credenciales');
                // }
                // Revisar que el stock hay producto
              for await (const articulo of input.pedido){
                const { id } = articulo;
                 const producto = await Producto.findById(id);
                 
                 if(articulo.cantidad > producto.existencia){
                    throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
                 } else{
                    // Restar  la cantidad de los productos
                    producto.existencia = producto.existencia - articulo.cantidad;

                    await producto.save();
                 }
             }

             const nuevoPedido = new Pedido(input);
             // asignale un vededor
             nuevoPedido.vendedor = ctx.usuario.id;

             // guardar en la base deatos
             const resultado  =  await nuevoPedido.save();
             return resultado;
            },
            actualizarPedido: async (_,{id, input}, ctx) => {
                const {cliente } = input
              // si el pedido existe 
              const existePedido = await Pedido.findById(id)
              if(!existePedido){
                throw new Error('El pedido no existe ')
              }
            

              // si el cliente existe 
              const existeCliente = await Cliente.findById(cliente)
              if(!existeCliente){
                throw new Error('El pedido no existe ')
              }

              // si el cliente y pedido pertenece al vendedor
                  if(existeCliente.vendedor.toString() !== ctx.usuario.id){
                    throw new Error('No tienes la credenciales');
                }
              // revisar el stock

              for await (const articulo of input.pedido){
                const { id } = articulo;
                 const producto = await Producto.findById(id);
                 
                 if(articulo.cantidad > producto.existencia){
                    throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
                 } else{
                    // Restar  la cantidad de los productos
                    producto.existencia = producto.existencia - articulo.cantidad;

                    await producto.save();
                 }
             }

              // guardar el pediod

             const resultado = await Pedido.findOneAndUpdate({_id: id}, input, {new: true})
             return resultado

            },
            eliminarPedido : async (_, {id}, ctx) =>{
            
                const pedido = await Pedido.findById(id);
                if(!pedido){
                    throw new Error('el pedido no exites')
                }
                if(pedido.vendedor.toString() !== ctx.usuario.id){
                    throw new Error('No tienes las credenciales')
                }
                // eliminar de la base de datos
                 await Pedido.findOneAndDelete({_id: id})
                 return "Pedido Eliminar"

            }

        }
    }



module.exports = resolvers;