document.addEventListener('DOMContentLoaded', () => {
    const buscarIdInput = document.getElementById('buscarIdProduto');
    const btnBuscarProduto = document.getElementById('btnBuscarProduto');
    const formAtualizarProduto = document.getElementById('formAtualizarProduto');
    const mensagemDiv = document.getElementById('mensagem');

    btnBuscarProduto.addEventListener('click', async () => {
        mensagemDiv.textContent = '';
        formAtualizarProduto.style.display = 'none';

        const id = buscarIdInput.value;

        if (!id) {
            mensagemDiv.textContent = 'Por favor, digite um ID para buscar o produto.';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/produto/${id}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Produto não encontrado.');
                }
                throw new Error('Erro ao buscar o produto.');
            }

            const produto = await response.json();

            // Preenche o formulário com os dados do produto
            document.getElementById('produtoId').value = produto.idProduto; 
            document.getElementById('title').value = produto.title;
            document.getElementById('description').value = produto.description;
            document.getElementById('category').value = produto.category;
            document.getElementById('price').value = produto.price;
            document.getElementById('discountPercentage').value = produto.discountPercentage;
            document.getElementById('stock').value = produto.stock;
            document.getElementById('brand').value = produto.brand;
            document.getElementById('thumbnail').value = produto.thumbnail;

            formAtualizarProduto.style.display = 'block';

        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`;
        }
    });

    formAtualizarProduto.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('produtoId').value; 

        const produtoAtualizado = {
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
            const response = await fetch(`http://localhost:3000/produto/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtoAtualizado),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o produto.');
            }

            formAtualizarProduto.style.display = 'none';
            buscarIdInput.value = '';
            mensagemDiv.textContent = `Produto com ID ${id} atualizado com sucesso!`;

        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`;
        }
    });
});