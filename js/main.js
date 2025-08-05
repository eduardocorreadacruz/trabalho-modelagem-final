async function fetchProdutos() {
  const resp = await fetch('http://localhost:3000/produto');
  return resp.json();
}

async function fetchUsuarios() {
  const resp = await fetch('http://localhost:3000/usuario');
  return resp.json();
}

function filtrarPorIdEDecimar(arr, idField, idIni, idFim) {
  let filtrado = arr;
  if (idIni) filtrado = filtrado.filter(item => (item[idField] || item.id) >= idIni);
  if (idFim) filtrado = filtrado.filter(item => (item[idField] || item.id) <= idFim);
  return filtrado.slice(0, 10);
}

let chartProdutoEstoque = null;
async function renderGraficoProdutoEstoque() {
  const produtos = await fetchProdutos();
  const idIni = parseInt(document.getElementById('graficoProdutoEstoqueIdIni').value);
  const idFim = parseInt(document.getElementById('graficoProdutoEstoqueIdFim').value);
  const filtrados = filtrarPorIdEDecimar(produtos, 'idProduto', idIni, idFim);
  const labels = filtrados.map(p => p.title);
  const data = filtrados.map(p => p.stock);
  const ctx = document.getElementById('graficoProdutoEstoque').getContext('2d');
  if (chartProdutoEstoque) chartProdutoEstoque.destroy();
  chartProdutoEstoque = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Estoque',
        data,
        backgroundColor: 'rgba(67, 97, 238, 0.7)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

document.getElementById('btnFiltrarGraficoProdutoEstoque').addEventListener('click', renderGraficoProdutoEstoque);

let chartUsuarioIdade = null;
async function renderGraficoUsuarioIdade() {
  const usuarios = await fetchUsuarios();
  const idIni = parseInt(document.getElementById('graficoUsuarioIdadeIdIni').value);
  const idFim = parseInt(document.getElementById('graficoUsuarioIdadeIdFim').value);
  const filtrados = filtrarPorIdEDecimar(usuarios, 'idUsuario', idIni, idFim);
  const labels = filtrados.map(u => `${u.firstName} ${u.lastName}`);
  const data = filtrados.map(u => u.age);
  const ctx = document.getElementById('graficoUsuarioIdade').getContext('2d');
  if (chartUsuarioIdade) chartUsuarioIdade.destroy();
  chartUsuarioIdade = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Idade',
        data,
        backgroundColor: 'rgba(247, 37, 133, 0.7)',
        borderColor: 'rgba(247, 37, 133, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

document.getElementById('btnFiltrarGraficoUsuarioIdade').addEventListener('click', renderGraficoUsuarioIdade);

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('graficoProdutoEstoque')) renderGraficoProdutoEstoque();
  if (document.getElementById('graficoUsuarioIdade')) renderGraficoUsuarioIdade();
}); 