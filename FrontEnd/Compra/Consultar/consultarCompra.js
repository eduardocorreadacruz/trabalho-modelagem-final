document.addEventListener('DOMContentLoaded', () => {
    const buscarIdInput = document.getElementById('buscarIdCompra');
    const btnBuscarCompra = document.getElementById('btnBuscarCompra');
    const dadosCompraDiv = document.getElementById('dadosCompra');
    const mensagemDiv = document.getElementById('mensagem');

    btnBuscarCompra.addEventListener('click', async () => {
        dadosCompraDiv.innerHTML = '';
        mensagemDiv.textContent = '';
        
        const id = buscarIdInput.value;
        
        if (!id) {
            mensagemDiv.textContent = 'Por favor, digite um ID para consultar a compra.';
            mensagemDiv.style.color = 'orange';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/compra/${id}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Compra não encontrada.');
                }
                throw new Error('Erro ao buscar a compra.');
            }
            
            const compra = await response.json();
            
            // Cria um objeto com os dados da compra e formata
            const compraDetalhes = `
                <p><strong>ID da Compra:</strong> ${compra.idCompra}</p>
                <p><strong>ID do Usuário:</strong> ${compra.idUsuario}</p>
                <p><strong>ID do Produto:</strong> ${compra.idProduto}</p>
                <p><strong>Quantidade:</strong> ${compra.quantidade}</p>
                <p><strong>Data da Compra:</strong> ${compra.dataCompra}</p>
                <p><strong>Preço Unitário:</strong> R$ ${compra.precoUnitario}</p>
                <p><strong>Desconto Aplicado:</strong> ${compra.descontoAplicado}%</p>
                <p><strong>Preço Final:</strong> R$ ${compra.precoFinal}</p>
                <p><strong>Forma de Pagamento:</strong> ${compra.formaPagamento}</p>
                <p><strong>Status:</strong> ${compra.status}</p>
            `;

            dadosCompraDiv.innerHTML = compraDetalhes;
            mensagemDiv.textContent = ''; // Limpa a mensagem de erro se a busca for bem-sucedida

        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`;
            mensagemDiv.style.color = 'red';
        }
    });
});