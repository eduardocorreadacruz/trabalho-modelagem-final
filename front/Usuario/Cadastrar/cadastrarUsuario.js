let res = document.getElementById('res')

let usuarioCadastrar = document.getElementById('usuarioCadastrar')

usuarioCadastrar.addEventListener('click', (e)=>{
    e.preventDefault()
    let nome = document.getElementById('nome').value

    const valores = {
        nome: nome
    }

    res.innerHTML = ''

    fetch(`http://localhost:3000/usuario`,{
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados => {
        res.innerHTML += `O nome do usuario cadastrado é: ${dados.nome}`
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar o usuario',err)
    })
})