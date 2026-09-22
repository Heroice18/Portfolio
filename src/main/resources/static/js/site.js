document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const yearElement = document.querySelector('#current-year');

    if (yearElement) {
        yearElement.textContent = year;
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
