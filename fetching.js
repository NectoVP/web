function fetchAndDisplayReview() {
    if (localStorage.getItem('pageReloadCount')) {
        localStorage.setItem('pageReloadCount', Number(localStorage.getItem('pageReloadCount')) + 1);
    } else {
        localStorage.setItem('pageReloadCount', 1);
    }
    
    let reloads = localStorage.getItem('pageReloadCount');
    document.getElementById('preloader').style.display = 'flex';
    let start = 5;
    if (reloads % 2 == 0) {
        start = 12;
    }
    for(let i = 0; i < 3; ++i, ++start) {
        fetch('https://jsonplaceholder.typicode.com/photos/' + start)
        .then((response) => response.json())
        .then((data) => {
            displayReview(data.title, data.url + '.png');
            document.getElementById('preloader').style.display = 'none';
            document.getElementById("error-fetcher").classList.add("none");
            document.getElementById("error-fetcher").classList.remove("visible");
        })
        .catch((error) => {
            document.getElementById('preloader').style.display = 'none';
            console.error('Error fetching data:', error);
            document.getElementById("error-fetcher").classList.add("visible");
            document.getElementById("error-fetcher").classList.remove("none");
        });
    }
}

fetchAndDisplayReview();