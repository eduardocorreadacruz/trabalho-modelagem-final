require('dotenv').config()
const conn = require('./db/conn')
const {Usuario, Compra, Produto} = require('./model/rel')

async function importarProdutos() {
    const resp = await fetch('https://dummyjson.com/products?limit=100');
    const data = await resp.json();
    const produtos = data.products;
    for (const p of produtos) {
        await Produto.create({
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            discountPercentage: p.discountPercentage,
            stock: p.stock,
            brand: (typeof p.brand === 'string' && p.brand.trim() !== '') ? p.brand : 'Sem marca',
            thumbnail: p.thumbnail
        });
    }
    console.log('Produtos importados!');
}

async function importarUsuarios() {
    const resp = await fetch('https://dummyjson.com/users?limit=100');
    const data = await resp.json();
    const usuarios = data.users;
    for (const u of usuarios) {
        await Usuario.create({
            firstName: u.firstName,
            lastName: u.lastName,
            age: u.age,
            email: u.email,
            phone: u.phone,
            address: u.address.address,
            city: u.address.city,
            state: u.address.state,
            birthDate: u.birthDate
        });
    }
    console.log('Usuários importados!');
}

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        await importarProdutos();
        await importarUsuarios();
    }catch(err){
        console.error('erro ao sincronizar com o banco de dados',err)
    }finally{
        await conn.close()
        console.log('conexão com o banco fechada')
    }
}
syncDataBase()