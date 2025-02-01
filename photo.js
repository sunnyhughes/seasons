document.addEventListener("DOMContentLoaded", function () {
    // Manual Slideshow
    function manualSlideGallery(galleryClass, direction) {
        let slides = document.querySelectorAll(`.${galleryClass}`);
        let currentIndex = 0;

        slides.forEach((slide, index) => {
            if (slide.style.display !== "none") {
                currentIndex = index;
            }
            slide.style.display = "none";
        });

        let nextIndex = (currentIndex + direction + slides.length) % slides.length;
        slides[nextIndex].style.display = "block";
    }

    document.querySelectorAll(".prev").forEach((btn, index) => {
        btn.addEventListener("click", () => manualSlideGallery(`slide-${index + 1}`, -1));
    });

    document.querySelectorAll(".next").forEach((btn, index) => {
        btn.addEventListener("click", () => manualSlideGallery(`slide-${index + 1}`, 1));
    });

    // Auto Fade Gallery
    function startAutoFade(galleryIndex) {
        let slides = document.querySelectorAll(`.fade-${galleryIndex}`);
        let currentIndex = 0;

        function fadeSlides() {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[currentIndex].classList.add("active");
            currentIndex = (currentIndex + 1) % slides.length;
        }

        fadeSlides();
        return setInterval(fadeSlides, 3000);
    }

    let fadeIntervals = {};
    
    document.querySelectorAll(".auto-controls button").forEach((btn, index) => {
        btn.addEventListener("click", function () {
            let galleryIndex = index + 1;
            if (this.innerText === "Play") {
                fadeIntervals[galleryIndex] = startAutoFade(galleryIndex);
                this.innerText = "Pause";
            } else {
                clearInterval(fadeIntervals[galleryIndex]);
                this.innerText = "Play";
            }
        });
    });
});
