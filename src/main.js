
// import { displayPhotos } from "./js/render-functions";
// import { fetchPhotos } from "./js/pixabay-api";
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// const searchImg = document.querySelector('.js-search-form');
// const galleryImg = document.querySelector('.js-gallery');
// const waitLoader = document.querySelector('.js-loader');
// const moreButton = document.querySelector('.more-button');

// let currentPage = 1;
// let searchValue = "";


// const onSearchFormSubmit = async event => {
//     event.preventDefault();
//     searchValue = searchImg.elements.user_query.value.trim();
//     if (searchValue === "") {
//             iziToast.error({
//               title: "Error",
//               message: "Please fill out the form",
//               position: 'topRight',
//               timeout: 3000
//             });
//             return;
//           }
//           currentPage = 1;

//           waitLoader.classList.remove('loader-hidden');
//     try {
//         const data = await fetchPhotos(searchValue);
//         if (data.hits.length === 0) {
//                 iziToast.warning({
//                   title: "No results",
//                   message: "Sorry, there are no images your search query. Please try again.",
//                   position: 'topLeft',
//                 });
//                 galleryImg.innerHTML = '';
//                 searchImg.reset();
//                 return;
//               };
//                  if (data.totalHits > 15) {
//                 moreButton.classList.remove('more-button-hidden');
//               }

//               displayPhotos(data.hits, galleryImg, new SimpleLightbox('.gallery-card a')); 

//     }
//     catch (err) {
//         iziToast.error ({
//             title: "Error",
//             message:
//             'Something wrong. Please, try later'
//         })
//     }
//         finally {
        
//                 waitLoader.classList.add('loader-hidden');
//             }; 
//         };   

//         const loadMoreBtn = async () => {
//             currentPage++;
//             waitLoader.classList.remove('loader-hidden');
//     try {
//         const data = await fetchPhotos(searchValue);
        
//               displayPhotos(data.hits, galleryImg, new SimpleLightbox('.gallery-card a')); 

//     }
//     catch (err) {
//         iziToast.error ({
//             title: "Error",
//             message:
//             'Something wrong. Please, try later'
//         })
//     }
//         finally {
//                         waitLoader.classList.add('loader-hidden');
//             }; 
//         }

// searchImg.addEventListener('submit', onSearchFormSubmit);


// import { fetchPhotos } from './pixabay-api';
// import { displayPhotos } from './render-function';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';


import { displayPhotos } from "./js/render-functions";
import { fetchPhotos } from "./js/pixabay-api";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let page = 1;
let searchValue = '';
const searchForm = document.querySelector('.js-search-form');
const galleryImg = document.querySelector('.js-gallery');
const moreButton = document.querySelector('.more-button');
const waitLoader = document.querySelector('.js-loader');

const lightbox = new SimpleLightbox('.gallery-card a');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchValue = event.target.elements.user_query.value.trim();
  if (!searchValue) return;

  page = 1;
  moreButton.classList.add('more-button-hidden');
  galleryImg.innerHTML = '';
  waitLoader.classList.remove('loader-hidden');

  try {
    const data = await fetchPhotos(searchValue, page);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: "No results",
        message: "Sorry, there are no images matching your search query. Please try again.",
        position: 'topLeft',
      });
      searchForm.reset();
      return;
    }

    displayPhotos(data.hits, galleryImg, lightbox);
    if (data.totalHits > 15) {
      moreButton.classList.remove('more-button-hidden');
    }
  } catch (err) {
    iziToast.error({
      title: "Error",
      message: 'Something went wrong. Please, try again later.'
    });
  } finally {
    waitLoader.classList.add('loader-hidden');
  }
});

moreButton.addEventListener('click', async () => {
  page += 1;
  waitLoader.classList.remove('loader-hidden');

  try {
    const data = await fetchPhotos(searchValue, page);
    if (data.hits.length === 0 || page * 15 >= data.totalHits) {
      iziToast.info({
        title: "End of results",
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topLeft',
      });
      moreButton.classList.add('more-button-hidden');
      return;
    }

//     displayPhotos(data.hits, galleryImg, lightbox);
//     const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   } catch (err) {
//     iziToast.error({
//       title: "Error",
//       message: 'Something went wrong. Please, try again later.'
//     });
//   } finally {
//     waitLoader.classList.add('loader-hidden');
//   }
// });

const galleryMarkup = data.hits.map(createGalleryCard).join('');
galleryImg.insertAdjacentHTML('beforeend', galleryMarkup);
lightbox.refresh();

// Прокручуємо сторінку на дві висоти картки галереї
const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
} catch (err) {
iziToast.error({
  title: "Error",
  message: 'Something went wrong. Please, try again later.'
});
} finally {
waitLoader.classList.add('loader-hidden');
}
});
