const data = campgrounds.features;
const container = document.querySelector("div.container");
const loading = document.querySelector('.loading');
let loadedCampgrounds = document.querySelectorAll(`.campground-card`);


window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight) {
        //console.log(`Peresent campgrounds : ${loadedCampgrounds.length}`);
        showLoading();
        loadedCampgrounds = document.querySelectorAll(`.campground-card`);
    }
});

const reqMorePosts = () => {
    for (let index = loadedCampgrounds.length; index < loadedCampgrounds.length + 5; index++) {
        //console.log(`Requesting for : ${index}`);
        addPostsToDOM(index);
    }
}

const showLoading = () => {
    loading.classList.add('show');
    setTimeout(reqMorePosts, 1000);
}

const addPostsToDOM = (index) => {
    const targetCampData = data[index];
    const newCampgeoundCard = document.createElement('div');
    newCampgeoundCard.classList.add("card", "mb-3", "text-dark", "campground-card");
    const image = targetCampData.images.length ? targetCampData.images[0].url : "https://res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png";
    newCampgeoundCard.innerHTML = `<div class="row">
    <div class="col-md-4">
        <img class="img-fluid" alt="" src="${image}">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${targetCampData.title}</h5>
            <p class="card-text">${targetCampData.description}</p>
            <p class="card-text">
                <small class="text-muted">${targetCampData.location}</small>
            </p>
            <a class="btn btn-primary" href="/campgrounds/${targetCampData._id}">View ${targetCampData.title}</a>
            </div>
        </div>
    </div>`;
    container.appendChild(newCampgeoundCard);
    loading.classList.remove('show');
    //console.log('addded')
}
