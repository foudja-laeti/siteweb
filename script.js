
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Here you would typically load different menu items based on the tab
                // For this demo, we'll just show an alert
                alert(`Affichage du menu: ${btn.textContent}`);
            });
        });

        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const nav = document.querySelector('nav');
        
        mobileMenu.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });

        // Form submission
        const reservationForm = document.querySelector('.reservation-form');
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre réservation! Nous vous confirmons par email sous peu.');
            this.reset();
        });
    