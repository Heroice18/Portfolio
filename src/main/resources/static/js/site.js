document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const yearElement = document.querySelector('#current-year');

    if (yearElement) {
        yearElement.textContent = year;
    }

    const sliderElement = document.querySelector('.portfolio-swiper');
    const sliderControls = document.querySelector('.slider-controls');

    if (sliderElement && window.Swiper) {
        new Swiper(sliderElement, {
            effect: 'coverflow',
            centeredSlides: true,
            initialSlide: 1,
            slidesPerView: 'auto',
            grabCursor: true,
            rewind: true,
            keyboard: { enabled: true },
            a11y: { enabled: true },
            coverflowEffect: {
                rotate: 24,
                stretch: -8,
                depth: 140,
                modifier: 1,
                slideShadows: false
            },
            navigation: {
                nextEl: '.slider-next',
                prevEl: '.slider-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });

        sliderControls.hidden = false;
    }

    const contactForm = document.querySelector('#contact-form');
    const statusElement = document.querySelector('#form-status');

    if (!contactForm || !statusElement) {
        return;
    }

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        statusElement.className = 'form-status';
        statusElement.textContent = 'Sending...';

        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('The message could not be sent.');
            }

            contactForm.reset();
            statusElement.textContent = 'Thanks. Your message has been sent.';
        } catch (error) {
            statusElement.className = 'form-status error';
            statusElement.textContent = error.message;
        }
    });
});
