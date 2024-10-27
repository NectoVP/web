var before_loadtime = new Date().getTime();
window.onload = function() {
    var after_loadtime = new Date().getTime();
    load_time = (after_loadtime - before_loadtime) / 1000
    setActive()
    document.getElementsByClassName("footer_load_time")[0].innerHTML = "Page load time: " + load_time
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.forEach(review => {
        displayReview(review.text, review.image);
    });
};

function displayReview(reviewText, reviewImage) {
    const fullReview = document.createElement("div");
    fullReview.classList.add("full-review");

    const textReview = document.createElement("div");
    textReview.classList.add("text-review");
    textReview.textContent = reviewText;

    const imgReview = document.createElement("img");
    imgReview.classList.add("img-review");
    imgReview.src = reviewImage;
    imgReview.onerror = () => {
        console.error("Failed to load image:", reviewImage);
        imgReview.src = "reviews/review_sample3.jpg";
    };

    fullReview.appendChild(textReview);
    fullReview.appendChild(imgReview);
    document.getElementById("reviewContainer").appendChild(fullReview);
}

function addReview(event) {
    event.preventDefault();
    const reviewText = document.getElementById("reviewText").value;
    const reviewImageFile = document.getElementById("reviewImageFile").files[0];
    
    const newReview = {
        text: reviewText,
        image: null
    };

    if (reviewImageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newReview.image = e.target.result;
            displayReview(newReview.text, newReview.image);
            saveReviewToLocalStorage(newReview);
        };
        reader.readAsDataURL(reviewImageFile);
    }
    document.getElementById("reviewForm").reset();
}

function saveReviewToLocalStorage(review) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

document.getElementById("clearReviewsButton").onclick = function() {
    const container = document.getElementById("reviewContainer");
    localStorage.removeItem("reviews");
    for (let i = container.children.length - 1; i >= 3; i--) {
        container.removeChild(container.children[i]);
    }
};