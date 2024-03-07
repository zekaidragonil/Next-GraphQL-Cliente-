const { ApolloServer} = require('apollo-server');
const typeDefs = require('./db/shema')
const resolvers = require('./db/resolvers')
const conectarDB = require('./config/db')
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './env'});
// conectar a la base de dato 

conectarDB();

// servidor 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        console.log(req.headers)

        const token = req.headers['authorization'] || '';
        if(token){
            try {
                const usuario = jwt.verify(token,process.env.SECRETA );
               
                return {
                    usuario
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
});


server.listen().then(({url})=>{
    console.log(`tu puerto de servidor es ${url}`)
})