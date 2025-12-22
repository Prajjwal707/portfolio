document.addEventListener('DOMContentLoaded', function() {
     const sections = document.querySelectorAll('section');
     const navLinks = document.querySelectorAll('nav a');
 
     navLinks.forEach(link => {
         link.addEventListener('click', function(e) {
             e.preventDefault();
             const targetId = this.getAttribute('href');
             const targetSection = document.querySelector(targetId);
             
             if(targetSection) {
                 targetSection.scrollIntoView({
                     behavior: 'smooth',
                     block: 'start'
                 });
             }
         });
     });
 

     const observerOptions = {
         root: null,
         rootMargin: '0px',
         threshold: 0.5
     };
 
     const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if(entry.isIntersecting) {
                 const activeId = '#' + entry.target.id;
                 navLinks.forEach(link => {
                     const linkHref = link.getAttribute('href');
                     if(linkHref === activeId) {
                         link.classList.add('active');
                     } else {
                         link.classList.remove('active');
                     }
                 });
             }
         });
     }, observerOptions);
 
     sections.forEach(section => {
         observer.observe(section);
     });
 
     window.addEventListener('load', () => {
         const hash = window.location.hash;
         if(hash) {
             const initialActive = document.querySelector(`nav a[href="${hash}"]`);
             if(initialActive) initialActive.classList.add('active');
         } else {
             document.querySelector('nav a[href="#home"]').classList.add('active');
         }
     });
 
     window.addEventListener('scroll', () => {
         let currentSection = '';
         sections.forEach(section => {
             const sectionTop = section.offsetTop;
             const sectionHeight = section.clientHeight;
             if(window.scrollY >= sectionTop - sectionHeight / 3) {
                 currentSection = section.id;
             }
         });
         window.history.replaceState({}, '', '#' + currentSection);
     });
 });

document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById('sliderContainer');
    const wrapper = document.getElementById('servicesWrapper');
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let currentTranslate = 0;
    let prevTranslate = 0;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - wrapper.offsetLeft;
        slider.classList.add('active');
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        prevTranslate = currentTranslate;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5; 
        currentTranslate = prevTranslate + walk;
        

        const maxScroll = -(wrapper.scrollWidth - slider.offsetWidth);
        if (currentTranslate > 0) currentTranslate = 0;
        if (currentTranslate < maxScroll) currentTranslate = maxScroll;

        wrapper.style.transform = `translateX(${currentTranslate}px)`;
    });

    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - wrapper.offsetLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        prevTranslate = currentTranslate;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        currentTranslate = prevTranslate + walk;
        
        const maxScroll = -(wrapper.scrollWidth - slider.offsetWidth);
        if (currentTranslate > 0) currentTranslate = 0;
        if (currentTranslate < maxScroll) currentTranslate = maxScroll;

        wrapper.style.transform = `translateX(${currentTranslate}px)`;
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".exp-tab");
    const cards = document.querySelectorAll(".exp-detail-card");

    // 1. Tab Logic
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.getAttribute("data-target");

            // Reset States
            tabs.forEach(t => t.classList.remove("active"));
            cards.forEach(c => c.classList.remove("active"));

            // Set Active State
            tab.classList.add("active");
            document.getElementById(target).classList.add("active");
        });
    });

    // 2. Scroll Reveal Logic
    const revealOnScroll = () => {
        document.querySelectorAll(".reveal").forEach(el => {
            const triggerPoint = window.innerHeight * 0.85;
            if (el.getBoundingClientRect().top < triggerPoint) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); 
});