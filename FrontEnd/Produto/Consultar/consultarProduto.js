document.addEventListener('DOMContentLoaded', () => {
  const buscarIdInput = document.getElementById('buscarIdProduto')
  const btnBuscarProduto = document.getElementById('btnBuscarProduto')
  
  const dadosProdutoDiv = document.createElement('div')
  dadosProdutoDiv.id = 'dadosProduto'
  
  const mensagemDiv = document.createElement('div')
  mensagemDiv.id = 'mensagem'
  
  document.body.appendChild(dadosProdutoDiv)
  document.body.appendChild(mensagemDiv)

  btnBuscarProduto.addEventListener('click', async () => {
    dadosProdutoDiv.innerHTML = ''
    mensagemDiv.textContent = ''

    const id = buscarIdInput.value

    try {
      const response = await fetch(`http://localhost:3000/produto/${id}`)
      
      if (!response.ok) {
        throw new Error('Usuário não encontrado.')
      }
      
      const produto = await response.json()
      
      dadosProdutoDiv.innerHTML = `
            <h3>Detalhes do Produto</h3>
            <td>ID: ${produto.idProduto}</td><br>
            <td>Titulo: ${produto.title}</td><br>
            <td>Descrição: ${produto.description}</td><br>
            <td>Categoria: ${produto.category}</td><br>
            <td>Preço: R$${produto.price}</td><br>
            <td>Desconto em (%): ${produto.discountPercentage}</td><br>
            <td>Estoque: ${produto.stock}</td><br>
            <td>Marca: ${produto.brand}</td><br>
            <td>URL da Imagem: ${produto.thumbnail}</td><br>
          
            
        `
    } catch (err) {
      mensagemDiv.textContent = `Erro: ${err.message}`
    }
  })
})