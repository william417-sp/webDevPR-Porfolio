class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = container.querySelector('.carousel-button.next');
        this.prevButton = container.querySelector('.carousel-button.prev');
        this.indicators = container.querySelector('.carousel-indicators');
        
        this.currentIndex = 0;
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        
        this.setupSlides();
        this.createIndicators();
        this.setupEventListeners();
        this.updateIndicators();
    }
    
    setupSlides() {
        // Position slides next to each other
        this.slides.forEach((slide, index) => {
            slide.style.left = this.slideWidth * index + 'px';
        });
    }
    
    createIndicators() {
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });
    }
    
    setupEventListeners() {
        this.nextButton.addEventListener('click', () => this.nextSlide());
        this.prevButton.addEventListener('click', () => this.prevSlide());
        
        // Optional: Add touch/swipe support
        let startX = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.touches[0].pageX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
                isDragging = false;
            }
        });
        
        this.container.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
    
    updateIndicators() {
        const indicators = this.indicators.children;
        Array.from(indicators).forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.track.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
        this.updateIndicators();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(this.currentIndex);
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(this.currentIndex);
    }
}

// Initialize carousels when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => new Carousel(carousel));
});
