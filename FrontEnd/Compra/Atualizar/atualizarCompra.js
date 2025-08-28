document.addEventListener('DOMContentLoaded', () => {
    const buscarIdInput = document.getElementById('buscarIdCompra');
    const btnBuscarCompra = document.getElementById('btnBuscarCompra');
    const formAtualizarCompra = document.getElementById('formAtualizarCompra');
    const mensagemDiv = document.getElementById('mensagem');
    
    // Adiciona o event listener para o botão de buscar
    btnBuscarCompra.addEventListener('click', async () => {
        mensagemDiv.textContent = '';
        formAtualizarCompra.style.display = 'none';
        
        const id = buscarIdInput.value;
        
        if (!id) {
            mensagemDiv.textContent = 'Por favor, digite um ID para buscar.';
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
            
            // Preenche o formulário com os dados da compra encontrada
            document.getElementById('compraId').value = compra.idCompra;
            document.getElementById('idUsuario').value = compra.idUsuario;
            document.getElementById('idProduto').value = compra.idProduto;
            document.getElementById('quantidade').value = compra.quantidade;
            document.getElementById('dataCompra').value = compra.dataCompra.substring(0, 10); // Formata a data
            document.getElementById('precoUnitario').value = compra.precoUnitario;
            document.getElementById('descontoAplicado').value = compra.descontoAplicado;
            document.getElementById('precoFinal').value = compra.precoFinal;
            document.getElementById('formaPagamento').value = compra.formaPagamento;
            document.getElementById('status').value = compra.status;

            formAtualizarCompra.style.display = 'block';

        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`;
        }
    });

    // Adiciona o event listener para o envio do formulário de atualização
    formAtualizarCompra.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('compraId').value;
        
        const compraAtualizada = {
            idUsuario: parseInt(document.getElementById('idUsuario').value),
            idProduto: parseInt(document.getElementById('idProduto').value),
            quantidade: parseInt(document.getElementById('quantidade').value),
            dataCompra: document.getElementById('dataCompra').value,
            precoUnitario: parseFloat(document.getElementById('precoUnitario').value),
            descontoAplicado: parseFloat(document.getElementById('descontoAplicado').value),
            precoFinal: parseFloat(document.getElementById('precoFinal').value),
            formaPagamento: document.getElementById('formaPagamento').value,
            status: document.getElementById('status').value
        };

        try {
            const response = await fetch(`http://localhost:3000/compra/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compraAtualizada),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar a compra.');
            }

            formAtualizarCompra.style.display = 'none';
            buscarIdInput.value = '';
            mensagemDiv.textContent = `Compra com ID ${id} atualizada com sucesso!`;

        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`;
        }
    });
});