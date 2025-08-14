document.addEventListener('DOMContentLoaded', () => {
    const formCadastroProduto = document.getElementById('formCadastroProduto');
    const mensagemDiv = document.getElementById('mensagem');

    formCadastroProduto.addEventListener('submit', async (e) => {
        e.preventDefault();

        mensagemDiv.textContent = '';

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const price = parseFloat(document.getElementById('price').value);
        const discountPercentage = parseFloat(document.getElementById('discountPercentage').value);
        const stock = parseInt(document.getElementById('stock').value);
        const brand = document.getElementById('brand').value;
        const thumbnail = document.getElementById('thumbnail').value;
        
        // --- Cálculo da Porcentagem de Desconto ---
        const valorDoDesconto = (price * discountPercentage) / 100;
        const precoFinal = price - valorDoDesconto;

        // Opcional: exiba o resultado para o usuário antes de enviar
        console.log(`Preço original: R$${price}`);
        console.log(`Valor do desconto: R$${valorDoDesconto.toFixed(2)}`);
        console.log(`Preço final: R$${precoFinal.toFixed(2)}`);
        // --- Fim do Cálculo ---

        const novoProduto = {
            title: title,
            description: description,
            category: category,
            price: price, // Preço original
            discountPercentage: discountPercentage,
            valorDoDesconto: valorDoDesconto, // Novo campo
            precoFinal: precoFinal, // Novo campo
            stock: stock,
            brand: brand,
            thumbnail: thumbnail
        };

        try {
            const response = await fetch(`http://localhost:3000/produto`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoProduto)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao cadastrar o produto.');
            }

            const dados = await response.json();
            mensagemDiv.textContent = `O produto "${dados.title}" foi cadastrado com sucesso! Preço final: R$${dados.precoFinal.toFixed(2)}`;
            formCadastroProduto.reset();

        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
            mensagemDiv.textContent = `Erro ao cadastrar: ${error.message}`;
        }
    });
});