document.addEventListener('DOMContentLoaded', () => {
    // Form submission handling
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        if (name && email && message) {
            showNotification('Thank you for your message! I will get back to you soon.');
            form.reset();
        } else {
            showNotification('Please fill in all fields');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Highlight active navigation link on scroll
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Add copy-to-clipboard functionality for email
    const emailElement = document.querySelector('.email');

    emailElement.addEventListener('click', () => {
        const email = emailElement.textContent.trim();
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            showNotification('Failed to copy email. Please try again.');
        });
    });

    // Show notification function
    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});
