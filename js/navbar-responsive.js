/**
 * Enhanced Responsive Navbar Functionality
 * webDevPR © 2025
 */

(function() {
    'use strict';

    // Enhanced mobile menu functionality
    class ResponsiveNavbar {
        constructor() {
            this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
            this.mobileMenu = document.getElementById('mobile-menu');
            this.isMenuOpen = false;
            this.init();
        }

        init() {
            if (this.mobileMenuBtn && this.mobileMenu) {
                this.setupEventListeners();
                this.setupResizeHandler();
                this.setupClickOutsideHandler();
                this.setupKeyboardNavigation();
            }
        }

        setupEventListeners() {
            // Mobile menu toggle
            this.mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });

            // Close menu when clicking on links
            const menuLinks = this.mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }

        setupResizeHandler() {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (window.innerWidth >= 768 && this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                }, 250);
            });
        }

        setupClickOutsideHandler() {
            document.addEventListener('click', (e) => {
                if (this.isMenuOpen && 
                    !this.mobileMenu.contains(e.target) && 
                    !this.mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }

        setupKeyboardNavigation() {
            // ESC key to close menu
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMenuOpen) {
                    this.closeMobileMenu();
                    this.mobileMenuBtn.focus();
                }
            });

            // Tab navigation within mobile menu
            this.mobileMenu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableElements = this.mobileMenu.querySelectorAll(
                        'a, button, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }

        toggleMobileMenu() {
            if (this.isMenuOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }

        openMobileMenu() {
            this.isMenuOpen = true;
            this.mobileMenu.classList.remove('hidden');
            
            // Add opening animation
            this.mobileMenu.style.animation = 'slideDown 0.3s ease-out';
            
            // Update button icon
            const icon = this.mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }

            // Update aria attributes
            this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
            this.mobileMenuBtn.setAttribute('aria-label', 'Close mobile menu');

            // Focus first menu item
            const firstLink = this.mobileMenu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        closeMobileMenu() {
            if (!this.isMenuOpen) return;

            this.isMenuOpen = false;
            
            // Add closing animation
            this.mobileMenu.classList.add('closing');
            
            setTimeout(() => {
                this.mobileMenu.classList.add('hidden');
                this.mobileMenu.classList.remove('closing');
                this.mobileMenu.style.animation = '';
            }, 300);

            // Update button icon
            const icon = this.mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            // Update aria attributes
            this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
            this.mobileMenuBtn.setAttribute('aria-label', 'Open mobile menu');

            // Restore body scroll
            document.body.style.overflow = '';
        }

        // Public method to close menu programmatically
        close() {
            this.closeMobileMenu();
        }
    }

    // Navbar scroll behavior
    class NavbarScroll {
        constructor() {
            this.navbar = document.querySelector('.nav-glass');
            this.lastScrollY = window.scrollY;
            this.isScrollingDown = false;
            this.init();
        }

        init() {
            if (this.navbar) {
                this.setupScrollHandler();
            }
        }

        setupScrollHandler() {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.handleScroll();
                }, 10);
            });
        }

        handleScroll() {
            const currentScrollY = window.scrollY;
            const scrollDifference = currentScrollY - this.lastScrollY;

            // Only apply scroll behavior on larger screens
            if (window.innerWidth >= 768) {
                if (scrollDifference > 5 && currentScrollY > 100) {
                    // Scrolling down
                    if (!this.isScrollingDown) {
                        this.navbar.style.transform = 'translateY(-100%)';
                        this.isScrollingDown = true;
                    }
                } else if (scrollDifference < -5) {
                    // Scrolling up
                    if (this.isScrollingDown) {
                        this.navbar.style.transform = 'translateY(0)';
                        this.isScrollingDown = false;
                    }
                }
            }

            this.lastScrollY = currentScrollY;
        }
    }

    // Active page highlighting
    class ActivePageHighlighter {
        constructor() {
            this.currentPage = this.getCurrentPage();
            this.init();
        }

        getCurrentPage() {
            const path = window.location.pathname;
            const filename = path.split('/').pop() || 'homepage.html';
            return filename;
        }

        init() {
            this.highlightActivePage();
        }

        highlightActivePage() {
            const navLinks = document.querySelectorAll('.nav-glass a[href]');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === this.currentPage || 
                    (this.currentPage === 'homepage.html' && href === 'homepage.html')) {
                    link.classList.add('text-primary', 'font-semibold');
                    link.classList.remove('text-text-secondary');
                } else {
                    link.classList.remove('text-primary', 'font-semibold');
                    link.classList.add('text-text-secondary');
                }
            });
        }
    }

    // Initialize when DOM is ready
    function initResponsiveNavbar() {
        new ResponsiveNavbar();
        new NavbarScroll();
        new ActivePageHighlighter();
    }

    // Initialize immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initResponsiveNavbar);
    } else {
        initResponsiveNavbar();
    }

    // Make ResponsiveNavbar available globally for external use
    window.ResponsiveNavbar = ResponsiveNavbar;

})();
