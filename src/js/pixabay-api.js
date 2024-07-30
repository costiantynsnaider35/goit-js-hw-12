import axios from 'axios';

const API_KEY = '45139433-b39febc8ea292e87313288c36';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
