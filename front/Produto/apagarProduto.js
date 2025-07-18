document.getElementById('formApagarProduto').addEventListener('submit', async function(event) {
  event.preventDefault();
  const id = document.getElementById('produtoId').value;
  if (!confirm('Tem certeza que deseja apagar o produto de ID ' + id + '?')) return;
  try {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' });
    const result = await response.json();
    document.getElementById('mensagem').innerHTML = `<div class='alert alert-success'>${result.message || 'Produto apagado com sucesso!'}</div>`;
  } catch (error) {
    document.getElementById('mensagem').innerHTML = `<div class='alert alert-danger'>Erro ao apagar produto.</div>`;
  }
}); 