document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastroCompra');
    const mensagemDiv = document.getElementById('mensagem');
    
    // Elementos do formulário para o cálculo automático
    const quantidadeInput = document.getElementById('quantidade');
    const precoUnitarioInput = document.getElementById('precoUnitario');
    const descontoInput = document.getElementById('descontoAplicado');
    const precoFinalInput = document.getElementById('precoFinal');

    // Função para calcular o preço final
    const calcularPrecoFinal = () => {
        const quantidade = parseFloat(quantidadeInput.value) || 0;
        const precoUnitario = parseFloat(precoUnitarioInput.value) || 0;
        const desconto = parseFloat(descontoInput.value) || 0;

        let precoBruto = quantidade * precoUnitario;
        let precoFinal = precoBruto - (precoBruto * (desconto / 100));

        // Arredonda para 2 casas decimais para evitar imprecisões
        precoFinalInput.value = precoFinal.toFixed(2);
    };

    // Adiciona event listeners para o cálculo em tempo real
    quantidadeInput.addEventListener('input', calcularPrecoFinal);
    precoUnitarioInput.addEventListener('input', calcularPrecoFinal);
    descontoInput.addEventListener('input', calcularPrecoFinal);

    // Adiciona o event listener para o envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Função auxiliar para converter strings vazias para null
        const getValue = (input) => {
            const value = input.value.trim();
            return value === '' ? null : value;
        };

        // Coleta os dados do formulário
        const novaCompra = {
            idUsuario: parseInt(getValue(form.idUsuario)),
            idProduto: parseInt(getValue(form.idProduto)),
            quantidade: parseInt(getValue(form.quantidade)),
            dataCompra: getValue(form.dataCompra),
            precoUnitario: parseFloat(getValue(form.precoUnitario)),
            descontoAplicado: parseFloat(getValue(form.descontoAplicado)) || 0,
            precoFinal: parseFloat(getValue(form.precoFinal)),
            formaPagamento: getValue(form.formaPagamento),
            status: getValue(form.status),
        };
        
        // Remove campos com valor null
        for (let key in novaCompra) {
            if (novaCompra[key] === null) {
                delete novaCompra[key];
            }
        }
        
        try {
            // Envia a requisição POST para a API
            const response = await fetch('http://localhost:3000/compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaCompra),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao cadastrar a compra.');
            }

            const resultado = await response.json();
            mensagemDiv.textContent = `Compra cadastrada com sucesso! ID: ${resultado.id}`;
            mensagemDiv.style.color = 'green';
            form.reset(); // Limpa o formulário após o sucesso
            
        } catch (error) {
            console.error('Erro:', error);
            mensagemDiv.textContent = `Erro: ${error.message}`;
            mensagemDiv.style.color = 'red';
        }
    });
});