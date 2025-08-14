document.addEventListener('DOMContentLoaded', () => {
  // Seleciona os elementos do HTML que vamos usar
  const tabelaUsuarios = document.getElementById('tabelaUsuarios');
  const mensagemDiv = document.getElementById('mensagem');

  const listarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuario');

      if (!response.ok) {
        throw new Error('Não foi possível carregar a lista de usuários.');
      }

      const usuarios = await response.json();
      
      tabelaUsuarios.innerHTML = '';
      
      if (usuarios.length > 0) {
        usuarios.forEach(usuario => {
          const row = tabelaUsuarios.insertRow();
          row.innerHTML = `
            <td>${usuario.idUsuario}</td>
            <td>${usuario.firstName}</td>
            <td>${usuario.lastName}</td>
            <td>${usuario.age}</td>
            <td>${usuario.email}</td>
            <td>${usuario.phone}</td>
            <td>${usuario.address}</td>
            <td>${usuario.city}</td>
            <td>${usuario.state}</td>
            <td>${usuario.birthDate}</td>
            <td>
                <button onclick="window.location.href='../Atualizar/atualizarUsuario.html?id=${usuario.id}'">Editar</button>
                <button onclick="window.location.href='../Apagar/apagarUsuario.html?id=${usuario.id}'">Apagar</button>
            </td>
          `
        })
      }
    } catch (error) {
        console.log("não foi possivel encontrar o usuario")
    }
  }

  listarUsuarios();
})