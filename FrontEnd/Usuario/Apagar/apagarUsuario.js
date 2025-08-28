document.addEventListener('DOMContentLoaded', () => {
  const buscarIdInput = document.getElementById('buscarIdUsuario')
  const btnBuscarUsuario = document.getElementById('btnBuscarUsuario')
  const dadosUsuarioDiv = document.getElementById('dadosUsuario')
  const mensagemDiv = document.getElementById('mensagem')
  const btnApagarUsuario = document.getElementById('btnApagarUsuario')

  btnBuscarUsuario.addEventListener('click', async () => {
    dadosUsuarioDiv.innerHTML = ''
    mensagemDiv.textContent = ''
    btnApagarUsuario.style.display = 'none'

    const id = buscarIdInput.value 

    try {
      const response = await fetch(`http://localhost:3000/usuario/${id}`) 
      
      if (!response.ok) {
        throw new Error('Usuário não encontrado.') 
      }
      
      const usuario = await response.json() 
      
      dadosUsuarioDiv.innerHTML = `
        <p><strong>ID:</strong> ${usuario.idUsuario}</p>
        <p><strong>Nome:</strong> ${usuario.firstName} ${usuario.lastName}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
      ` 

      btnApagarUsuario.style.display = ''
      btnApagarUsuario.dataset.userId = usuario.id
    } catch (error) {
      mensagemDiv.textContent = `Erro: ${error.message}`
    }
  })

  btnApagarUsuario.addEventListener('click', async () => {
    const userId = btnApagarUsuario.dataset.userId 
    
    const confirmacao = confirm(`Tem certeza que deseja apagar o usuário com ID ${userId}?`) // isso aqui vai confirmar uma requisição usando a função confirm()

    if (confirmacao) { //se clicar no botão confirmar ele comea esse if para apagar o id
      try {
        const response = await fetch(`http://localhost:3000/usuario/${userId}`, {
          method: 'DELETE'
        })
        if (!response.ok) {
          console.log()
        }
        dadosUsuarioDiv.innerHTML = '' 
        btnApagarUsuario.style.display = 'none' 
        buscarIdInput.value = '' 
        mensagemDiv.textContent = 'Usuário apagado com sucesso!'

      } catch (error){
        mensagemDiv.textContent = `Erro: ${error.message}`
      }
    }
  }) 
}) 