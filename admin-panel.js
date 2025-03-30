document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!localStorage.getItem('adminAuthenticated')) {
        window.location.href = 'admin-login.html';
        return;
    }

    const menuButtons = document.querySelectorAll('.admin-menu-btn');
    const sections = document.querySelectorAll('.admin-section');
    const logoutBtn = document.getElementById('logoutBtn');

    // Manejar navegación del menú
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            
            // Actualizar botones activos
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mostrar sección correspondiente
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Manejar cierre de sesión
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('adminAuthenticated');
        window.location.href = 'admin-login.html';
    });

    // Cargar datos de ejemplo en la tabla de contenido
    const contentTableBody = document.getElementById('contentTableBody');
    const sampleContent = [
        {
            title: "Aprendizaje de Python desde cero",
            category: "Tecnología",
            author: "Juan Pérez",
            date: "2024-03-15"
        },
        // Agregar más contenido de ejemplo aquí
    ];

    sampleContent.forEach(content => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${content.title}</td>
            <td>${content.category}</td>
            <td>${content.author}</td>
            <td>${content.date}</td>
            <td>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </td>
        `;
        contentTableBody.appendChild(row);
    });
}); 