document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscriptionForm');
    const verificationSection = document.querySelector('.verification-section');
    let isVerificationStep = false;
    let verificationCode = '';

    // Configuración de EmailJS
    const EMAIL_SERVICE_ID = 'contact_service';    // Tu Service ID
    const EMAIL_TEMPLATE_ID = 'contact_form';    // Tu Template ID
    const FROM_EMAIL = 'jojetaz@gmail.com';

    async function sendVerificationEmail(toEmail, code, nombre) {
        try {
            const templateParams = {
                to_name: nombre,
                to_email: toEmail,
                verification_code: code,
                from_email: FROM_EMAIL
            };

            const response = await emailjs.send(
                EMAIL_SERVICE_ID,
                EMAIL_TEMPLATE_ID,
                templateParams
            );

            console.log('Email enviado:', response);
            return true;
        } catch (error) {
            console.error('Error al enviar email:', error);
            return false;
        }
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!isVerificationStep) {
            // Primera etapa: envío del formulario
            const formData = {
                nombre: document.getElementById('nombre').value,
                profesion: document.getElementById('profesion').value,
                ciudad: document.getElementById('ciudad').value,
                email: document.getElementById('email').value
            };

            // Validar que todos los campos estén completos
            if (!formData.nombre || !formData.profesion || !formData.ciudad || !formData.email) {
                alert('Por favor, completa todos los campos');
                return;
            }

            // Generar código de verificación
            verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Mostrar mensaje de carga
            form.querySelector('.submit-btn').textContent = 'Enviando...';
            form.querySelector('.submit-btn').disabled = true;

            // Enviar el código por email
            const emailSent = await sendVerificationEmail(
                formData.email,
                verificationCode,
                formData.nombre
            );

            if (emailSent) {
                // Mostrar sección de verificación
                verificationSection.style.display = 'block';
                isVerificationStep = true;
                
                // Cambiar texto del botón
                form.querySelector('.submit-btn').textContent = 'Verificar';
                form.querySelector('.submit-btn').disabled = false;
                
                // Deshabilitar campos del formulario
                document.getElementById('nombre').disabled = true;
                document.getElementById('profesion').disabled = true;
                document.getElementById('ciudad').disabled = true;
                document.getElementById('email').disabled = true;

                // Guardar datos temporalmente
                sessionStorage.setItem('userData', JSON.stringify(formData));
            } else {
                alert('Error al enviar el código de verificación. Por favor, intenta nuevamente.');
                form.querySelector('.submit-btn').textContent = 'Suscribirse';
                form.querySelector('.submit-btn').disabled = false;
            }

        } else {
            // Segunda etapa: verificación del código
            const inputCode = document.getElementById('codigo').value;
            
            if (inputCode === verificationCode) {
                // Recuperar datos del usuario
                const userData = JSON.parse(sessionStorage.getItem('userData'));
                
                // Aquí podrías enviar los datos a tu servidor
                localStorage.setItem('userSubscribed', 'true');
                localStorage.setItem('userData', JSON.stringify(userData));
                
                alert('¡Verificación exitosa! Ahora puedes acceder a todas las experiencias.');
                window.location.href = 'experiencias.html';
            } else {
                alert('Código incorrecto. Por favor, intenta nuevamente.');
            }
        }
    });

    // Agregar botón para reenviar código
    const resendButton = document.createElement('button');
    resendButton.type = 'button';
    resendButton.className = 'resend-btn';
    resendButton.textContent = 'Reenviar código';
    resendButton.style.display = 'none';

    resendButton.addEventListener('click', async () => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        resendButton.textContent = 'Enviando...';
        resendButton.disabled = true;

        const emailSent = await sendVerificationEmail(
            userData.email,
            verificationCode,
            userData.nombre
        );

        if (emailSent) {
            alert('Se ha enviado un nuevo código a tu correo electrónico.');
        } else {
            alert('Error al reenviar el código. Por favor, intenta nuevamente.');
        }

        resendButton.textContent = 'Reenviar código';
        resendButton.disabled = false;
    });

    verificationSection.appendChild(resendButton);

    // Mostrar botón de reenvío después de 30 segundos
    setTimeout(() => {
        if (isVerificationStep) {
            resendButton.style.display = 'block';
        }
    }, 30000);
}); 