document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastroProduto') 
    const mensagemDiv = document.getElementById('mensagem') 
    const categoriaSelect = document.getElementById('categoria') 

    // Função busca e preenche a lista de categorias
    const carregarCategorias = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products/categories') 
            
            if (!response.ok) {
                throw new Error('Não foi possível carregar as categorias.') 
            }
            
            const categorias = await response.json() 
            
            // Adiciona as categorias ao <select>
            categorias.forEach(categoria => {
                const option = document.createElement('option') 
                option.value = categoria 
                option.textContent = categoria 
                categoriaSelect.appendChild(option) 
            }) 

        } catch (error) {
            console.error('Erro ao carregar categorias:', error) 
            const option = document.createElement('option') 
            option.textContent = 'Erro ao carregar categorias' 
            categoriaSelect.appendChild(option) 
        }
    } 

    // Chama a função para carregar as categorias assim que a página é carregada
    carregarCategorias() 

    // Adiciona o event listener para o envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault() 

        // Coleta os dados do formulário
        const novoProduto = {
            title: form.title.value,
            description: form.description.value,
            price: parseFloat(form.price.value),
            category: form.category.value,
            stock: parseInt(form.stock.value),
        } 

        try {
            // Envia a requisição POST para a sua API local (json-server)
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoProduto),
            }) 

            if (!response.ok) {
                const errorData = await response.json() 
                throw new Error(errorData.message || 'Erro ao cadastrar o produto.') 
            }

            const resultado = await response.json() 
            mensagemDiv.textContent = `Produto "${resultado.title}" cadastrado com sucesso! ID: ${resultado.id}` 
            mensagemDiv.style.color = 'green' 
            form.reset()  
            
        } catch (error) {
            console.error('Erro:', error) 
            mensagemDiv.textContent = `Erro: ${error.message}` 
            mensagemDiv.style.color = 'red' 
        }
    }) 
}) 