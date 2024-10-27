var before_loadtime = new Date().getTime();
window.onload = () => {
    var after_loadtime = new Date().getTime();
    load_time = (after_loadtime - before_loadtime) / 1000
    setActive()
    document.getElementsByClassName("footer_load_time")[0].innerHTML = "Page load time: " + load_time
};

function setActive() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        console.log(link.getAttribute('href'), currentPath)
        const temp = currentPath.split('/')
        if (link.getAttribute('href') === temp[temp.length - 1] || temp[temp.length - 1] === 'index.html' && link.getAttribute('href') === '#catalog-items-holder')
            link.classList.add('selected');
        else
            link.classList.remove('selected');
        link.addEventListener('click', (event) => {
            navLinks.forEach(nav => nav.classList.remove('selected'));
            link.classList.add('selected');
        });
    });
}