document.addEventListener('DOMContentLoaded', () => {
    
    // --- Bagian Fungsionalitas Audio & Kejutan ---
    
    const birthdayMusic = document.getElementById('birthdayMusic');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseDiv = document.getElementById('surprise');

    // Fungsi untuk memutar musik (dipicu oleh interaksi pengguna)
    function playMusic() {
        birthdayMusic.volume = 1;
        birthdayMusic.play().catch(error => {
            console.log("Autoplay diblokir, menunggu interaksi pengguna.");
        });
        document.removeEventListener('click', playMusic);
        document.removeEventListener('keydown', playMusic);
    }
    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', playMusic);

    // Fungsionalitas Tombol Kejutan
    surpriseBtn.addEventListener('click', () => {
        surpriseDiv.classList.toggle('hidden');
        const messageElement = document.getElementById('message');
        if (!surpriseDiv.classList.contains('hidden')) {
            messageElement.textContent = "Semoga hari ini penuh kebahagiaan dan berkah!!";
        } else {
            messageElement.textContent = "Carpe diem!!";
        }
    });

    // --- Bagian Fungsionalitas Carousel ---
    
    const carouselTrack = document.getElementById('carouselTrack');
    // Ambil semua elemen .carousel-slide
    const carouselSlides = Array.from(carouselTrack.children); 
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');

    let currentIndex = 0;

    // Fungsi untuk mengatur posisi track
    const setTrackPosition = () => {
        // Ambil lebar aktual dari slide pertama (yang sama untuk semua slide)
        const slideWidth = carouselSlides[0].offsetWidth; 
        
        // Geser track sebesar (index saat ini * lebar satu slide)
        carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    // Fungsi untuk membuat dan mengupdate dots navigasi
    const updateDots = () => {
        carouselDots.innerHTML = '';
        carouselSlides.forEach((_, index) => { 
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = index;
                setTrackPosition();
                updateDots();
            });
            carouselDots.appendChild(dot);
        });
    };

    // Event Listener untuk tombol 'Next'
    nextBtn.addEventListener('click', () => {
        // Geser ke berikutnya, kembali ke 0 jika sudah terakhir
        currentIndex = (currentIndex + 1) % carouselSlides.length; 
        setTrackPosition();
        updateDots();
    });

    // Event Listener untuk tombol 'Previous'
    prevBtn.addEventListener('click', () => {
        // Logika mundur, kembali ke terakhir jika sudah 0
        currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length; 
        setTrackPosition();
        updateDots();
    });
    
    // Perbarui posisi slide dan dots saat halaman dimuat
    setTrackPosition();
    updateDots();

    // Pastikan posisi slide diperbarui saat jendela diubah ukurannya
    window.addEventListener('resize', setTrackPosition);
});