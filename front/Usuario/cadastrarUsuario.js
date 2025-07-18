async function cadastrarUsuario(usuario) {
  const response = await fetch('http://localhost:3000/usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastroUsuario');
  const mensagem = document.getElementById('mensagem');
  if(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usuario = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        age: parseInt(form.age.value),
        email: form.email.value,
        phone: form.phone.value,
        city: form.city.value,
        state: form.state.value,
        birthDate: form.birthDate.value
      };
      try {
        await cadastrarUsuario(usuario);
        mensagem.textContent = 'Usuário cadastrado com sucesso!';
        mensagem.style.color = 'green';
        form.reset();
      } catch (err) {
        mensagem.textContent = 'Erro ao cadastrar usuário.';
        mensagem.style.color = 'red';
      }
    });
  }
}); 