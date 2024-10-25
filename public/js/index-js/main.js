
//==========[ ANIMASI TEXT ]==========\\
const textList = ['Front End Developer', 'Software Engineering']; // Daftar nilai yang akan ditampilkan secara berulang
const typingElement = document.querySelector('.typing'); // Pilih elemen yang akan diubah teksnya

let index = 0; // Indeks untuk mengakses nilai dalam daftar

function changeText() {
    typingElement.textContent = textList[index]; // Atur teks elemen menjadi nilai dalam daftar
    index = (index + 1) % textList.length; // Pindah ke nilai berikutnya dalam daftar

    // Reset animasi dengan menghapus dan menambahkan class
    typingElement.classList.remove('typing');
    void typingElement.offsetWidth; // Trigger reflow
    typingElement.classList.add('typing');
}

// Panggil fungsi changeText untuk mengubah teks saat halaman dimuat
changeText();

// Ganti teks setiap 5 detik (sesuai dengan durasi animasi)
setInterval(changeText, 5000);



/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            toggle.classList.toggle('active'); // Add this line
        })
    }
}
showMenu('burger','nav-menu')

/*===== REMOVE MENU MOBILE AFTER CLICKING A LINK =====*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



/*===== THEME =====*/

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
particelToggleColor();
};

document.getElementById('toggle-theme').addEventListener('click', function() {
    const currentTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
particelToggleColor();
});

// Setel tema yang disimpan dan inisialisasi partikel
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
particelToggleColor();
};

const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

/*SCROLL PORTFOLIO*/
sr.reveal('.portfolio__img', {interval: 200})

const burger = document.querySelector('.burger-container');
const navigasi = document.querySelector('.navigasi');

burger.addEventListener('click', () => {
    navigasi.classList.toggle('active');
});
