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

var songNames = [' CASPER ', ' INSOMNIA ', ' LAST MEMORY ', ' LEAD THE WAVE ', ]


var songNameElement = document.querySelector('.songName');



songIndex = 0;


forwardIcon.addEventListener('click', function() {

    var wasPlaying = !audio.paused;

    songIndex = (songIndex + 1) % songs.length;
    audio.src = songs[songIndex];
    songNameElement.textContent = '"' + songNames[songIndex] + '"';

    if (wasPlaying) {
        audio.play();
    }
});



backwardIcon.addEventListener('click', function() {

    var wasPlaying = !audio.paused;

    songIndex = (songIndex - 1) % songs.length;
    audio.src = songs[songIndex];
    songNameElement.textContent = '"' + songNames[songIndex] + '"';

    if (wasPlaying) {

        audio.play();
    }
});

audio.addEventListener('ended', function() {
    // Increment the song index and wrap around to the start if necessary
    songIndex = (songIndex + 1) % songs.length;
    // Update the src of the audio element
    audio.src = songs[songIndex];
    // Play the new song
    songNameElement.textContent = '"' + songNames[songIndex] + '"';

    audio.play();
});

var timeSpan = document.getElementById('time');

audio.addEventListener('timeupdate', function() {
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    // Convert the time to minutes and seconds
    var currentMinutes = Math.floor(currentTime / 60);
    var currentSeconds = Math.floor(currentTime % 60);
    var durationMinutes = Math.floor(duration / 60);
    var durationSeconds = Math.floor(duration % 60);
    // Add leading zeros if necessary
    currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
    currentSeconds = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds;
    durationMinutes = durationMinutes < 10 ? '0' + durationMinutes : durationMinutes;
    durationSeconds = durationSeconds < 10 ? '0' + durationSeconds : durationSeconds;
    // Update the text content of the span
    timeSpan.textContent = currentMinutes + ':' + currentSeconds + ' / ' + durationMinutes + ':' + durationSeconds;
});

window.addEventListener('keydown', function(event) {
    // Check if the key that was pressed was the space bar
    if (event.code === 'Space') {
        // Prevent the default action to stop the page from scrolling
        event.preventDefault();
        // Toggle the play/pause state of the audio
        if (audio.paused) {
            audio.play();
            image.src = image2;
            intervalId = setInterval(updateImage, 3000);
        } else {
            audio.pause();
            image.src = image1;
            clearInterval(intervalId);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var progressBar = document.getElementById('progressBar');
    var trackLength = document.getElementById('trackLength');
    var dragging = false;

    function updateProgressBar() {
        var percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + '%';
    }

    audio.addEventListener('timeupdate', function() {
        if (!dragging) {
            updateProgressBar();
        }
    });

    trackLength.addEventListener('mousedown', function(event) {
        dragging = true;
        var rect = trackLength.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var percentage = x / rect.width;
        var newTime = percentage * audio.duration;
        audio.currentTime = newTime;
        updateProgressBar();
    });

    trackLength.addEventListener('mousemove', function(event) {
        if (dragging) {
            var rect = trackLength.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var percentage = x / rect.width;
            var newTime = percentage * audio.duration;
            audio.currentTime = newTime;
            updateProgressBar();
        }
    });

    trackLength.addEventListener('mouseup', function() {
        dragging = false;
    });
});



    var nightDayDiv = document.getElementById('night-day');
    var img = nightDayDiv.querySelector('img');

    nightDayDiv.addEventListener('click', function() {
        var body = document.body;
        if (img.src.endsWith('sun-solid.svg')) {
            img.src = 'images/moon-solid-white.svg';
            body.style.backgroundColor = 'black';
            body.style.color = 'white';
        } else {
            img.src = 'images/sun-solid.svg';
            body.style.backgroundColor = 'white';
            body.style.color = 'black';

        }
    });
