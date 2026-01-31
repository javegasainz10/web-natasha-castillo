document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menú Móvil ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Carruseles Lógica (Automática) ---
    
    function setupCarousel(prevBtnId, nextBtnId, trackId) {
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const track = document.getElementById(trackId);

        if(!track) return;

        const scrollAmount = 320; // Ancho de tarjeta + espacio

        // Función para mover hacia adelante
        const scrollNext = () => {
            // Detectar si llegamos al final (con un margen de error pequeño)
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                // Volver al inicio suavemente
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Mover normal
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        // Función para mover hacia atrás
        const scrollPrev = () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        };

        // Eventos de botones
        nextBtn.addEventListener('click', scrollNext);
        prevBtn.addEventListener('click', scrollPrev);

        // --- AUTOPLAY ---
        let autoPlayInterval;

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(scrollNext, 2200); // Cambia cada 2.2 segundos
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Iniciar movimiento
        startAutoPlay();

        // Pausar si el usuario pone el mouse encima o toca la pantalla
        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('touchstart', stopAutoPlay);

        // Reanudar cuando saca el mouse
        track.addEventListener('mouseleave', startAutoPlay);
        track.addEventListener('touchend', startAutoPlay);
    }

    // Configurar carrusel Antes/Después
    setupCarousel('ba-prev', 'ba-next', 'ba-track');
    
    // Configurar carrusel Galería
    setupCarousel('gal-prev', 'gal-next', 'gal-track');

});