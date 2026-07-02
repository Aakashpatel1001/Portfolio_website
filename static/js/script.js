document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Loader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 800);

        // Trigger initial animation for elements already in viewport
        handleScroll();
    }, 1500); // Artificial delay to show the nice loader

    // --- 3. Typing Effect ---
    const words = ["Python Developer", "Django Developer", "Full Stack Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpan = document.getElementById('typing-text');

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 2000); // Start typing after loader

    // --- 4. Dynamic Hero Terminal ---
    const heroTerminalBody = document.getElementById('hero-terminal-body');
    if (heroTerminalBody) {
        const terminalLines = [
            { text: '$ Initializing system...', cls: 'log-gray', delay: 300 },
            { text: '$ Loading Python 3.12 runtime...', cls: 'log-gray', delay: 500 },
            { text: '$ pip install django==5.0', cls: 'log-yellow', delay: 700 },
            { text: '$ Collecting django==5.0', cls: 'log-gray', delay: 400 },
            { text: '$ Successfully installed django-5.0', cls: 'log-green', delay: 600 },
            { text: '$ python manage.py runserver', cls: 'log-yellow', delay: 800 },
            { text: '$ Watching for file changes...', cls: 'log-gray', delay: 400 },
            { text: '$ System online at 127.0.0.1:8000', cls: 'log-green', delay: 600 },
            { text: '$ Database: SQLite3 connected', cls: 'log-green', delay: 500 },
            { text: '$ Static files: 42 assets loaded', cls: 'log-green', delay: 400 },
            { text: '$ Error: 404 /favicon.ico (handled)', cls: 'log-red', delay: 700 },
            { text: '$ GET /api/portfolio/ 200 OK [12ms]', cls: 'log-green', delay: 500 },
            { text: '$ Templates compiled successfully', cls: 'log-green', delay: 400 },
            { text: '$ Deploying to production...', cls: 'log-yellow', delay: 800 },
            { text: '$ Build complete. All systems green.', cls: 'log-green', delay: 600 },
        ];

        let lineIndex = 0;

        function addTerminalLine() {
            if (lineIndex >= terminalLines.length) {
                // Add the final prompt
                const promptLine = document.createElement('p');
                promptLine.innerHTML = '<span class="log-prompt">➜</span> <span class="log-path">~</span> <span class="cursor-block"></span>';
                heroTerminalBody.appendChild(promptLine);
                heroTerminalBody.scrollTop = heroTerminalBody.scrollHeight;

                // Restart the sequence after a pause
                setTimeout(() => {
                    heroTerminalBody.innerHTML = '';
                    lineIndex = 0;
                    addTerminalLine();
                }, 8000);
                return;
            }

            const line = terminalLines[lineIndex];
            const p = document.createElement('p');
            const span = document.createElement('span');
            span.className = line.cls;

            // Typing animation for each line
            let charIdx = 0;
            const fullText = line.text;

            function typeLine() {
                if (charIdx <= fullText.length) {
                    span.textContent = fullText.substring(0, charIdx);
                    charIdx++;
                    setTimeout(typeLine, 15 + Math.random() * 15);
                } else {
                    lineIndex++;
                    setTimeout(addTerminalLine, line.delay);
                }
            }

            p.appendChild(span);
            heroTerminalBody.appendChild(p);
            heroTerminalBody.scrollTop = heroTerminalBody.scrollHeight;
            typeLine();
        }

        // Start terminal after loader
        setTimeout(addTerminalLine, 2000);
    }

    // --- 4.5 Mobile Overlay Menu ---
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.getElementById('mobileNavOverlay');
    const overlayNavItems = document.querySelectorAll('.overlay-nav-item');
    const overlayCloseBtn = document.getElementById('overlayCloseBtn');

    function openOverlay() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        initMenuParticles();
        // Re-render feather icons inside overlay
        if (window.feather) feather.replace();
    }

    function closeOverlay() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        stopMenuParticles();
    }

    if (hamburger && overlay) {
        hamburger.addEventListener('click', () => {
            if (overlay.classList.contains('active')) {
                closeOverlay();
            } else {
                openOverlay();
            }
        });

        // Close button inside overlay
        if (overlayCloseBtn) {
            overlayCloseBtn.addEventListener('click', closeOverlay);
        }

        // Close on nav item click
        overlayNavItems.forEach(item => {
            item.addEventListener('click', () => {
                closeOverlay();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeOverlay();
            }
        });
    }



    // --- Menu Particle Canvas ---
    let menuParticleAnimId = null;
    let menuParticles = [];

    function initMenuParticles() {
        const menuCanvas = document.getElementById('menu-particles-canvas');
        if (!menuCanvas) return;
        const mCtx = menuCanvas.getContext('2d');
        menuCanvas.width = window.innerWidth;
        menuCanvas.height = window.innerHeight;
        menuParticles = [];

        for (let i = 0; i < 30; i++) {
            menuParticles.push({
                x: Math.random() * menuCanvas.width,
                y: Math.random() * menuCanvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.3 + 0.1
            });
        }

        function animateMenuParticles() {
            mCtx.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
            const isLight = document.body.classList.contains('light-theme');

            menuParticles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > menuCanvas.width) p.vx = -p.vx;
                if (p.y < 0 || p.y > menuCanvas.height) p.vy = -p.vy;

                mCtx.beginPath();
                mCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                mCtx.fillStyle = isLight
                    ? `rgba(2, 132, 199, ${p.alpha})`
                    : `rgba(0, 229, 255, ${p.alpha})`;
                mCtx.fill();
            });

            // Draw subtle connections
            for (let i = 0; i < menuParticles.length; i++) {
                for (let j = i + 1; j < menuParticles.length; j++) {
                    const dx = menuParticles[i].x - menuParticles[j].x;
                    const dy = menuParticles[i].y - menuParticles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const lineAlpha = Math.max(0, 0.08 - dist / 2000);
                        mCtx.beginPath();
                        mCtx.strokeStyle = isLight
                            ? `rgba(126, 34, 206, ${lineAlpha})`
                            : `rgba(0, 229, 255, ${lineAlpha})`;
                        mCtx.lineWidth = 0.5;
                        mCtx.moveTo(menuParticles[i].x, menuParticles[i].y);
                        mCtx.lineTo(menuParticles[j].x, menuParticles[j].y);
                        mCtx.stroke();
                    }
                }
            }

            menuParticleAnimId = requestAnimationFrame(animateMenuParticles);
        }

        animateMenuParticles();
    }

    function stopMenuParticles() {
        if (menuParticleAnimId) {
            cancelAnimationFrame(menuParticleAnimId);
            menuParticleAnimId = null;
        }
    }

    // --- 5. Navbar & Scroll Reveal ---
    const navbar = document.querySelector('.navbar');
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    function handleScroll() {
        // Navbar styling
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        // Reveal elements
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // --- 5.5 Animated Skill Bars with IntersectionObserver ---
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    if (skillsSection) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    skillsAnimated = true;
                    animateSkillBars();
                }
            });
        }, { threshold: 0.3 });

        skillObserver.observe(skillsSection);
    }

    function animateSkillBars() {
        const stackFills = document.querySelectorAll('.stack-fill[data-target]');
        stackFills.forEach((fill, index) => {
            const target = parseInt(fill.getAttribute('data-target'), 10);

            // Apply color-coded class based on proficiency level
            if (target >= 75) {
                fill.classList.add('level-high');
            } else if (target >= 50) {
                fill.classList.add('level-mid');
            } else {
                fill.classList.add('level-low');
            }

            // Stagger the animation
            setTimeout(() => {
                fill.style.width = target + '%';
            }, 200 + index * 250);
        });
    }

    // --- 6. Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-container');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => { card.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // --- 7. Minimal Particle Network Background ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // Dynamic color logic based on theme could be added, using neon blue base
            const isLight = document.body.classList.contains('light-theme');
            ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(0, 240, 255, 0.4)';
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    const isLight = document.body.classList.contains('light-theme');
                    const alpha = Math.max(0, 0.2 - distance / 600);
                    ctx.strokeStyle = isLight ? `rgba(126, 34, 206, ${alpha})` : `rgba(176, 38, 255, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // --- 8. Contact Form AJAX & Toast ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showToast(data.message);
                        this.reset();
                    } else {
                        showToast(data.message || 'Error: Could not send transmission.', true);
                    }
                })
                .catch(error => {
                    showToast('Error: Network failure.', true);
                });
        });
    }

    function showToast(message, isError = false) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            padding: 14px 28px;
            background: ${isError ? 'rgba(255, 42, 85, 0.9)' : 'rgba(16, 185, 129, 0.9)'};
            color: white;
            border-radius: 10px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.85rem;
            font-weight: 600;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid ${isError ? 'rgba(255, 42, 85, 0.4)' : 'rgba(16, 185, 129, 0.4)'};
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Animate out
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // --- 9. Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scrollToTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
