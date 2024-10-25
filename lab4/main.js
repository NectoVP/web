function displayLoadTime() {
    const startTime = performance.now();
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        const footer = document.querySelector('footer');
        if (footer) {
            const stats = document.createElement('div');
            stats.textContent = `Page load time: ${Math.round(loadTime)} ms`;
            stats.classList.add('load-time-stats');
            footer.appendChild(stats);
        }
    });
}
  
function main() {
    displayLoadTime();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
                event.preventDefault();
            }
            navLinks.forEach(nav => nav.classList.remove('selected'));
            link.classList.add('selected');
        });
    });
}

window.addEventListener('load', () => {
    displayLoadTime();
    main();
});

document.addEventListener('DOMContentLoaded', main);
