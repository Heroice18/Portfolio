document.addEventListener('DOMContentLoaded', () => {
    const carouselAutoplayDelay = 2000;
    const carouselTransitionSpeed = 1400;
    const year = new Date().getFullYear();
    const yearElement = document.querySelector('#current-year');

    if (yearElement) {
        yearElement.textContent = year;
    }

    const initializeCaustics = () => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (reducedMotion.matches) {
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.className = 'caustics-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        const gl = canvas.getContext('webgl');

        if (!gl) {
            return;
        }

        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;
        const fragmentShaderSource = `
            precision highp float;
            uniform float time;
            uniform vec2 resolution;

            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
            }

            float voronoi(vec2 uv) {
                vec2 i = floor(uv);
                vec2 f = fract(uv);
                float minDist = 1.0;

                for (int y = -1; y <= 1; y++) {
                    for (int x = -1; x <= 1; x++) {
                        vec2 neighbor = vec2(float(x), float(y));
                        vec2 point = hash(i + neighbor) * vec2(1.0);
                        vec2 diff = neighbor + point - f;
                        minDist = min(minDist, length(diff));
                    }
                }

                return minDist;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / resolution.xy;
                uv.x *= resolution.x / resolution.y;

                float caustic1 = voronoi((uv + vec2(time * 0.1, 0.0)) * 5.0);
                float caustic2 = voronoi((uv - vec2(0.0, time * 0.15)) * 5.0);
                float caustics = pow(caustic1 * caustic2 * 1.5, 3.0);
                vec3 color = vec3(0.2, 0.5, 0.7) * caustics;

                gl_FragColor = vec4(color, 1.0);
            }
        `;

        const compileShader = (source, type) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Unable to compile the caustics shader:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }

            return shader;
        };

        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) {
            if (vertexShader) {
                gl.deleteShader(vertexShader);
            }
            if (fragmentShader) {
                gl.deleteShader(fragmentShader);
            }
            return;
        }

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Unable to link the caustics shader:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return;
        }

        gl.useProgram(program);
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const timeLocation = gl.getUniformLocation(program, 'time');
        const resolutionLocation = gl.getUniformLocation(program, 'resolution');
        let frameRequest = 0;
        let previousFrameTime = 0;
        let elapsedTime = 0;

        const resize = () => {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            const width = Math.round(window.innerWidth * pixelRatio);
            const height = Math.round(window.innerHeight * pixelRatio);

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }
        };

        const render = (timestamp) => {
            frameRequest = 0;

            if (document.hidden || reducedMotion.matches) {
                return;
            }

            if (previousFrameTime) {
                elapsedTime += (timestamp - previousFrameTime) / 1000;
            }
            previousFrameTime = timestamp;

            gl.uniform1f(timeLocation, elapsedTime);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            frameRequest = window.requestAnimationFrame(render);
        };

        const updateAnimation = () => {
            canvas.hidden = reducedMotion.matches;

            if (document.hidden || reducedMotion.matches) {
                window.cancelAnimationFrame(frameRequest);
                frameRequest = 0;
                previousFrameTime = 0;
            } else if (!frameRequest) {
                frameRequest = window.requestAnimationFrame(render);
            }
        };

        resize();
        document.body.prepend(canvas);
        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', updateAnimation);
        reducedMotion.addEventListener('change', updateAnimation);
        updateAnimation();
    };

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
        const hasAutoplay = carouselAutoplayDelay > 0;
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
            options.speed = carouselTransitionSpeed;
            options.autoplay = {
                delay: carouselAutoplayDelay,
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

    initializeCaustics();
    document.querySelectorAll('[data-carousel]').forEach(initializeCarousel);
});
