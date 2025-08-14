document.addEventListener('DOMContentLoaded', () => {
    const buscarIdInput = document.getElementById('buscarIdUsuario')
    const btnBuscarUsuario = document.getElementById('btnBuscarUsuario')
    const formAtualizarUsuario = document.getElementById('formAtualizarUsuario')
    const mensagemDiv = document.getElementById('mensagem');

    btnBuscarUsuario.addEventListener('click', async () => {
        mensagemDiv.textContent = ''
        formAtualizarUsuario.style.display = 'none'

        const id = buscarIdInput.value

        if (!id) {
            mensagemDiv.textContent = 'Por favor, digite um ID para buscar.'
            return
        }

        try {
            const response = await fetch(`http://localhost:3000/usuario/${id}`)

            if (!response.ok) {
                throw new Error('Usuário não encontrado.')
            }

            const usuario = await response.json()

            document.getElementById('usuarioId').value = usuario.id
            document.getElementById('firstName').value = usuario.firstName
            document.getElementById('lastName').value = usuario.lastName
            document.getElementById('age').value = usuario.age
            document.getElementById('email').value = usuario.email
            document.getElementById('phone').value = usuario.phone
            document.getElementById('address').value = usuario.address
            document.getElementById('city').value = usuario.city
            document.getElementById('state').value = usuario.state
            document.getElementById('birthDate').value = usuario.birthDate.split('T')[0]

            formAtualizarUsuario.style.display = 'block'

        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`
        }
    })

    formAtualizarUsuario.addEventListener('submit', async (e) => {
        e.preventDefault()

        const id = document.getElementById('usuarioId').value

        const usuarioAtualizado = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            age: parseInt(document.getElementById('age').value),
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            birthDate: document.getElementById('birthDate').value
        };

        try {
            const response = await fetch(`http://localhost:3000/usuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioAtualizado),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário.')
            }

            formAtualizarUsuario.style.display = 'none'
            buscarIdInput.value = '';
            mensagemDiv.textContent = `Usuário com ID ${id} atualizado com sucesso!`

        } catch (error) {
            mensagemDiv.textContent = `Erro: ${error.message}`
        }
    })
})