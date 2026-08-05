/* The small-screen navigation menu. The button reports its own state through
   aria-expanded so screen readers announce whether the menu is open. */
(function () {
    const nav = document.getElementById("myTopnav");
    const toggle = document.getElementById("navToggle");
    if (!nav || !toggle) {
        return;
    }

    function setOpen(open) {
        nav.classList.toggle("responsive", open);
        toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Esc closes the menu and puts focus back on the button that opened it
    nav.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            setOpen(false);
            toggle.focus();
        }
    });
})();

        // Auto-Transitioning Gallery Logic
        let index = 0;
        const slideshow = document.getElementById("slideshow");
        function slideShow() {
            index = (index + 1) % 2; // Alternates between 0 and 1
            slideshow.style.transform = `translateX(-${index * 100}%)`;
        }
        /* Only start the timer on pages that actually have a slideshow.
           Without this it errors every 7 seconds on the pages that don't. */
        if (slideshow) {
            setInterval(slideShow, 7000); // Changes every 7 seconds
        }
    