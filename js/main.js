console.log('Script is running');
var img = new Image();
img.src = 'images/rocket.png';
img.onload = function() {
    document.body.style.cursor = 'url("images/rocket.png"), auto';
};
img.onerror = function() {
    console.log('Image not found');
};




var images = ['images/takeoff1.jpeg', 'images/takeoff.jpeg', 'images/takeoff-obit-eulogy.jpg.webp', 'images/takeoffobit.jpg.webp'];

var index = 0;

var content = document.getElementById('content');

content.style.backgroundImage = 'url(' + images[index] + ')';


function updateImage() {

    index = (index + 1) % images.length;


    content.style.backgroundImage = 'url(' + images[index] + ')';

}


setInterval(updateImage, 3000);