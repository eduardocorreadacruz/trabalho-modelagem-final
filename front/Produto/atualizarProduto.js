async function carregarProduto() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;
  try {
    const response = await fetch(`http://localhost:3000/produtos/${id}`);
    const produto = await response.json();
    document.getElementById('produtoId').value = produto.idProduto || produto.id;
    document.getElementById('title').value = produto.title;
    document.getElementById('description').value = produto.description;
    document.getElementById('category').value = produto.category;
    document.getElementById('price').value = produto.price;
    document.getElementById('discountPercentage').value = produto.discountPercentage;
    document.getElementById('stock').value = produto.stock;
    document.getElementById('brand').value = produto.brand;
    document.getElementById('thumbnail').value = produto.thumbnail;
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao carregar produto.';
  }
}

document.getElementById('formAtualizarProduto').addEventListener('submit', async function(event) {
  event.preventDefault();
  const id = document.getElementById('produtoId').value;
  const data = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
    price: parseFloat(document.getElementById('price').value),
    discountPercentage: parseFloat(document.getElementById('discountPercentage').value),
    stock: parseInt(document.getElementById('stock').value),
    brand: document.getElementById('brand').value,
    thumbnail: document.getElementById('thumbnail').value
  };
  try {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById('mensagem').innerText = result.message || 'Produto atualizado com sucesso!';
  } catch (error) {
    document.getElementById('mensagem').innerText = 'Erro ao atualizar produto.';
  }
});

document.addEventListener('DOMContentLoaded', carregarProduto); 