const usuarios = {
    "administradores": [
      {
        "usuario": "admin",
        "password": "admin"
      }
    ],
    "usuarios": [
        {
            "usuario": "usuario2",
            "password": "contraseña2"
        },
        {
            "usuario": "usuario3",
            "password": "contraseña3"
        }
    ]
  };

const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const usuario = form.elements.usuario.value;
  const password = form.elements.password.value;

  const usuarioEncontrado = usuarios.usuarios.find((u) => u.usuario === usuario && u.password === password);
  const adminEncotrado = usuarios.administradores.find((u) => u.usuario === usuario && u.password === password);
  
  if (usuarioEncontrado || adminEncotrado) {
    alert('Bienvenido');
    if (adminEncotrado) {
      console.log(adminEncotrado);
      window.location.href = './admin.html';
    }
  } else {
    alert('Usuario o contraseña incorrectos');
    preventDefault();
    console.log(usuarioEncontrado);
    window.location.href = './login.html'
  }
});