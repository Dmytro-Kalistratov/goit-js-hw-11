const axios = require('axios').default;
import Notiflix from 'notiflix';

const formInput = document.querySelector(`[name="searchQuery"]`);
const formSubmit = document.querySelector(`[name="submitQuery"]`);
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const searchParams = {
    key: '24889810-2bc4e76c9cdda8d01f76f9c49',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    webformatURL: '',
    largeImageURL: '',
    tags: '',
    likes: '',
    views: '',
    comments: '',
    downloads: '',
    page: 1,
    per_page: 40,
};

formSubmit.addEventListener('click', searchingPhotos);

async function searchingPhotos (event) {
    event.preventDefault();

    try {
        searchParams.q = formInput.value;
        searchParams.page = 1;

        const searchOptions = new URLSearchParams(searchParams);

        await axios.get(`https://pixabay.com/api/?${searchOptions}`)
            .then(response => {
                const photos = response.data.hits;
                renderImages(photos);
            });
    } catch (error) {
        console.log(error.message);
    };
};

async function renderImages(PixabaySearchResults) {
    const markup = PixabaySearchResults.reduce((currentMarkup, currentImage) => {
        const currentImageMarkup = ` <div class="photo-card">
                <a href="${currentImage.largeImageURL}">
                    <img src="${currentImage.webformatURL}" alt="tags: ${currentImage.tags}" loading="lazy" width="640" height="auto"/>
                </a>
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b> ${currentImage.likes}
                    </p>
                    <p class="info-item">
                    <b>Views</b> ${currentImage.views}
                    </p>
                    <p class="info-item">
                    <b>Comments</b> ${currentImage.comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads</b> ${currentImage.downloads}
                    </p>
                </div>
            </div>`;
        
        return currentMarkup += currentImageMarkup;
    }, "");

    gallery.insertAdjacentHTML("beforeend", markup);
};

loadMore.addEventListener('click', loadMorePhotos);

async function loadMorePhotos(event) {

    try {  
        searchParams.page += 1;

        const searchOptions = new URLSearchParams(searchParams);

        await axios.get(`https://pixabay.com/api/?${searchOptions}`)
            .then(response => {
                const photos = response.data.hits;
                renderImages(photos);
            });
    } catch (error) {
        console.log(error.message);
    };
};
