import { ApiPixabay } from './js/apiPixabay';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { renderImagesToGallery, clearGallery } from './js/renderMarkup';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', onClick);

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);
const apiPixabay = new ApiPixabay();

const simplelightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
async function onFormSubmit(e) {
  e.preventDefault();
  clearGallery(galleryRef);
  apiPixabay.resetPage();
  console.log(e.target.elements.input);
  const value = e.target.elements.input.value.trim();
  if (!value) {
    Notiflix.Notify.failure('Please type your request!');
    return;
  }
  apiPixabay.query = value;
  const {
    data: { hits, totalHits },
  } = await apiPixabay.getImages();
  if (Math.ceil(totalHits / apiPixabay.per_page) > apiPixabay.page) {
    loadMoreBtn.disabled = false;
  } else {
    loadMoreBtn.disabled = true;
  }
  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  renderImagesToGallery(normalizeArray(hits), galleryRef);
  simplelightbox.refresh();
}

function normalizeArray(arr) {
  return arr.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      };
    }
  );
}
async function onClick(e) {
  apiPixabay.incrementPage();

  const {
    data: { hits, totalHits },
  } = await apiPixabay.getImages();
  renderImagesToGallery(normalizeArray(hits), galleryRef);
  onScroll();
  simplelightbox.refresh();

  if (Math.ceil(totalHits / apiPixabay.per_page) !== apiPixabay.page) {
    loadMoreBtn.disabled = false;
  } else {
    loadMoreBtn.disabled = true;
  }
}

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
