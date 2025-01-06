console.log('JavaScript file loaded');

document.addEventListener('DOMContentLoaded', () => {
    // Form submission handling
    const form = document.querySelector('form');

    //EmailJS
    emailjs.init('UTfZBOAmnYlb5RdG0');
    console.log(emailjs);
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        emailjs.sendForm('service_o1ztndp', 'template_ksbxniy', form)
            .then(() => {
                showNotification('Message sent successfully!');
                form.reset(); // Clear the form fields
            })
            .catch((error) => {
                showNotification('Failed to send message. Please try again later.');
                console.error('EmailJS Error:', error);
            });
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
