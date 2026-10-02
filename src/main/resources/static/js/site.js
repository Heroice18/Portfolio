document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const yearElement = document.querySelector('#current-year');

    if (yearElement) {
        yearElement.textContent = year;
    }

    const initializeCarousel = (carouselElement) => {
        const sliderElement = carouselElement.querySelector('.swiper');
        const sliderControls = carouselElement.querySelector('.slider-controls');
        const previousButton = sliderControls?.querySelector('.slider-prev');
        const nextButton = sliderControls?.querySelector('.slider-next');
        const pagination = sliderControls?.querySelector('.swiper-pagination');

        if (!sliderElement || !window.Swiper) {
            return;
        }

        const options = {
            effect: 'coverflow',
            centeredSlides: true,
            initialSlide: 0,
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
            }
        };

        if (previousButton && nextButton) {
            options.navigation = {
                nextEl: nextButton,
                prevEl: previousButton
            };
        }

        if (pagination) {
            options.pagination = {
                el: pagination,
                clickable: true
            };
        }

        new Swiper(sliderElement, options);

        if (sliderControls) {
            sliderControls.hidden = false;
        }
    };

    document.querySelectorAll('[data-carousel]').forEach(initializeCarousel);
});
