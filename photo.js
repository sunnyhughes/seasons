/* This is the navigation menu. This makes it collapse on a fullscreen */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    const lightbox = document.getElementById("lightbox");
    if (!gallery || !lightbox) {
        return; // Nothing to enhance on this page
    }

    const shots = Array.from(gallery.querySelectorAll(".shot"));
    const lbImage = document.getElementById("lbImage");
    const lbCaption = document.getElementById("lbCaption");
    const lbCounter = document.getElementById("lbCounter");
    let current = 0;
    let lastFocused = null;

    function show(index) {
        // Wrap around so the arrows never dead-end
        current = (index + shots.length) % shots.length;
        const shot = shots[current];
        lbImage.src = shot.getAttribute("href");
        lbImage.alt = shot.dataset.caption || "";
        lbCaption.textContent = shot.dataset.caption || "";
        lbCounter.textContent = (current + 1) + " / " + shots.length;
    }

    function openLightbox(index) {
        lastFocused = document.activeElement;
        show(index);
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden"; // Stop the page scrolling behind
        document.getElementById("lbClose").focus();
        // Add a history entry so the phone's back button closes the photo
        // and returns to the gallery, instead of leaving the site.
        history.pushState({ lightbox: true }, "");
    }

    function closeLightbox(fromBackButton) {
        if (!lightbox.classList.contains("open")) {
            return;
        }
        lightbox.classList.remove("open");
        lbImage.src = "";
        document.body.style.overflow = "";
        if (lastFocused) {
            lastFocused.focus();
        }
        // If we closed via a button, rewind the history entry we added, so the
        // back button doesn't have to be pressed twice to leave the gallery.
        if (!fromBackButton && history.state && history.state.lightbox) {
            history.back();
        }
    }

    window.addEventListener("popstate", function () {
        closeLightbox(true);
    });

    shots.forEach(function (shot, index) {
        shot.addEventListener("click", function (event) {
            event.preventDefault(); // Without JS this link opens the photo directly
            openLightbox(index);
        });
    });

    document.getElementById("lbClose").addEventListener("click", function () {
        closeLightbox(false);
    });
    document.getElementById("lbPrev").addEventListener("click", function () {
        show(current - 1);
    });
    document.getElementById("lbNext").addEventListener("click", function () {
        show(current + 1);
    });

    // Clicking the dark backdrop closes, clicking the photo itself does not
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("open")) {
            return;
        }
        if (event.key === "Escape") {
            closeLightbox(false);
        } else if (event.key === "ArrowLeft") {
            show(current - 1);
        } else if (event.key === "ArrowRight") {
            show(current + 1);
        }
    });

    // Swipe left and right on a phone
    let touchStartX = null;
    lightbox.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (event) {
        if (touchStartX === null) {
            return;
        }
        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 50) {
            show(distance < 0 ? current + 1 : current - 1);
        }
        touchStartX = null;
    }, { passive: true });
});
