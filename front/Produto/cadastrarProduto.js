document.getElementById('formCadastroProduto').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    title: form.title.value,
    description: form.description.value,
    category: form.category.value,
    price: parseFloat(form.price.value),
    discountPercentage: parseFloat(form.discountPercentage.value),
    stock: parseInt(form.stock.value),
    brand: form.brand.value,
    thumbnail: form.thumbnail.value
  };
  try {
    const response = await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById('mensagem').innerText = result.message || 'Produto cadastrado com sucesso!';
    form.reset();
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao cadastrar produto.';
  }
}); 