// Konfigurasi partikel untuk tema terang
// Fungsi untuk menginisialisasi partikel berdasarkan tema yang dipilih
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50, // Jumlah partikel
                density: {
                    enable: true,
                    value_area: 800, // Kepadatan area
                },
            },
            color: {
                value: '#9400D3', // Warna partikel
            },
            shape: {
                type: 'circle', // Bentuk partikel
            },
            opacity: {
                value: 0.5, // Opacity partikel
            },
            size: {
                value: 5, // Ukuran partikel
                random: true,
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#9400D3',
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 5, // Kecepatan partikel
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
            },
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse',
                },
                onclick: {
                    enable: false,
                    mode: 'push',
                },
            },
            modes: {
                repulse: {
                    distance: 100,
                },
                push: {
                    particles_nb: 1,
                },
            },
        },
        retina_detect: true,
    });

});