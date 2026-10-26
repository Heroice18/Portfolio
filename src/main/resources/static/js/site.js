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

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const autoplayDelay = Number(carouselElement.dataset.autoplayDelay);
        const transitionSpeed = Number(carouselElement.dataset.transitionSpeed);
        const hasAutoplay = Number.isFinite(autoplayDelay) && autoplayDelay > 0;
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

        if (hasAutoplay) {
            options.speed = Number.isFinite(transitionSpeed) && transitionSpeed > 0 ? transitionSpeed : 600;
            options.autoplay = {
                delay: autoplayDelay,
                disableOnInteraction: false,
                enabled: !reducedMotion.matches,
                pauseOnMouseEnter: true
            };
        }

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

        const swiper = new Swiper(sliderElement, options);

        if (hasAutoplay && swiper.autoplay) {
            const pauseAutoplay = () => swiper.autoplay.stop();
            const resumeAutoplay = () => {
                if (!reducedMotion.matches) {
                    swiper.autoplay.start();
                }
            };

            carouselElement.addEventListener('pointerenter', pauseAutoplay);
            carouselElement.addEventListener('pointerleave', resumeAutoplay);
            carouselElement.addEventListener('focusin', pauseAutoplay);
            carouselElement.addEventListener('focusout', (event) => {
                if (!carouselElement.contains(event.relatedTarget)) {
                    resumeAutoplay();
                }
            });
            if (carouselElement.matches(':hover')) {
                pauseAutoplay();
            }

            reducedMotion.addEventListener('change', () => {
                if (reducedMotion.matches) {
                    swiper.autoplay.stop();
                } else if (!carouselElement.matches(':hover') && !carouselElement.contains(document.activeElement)) {
                    swiper.autoplay.start();
                }
            });
        }

        if (sliderControls) {
            sliderControls.hidden = false;
        }
    };

    document.querySelectorAll('[data-carousel]').forEach(initializeCarousel);
});
