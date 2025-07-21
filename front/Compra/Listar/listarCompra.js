async function carregarCompras() {
  const tabela = document.getElementById('tabelaCompras');
  tabela.innerHTML = '';
  try {
    const response = await fetch('http://localhost:3000/compra');
    const compras = await response.json();
    compras.forEach(compra => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${compra.idCompra || compra.id}</td>
        <td>${compra.idUsuario}</td>
        <td>${compra.idProduto}</td>
        <td>${compra.quantidade}</td>
        <td>${compra.dataCompra ? new Date(compra.dataCompra).toLocaleDateString() : ''}</td>
        <td>${compra.precoUnitario}</td>
        <td>${compra.descontoAplicado}</td>
        <td>${compra.precoFinal}</td>
        <td>${compra.formaPagamento}</td>
        <td>${compra.status}</td>
        <td>
          <button onclick="window.location.href='../Atualizar/atualizarCompra.html?id=${compra.idCompra || compra.id}'">Editar</button>
          <button onclick="window.location.href='../Apagar/apagarCompra.html?id=${compra.idCompra || compra.id}'">Apagar</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao carregar compras.';
  }
}

document.addEventListener('DOMContentLoaded', carregarCompras); 