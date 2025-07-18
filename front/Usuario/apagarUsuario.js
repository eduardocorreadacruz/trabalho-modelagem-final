async function apagarUsuario(id) {
  const response = await fetch('http://localhost:3000/usuario', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idUsuario: id })
  });
  return response.json();
} 