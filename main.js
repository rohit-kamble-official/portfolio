document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);

    // Update the button icon based on the current theme
    const updateThemeIcon = (theme) => {
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    };
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // 2. Mobile Menu Functionality
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class for styling the expanded menu
            navLinks.classList.toggle('active');
            
            // Change the hamburger icon to an 'X' (times) when active
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close the menu when a nav link is clicked (for single-page navigation)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                
                // Reset icon to bars
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 3. Intersection Observer (Scroll Animations)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the section is visible
    });

    document.querySelectorAll('.hidden').forEach(element => {
        observer.observe(element);
    });

    // 4. Gallery Slider Functionality
    const sliderContainer = document.querySelector('.slider-container');
    const sliderTrack = document.querySelector('.slider-track');
    const images = document.querySelectorAll('.slider-image');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    
    if (sliderTrack && images.length > 0) {
        let currentIndex = 0;
        const totalImages = images.length;

        const updateSlider = () => {
            const imageWidth = images[0].clientWidth;
            // Calculate the transform needed to show the current image
            sliderTrack.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
        };

        const goToNext = () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        };

        const goToPrev = () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
        };

        nextButton.addEventListener('click', goToNext);
        prevButton.addEventListener('click', goToPrev);

        // Update slider position when window is resized (for responsiveness)
        window.addEventListener('resize', updateSlider);

        // Initialize the slider position
        updateSlider(); 
    }
    
    // 5. Update Footer Year
    document.getElementById('current-year').textContent = new Date().getFullYear();
});