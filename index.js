// ==========================================================================
// LÓGICA DE LA INVITACIÓN
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. CUENTA REGRESIVA
    // ==========================================================================

    const weddingDate = new Date("2026-10-31T18:00:00-03:00").getTime();

    function updateCountdown() {
        const now = Date.now();
        const distance = weddingDate - now;

        if (distance <= 0) {
            const container = document.querySelector(".countdown-container");

            if (container) {
                container.innerHTML =
                    "<h3 class='boda-terminada'>¡Llegó el gran día!</h3>";
            }

            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        const daysSpan = document.getElementById("days");
        const hoursSpan = document.getElementById("hours");
        const minutesSpan = document.getElementById("minutes");
        const secondsSpan = document.getElementById("seconds");

        if (daysSpan) daysSpan.textContent = days;
        if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, "0");
        if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, "0");
        if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();

    const countdownTimer = setInterval(updateCountdown, 1000);


    // ==========================================================================
    // 2. GALERÍA
    // ==========================================================================

    const galleryTrack = document.getElementById("galleryTrack");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const dots = document.querySelectorAll(".dot");

    let currentIndex = 0;

    function visibleItems() {

        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;

        return 4;
    }

    function updateGallery() {

        // Si no existe la galería, no hacemos nada
        if (!galleryTrack || galleryItems.length === 0) return;

        const visibles = visibleItems();

        const itemWidth = galleryItems[0].offsetWidth + 20;

        if (currentIndex > galleryItems.length - visibles) {
            currentIndex = 0;
        }

        galleryTrack.style.transform =
            `translateX(-${currentIndex * itemWidth}px)`;

        dots.forEach(d => d.classList.remove("active"));

        const page = Math.floor(currentIndex / visibles);

        if (dots[page]) {
            dots[page].classList.add("active");
        }
    }

    function nextGallery() {

        if (galleryItems.length === 0) return;

        currentIndex++;

        if (currentIndex > galleryItems.length - visibleItems()) {
            currentIndex = 0;
        }

        updateGallery();
    }

    window.addEventListener("resize", updateGallery);

    setInterval(nextGallery, 4000);

    updateGallery();


    // ==========================================================================
    // 3. MOSTRAR / OCULTAR CBU
    // ==========================================================================

    window.toggleCbu = function () {

        const cbuBox = document.getElementById("cbu-info");

        if (cbuBox) {
            cbuBox.classList.toggle("hidden");
        }
    };


    // ==========================================================================
    // 4. PANTALLA DE BIENVENIDA + MÚSICA
    // ==========================================================================

    const welcome = document.getElementById("welcome-screen");
    const music = document.getElementById("bgMusic");

    const btnMusicOn = document.getElementById("musicOn");
    const btnMusicOff = document.getElementById("musicOff");


    // --------------------------------------------------------------------------
    // INGRESAR CON MÚSICA
    // --------------------------------------------------------------------------

    if (btnMusicOn) {

        btnMusicOn.addEventListener("click", () => {

            console.log("Botón con música presionado");

            if (music) {

                music.play()
                    .then(() => {
                        console.log("Música reproduciendo");
                    })
                    .catch(error => {
                        console.log("Error al reproducir música:", error);
                    });

            }

            cerrarBienvenida();

        });

    }


    // --------------------------------------------------------------------------
    // INGRESAR SIN MÚSICA
    // --------------------------------------------------------------------------

    if (btnMusicOff) {

        btnMusicOff.addEventListener("click", () => {

            console.log("Botón sin música presionado");

            if (music) {
                music.pause();
            }

            cerrarBienvenida();

        });

    }


    // --------------------------------------------------------------------------
    // CERRAR PANTALLA DE BIENVENIDA
    // --------------------------------------------------------------------------

    function cerrarBienvenida() {

        if (!welcome) return;

        welcome.style.opacity = "0";

        setTimeout(() => {
            welcome.style.display = "none";
        }, 800);

    }

});
