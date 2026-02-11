document.addEventListener("DOMContentLoaded", function() {

    // ===============================
    // Header scroll effect
    // ===============================
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // ===============================
    // Scroll animations
    // ===============================
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

    // ===============================
    // Product filtering
    // ===============================
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

    // ===============================
    // Mobile menu toggle
    // ===============================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // ===============================
    // Smooth scrolling
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================
    // EmailJS Init
    // ===============================
    emailjs.init("SZoD1zqpx-oUAUZWQ");

    // ===============================
    // Form Submission (EMAILJS)
    // ===============================
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        emailjs.sendForm(
            "service_fnlc315",
            "template_3qurc43",
            this
        )
        .then(function() {
            alert("Message sent successfully!");
            form.reset();
        }, function(error) {
            alert("Failed to send message.");
            console.log(error);
        });
    });

});
