// admin/admin.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = loginForm.username.value;
      const password = loginForm.password.value;
  
      // Aquí puedes implementar la lógica de autenticación
      // Por ejemplo, verificar si el username y password son válidos
      // Esto puede ser con localStorage, sessionStorage, o una API backend
  
      // Ejemplo simple de validación
      if (username === 'admin' && password === 'admin123') {
        alert('Login exitoso');
        window.location.href = 'administrar.html'; // Redirigir al área de administración
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    });
  });
  