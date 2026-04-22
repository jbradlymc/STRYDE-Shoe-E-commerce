const slides = document.querySelectorAll('.slide-content');
let currentSlide = 0;
let autoSlideTimer;

function showSlide(index) {
    // loop around
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    // hide all slides, show current
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);

    // reset auto-advance timer on manual click
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 4000);
}

// attach arrow button events
document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

// initialize first slide + auto-advance
showSlide(currentSlide);
startAutoSlide();
