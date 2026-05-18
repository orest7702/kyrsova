document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.endsWith(href) && href !== "/") {
            link.classList.add('active');
        }
        if ((href === "index.html" || href === "/cyrsova/") && 
            (currentPath === "/cyrsova/" || currentPath.endsWith("index.html"))) {
            link.classList.add('active');
        }
    });

    const menuBtn = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.menu');
    const sidebarBlock = document.querySelector('.block-menu');

    menuBtn.addEventListener('click', function(event) {
        menuList.classList.toggle('show');
        event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
        if (!sidebarBlock.contains(event.target)) {
            menuList.classList.remove('show');
        }
    });

    const links = menuList.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuList.classList.remove('show');
        });
    });

    const sliders = document.querySelectorAll('.slider-window');

    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const cards = slider.querySelectorAll('.cards');
        const nextBtn = slider.querySelector('.next');
        const prevBtn = slider.querySelector('.prev');
        
        if (!track || cards.length === 0) return;

        let index = 0;
        const visibleCards = 3;

        function updateSlider() {
            const style = window.getComputedStyle(cards[0]);
            const marginRight = parseInt(style.marginRight) || 20;
            const cardWidth = cards[0].offsetWidth + marginRight;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        }

        function showNext() {
            index++;
            if (index > cards.length - visibleCards) {
                index = 0;
            }
            updateSlider();
        }

        function showPrev() {
            index--;
            if (index < 0) {
                index = cards.length - visibleCards;
            }
            updateSlider();
        }

        let autoSlide = setInterval(showNext, 3000);

        slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(showNext, 3000);
        });

        if (nextBtn) nextBtn.addEventListener('click', showNext);
        if (prevBtn) prevBtn.addEventListener('click', showPrev);
        
        window.addEventListener('resize', updateSlider);
    });
});