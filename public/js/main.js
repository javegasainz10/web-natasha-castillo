document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menú Móvil ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Carruseles Lógica (Automática) ---
    function setupCarousel(prevBtnId, nextBtnId, trackId) {
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const track = document.getElementById(trackId);

        if(!track || !prevBtn || !nextBtn) return;

        const scrollAmount = 320; // Ancho de tarjeta + espacio

        // Función para mover hacia adelante
        const scrollNext = () => {
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        // Función para mover hacia atrás
        const scrollPrev = () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        };

        prevBtn.addEventListener('click', scrollPrev);
        nextBtn.addEventListener('click', scrollNext);

        // --- AUTOPLAY ---
        let autoPlayInterval;
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(scrollNext, 3000); // 3 segundos es mejor ritmo
        };
        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        startAutoPlay();

        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('touchstart', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);
        track.addEventListener('touchend', startAutoPlay);
    }

    // Configurar carruseles
    setupCarousel('ba-prev', 'ba-next', 'ba-track');
    setupCarousel('gal-prev', 'gal-next', 'gal-track');


    // --- NUEVO: ANIMACIONES AL SCROLL (Intersection Observer) ---
    // Esto hace que los elementos con 'animate-fade-up' se muevan cuando aparecen en pantalla
    
    const observerOptions = {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, observerOptions);

    // Seleccionar todos los elementos a animar
    const animatedElements = document.querySelectorAll('.animate-fade-up');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});