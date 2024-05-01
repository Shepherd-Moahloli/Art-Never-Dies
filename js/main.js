console.log('Script is running');
var img = new Image();
img.src = 'images/rocket.png';
img.onload = function() {
    document.body.style.cursor = 'url("images/rocket.png"), auto';
};
img.onerror = function() {
    console.log('Image not found');
};




var images = ['images/takeoff1.jpeg', 'images/takeoff.jpeg', 'images/takeoff-obit-eulogy.jpg.webp', 'images/takeoffobit.jpg.webp', 'images/takeoff-1-2.jpg.webp'];

var index = 0;
var content = document.getElementById('content');
content.style.backgroundImage = 'url(' + images[index] + ')';


function updateImage() {
    index = (index + 1) % images.length;
    content.style.backgroundImage = 'url(' + images[index] + ')';
}


// var intervalId = setInterval(updateImage, 3000);    this code helps to pause animation when you hover over the image

// content.addEventListener('mouseover', function() {
//     clearInterval(intervalId);
// });

// content.addEventListener('mouseout', function() {
//     intervalId =setInterval(updateImage, 3000);
// })


var image = document.querySelector('#playstore img:nth-child(2)');
var audio = document.querySelector('#playstore audio');
var forwardIcon = document.querySelector('#playstore img:nth-child(3)');
var backwardIcon = document.querySelector('#playstore img:nth-child(1)');

var image1 = 'images/play-solid.svg';
var image2 = 'images/pause-solid.svg';


image.addEventListener('click', function() {

    if (image.src.endsWith(image1)) {
        image.src = image2;
        audio.play();
                intervalId = setInterval(updateImage, 3000);
    } else {
        image.src = image1;
        audio.pause();
        clearInterval(intervalId)
    }
});


var songs = ['audio/Takeoff-Casper-(HiphopKit.com).mp3', 'audio/Takeoff-Insomnia-(JustNaija.com).mp3', 'audio/Takeoff-Last-Memory-(JustNaija.com).mp3', 'audio/Takeoff-Lead-The-Wave-(JustNaija.com).mp3'];


songIndex = 0;


forwardIcon.addEventListener('click', function() {

    var wasPlaying = !audio.paused;

    songIndex = (songIndex + 1) % songs.length;
    audio.src = songs[songIndex];

    if (wasPlaying) {
        audio.play();
    }
});



backwardIcon.addEventListener('click', function() {

    var wasPlaying = !audio.paused;

    songIndex = (songIndex - 1) % songs.length;
    audio.src = songs[songIndex];
    
    if (wasPlaying) {

        audio.play();
    }
});





