document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    // Credenciales de administrador (en un caso real, esto estaría en el servidor)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
    };

    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // Guardar estado de autenticación
            localStorage.setItem('adminAuthenticated', 'true');
            
            // Redirigir al panel de administración
            window.location.href = 'admin-panel.html';
        } else {
            alert('Credenciales incorrectas');
        }
    });
}); 