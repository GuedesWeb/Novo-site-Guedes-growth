// ── Modal Portfolio ──
    function openModal(url, event) {
        if(event) event.preventDefault();
        document.getElementById('modal-iframe').src = url;
        document.getElementById('portfolio-modal').classList.remove('is-hidden');
        document.body.style.overflow = 'hidden'; // Impeça a página de rolar
    }
    function closeModal() {
        document.getElementById('portfolio-modal').classList.add('is-hidden');
        document.body.style.overflow = '';
        setTimeout(() => { document.getElementById('modal-iframe').src = ''; }, 400);
    }

    // ── FAQ Toggle ──
    function toggleFaq(btn) {
        const item = btn.closest('.faq-item');
        const body = item.querySelector('.faq-body');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(el => {
            el.classList.remove('open');
            el.querySelector('.faq-body').style.maxHeight = '0';
        });
        if (!isOpen) {
            item.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    }

    // ── GSAP ──
    document.addEventListener("DOMContentLoaded", () => {
        gsap.registerPlugin(ScrollTrigger);

        // Preloader & Hero animation timeline
        const tl = gsap.timeline();
        tl.to('.preloader-text', { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 })
          .to('.preloader-text', { opacity: 0, y: -10, duration: 0.6, ease: "power2.in", delay: 0.8 })
          .to('#preloader', { y: "-100%", duration: 1, ease: "power4.inOut" })
          .to('.hero-huge-text', { y: "0%", duration: 1.4, stagger: 0.15, ease: "power4.out" }, "-=0.4");

        // Fade-ins
        gsap.utils.toArray('.fade-in').forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
                opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                delay: i < 6 ? i * 0.07 : 0
            });
        });

        // Line reveals
        gsap.utils.toArray('.line').forEach(line => {
            gsap.to(line, {
                scrollTrigger: { trigger: line, start: "top 92%", toggleActions: "play none none none" },
                width: "100%", duration: 1.2, ease: "power2.inOut"
            });
        });

        // Portfolio parallax zoom
        gsap.utils.toArray('.portfolio-img').forEach(img => {
            gsap.fromTo(img, { scale: 1.08 }, {
                scale: 1, ease: "none",
                scrollTrigger: { trigger: img.closest('.portfolio-card'), start: "top bottom", end: "bottom top", scrub: true }
            });
        });

        // Navbar hide/show
        let last = 0;
        const nav = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            const cur = window.scrollY;
            if (cur > last && cur > 200) {
                nav.style.transform = 'translateX(-50%) translateY(-120%)';
                nav.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
            } else {
                nav.style.transform = 'translateX(-50%) translateY(0)';
            }
            last = cur;
        });

        // ── Drag to scroll (Feedbacks) ──
        const track = document.querySelector('.feedback-track');
        if (track) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            track.addEventListener('mousedown', (e) => {
                isDown = true;
                track.style.cursor = 'grabbing';
                track.style.scrollSnapType = 'none'; // Disable snap temporarily while dragging
                startX = e.pageX - track.offsetLeft;
                scrollLeft = track.scrollLeft;
            });
            track.addEventListener('mouseleave', () => {
                isDown = false;
                track.style.cursor = 'grab';
                track.style.scrollSnapType = 'x mandatory';
            });
            track.addEventListener('mouseup', () => {
                isDown = false;
                track.style.cursor = 'grab';
                track.style.scrollSnapType = 'x mandatory';
            });
            track.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                const walk = (x - startX) * 2; // Scroll-fast multiplier
                track.scrollLeft = scrollLeft - walk;
            });

            // ── Track Scroll Progress ──
            const progressBar = document.querySelector('.feedback-progress-bar');
            if (progressBar) {
                track.addEventListener('scroll', () => {
                    const maxScroll = track.scrollWidth - track.clientWidth;
                    if (maxScroll > 0) {
                        const progress = track.scrollLeft / maxScroll;
                        // O width da barra é 33.33% (1/3). Então ela pode se mover os outros 2/3 (aprox 200%) para preencher a track
                        progressBar.style.transform = `translateX(${progress * 200}%)`;
                    }
                });
            }
        }
    });
