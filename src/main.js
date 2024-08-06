import { fetchImg } from './js/pixabay-api';
import { renderImg } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formSearch = document.querySelector('.form');
const inputData = document.querySelector('.input');
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const moreButton = document.querySelector('.more-button');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

async function handleSubmit(event) {
  event.preventDefault();
  galleryList.innerHTML = '';
  moreButton.classList.add('visually-hidden');
  loader.classList.remove('visually-hidden');

  currentQuery = inputData.value.trim();
  currentPage = 1;

  if (currentQuery === '') {
    loader.classList.add('visually-hidden');
    return;
  }

  try {
    const images = await fetchImg(currentQuery, currentPage);
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
      totalHits = images.totalHits;
      renderImg(images, galleryList);

      if (galleryList.children.length < totalHits) {
        moreButton.classList.remove('visually-hidden');
      }
    }
  } catch (error) {
    console.error(error);
    loader.classList.add('visually-hidden');
  }

  formSearch.reset();
}

async function handleLoadMore() {
  loader.classList.remove('visually-hidden');
  currentPage += 1;

  try {
    const images = await fetchImg(currentQuery, currentPage);
    loader.classList.add('visually-hidden');
    renderImg(images, galleryList);

    const imgCard = document.querySelector('.gallery li');
    const cardHeight = imgCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 5,
      behavior: 'smooth',
    });

    if (galleryList.children.length >= totalHits) {
      moreButton.classList.add('visually-hidden');
      iziToast.info({
        maxWidth: '370px',
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'blue',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error(error);
    loader.classList.add('visually-hidden');
  }
}

formSearch.addEventListener('submit', handleSubmit);
moreButton.addEventListener('click', handleLoadMore);
