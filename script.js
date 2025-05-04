// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');

    // Slider elements
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    // Collection filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const collectionItems = document.querySelectorAll('.collection-item');

    // Forms
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contact-form');
    const subscriptionMessage = document.querySelector('.subscription-message');
    const formMessage = document.querySelector('.form-message');

    // Theme toggle
    const themeButton = document.getElementById('theme-button');
    const themeIcon = themeButton.querySelector('i');

    // Check localStorage for theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // ===== NAVIGATION =====
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = getComputedStyle(document.documentElement).getPropertyValue('--light-color');
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });

    // ===== SLIDER FUNCTIONALITY =====
    let currentSlide = 0;
    const slideWidth = 100; // Percentage width of each slide

    // Function to update slide position
    function updateSlidePosition() {
        sliderContainer.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Next slide
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlidePosition();
    });

    // Previous slide
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlidePosition();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateSlidePosition();
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlidePosition();
    }, 5000);

    // ===== COLLECTION FILTER =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and add to clicked button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Show/hide items based on filter
            collectionItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    // Adding animation for smoother transition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== NEWSLETTER SUBSCRIPTION =====
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Store email in localStorage
        let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        
        // Show success message
        subscriptionMessage.textContent = 'Thank you for subscribing!';
        subscriptionMessage.style.color = 'var(--success-color)';
        
        // Clear form
        this.reset();
        
        // Clear message after 3 seconds
        setTimeout(() => {
            subscriptionMessage.textContent = '';
        }, 3000);
    });

    // ===== CONTACT FORM =====
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Store in localStorage
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Show success message
        formMessage.textContent = 'Your message has been sent! We will get back to you soon.';
        formMessage.style.color = 'var(--success-color)';
        
        // Clear form
        this.reset();
        
        // Clear message after 3 seconds
        setTimeout(() => {
            formMessage.textContent = '';
        }, 3000);
    });

    // ===== THEME TOGGLE =====
    themeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Toggle icon
        themeIcon.classList.toggle('fa-sun');
        themeIcon.classList.toggle('fa-moon');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // ===== ANIMATIONS =====
    // Animate items when they come into view
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.collection-item, .feature, .testimonial, .about-image, .contact-form');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.collection-item, .feature, .testimonial, .about-image, .contact-form').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();

    // ===== VIEW ITEM DETAILS =====
    const viewButtons = document.querySelectorAll('.view-item');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.collection-item');
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = item.querySelector('.price').textContent;
            
            alert(`Item Detail: ${itemName}\nPrice: ${itemPrice}\n\nThis would open a detailed product page in a real shop.`);
        });
    });

    // ===== USER PREFERENCES =====
    // Get preferred currency from localStorage or set default
    const savedCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    
    // Function to apply user preferences
    function applyUserPreferences() {
        document.querySelectorAll('.price').forEach(price => {
            const numericValue = parseFloat(price.textContent.replace(/[^0-9.-]+/g, ''));
            
            switch(savedCurrency) {
                case 'EUR':
                    price.textContent = `€${numericValue * 0.92}`;
                    break;
                case 'GBP':
                    price.textContent = `£${numericValue * 0.79}`;
                    break;
                default:
                    price.textContent = `$${numericValue}`;
            }
        });
    }
    
    // Apply preferences on load
    applyUserPreferences();
});
