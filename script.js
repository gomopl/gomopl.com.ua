// Плавне підсвічування пункту меню при скролі
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 130;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`nav ul li a[href="#${sec.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // Плавний скрол для Safari/IE
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({behavior: "smooth"});
      }
    });
  });

  // Анімація fade-in при появі секцій
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.22 });
  fadeEls.forEach(el => fadeInObserver.observe(el));

  // Lightbox для галереї "Про нас"
  const galleryImgs = document.querySelectorAll('.about-gallery .gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightbox.classList.add('open');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') img.click();
    });
  });
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightboxImg.src = "#";
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeBtn.click();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeBtn.click();
  });
});
