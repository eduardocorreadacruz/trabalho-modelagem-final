document.addEventListener('DOMContentLoaded', () => {
  const buscarIdInput = document.getElementById('buscarIdProduto') 
  const btnBuscarProduto = document.getElementById('btnBuscarProduto') 
  const dadosProdutoDiv = document.getElementById('dadosProduto') 
  const mensagemDiv = document.getElementById('mensagem') 
  const btnApagarProduto = document.getElementById('btnApagarProduto') 

  btnBuscarProduto.addEventListener('click', async () => {
    dadosProdutoDiv.innerHTML = '' 
    mensagemDiv.textContent = '' 
    btnApagarProduto.style.display = 'none' 

    const id = buscarIdInput.value 

    if (!id) {
      mensagemDiv.textContent = 'Por favor, digite um ID para buscar o produto.' 
      return 
    }

    try {
      const response = await fetch(`http://localhost:3000/produto/${id}`) 
      
      if (!response.ok) {
        throw new Error('Produto não encontrado.') 
      }
      
      const produto = await response.json() 
      
      dadosProdutoDiv.innerHTML = `
        <p><strong>ID:</strong> ${produto.idProduto}</p>
        <p><strong>Título:</strong> ${produto.title}</p>
        <p><strong>Descrição:</strong> ${produto.description}</p>
      ` 

      btnApagarProduto.style.display = '' 
      btnApagarProduto.dataset.produtoId = produto.idProduto 
    } catch (error) {
      mensagemDiv.textContent = `Erro: ${error.message}` 
    }
  }) 

  btnApagarProduto.addEventListener('click', async () => {
    const produtoId = btnApagarProduto.dataset.produtoId 
    
    const confirmacao = confirm(`Tem certeza que deseja apagar o produto com ID ${produtoId}?`) 

    if (confirmacao) {
      try {
        const response = await fetch(`http://localhost:3000/produto/${produtoId}`, {
          method: 'DELETE'
        }) 

        if (!response.ok) {
          throw new Error('Erro ao apagar o produto.') 
        }

        dadosProdutoDiv.innerHTML = '' 
        btnApagarProduto.style.display = 'none' 
        buscarIdInput.value = '' 
        mensagemDiv.textContent = 'Produto apagado com sucesso!' 
      } catch (error) {
        mensagemDiv.textContent = `Erro: ${error.message}` 
      }
    }
  }) 
}) 