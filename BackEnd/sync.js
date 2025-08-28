require('dotenv').config()
const conn = require('./db/conn')
const { Usuario, Produto, Compra } = require('./model/rel')
const moment = require('moment')

async function syncAndPopulateDatabase() {
    try {
        await conn.sync({ force: true })
        console.log("Sincronização com o banco realizada com sucesso.")

        console.log("Iniciando o cadastro de usuários...")
        const usersRes = await fetch('https://dummyjson.com/users')
        if (!usersRes.ok) {
            throw new Error("Não foi possível carregar os dados de usuários da DummyJSON.")
        }
        const usersData = await usersRes.json()
        
        const usuariosMapeados = usersData.users
            .filter(user => user.firstName && user.lastName)
            .map(user => {
                const birthDateFormatted = moment(user.birthDate, 'YYYY-M-D').toISOString() 
                
                return {
                    idUsuario: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    email: user.email,
                    phone: user.phone,
                    address: user.address.address,
                    city: user.address.city,
                    state: user.address.state,
                    birthDate: birthDateFormatted,
                }
            })
        const usuariosCriados = await Usuario.bulkCreate(usuariosMapeados)
        console.log(`usuários cadastrados com sucesso.`)

        console.log("Iniciando o cadastro de produtos...")
        const productsRes = await fetch('https://dummyjson.com/products')
        if (!productsRes.ok) {
            throw new Error("Não foi possível carregar os dados de produtos da DummyJSON.")
        }
        const productsData = await productsRes.json()
        
        const produtosMapeados = productsData.products
            .filter(produto => produto.brand)
            .map(produto => {
                return {
                    idProduto: produto.id,
                    title: produto.title,
                    description: produto.description,
                    category: produto.category,
                    price: produto.price,
                    discountPercentage: produto.discountPercentage,
                    stock: produto.stock,
                    brand: produto.brand,
                    thumbnail: produto.thumbnail
                }
            })
        const produtosCriados = await Produto.bulkCreate(produtosMapeados)
        console.log(`produtos cadastrados com sucesso.`)
        
    } catch (err) {
        console.error('Erro ao sincronizar ou popular o banco de dados:', err)
        
    } finally {
        console.log('Processo finalizado.')
        process.exit()
    }
}

syncAndPopulateDatabase()