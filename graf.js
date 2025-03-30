document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const galleryContainer = document.getElementById('galleryContainer');

    // Configuración del área de arrastre
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewFile(e.target.result, file.type);
                }
                reader.readAsDataURL(file);
            }
        });
    }

    function previewFile(src, type) {
        const preview = document.createElement('div');
        preview.className = 'gallery-item';
        
        if (type.startsWith('image/')) {
            preview.innerHTML = `
                <img src="${src}" alt="Preview">
                <div class="gallery-item-info">
                    <h4>Nuevo archivo</h4>
                    <p>Imagen subida recientemente</p>
                </div>
            `;
        } else if (type.startsWith('video/')) {
            preview.innerHTML = `
                <video controls>
                    <source src="${src}" type="${type}">
                    Tu navegador no soporta el elemento video.
                </video>
                <div class="gallery-item-info">
                    <h4>Nuevo archivo</h4>
                    <p>Video subido recientemente</p>
                </div>
            `;
        }

        galleryContainer.insertBefore(preview, galleryContainer.firstChild);
    }

    // Manejar el formulario de subida
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;

        if (!title || !description) {
            alert('Por favor, completa todos los campos requeridos');
            return;
        }

        // Aquí iría la lógica para enviar los datos al servidor
        alert('Contenido subido exitosamente!');
        
        // Limpiar el formulario
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = 'flora';
    });

    // Funcionalidad para el filtrado de experiencias
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            galleryItems.forEach(item => {
                if (category === 'todos' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Función para crear nuevos items en la galería
    function createGalleryItem(data) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', data.category);
        
        item.innerHTML = `
            <div class="gallery-image">
                <img src="${data.imageUrl}" alt="${data.title}">
            </div>
            <div class="gallery-info">
                <h4>${data.title}</h4>
                <span class="category-tag">${data.categoryName}</span>
                <p class="gallery-excerpt">${data.description}</p>
            </div>
        `;
        
        return item;
    }

    // Cuando se sube una nueva experiencia
    function handleNewExperience(formData, fileUrl) {
        const galleryContainer = document.getElementById('galleryContainer');
        const newItem = createGalleryItem({
            title: formData.title,
            category: formData.category,
            categoryName: document.querySelector(`option[value="${formData.category}"]`).textContent,
            description: formData.description,
            imageUrl: fileUrl
        });
        
        galleryContainer.insertBefore(newItem, galleryContainer.firstChild);
    }
});

// Añadir animación de fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
