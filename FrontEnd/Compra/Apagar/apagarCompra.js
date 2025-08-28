document.addEventListener('DOMContentLoaded', () => {
    const buscarIdInput = document.getElementById('buscarIdCompra');
    const btnBuscarCompra = document.getElementById('btnBuscarCompra');
    const dadosCompraDiv = document.getElementById('dadosCompra');
    const mensagemDiv = document.getElementById('mensagem');
    const btnApagarCompra = document.getElementById('btnApagarCompra');

    // 1. Lógica para buscar e exibir a compra
    btnBuscarCompra.addEventListener('click', async () => {
        dadosCompraDiv.innerHTML = '';
        mensagemDiv.textContent = '';
        btnApagarCompra.style.display = 'none';

        const id = buscarIdInput.value;

        if (!id) {
            mensagemDiv.textContent = 'Por favor, digite um ID para buscar a compra.';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/compra/${id}`);
            
            if (!response.ok) {
                // Lança um erro se a compra não for encontrada (status 404)
                throw new Error('Compra não encontrada.');
            }
            
            const compra = await response.json();
            
            // Exibe os dados da compra encontrada
            dadosCompraDiv.innerHTML = `
                <p><strong>ID da Compra:</strong> ${compra.idCompra}</p>
                <p><strong>ID do Usuário:</strong> ${compra.idUsuario}</p>
                <p><strong>ID do Produto:</strong> ${compra.idProduto}</p>
                <p><strong>Preço Final:</strong> R$ ${compra.precoFinal}</p>
            `;

            btnApagarCompra.style.display = 'block';
            // Armazena o ID da compra no botão para usar na requisição DELETE
            btnApagarCompra.dataset.compraId = compra.idCompra;
        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`;
            mensagemDiv.style.color = 'red';
        }
    });

    // 2. Lógica para apagar a compra
    btnApagarCompra.addEventListener('click', async () => {
        const compraId = btnApagarCompra.dataset.compraId;
        
        // Pede uma confirmação antes de apagar
        const confirmacao = confirm(`Tem certeza que deseja apagar a compra com ID ${compraId}?`);

        if (confirmacao) {
            try {
                const response = await fetch(`http://localhost:3000/compra/${compraId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Erro ao apagar a compra.');
                }

                // Limpa a tela e exibe a mensagem de sucesso
                dadosCompraDiv.innerHTML = '';
                btnApagarCompra.style.display = 'none';
                buscarIdInput.value = '';
                mensagemDiv.textContent = 'Compra apagada com sucesso!';
                mensagemDiv.style.color = 'green';
            } catch (error) {
                mensagemDiv.textContent = `Erro: ${error.message}`;
                mensagemDiv.style.color = 'red';
            }
        }
    });
});