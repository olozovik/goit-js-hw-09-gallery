import './sass/main.scss';
import galleryItems from './gallery-items.js';
import { createGalleryArr } from './js/createGalleryArr';
import lazysizes from 'lazysizes';
import 'modern-normalize/modern-normalize.css';

const refs = {
  gallery: document.querySelector('ul.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxBtnClose: document.querySelector('[data-action="close-lightbox"]'),
  lightboxImg: document.querySelector('.js-lightbox .lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
};

refs.gallery.insertAdjacentHTML('beforeend', createGalleryArr.join(''));

const closeLightbox = () => {
  refs.lightbox.classList.remove('is-open');
  bodyScrollLock();
  refs.lightboxImg.src = `#`;
  window.removeEventListener('keydown', onLigthboxCloseEsc);
  window.removeEventListener('keydown', onLightboxNextImg);
  window.removeEventListener('keydown', onLightboxPriviousImg);
};

const onLigthboxCloseClick = () => {
  closeLightbox();
};

const onLigthboxCloseEsc = event => {
  if (event.code === 'Escape') {
    closeLightbox();
  }
};

const onLigthboxCloseBackdropClick = event => {
  if (event.target === refs.lightboxOverlay) {
    closeLightbox();
  }
};

const changeImg = (currentSrc, eventCode) => {
  let currentIdx = 0;

  galleryItems.forEach((item, idx) => {
    if (item.original === currentSrc) {
      currentIdx = idx;
      return;
    }
  });

  if (eventCode === 'ArrowRight') {
    if (currentIdx === galleryItems.length - 1) {
      return galleryItems[0].original;
    } else {
      return galleryItems[currentIdx + 1].original;
    }
  }

  if (eventCode === 'ArrowLeft') {
    if (currentIdx === 0) {
      return galleryItems[galleryItems.length - 1].original;
    } else {
      return galleryItems[currentIdx - 1].original;
    }
  }
};

const onLightboxNextImg = event => {
  if (event.code === 'ArrowRight') {
    refs.lightboxImg.src = changeImg(refs.lightboxImg.src, 'ArrowRight');
  }
};

const onLightboxPriviousImg = event => {
  if (event.code === 'ArrowLeft') {
    refs.lightboxImg.src = changeImg(refs.lightboxImg.src, 'ArrowLeft');
  }
};

const bodyScrollLock = () => {
  if (refs.lightbox.classList.contains('is-open')) {
    document.body.style.overflow = 'hidden';
    document.body.style.width = 'calc(100% - 15px)';
  } else {
    document.body.style.overflow = 'auto';
    document.body.style.width = '100%';
  }
};

const onGalleryImgClick = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.lightboxImg.src = `${event.target.dataset.source}`;
  setTimeout(() => {
    refs.lightbox.classList.add('is-open');
    bodyScrollLock();

    refs.lightboxBtnClose.addEventListener('click', onLigthboxCloseClick);
    window.addEventListener('keydown', onLigthboxCloseEsc);
    refs.lightbox.addEventListener('click', onLigthboxCloseBackdropClick);

    window.addEventListener('keydown', onLightboxNextImg);
    window.addEventListener('keydown', onLightboxPriviousImg);
  }, 50);
};

refs.gallery.addEventListener('click', onGalleryImgClick);
