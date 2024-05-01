console.log('Script is running');
var img = new Image();
img.src = 'images/rocket.png';
img.onload = function() {
    document.body.style.cursor = 'url("images/rocket.png"), auto';
};
img.onerror = function() {
    console.log('Image not found');
};