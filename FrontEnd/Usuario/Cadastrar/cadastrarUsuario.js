    let res = document.getElementById('res')
    let cadastroUsuario = document.getElementById('cadastroUsuario')
    cadastroUsuario.addEventListener('click', (e) => {
        e.preventDefault()
        
        let firstName = document.getElementById('firstName').value
        let lastName = document.getElementById('lastName').value
        let age = document.getElementById('age').value
        let email = document.getElementById('email').value
        let phone = document.getElementById('phone').value
        let address = document.getElementById('address').value
        let city = document.getElementById('city').value
        let state = document.getElementById('state').value
        let birthDate = document.getElementById('birthDate').value

        const valores = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            phone: phone,
            address: address,
            city: city,
            state: state,
            birthDate: birthDate
        }

        res.innerHTML = ''

        fetch(`http://localhost:3000/usuario`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valores)
        })
        .then(resp => resp.json())
        .then(dados => {
            res.innerHTML += `O usuário ${dados.firstName} ${dados.lastName} foi cadastrado com sucesso!`
        })
        .catch((err) => {
            console.error('Erro ao cadastrar o usuario', err)
        })
    })