import galleryItems from '../gallery-items.js';

export const createGalleryArr = galleryItems.map(image => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image lazyload"
      data-src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`;
});
