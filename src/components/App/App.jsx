import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchImages } from 'services/api';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeUrl, setLargeUrl] = useState(null);
  const [tag, setTag] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;
    setStatus('pending');

    fetchImages(searchQuery, page)
      .then(response => {
        setStatus('resolved');
        if (response.images.length === 0) {
          Report.failure(
            'Search Failure',
            'There is no images for your query. Please enter other query',
            'Ok'
          );
          return;
        }
        if (page === 1) {
          setPages(response.pages);
        }
        setImages(images => [...images, ...response.images]);
      })
      .catch(error => {
        setStatus('rejected');
        console.log(error);
      });
  }, [searchQuery, page]);

  const handleSearch = searchName => {
    setSearchQuery(searchName);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onModalClose = () => {
    setLargeUrl(null);
    setTag(null);
  };

  const openModal = (url, alt) => {
    setLargeUrl(url);
    setTag(alt);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onOpenModal={openModal} />
          {status === 'resolved' && pages && pages !== page && (
            <Button onClick={handleLoadMore} />
          )}
        </>
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (
        <h2>Ups... Something went wrong. Please try again later.</h2>
      )}

      {largeUrl && <Modal url={largeUrl} alt={tag} onClose={onModalClose} />}
    </Container>
  );
};

export default App;
