async function listarUsuarios() {
  const response = await fetch('http://localhost:3000/usuario');
  return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  const tabela = document.querySelector('#tabelaUsuarios tbody');
  const usuarios = await listarUsuarios();
  tabela.innerHTML = '';
  usuarios.forEach(usuario => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usuario.idUsuario || usuario.id}</td>
      <td>${usuario.firstName}</td>
      <td>${usuario.lastName}</td>
      <td>${usuario.age}</td>
      <td>${usuario.email}</td>
      <td>${usuario.phone}</td>
      <td>${usuario.city || (usuario.address && usuario.address.city) || ''}</td>
      <td>${usuario.state || (usuario.address && usuario.address.state) || ''}</td>
      <td>
        <button class="edit-btn" onclick="editarUsuario(${usuario.idUsuario || usuario.id})">Editar</button>
        <button class="delete-btn" onclick="removerUsuario(${usuario.idUsuario || usuario.id})">Remover</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
});

async function removerUsuario(id) {
  if(confirm('Tem certeza que deseja remover este usuário?')) {
    await apagarUsuario(id);
    location.reload();
  }
}

function editarUsuario(id) {
  // Redirecionar para página de edição (implementar depois)
  alert('Função de edição em desenvolvimento.');
} 