async function listarUsuarios() {
  const response = await fetch('http://localhost:3000/usuario');
  return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  const tabela = document.querySelector('#tabelaUsuarios');
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
      <td>${usuario.address}</td>
      <td>${usuario.city}</td>
      <td>${usuario.state}</td>
      <td>${usuario.birthDate ? usuario.birthDate.substring(0,10) : ''}</td>
      <td>
        <button onclick="window.location.href='../Atualizar/atualizarUsuario.html?id=${usuario.idUsuario || usuario.id}'">Editar</button>
        <button onclick="window.location.href='../Apagar/apagarUsuario.html?id=${usuario.idUsuario || usuario.id}'">Apagar</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}); 