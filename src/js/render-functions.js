import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImg(images, imgGallery) {
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

  imgGallery.insertAdjacentHTML('beforeend', markup);

  let imgGallerySl = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  imgGallerySl.refresh();
}
