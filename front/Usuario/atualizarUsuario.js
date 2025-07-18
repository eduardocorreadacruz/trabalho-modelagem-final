async function atualizarUsuario(id, usuario) {
  const response = await fetch('http://localhost:3000/usuario', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idUsuario: id, ...usuario })
  });
  return response.json();
} 