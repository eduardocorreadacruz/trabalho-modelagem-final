document.addEventListener('DOMContentLoaded', () => {
  const buscarIdInput = document.getElementById('buscarIdUsuario')
  const btnBuscarUsuario = document.getElementById('btnBuscarUsuario')
  
  const dadosUsuarioDiv = document.createElement('div')
  dadosUsuarioDiv.id = 'dadosUsuario'
  
  const mensagemDiv = document.createElement('div')
  mensagemDiv.id = 'mensagem'
  
  document.body.appendChild(dadosUsuarioDiv)
  document.body.appendChild(mensagemDiv)

  btnBuscarUsuario.addEventListener('click', async () => {
    dadosUsuarioDiv.innerHTML = ''
    mensagemDiv.textContent = ''

    const id = buscarIdInput.value

    try {
      const response = await fetch(`http://localhost:3000/usuario/${id}`)
      
      if (!response.ok) {
        throw new Error('Usuário não encontrado.')
      }
      
      const usuario = await response.json()
      
      dadosUsuarioDiv.innerHTML = `
            <h3>Detalhes do Usuário</h3>
            <td>ID: ${usuario.idUsuario}</td><br>
            <td>Nome: ${usuario.firstName} ${usuario.lastName}</td><br>
            <td>Idade: ${usuario.age}</td><br>
            <td>Email: ${usuario.email}</td><br>
            <td>Telefone: ${usuario.phone}</td><br>
            <td>Endereço: ${usuario.address}</td><br>
            <td>Cidade: ${usuario.city}</td><br>
            <td>Estado: ${usuario.state}</td><br>
            <td>Data de Nascimento: ${usuario.birthDate}</td><br>
            
        `
    } catch (err) {
      mensagemDiv.textContent = `Erro: ${err.message}`
    }
  })
})