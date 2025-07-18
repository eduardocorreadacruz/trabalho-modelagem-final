function cadastrarCompra() {
  let cadastroCompra = document.getElementById("cadastroCompra")
  let res = document.getElementById("res")
  cadastroCompra.disabled = false
  cadastroCompra.textContent = "Cadastrar"

  cadastroCompra.addEventListener("click", async (e) => {
      e.preventDefault()

      let firstName = document.getElementById("firstName").value
      let lastName = document.getElementById("lastName").value
      let age = parseInt(document.getElementById("age").value)
      let phone = document.getElementById("phone").value
      let address = document.getElementById("address").value
      let city = document.getElementById("city").value
      let state = document.getElementById("state").value
      let birthDate = document.getElementById("birthDate").value
      let email = document.getElementById("email").value

      if (!firstName || !lastName || !email || !phone || !address || !city || !state || !birthDate) {
          alert("Por favor, preencha todos os campos.")
          return
      }

      const valores = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        phone: phone,
        address: address,
        city: city,
        state: state,
        birthDate: birthDate,
        email: email
      }

      cadastroCompra.textContent = "Cadastrando..."
      cadastroCompra.disabled = true

      await fetch("http://localhost:3000/Compra", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(valores)
      })
          .then(resp => {
              if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar usuário")
              return resp.json()
          })
          .then(Compra => {
              res.innerHTML = ``
              res.innerHTML += `<h2>Usuário cadastrado com sucesso!</h2>`
              res.innerHTML += `
                  <table border="1">
                              <thead>
                                  <tr>
                                      <th>COD</th>
                                      <th>Nome</th>
                                      <th>Idade</th>
                                      <th>Email</th>
                                      <th>Telefone</th>
                                      <th>Endereço</th>
                                      <th>Cidade</th>
                                      <th>Estado</th>
                                      <th>Data de nascimento</th>
                                  </tr>
                              </thead>
                              <tbody id="tbodyCompras">
                                  <tr>
                                      <td>${Compra.id}</td>
                                      <td>${Compra.firstName} ${Compra.lastName}</td>
                                      <td>${Compra.age}</td>
                                      <td>${Compra.email}</td>
                                      <td>${Compra.phone}</td>
                                      <td>${Compra.address}</td>
                                      <td>${Compra.city}</td>
                                      <td>${Compra.state}</td>
                                      <td>${Compra.birthDate ? Compra.birthDate = new Date(Compra.birthDate).toLocaleDateString("pt-BR") : Compra.birthDate}</td>
                                  </tr>
                              </tbody>
                          </table>
              `
              alert("Usuário cadastrado com sucesso!")
          })
          .catch((err) => {
              console.error("Erro ao cadastrar usuário:", err)
              alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.")
          })
          .finally(() => {
              document.getElementById("formCadastroCompra").reset()
              cadastroCompra.textContent = "Cadastrar"
              cadastroCompra.disabled = false
          })
  })
}

cadastrarCompra();


