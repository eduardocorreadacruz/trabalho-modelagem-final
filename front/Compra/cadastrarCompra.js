document.getElementById('formCadastroCompra').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    idUsuario: parseInt(form.idUsuario.value),
    idProduto: parseInt(form.idProduto.value),
    quantidade: parseInt(form.quantidade.value),
    dataCompra: form.dataCompra.value,
    precoUnitario: parseFloat(form.precoUnitario.value),
    descontoAplicado: parseFloat(form.descontoAplicado.value),
    precoFinal: parseFloat(form.precoFinal.value),
    formaPagamento: form.formaPagamento.value,
    status: form.status.value
  };
  try {
    const response = await fetch('http://localhost:3000/compras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById('mensagem').innerText = result.message || 'Compra cadastrada com sucesso!';
    form.reset();
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao cadastrar compra.';
  }
}); 