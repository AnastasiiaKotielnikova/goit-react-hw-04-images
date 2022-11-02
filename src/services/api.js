import axios from 'axios';

const MY_KEY = `29770488-919f6a75902a1a7de70fff114`;

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  const normalizedImages = response.data.hits.map(
    ({ id, largeImageURL, webformatURL, tags }) => {
      return { id, largeImageURL, webformatURL, tags };
    }
  );

  const pages = Math.ceil(response.data.totalHits / 12);

  return { images: normalizedImages, pages };
};
