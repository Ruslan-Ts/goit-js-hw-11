export function renderImagesToGallery(arr, ref) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="photo-card">
    <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width ="200" height = "160"/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
  </a>
</li>`
    )
    .join('');
  ref.insertAdjacentHTML('beforeend', markup);
}
export function clearGallery(ref) {
  ref.innerHTML = '';
}
