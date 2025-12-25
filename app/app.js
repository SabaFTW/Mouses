// GroundUp App - Markdown Documentation Viewer

class GroundUpApp {
    constructor() {
        this.contentArea = document.getElementById('contentArea');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menuToggle');
        this.currentPage = 'README.md';

        this.init();
    }

    init() {
        // Configure marked options
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            mangle: false
        });

        // Set up event listeners
        this.setupNavigation();
        this.setupMobileMenu();

        // Load initial page
        this.loadPage(this.currentPage);

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.loadPage(page);

                // Close mobile menu after navigation
                if (window.innerWidth < 768) {
                    this.sidebar.classList.remove('open');
                }
            });
        });
    }

    setupMobileMenu() {
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 &&
                !this.sidebar.contains(e.target) &&
                e.target !== this.menuToggle) {
                this.sidebar.classList.remove('open');
            }
        });
    }

    async loadPage(pagePath, addToHistory = true) {
        try {
            // Show loading state
            this.contentArea.innerHTML = '<div class="loading">Loading...</div>';

            // Fetch markdown file
            const response = await fetch(`../${pagePath}`);

            if (!response.ok) {
                throw new Error(`Failed to load ${pagePath}`);
            }

            const markdown = await response.text();

            // Convert markdown to HTML
            const html = marked.parse(markdown);

            // Update content
            this.contentArea.innerHTML = html;

            // Update active nav link
            this.updateActiveLink(pagePath);

            // Add to browser history
            if (addToHistory) {
                history.pushState({ page: pagePath }, '', `#${pagePath}`);
            }

            // Scroll to top
            this.contentArea.scrollTop = 0;

            // Process internal links
            this.processInternalLinks();

            // Update current page
            this.currentPage = pagePath;

        } catch (error) {
            console.error('Error loading page:', error);
            this.contentArea.innerHTML = `
                <div class="error">
                    <h2>Error Loading Page</h2>
                    <p>Could not load <code>${pagePath}</code></p>
                    <p>${error.message}</p>
                    <button onclick="app.loadPage('README.md')">Return Home</button>
                </div>
            `;
        }
    }

    updateActiveLink(pagePath) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pagePath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    processInternalLinks() {
        const links = this.contentArea.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');

            // Handle internal markdown links
            if (href && (href.endsWith('.md') || href.includes('.md#'))) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Resolve relative paths
                    const currentDir = this.currentPage.substring(0, this.currentPage.lastIndexOf('/'));
                    let targetPage = href;

                    if (href.startsWith('/')) {
                        // Absolute path
                        targetPage = href.substring(1);
                    } else if (href.startsWith('../')) {
                        // Relative path going up
                        targetPage = this.resolvePath(currentDir, href);
                    } else if (!href.startsWith('http')) {
                        // Relative path in same directory
                        targetPage = currentDir ? `${currentDir}/${href}` : href;
                    }

                    // Remove anchor if present (for now - could enhance to scroll to anchor)
                    targetPage = targetPage.split('#')[0];

                    this.loadPage(targetPage);
                });
            }

            // Open external links in new tab
            if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    resolvePath(currentDir, relativePath) {
        const parts = currentDir.split('/');
        const relParts = relativePath.split('/');

        for (const part of relParts) {
            if (part === '..') {
                parts.pop();
            } else if (part !== '.') {
                parts.push(part);
            }
        }

        return parts.join('/');
    }
}

// Initialize app when DOM is ready
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new GroundUpApp();
    });
} else {
    app = new GroundUpApp();
}
