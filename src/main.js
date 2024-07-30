import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const fetchImagesBtn = document.querySelector('.btn');
let inputValue;
let page = 1;
let limit = 15;
let totalPages = 0;

function handleSubmit(event) {
  fetchImagesBtn.classList.add('visually-hidden');
  event.preventDefault();

  galleryList.innerHTML = '';
  loader.classList.remove('visually-hidden');

  inputValue = input.value.trim();

  if (inputValue === '') {
    loader.classList.add('visually-hidden');
    return;
  }

  page = 1;

  fetchImages(inputValue, page)
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
        fetchImagesBtn.classList.remove('visually-hidden');
        renderImages(images, galleryList);
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

  form.reset();
}

async function handleClick(event) {
  page += 1;
  if (page > totalPages) {
    fetchImagesBtn.classList.add('visually-hidden');
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }
  const newPage = await fetchImages(inputValue, page);
  renderImages(newPage, galleryList);
  const firstCard = document.querySelector('.gallery li');
  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', handleSubmit);
fetchImagesBtn.addEventListener('click', handleClick);
