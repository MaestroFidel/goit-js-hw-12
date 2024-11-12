import { createGalleryCard } from "./js/render-functions";
import { fetchPhotos } from "./js/pixabay-api";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchImg = document.querySelector('.js-search-form');
const galleryImg = document.querySelector('.js-gallery');
const waitLoader = document.querySelector('.js-loader');
const moreButton = document.querySelector('.more-button');

let currentPage = 1;
let searchValue = "";

const lightbox = new SimpleLightbox('.js-gallery a', {
  captiondata: 'alt',
  captionDelay: 250,
});

const onSearchFormSubmit = async event => {
    event.preventDefault();

    searchValue = searchImg.elements.user_query.value.trim();
    if (searchValue === "") {
            iziToast.error({
              title: "Error",
              message: "Please fill out the form",
              position: 'topRight',
              timeout: 3000
            });
            return;
          }
          currentPage = 1;

        
          waitLoader.classList.remove('loader-hidden');
    try {
        const data = await fetchPhotos(searchValue, currentPage);
        if (data.hits.length === 0) {
                iziToast.warning({
                  title: "No results",
                  message: "Sorry, there are no images your search query. Please try again.",
                  position: 'topLeft',
                });
                galleryImg.innerHTML = '';
               
                moreButton.classList.add('more-button-hidden');
                return;
              };
            
             const galleryCardTemplate = data.hits
              .map(imgDetails => createGalleryCard(imgDetails))
              .join('');
              galleryImg.innerHTML = galleryCardTemplate;

              // scrSmooth();

              lightbox.refresh();
              searchImg.reset();

              if (data.totalHits > 15) {
                moreButton.classList.remove('more-button-hidden');
              }


    }
    catch (err) {
        iziToast.error ({
            title: "Error",
            message:
            'Something wrong. Please, try later'
        })
    }
        finally {
             waitLoader.classList.add('loader-hidden');
            }; 
        };   

 const onMoreButton = async () => {
currentPage++;
waitLoader.classList.remove('loader-hidden');
try {
    const data = await fetchPhotos(searchValue, currentPage);
                        
         const galleryCardTemplate = data.hits
          .map(imgDetails => createGalleryCard(imgDetails))
          .join('');
          galleryImg.insertAdjacentHTML ("beforeend", galleryCardTemplate);

          scrSmooth();

          lightbox.refresh();
        
          if (Math.ceil(data.totalHits / 15) === currentPage) {
            moreButton.classList.add('more-button-hidden');
            iziToast.info({
              message: "We're sorry, but you've reached the end of search results.",
              position: "topRight"
            })
          }
}
catch (err) {
    iziToast.error ({
        title: "Error",
        message:
        'Something wrong. Please, try later'
    })
}
    finally {
         waitLoader.classList.add('loader-hidden');
        }; 
 };

const scrSmooth = () => {
  const { height } = galleryImg.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
     behavior: 'smooth',
  });
};
moreButton.addEventListener('click', onMoreButton)
searchImg.addEventListener('submit', onSearchFormSubmit);







