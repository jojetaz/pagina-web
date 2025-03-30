document.addEventListener('DOMContentLoaded', function() {
    // Eliminar la redirección forzada
    // if (!localStorage.getItem('userSubscribed')) {
    //     window.location.href = 'suscripcion.html';
    //     return;
    // }

    // Mostrar modal de suscripción después de 5 segundos si el usuario no está suscrito
    if (!localStorage.getItem('userSubscribed') && !localStorage.getItem('modalDismissed')) {
        setTimeout(showSubscriptionModal, 5000);
    }

    const categoryLinks = document.querySelectorAll('.category-link');
    const sortSelect = document.getElementById('sortBy');
    const experiencesContainer = document.getElementById('experiencesContainer');

    // Ejemplo de datos de experiencias
    let experiences = [
        {
            id: 1,
            title: "Aprendizaje de Python desde cero",
            category: "tecnologia",
            categoryName: "Tecnología",
            description: "Mi experiencia aprendiendo Python como primer lenguaje de programación...",
            imageUrl: "placeholder1.jpg",
            date: new Date('2024-03-15')
        },
        // Aquí irían más experiencias...
    ];

    // Función para actualizar el contador de categorías
    function updateCategoryCounts() {
        const counts = experiences.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + 1;
            return acc;
        }, {});

        categoryLinks.forEach(link => {
            const category = link.getAttribute('data-category');
            const countSpan = link.querySelector('.count');
            if (category === 'todos') {
                countSpan.textContent = `(${experiences.length})`;
            } else {
                countSpan.textContent = `(${counts[category] || 0})`;
            }
        });
    }

    // Función para filtrar y ordenar experiencias
    function filterAndSortExperiences(category, sortBy) {
        let filtered = category === 'todos' 
            ? experiences 
            : experiences.filter(exp => exp.category === category);

        switch(sortBy) {
            case 'recent':
                filtered.sort((a, b) => b.date - a.date);
                break;
            case 'oldest':
                filtered.sort((a, b) => a.date - b.date);
                break;
            case 'az':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'za':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }

        return filtered;
    }

    // Función para renderizar experiencias
    function renderExperiences(filteredExperiences) {
        experiencesContainer.innerHTML = '';
        filteredExperiences.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-category', exp.category);
            
            item.innerHTML = `
                <div class="gallery-image">
                    <img src="${exp.imageUrl}" alt="${exp.title}">
                </div>
                <div class="gallery-info">
                    <h4>${exp.title}</h4>
                    <span class="category-tag">${exp.categoryName}</span>
                    <p class="gallery-excerpt">${exp.description}</p>
                    <span class="experience-date">${exp.date.toLocaleDateString()}</span>
                </div>
            `;
            
            experiencesContainer.appendChild(item);
        });
    }

    // Event listeners
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const category = link.getAttribute('data-category');
            const sortBy = sortSelect.value;
            const filtered = filterAndSortExperiences(category, sortBy);
            renderExperiences(filtered);
        });
    });

    sortSelect.addEventListener('change', () => {
        const activeCategory = document.querySelector('.category-link.active').getAttribute('data-category');
        const filtered = filterAndSortExperiences(activeCategory, sortSelect.value);
        renderExperiences(filtered);
    });

    // Inicialización
    updateCategoryCounts();
    renderExperiences(filterAndSortExperiences('todos', 'recent'));
});

function showSubscriptionModal() {
    const modal = document.createElement('div');
    modal.className = 'subscription-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">×</button>
            <h2>¡No te pierdas nada!</h2>
            <p>Suscríbete para acceder a contenido exclusivo y recibir notificaciones de nuevas experiencias.</p>
            <div class="modal-buttons">
                <button class="subscribe-btn">Suscribirse</button>
                <button class="maybe-later">Quizás más tarde</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Manejar cierre del modal
    const closeBtn = modal.querySelector('.close-modal');
    const maybeLaterBtn = modal.querySelector('.maybe-later');
    const subscribeBtn = modal.querySelector('.subscribe-btn');

    function closeModal() {
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.remove();
        }, 300);
        localStorage.setItem('modalDismissed', 'true');
    }

    closeBtn.addEventListener('click', closeModal);
    maybeLaterBtn.addEventListener('click', closeModal);

    subscribeBtn.addEventListener('click', () => {
        window.location.href = 'auth.html';
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Animación de entrada
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
} 