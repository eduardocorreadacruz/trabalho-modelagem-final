let res = document.getElementById('res')

let usuarioListar = document.getElementById('usuarioListar')

usuarioListar.addEventListener('click', (e)=>{
    e.preventDefault()
    
    res.innerHTML = ''

    fetch(`http://localhost:3000/usuario`)
    .then(resp => resp.json())
    .then(dados => {
        dados.forEach(dad => {
            res.innerHTML += `O nome do Usuario cadastrado é: ${dad.nome} <br>`
        })

    })
    .catch((err)=>{
        console.error('Erro ao cadastrar o Usuario',err)
    })
})