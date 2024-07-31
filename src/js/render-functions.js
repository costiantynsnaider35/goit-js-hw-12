import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images, galList) {
  const markup = images.hits
    .map(
      image => `
      <li>
        <a class="gallery-link" href=${image.largeImageURL}>
          <img src="${image.webformatURL}" alt="${image.tags}">
          <div>
            <p><span>Likes</span>${image.likes}</p>
            <p><span>Views</span>${image.views}</p>
            <p><span>Comments</span>${image.comments}</p>
            <p><span>Downloads</span>${image.downloads}</p>
          </div>
        </a>
      </li>`
    )
    .join('');

  galList.insertAdjacentHTML('beforeend', markup);

  let galNewBox = new SimpleLightbox('.gallery a', {
    captData: 'alt',
    capDelay: 250,
  });
  galNewBox.refresh();
}
