


export const createGalleryCard = imgInfo => {
  return `
  <li class="gallery-card">
  <a href="${imgInfo.largeImageURL}">
  <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" />
  </a>
  <ul class="comments">
  <li class="com">likes: ${imgInfo.likes}</li>
  <li class="com">views: ${imgInfo.views}</li>
  <li class="com">comments: ${imgInfo.comments}</li>
  <li class="com">downloads: ${imgInfo.downloads}</li>
  </ul>
  </li>
  `;

};

//test//




