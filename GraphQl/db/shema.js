const { gql } = require("apollo-server");


//Schema 
const typeDefs = gql`
  
type Usuario {
    id : ID
    nombre: String
    apellido: String
    email: String
    creado: String

  }

  type Producto {
     id : ID
     nombre: String
     existencia: Int
     precio: Float
     creado: String

  }

  type Token {
    token: String
  }

  type Cliente{
    id : ID
    nombre: String
    apellido: String
    empresa: String
    email: String
    telefono: String
    creado: String
    vendedor : ID

  }

  type Pedido {
    id : ID  
    pedido: [PedidoGrupo]
    total: Float
    cliente:  [Cliente]
    vendedor: ID
    fecha: String
    estado : EstadoPedido
  }

  type PedidoGrupo{
    id :ID
    cantidad: Int
    nombre:String
    precio: Float
  }
  
  type TopCliente {
    total: Float
    cliente: [Cliente]
  }
  type TopVendedor {
    total: Float
    vendedor: [Usuario]
  }

  input usuarioInput {
     nombre: String!
     apellido: String!
     email: String!
     password:String!

  }

   input AutenticarInput{
    email: String!
    password: String!
   }

   input productoInput{
    nombre: String!
    existencia: Int!
    precio: Float!
   }

   input clienteInput{
    nombre: String!
     apellido: String!
     empresa: String!
     email: String!
     telefono: String


   }
 
   input pedidoProductoInput{
    id :ID
    cantidad: Int
    nombre: String
    precio: Float
     
   }
  

   input pedidoInput {
    pedido: [pedidoProductoInput]
    total: Float
    cliente: ID
    estado : EstadoPedido
   }

   enum EstadoPedido {
    PENDIENTE
    COMPLETADO
    CANCELADO

   }

  type  Query {
    #Usuarios
     obtenerUsuario: Usuario

     #Productos
     ObtnerProducto: [Producto]
     conseguirProducto(id: ID!) : Producto

     #Cliente
     ObtnerCliente: [Cliente]
     conseguirCliente : [Cliente]
     clienteEspecifico(id: ID!) : Cliente

     #Pedidos
     ObtnerPedido: [Pedido]
     obtenerPedidosVendedor : [Pedido]
     obtenerPedido(id: ID!): Pedido
     obtenerPedidoEstado(estado: String!): Pedido

     #busqueda avanzadad
     mejoresClientes : [TopCliente]
     mejoresVendedor : [TopVendedor]
     buscarProducto(texto: String!): [Producto]
  }
  

  type Mutation {
    #Usuarios
    nuevoUsuario(input: usuarioInput) : Usuario
    autenticarUsuario(input: AutenticarInput): Token
    
    #Productos

    nuevoProducto(input: productoInput): Producto
    actualizarProducto(id: ID!, input: productoInput) : Producto
    eliminarProducto(id: ID!): String

    #Clientes
    nuevoCliente(input: clienteInput): Cliente
    actualizarClinte(id: ID!, input: clienteInput) : Cliente
    eliminarCliente(id: ID!): String
   
    #Pedidos
    nuevoPedido(input: pedidoInput):Pedido
    actualizarPedido (id: ID!, input: pedidoInput ): Pedido
    eliminarPedido(id:ID!) : String

     
  }


`;

module.exports = typeDefs;


