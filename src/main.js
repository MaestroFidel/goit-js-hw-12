
import { createGalleryCard, displayPhotos } from "./js/render-functions";
import { fetchPhotos } from "./js/pixabay-api";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchImg = document.querySelector('.js-search-form');
const galleryImg = document.querySelector('.js-gallery');
const waitLoader = document.querySelector('.js-loader');

const onSearchFormSubmit = async event => {
    try {
        event.preventDefault();
        const searchValue = searchImg.elements.user_query.value.trim();
        
        const response = await fetchPhotos(searchValue);
        if (response.data.hits.length === 0) {
                iziToast.warning({
                  title: "No results",
                  message: "Sorry, there are no images your search query. Please try again.",
                  position: 'topLeft',
                });
                galleryImg.innerHTML = '';
                searchImg.reset();
                return;
              };
        console.log(response);
        
        


    }

    catch (err) {
        console.log(err);
    }
 

//   if (searchValue === "") {
//     iziToast.error({
//       title: "Error",
//       message: "Please fill out the form",
//       position: 'topRight',
//       timeout: 3000
//     });
//     return;
//   }

//   waitLoader.classList.remove('loader-hidden');

//   fetchPhotos(searchValue)
//     .then(response => {
//         console.log (response)
    //   if (data.hits.length === 0) {
    //     iziToast.warning({
    //       title: "No results",
    //       message: "Sorry, there are no images your search query. Please try again.",
    //       position: 'topLeft',
    //     });
    //     galleryImg.innerHTML = '';
    //     searchImg.reset();
    //     return;
    //   }
    //   displayPhotos(data.hits, galleryImg, new SimpleLightbox('.gallery-card a')); 
    // })
    // .catch(err => {
    //   iziToast.error({
    //     title: "Error",
    //     message: "Something wrong. Please, try later"
    //   });
    // })
    // .finally(() => {
    //   waitLoader.classList.add('loader-hidden'); 
    // });
};

searchImg.addEventListener('submit', onSearchFormSubmit);
