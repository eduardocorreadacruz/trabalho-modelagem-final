document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do HTML que vamos usar
    const tabelaCompras = document.getElementById('tabelaCompras');
    const mensagemDiv = document.getElementById('mensagem');

    const listarCompras = async () => {
        try {
            const response = await fetch('http://localhost:3000/compra');

            if (!response.ok) {
                // Lança um erro se a resposta não for 200 OK
                throw new Error('Não foi possível carregar a lista de compras.');
            }

            const compras = await response.json();
            
            // Limpa o conteúdo da tabela antes de preenchê-la
            tabelaCompras.innerHTML = '';
            
            if (compras.length > 0) {
                compras.forEach(compra => {
                    const row = tabelaCompras.insertRow();
                    row.innerHTML = `
                        <td>${compra.idCompra}</td>
                        <td>${compra.idUsuario}</td>
                        <td>${compra.idProduto}</td>
                        <td>${compra.quantidade}</td>
                        <td>${compra.dataCompra}</td>
                        <td>${compra.precoUnitario}</td>
                        <td>${compra.descontoAplicado}</td>
                        <td>${compra.precoFinal}</td>
                        <td>${compra.formaPagamento}</td>
                        <td>${compra.status}</td>
                        <td>
                            <button onclick="window.location.href='../Atualizar/atualizarCompra.html?id=${compra.idCompra}'">Editar</button>
                            <button onclick="window.location.href='../Apagar/apagarCompra.html?id=${compra.idCompra}'">Apagar</button>
                        </td>
                    `;
                });
                mensagemDiv.textContent = ''; // Limpa a mensagem se a lista for carregada
            } else {
                mensagemDiv.textContent = 'Nenhuma compra encontrada.';
                mensagemDiv.style.color = 'orange';
            }
        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`;
            mensagemDiv.style.color = 'red';
            console.error('Erro ao listar compras:', error);
        }
    };

    listarCompras();
});