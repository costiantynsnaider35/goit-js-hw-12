import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formSearch = document.querySelector('.form');
const inputSearch = document.querySelector('.input');
const galList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
let inpVal;
let page = 1;
let limit = 15;
let totalPages = 0;

function handleSub(event) {
  loadMoreBtn.classList.add('visually-hidden');
  event.preventDefault();

  galList.innerHTML = '';
  loader.classList.remove('visually-hidden');

  inpVal = inputSearch.value.trim();

  if (inpVal === '') {
    loader.classList.add('visually-hidden');
    return;
  }

  page = 1;

  fetchImages(inpVal, page)
    .then(images => {
      totalPages = Math.ceil(images.totalHits / limit);
      loader.classList.add('visually-hidden');
      if (images.hits.length === 0) {
        iziToast.error({
          maxWidth: '370px',
          position: 'topRight',
          messageColor: 'white',
          backgroundColor: 'red',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        loader.classList.add('visually-hidden');
        loadMoreBtn.classList.remove('visually-hidden');
        renderImages(images, galList);
      }
    })
    .catch(error => {
      iziToast.error({
        maxWidth: '370px',
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: 'Request feiled. Please try again',
      });
      loader.classList.add('visually-hidden');
    });

  formSearch.reset();
}

async function handleClick(event) {
  page += 1;
  if (page > totalPages) {
    loadMoreBtn.classList.add('visually-hidden');
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }
  const newPage = await fetchImages(inpVal, page);
  renderImages(newPage, galList);
  const firstCard = document.querySelector('.gallery li');
  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

formSearch.addEventListener('submit', handleSub);
loadMoreBtn.addEventListener('click', handleClick);
