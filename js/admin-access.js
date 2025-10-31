/**
 * Admin Access Button - Quick access to admin panel
 * webDevPR © 2025
 */

(function() {
    'use strict';

    // Create admin access button
    function createAdminButton() {
        // Check if button already exists
        if (document.getElementById('admin-access-btn')) {
            return;
        }

        // Create button container
        const adminBtn = document.createElement('div');
        adminBtn.id = 'admin-access-btn';
        adminBtn.innerHTML = `
            <button id="admin-toggle" title="Panel de Administración">
                <i class="fas fa-shield-alt"></i>
            </button>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #admin-access-btn {
                position: fixed;
                bottom: 90px;
                right: 20px;
                z-index: 9998;
                animation: slideInAdmin 0.5s ease-out;
            }

            @keyframes slideInAdmin {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            #admin-toggle {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #43a047 0%, #66bb6a 100%);
                border: none;
                box-shadow: 0 4px 20px rgba(67, 160, 71, 0.4);
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 22px;
            }

            #admin-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(67, 160, 71, 0.6);
            }

            #admin-toggle:active {
                transform: scale(0.95);
            }

            #admin-toggle i {
                pointer-events: none;
            }

            /* Tooltip */
            #admin-toggle::before {
                content: 'Admin Panel';
                position: absolute;
                right: 70px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 13px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            }

            #admin-toggle:hover::before {
                opacity: 1;
            }

            /* Mobile adjustments */
            @media (max-width: 768px) {
                #admin-access-btn {
                    bottom: 80px;
                    right: 15px;
                }

                #admin-toggle {
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                }
            }

            /* Hide tooltip on mobile */
            @media (max-width: 480px) {
                #admin-toggle::before {
                    display: none;
                }
            }
        `;

        // Add to document
        document.head.appendChild(style);
        document.body.appendChild(adminBtn);

        // Add click event
        const button = document.getElementById('admin-toggle');
        button.addEventListener('click', openAdminPanel);

        // Optional: Add keyboard shortcut (Ctrl+Alt+A)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.altKey && e.key === 'a') {
                e.preventDefault();
                openAdminPanel();
            }
        });
    }

    // Open admin panel
    function openAdminPanel() {
        // Get the correct path to admin panel
        const currentPath = window.location.pathname;
        let adminPath = '/admin-panel.html';

        // Get the base path
        const pathSegments = currentPath.split('/');
        
        // If we're in a subdirectory (like /pages/), adjust the path
        if (currentPath.includes('/pages/')) {
            adminPath = '../admin-panel.html';
        } else if (currentPath.includes('Webporfolio')) {
            // If full path contains Webporfolio, use relative path
            adminPath = 'admin-panel.html';
        }

        // Check if already logged in
        const isLoggedIn = localStorage.getItem('admin_panel_logged_in') === 'true';
        
        console.log('Opening admin panel:', adminPath);
        console.log('Is logged in:', isLoggedIn);
        console.log('Current path:', currentPath);
        
        if (isLoggedIn) {
            // Open in new tab if already logged in
            const newWindow = window.open(adminPath, '_blank');
            if (!newWindow) {
                // If popup was blocked, redirect instead
                console.warn('Popup blocked, redirecting...');
                window.location.href = adminPath;
            }
        } else {
            // Redirect to login
            window.location.href = adminPath;
        }
    }

    // Temporalmente deshabilitado - Admin pausado
    // Initialize when DOM is ready
    // if (document.readyState === 'loading') {
    //     document.addEventListener('DOMContentLoaded', createAdminButton);
    // } else {
    //     createAdminButton();
    // }
})();

