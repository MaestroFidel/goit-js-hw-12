import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/'

export const fetchPhotos = searchedQuery => {
//   const urlParams = new URLSearchParams({
//    q: searchedQuery,
//    orientation: 'horizontal',
//    per_page: 20,
//    key: '45481518-557ec69fe97012c17356df52c',
//    image_type: 'photo',
//    safesearch: 'true',
//   });
const axiosParams = {
params: {
    q: searchedQuery,
   orientation: 'horizontal',
   per_page: 20,
   key: '45481518-557ec69fe97012c17356df52c',
   image_type: 'photo',
   safesearch: 'true',

},   
};
//   return  fetch(
//     `${BASE_URL}?${urlParams}`)
//   .then(response => {
// if (!response.ok) {
//   throw new Error(response.status);
// }
// return response.json();
//   })
return axios.get(`${BASE_URL}`, axiosParams);
};