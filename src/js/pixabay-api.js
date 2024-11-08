import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45481518-557ec69fe97012c17356df52c';

export const fetchPhotos = async(searchedQuery, page) => {

const axiosParams = {
params: {
    q: searchedQuery,
   orientation: 'horizontal',
   per_page: 20,
   key: API_KEY,
   image_type: 'photo',
   safesearch: true,
   page,
   per_page: 15,

},   
};

const {data} = await axios.get(`${BASE_URL}`, axiosParams);
return data;
};