/* This is the navigation menu. This makes it collapse on a fullscreen */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
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
    