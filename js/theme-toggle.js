/**
 * Theme Toggle Script
 * Handles dark/light mode switching with localStorage persistence
 */

(function() {
    'use strict';

    const THEME_KEY = 'webdevpr-theme';
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';

    // Get saved theme from localStorage or system preference
    function getSavedTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return THEME_DARK;
        }
        
        return THEME_LIGHT;
    }

    // Apply theme to document
    function applyTheme(theme) {
        if (theme === THEME_DARK) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        // Update all theme toggle buttons
        updateThemeIcons(theme);
        
        // Save to localStorage
        localStorage.setItem(THEME_KEY, theme);
        
        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    // Update theme toggle button icons
    function updateThemeIcons(theme) {
        const sunIcons = document.querySelectorAll('.theme-toggle-sun');
        const moonIcons = document.querySelectorAll('.theme-toggle-moon');
        
        if (theme === THEME_DARK) {
            sunIcons.forEach(icon => icon.classList.remove('hidden'));
            moonIcons.forEach(icon => icon.classList.add('hidden'));
        } else {
            sunIcons.forEach(icon => icon.classList.add('hidden'));
            moonIcons.forEach(icon => icon.classList.remove('hidden'));
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        applyTheme(newTheme);
    }

    // Initialize theme on page load
    function initTheme() {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);
    }

    // Create theme toggle button
    function createThemeToggleButton() {
        // Check if toggle already exists
        if (document.querySelector('.theme-toggle-btn')) {
            return;
        }

        const button = document.createElement('button');
        button.className = 'theme-toggle-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center';
        button.setAttribute('aria-label', 'Toggle theme');
        button.setAttribute('title', 'Toggle dark/light mode');
        
        button.innerHTML = `
            <i class="fas fa-sun text-xl theme-toggle-sun hidden"></i>
            <i class="fas fa-moon text-xl theme-toggle-moon"></i>
        `;
        
        button.addEventListener('click', toggleTheme);
        
        document.body.appendChild(button);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only update if user hasn't manually set a preference
            if (!localStorage.getItem(THEME_KEY)) {
                applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            createThemeToggleButton();
        });
    } else {
        initTheme();
        createThemeToggleButton();
    }

    // Make toggle function available globally
    window.toggleTheme = toggleTheme;
    window.getTheme = getSavedTheme;
})();

