import React, { useState, useEffect } from 'react';
import SearchBar from './Searchbar/Searchbar';
import Button from '../components/Button/Button';
import Api from '../service/api';
import Loader from 'components/Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import css from './App.module.css';

const App = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [modalTags, setModalTags] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      if (!hasSearched) {
        return;
      }

      setIsLoading(true);
      try {
        const images = await Api.images(name, page);
        setImg(prevImages =>
          page === 1 ? images.hits : [...prevImages, ...images.hits]
        );
        setTotalPages(Math.floor(images.totalHits / 12));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [name, page, hasSearched]);

  const onSubmit = newName => {
    setName(newName);
    setPage(1);
    setHasSearched(true);
    scrollToTop();
  };

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 50;

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  const onClickModalOpen = (imgModal, tags) => {
    setModalImg(imgModal);
    setModalTags(tags);
  };

  const onClickModalClose = () => {
    setModalImg(null);
    setModalTags('');
  };

  const clickBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {modalImg && (
        <Modal
          onClose={onClickModalClose}
          imgModal={modalImg}
          modalTags={modalTags}
        />
      )}
      {hasSearched && (
        <>
          <ImageGallery items={img} openModal={onClickModalOpen} />
          <Button
            onClick={clickBtn}
            img={img}
            totalPages={totalPages}
            page={page}
          />
        </>
      )}
      {isLoading && <Loader isLoading={isLoading} />}
    </div>
  );
};

export { App };

export default App;
