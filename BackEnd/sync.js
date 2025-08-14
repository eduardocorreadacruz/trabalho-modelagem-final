require('dotenv').config()
const conn = require('./db/conn')
const {Usuario, Compra, Produto} = require('./model/rel')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log("sincronização com o banco realizada com sucesso")
    }catch(err){
        console.error('erro ao sincronizar com o banco de dados',err)
    }finally{
        await conn.close()
        console.log('conexão com o banco fechada')
    }
}
syncDataBase()