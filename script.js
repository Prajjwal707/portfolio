document.addEventListener('DOMContentLoaded', function() {
     const sections = document.querySelectorAll('section');
     const navLinks = document.querySelectorAll('nav a');
 
     // Smooth scroll for navigation links
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
 
     // Intersection Observer for section detection
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
 
     // Handle initial active state
     window.addEventListener('load', () => {
         const hash = window.location.hash;
         if(hash) {
             const initialActive = document.querySelector(`nav a[href="${hash}"]`);
             if(initialActive) initialActive.classList.add('active');
         } else {
             document.querySelector('nav a[href="#home"]').classList.add('active');
         }
     });
 
     // Update URL hash on scroll
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