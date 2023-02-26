const imgContainer = document.getElementById('imgContainer');
const loader = document.getElementById('loader');

const count = 10;
const apiKey = '2bHYykwNh2XE9Lg9K3jD2v9Ex9VJnePFst73ZaARVBU';
const unsplasAPI = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let loadingComplete = false;
// function to set status
const setStatus = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loadingComplete = true;
    imagesLoaded = 0;
    loader.hidden = true;
    count = 25;
  }
};
//Function to set attributes
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Display images after mapping them to document body
const displayPhotos = () => {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // create links to images
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //  Create Image elements
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.small,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener('load', setStatus);
    //Add new elements to Image container
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
};

// Get picture from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(unsplasAPI);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

// Add scroll event to load more picture
window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    loadingComplete
  ) {
    loadingComplete = false;
    getPhotos();
  }
});

//On load
getPhotos();
