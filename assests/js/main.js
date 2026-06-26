/**
 * Madhav Ojha - High Performance Founder Portfolio Ecosystem Engine
 * Stack: Vanilla JS + GSAP (ScrollTrigger, TextPlugin)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Register structural plugins with the animation engine
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Initial Core Systems Execution Calls
    initPreloader();
    initCustomCursor();
    initParticleEngine();
    initNavigationScroll();
    initHeroSequence();
    initScrollReveal();
    initSkillProgressMetrics();
    initCounterMetricsAnimation();
    initThreeDCardParallax();
});

/**
 * 1. Premium Loader Timeline Sequence
 */
function initPreloader() {
    const preloader = document.getElementById("preloader");
    
    window.addEventListener("load", () => {
        const tl = gsap.timeline();
        
        tl.to("#loader-text", {
            duration: 0.8,
            letterSpacing: "0.4em",
            opacity: 0,
            ease: "power2.inOut"
        })
        .to(preloader, {
            duration: 0.6,
            yPercent: -100,
            ease: "power4.inOut"
        }, "+=0.2")
        .call(() => {
            preloader.style.display = "none";
        });
    });
    
    // Safety fallback execution configuration (Max 3.5s block latency)
    setTimeout(() => {
        if (preloader.style.display !== "none") {
            preloader.style.display = "none";
        }
    }, 3500);
}

/**
 * 2. Vector Cursor Tracking and Spotlight Physics Mapping
 */
function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    const glow = document.getElementById("cursor-glow");
    
    if (!cursor || !glow) return;

    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            opacity: 1
        });
        
        gsap.to(glow, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4,
            opacity: 1
        });
    });

    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        glow.style.opacity = "0";
    });
}

/**
 * 3. High Performance 2D Floating Vector Space Particle Engine
 */
function initParticleEngine() {
    const container = document.getElementById("particles-container");
    if (!container) return;
    
    const count = 35;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle-element");
        
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = (Math.random() * 0.4 + 0.1).toString();
        
        container.appendChild(particle);
        
        // Execute continuous random vector path calculation
        gsap.to(particle, {
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

/**
 * 4. Scroll Tracking Progress Indicators & Mobile Nav Toggles
 */
function initNavigationScroll() {
    const navbar = document.getElementById("navbar");
    const scrollProgress = document.getElementById("scroll-progress");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    // Dynamic Tracking Function Configuration
    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        if (window.scrollY > 50) {
            navbar.classList.add("nav-scrolled");
        } else {
            navbar.classList.remove("nav-scrolled");
        }
    });

    // Mobile Hamburger Menu Transition Management Logic
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            const opened = mobileMenu.classList.contains("translate-x-0");
            if (opened) {
                mobileMenu.classList.remove("translate-x-0");
                mobileMenu.classList.add("translate-x-full");
            } else {
                mobileMenu.classList.remove("translate-x-full");
                mobileMenu.classList.add("translate-x-0");
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("translate-x-0");
                mobileMenu.classList.add("translate-x-full");
            })
        });
    }
}

/**
 * 5. Hero Headline Typing Text Sequencing Loop
 */
function initHeroSequence() {
    gsap.to(".hero-fade", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
    });
}

/**
 * 6. Element Scroll Detection Framework Configuration
 */
function initScrollReveal() {
    const targets = document.querySelectorAll(".reveal-element");
    
    targets.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        });
    });
}

/**
 * 7. Skill Progression Matrix Calculations
 */
function initSkillProgressMetrics() {
    const progressBars = document.querySelectorAll(".skill-progress-bar");
    
    progressBars.forEach(bar => {
        const targetValue = bar.getAttribute("data-progress");
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 90%",
            },
            width: targetValue,
            duration: 1.5,
            ease: "power4.out"
        });
    });
}

/**
 * 8. Asynchronous Scroll Metric Counter Process Scaling
 */
function initCounterMetricsAnimation() {
    const counters = document.querySelectorAll(".reveal-counter h3");
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"), 10);
        
        gsap.fromTo(counter, { textContent: 0 }, {
            scrollTrigger: {
                trigger: counter,
                start: "top 90%"
            },
            textContent: target,
            duration: 2,
            ease: "power3.out",
            snap: { textContent: 1 },
            modifiers: {
                textContent: value => {
                    const parsedValue = Math.ceil(value);
                    return parsedValue >= 1000 ? parsedValue.toLocaleString() + "+" : parsedValue;
                }
            }
        });
    });
}

/**
 * 9. Vector 3D Gyroscope-Style Card Rotation Layer Calculations
 */
function initThreeDCardParallax() {
    const cards = document.querySelectorAll(".project-card");
    
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const rotateX = (yc - y) / 15;
            const rotateY = (x - xc) / 15;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}