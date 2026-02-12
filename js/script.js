document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
            navbar.style.background = "rgba(255,255,255,0.95)";
        } else {
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
            navbar.style.background = "rgba(255,255,255,0.9)";
        }
    });


    /* =========================================
       SCROLL ANIMATION
    ========================================= */
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });


    /* =========================================
       PRODUCT FILTER
    ========================================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* =========================================
       MOBILE MENU TOGGLE (NEW SYSTEM)
    ========================================= */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {

        mobileNav.classList.toggle('show');

        mobileMenuBtn.innerHTML = mobileNav.classList.contains('show')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

        document.body.style.overflow = mobileNav.classList.contains('show')
            ? 'hidden'
            : 'auto';
    });

    // Close mobile when clicking link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        });
    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* =========================================
       EMAILJS INIT
    ========================================= */
    emailjs.init("SZoD1zqpx-oUAUZWQ");


    /* =========================================
       FORM SUBMIT (EMAILJS)
    ========================================= */
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_fnlc315",
            "template_3qurc43",
            this
        )
        .then(function() {
            alert("Message sent successfully!");
            form.reset();
        })
        .catch(function(error) {
            alert("Failed to send message.");
            console.log(error);
        });
    });

});
