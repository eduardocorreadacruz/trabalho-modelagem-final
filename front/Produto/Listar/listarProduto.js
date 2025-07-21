async function carregarProdutos() {
  const tabela = document.getElementById('tabelaProdutos');
  const alertaEstoque = document.getElementById('alertaEstoque');
  tabela.innerHTML = '';
  alertaEstoque.innerHTML = '';
  try {
    const response = await fetch('http://localhost:3000/produto');
    const produtos = await response.json();
    // Alerta de estoque crítico
    const produtosCriticos = produtos.filter(p => p.stock < 10);
    if (produtosCriticos.length > 0) {
      let alertaHTML = `<div style="border:2px solid red; background:#ffeaea; padding:10px; border-radius:8px; margin-bottom:10px;">
        <strong>Alerta de Estoque Crítico:</strong><br>
        <ul style='margin: 8px 0 0 18px;'>`;
      produtosCriticos.forEach(p => {
        alertaHTML += `<li><b>${p.title}</b> (Estoque: <b>${p.stock}</b>, Categoria: <b>${p.category}</b>)</li>`;
      });
      alertaHTML += '</ul></div>';
      alertaEstoque.innerHTML = alertaHTML;
    }
    produtos.forEach(produto => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${produto.idProduto || produto.id}</td>
        <td>${produto.title}</td>
        <td>${produto.description}</td>
        <td>${produto.category}</td>
        <td>${produto.price}</td>
        <td>${produto.discountPercentage}</td>
        <td>${produto.stock}</td>
        <td>${produto.brand}</td>
        <td><img src="${produto.thumbnail}" width="50"></td>
        <td>
          <button onclick="window.location.href='../Atualizar/atualizarProduto.html?id=${produto.idProduto || produto.id}'">Editar</button>
          <button onclick="window.location.href='../Apagar/apagarProduto.html?id=${produto.idProduto || produto.id}'">Apagar</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao carregar produtos.';
  }
}

document.addEventListener('DOMContentLoaded', carregarProdutos); 