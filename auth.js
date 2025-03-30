document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Manejar cambios de pestañas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Actualizar botones activos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mostrar formulario correspondiente
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabName}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Manejar inicio de sesión
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Aquí iría la validación con el servidor
        // Por ahora, simularemos un inicio de sesión exitoso
        localStorage.setItem('userAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        
        // Redirigir a la página de experiencias
        window.location.href = 'experiencias.html';
    });

    // Manejar registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const termsAccepted = document.getElementById('termsAccept').checked;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (!termsAccepted) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }

        // Aquí iría el registro con el servidor
        // Por ahora, simularemos un registro exitoso
        localStorage.setItem('userAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        
        // Redirigir a la página de experiencias
        window.location.href = 'experiencias.html';
    });
}); 