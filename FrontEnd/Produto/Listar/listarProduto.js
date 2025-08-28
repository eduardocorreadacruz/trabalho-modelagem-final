document.addEventListener('DOMContentLoaded', () => {
  const tabelaProdutos = document.getElementById('tabelaProdutos');
  const mensagemDiv = document.getElementById('mensagem');

  const listarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3000/produto');

      if (!response.ok) {
        throw new Error('Não foi possível carregar a lista de produtos.');
      }

      const produtos = await response.json();
      
      tabelaProdutos.innerHTML = '';
      
      if (produtos.length > 0) {
        produtos.forEach(produto => {
          const row = tabelaProdutos.insertRow();
          row.innerHTML = `

            <td>${produto.idProduto}</td>
            <td>${produto.title}</td>
            <td>${produto.description}</td>
            <td>${produto.category}</td>
            <td>${produto.price}</td>
            <td>${produto.discountPercentage}</td>
            <td>${produto.stock}</td>
            <td>${produto.brand}</td>
            <td>${produto.thumbnail}</td>
            <td>
                <button onclick="window.location.href='../Atualizar/atualizarProduto.html?id=${produto.id}'">Editar</button>
                <button onclick="window.location.href='../Apagar/apagarProduto.html?id=${produto.id}'">Apagar</button>
            </td>
          `
        })
      }
    } catch (error) {
        console.log("não foi possivel encontrar o produto")
    }
  }

  listarProdutos();
})