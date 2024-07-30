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

function handleSubmit(event) {
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
        renderImages(images, galleryList);
      }
    })
    .catch(error => {
      console.error(error);
    });

  form.reset();
}

async function handleClick(event) {
  page += 1;
  const newPage = await fetchImages(inputValue, page);
  renderImages(newPage, galleryList);
}

form.addEventListener('submit', handleSubmit);
fetchImagesBtn.addEventListener('click', handleClick);
