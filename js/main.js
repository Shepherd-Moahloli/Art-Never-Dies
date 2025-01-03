console.log("Script is running");
var img = new Image();
img.src = "images/rocket.png";
img.onload = function () {
  document.body.style.cursor = 'url("images/rocket.png"), auto';
};
img.onerror = function () {
  console.log("Image not found");
};

document.addEventListener("DOMContentLoaded", function () {
  var index = 0;
  var content = document.getElementById("content");
  var images = [
    "images/takeoff1.jpeg",
    "images/takeoff.jpeg",
    "images/takeoff-obit-eulogy.jpg.webp",
    "images/takeoffobit.jpg.webp",
    "images/takeoff-1-2.jpg.webp",
  ];
  content.style.backgroundImage = "url(" + images[index] + ")";

  function updateImage() {
    var nextIndex = (index + 1) % images.length;
    var nextImage = images[nextIndex];
    var currentImage = images[index];

    // Set the next image as the background of the pseudo-element
    content.style.setProperty("--next-image", `url(${nextImage})`);

    // Trigger the sliding effect
    content.classList.add("slide");

    // Wait for the transition to complete
    setTimeout(function () {
      // Update the main background image
      content.style.backgroundImage = `url(${nextImage})`;
      content.classList.remove("slide");
      index = nextIndex;
    }, 1000); // Match the duration of the CSS transition
  }

  var intervalId = setInterval(updateImage, 3000); // Change image every 3 seconds

  content.addEventListener("mouseover", function () {
    clearInterval(intervalId);
  });

  content.addEventListener("mouseout", function () {
    intervalId = setInterval(updateImage, 3000);
  });
});

var image = document.querySelector("#playstore img:nth-child(2)");
var audio = document.querySelector("#playstore audio");
var forwardIcon = document.querySelector("#playstore img:nth-child(3)");
var backwardIcon = document.querySelector("#playstore img:nth-child(1)");

var image1 = "images/play-solid.svg";
var image2 = "images/pause-solid.svg";

image.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    if (body.style.backgroundColor === "black") {
      image.src = "images/pause-solid-white.svg";
      image.style.height = "1.5rem";
    } else {
      image.src = "images/pause-solid.svg";
    }
  } else {
    audio.pause();
    if (body.style.backgroundColor === "black") {
      image.src = "images/play-solid-white.svg";
      image.style.height = "1.5rem";
    } else {
      image.src = "images/play-solid.svg";
    }
  }
});
var songs = [
  "audio/Takeoff-Casper-(HiphopKit.com).mp3",
  "audio/Takeoff-Insomnia-(JustNaija.com).mp3",
  "audio/Takeoff-Last-Memory-(JustNaija.com).mp3",
  "audio/Takeoff-Lead-The-Wave-(JustNaija.com).mp3",
];

var songNames = [" CASPER ", " INSOMNIA ", " LAST MEMORY ", " LEAD THE WAVE "];

var songNameElement = document.querySelector(".songName");

songIndex = 0;

forwardIcon.addEventListener("click", function () {
  var wasPlaying = !audio.paused;

  songIndex = (songIndex + 1) % songs.length;
  audio.src = songs[songIndex];
  songNameElement.textContent = '"' + songNames[songIndex] + '"';

  if (wasPlaying) {
    audio.play();
  }
});

backwardIcon.addEventListener("click", function () {
  var wasPlaying = !audio.paused;

  songIndex = (songIndex - 1) % songs.length;
  audio.src = songs[songIndex];
  songNameElement.textContent = '"' + songNames[songIndex] + '"';

  if (wasPlaying) {
    audio.play();
  }
});

audio.addEventListener("ended", function () {
  // Increment the song index and wrap around to the start if necessary
  songIndex = (songIndex + 1) % songs.length;
  // Update the src of the audio element
  audio.src = songs[songIndex];
  // Play the new song
  songNameElement.textContent = '"' + songNames[songIndex] + '"';

  audio.play();
});

var timeSpan = document.getElementById("time");

audio.addEventListener("timeupdate", function () {
  var currentTime = audio.currentTime;
  var duration = audio.duration;
  // Convert the time to minutes and seconds
  var currentMinutes = Math.floor(currentTime / 60);
  var currentSeconds = Math.floor(currentTime % 60);
  var durationMinutes = Math.floor(duration / 60);
  var durationSeconds = Math.floor(duration % 60);
  // Add leading zeros if necessary
  currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
  currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
  durationMinutes =
    durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;
  durationSeconds =
    durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;
  // Update the text content of the span
  timeSpan.textContent =
    currentMinutes +
    ":" +
    currentSeconds +
    " / " +
    durationMinutes +
    ":" +
    durationSeconds;
});

window.addEventListener("keydown", function (event) {
  // Check if the key that was pressed was the space bar
  if (event.code === "Space") {
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

document.addEventListener("DOMContentLoaded", function () {
  var progressBar = document.getElementById("progressBar");
  var trackLength = document.getElementById("trackLength");
  var dragging = false;

  function updateProgressBar() {
    var percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percentage + "%";
  }

  audio.addEventListener("timeupdate", function () {
    if (!dragging) {
      updateProgressBar();
    }
  });

  trackLength.addEventListener("mousedown", function (event) {
    dragging = true;
    var rect = trackLength.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var percentage = x / rect.width;
    var newTime = percentage * audio.duration;
    audio.currentTime = newTime;
    updateProgressBar();
  });

  trackLength.addEventListener("mousemove", function (event) {
    if (dragging) {
      var rect = trackLength.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var percentage = x / rect.width;
      var newTime = percentage * audio.duration;
      audio.currentTime = newTime;
      updateProgressBar();
    }
  });

  trackLength.addEventListener("mouseup", function () {
    dragging = false;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;

  var nightDayDiv = document.getElementById("night-day");
  var img = nightDayDiv.querySelector("img");
  var audio = document.getElementById("audio"); // Replace with your audio element's id

  var playImg = document.getElementById("playbutton");
  var fastforwardImg = document.getElementById("fastforward");
  var backwardsImg = document.getElementById("backwards");
  var menuBlackImg = document.getElementById("menu-black"); // Added this line
  var menuWhiteImg = document.getElementById("menu-white");
  var contentAbout = document.getElementById("content-about");
  var topContent = document.getElementById("top-content");

  var isFirstClick = true;

  nightDayDiv.addEventListener("click", function () {
    if (img.src.endsWith("sun-solid.svg")) {
      img.src = "images/moon-solid-white.svg";
      body.style.backgroundColor = "black";
      body.style.color = "white";
      body.classList.add("black-background");

      playImg.src = "images/play-solid-white.svg";
      fastforwardImg.src = "images/forward-solid-white.svg";
      backwardsImg.src = "images/backward-solid-white.svg";
      menuBlackImg.style.display = "none"; // Added this line
      menuWhiteImg.style.display = "block";
      volumeIcon.style.display = "none";
      volumeIconWhite.style.display = "block"; // show white volume icon
      muteIconWhite.style.display = "none"; // hide white mute icon
      muteIcon.style.display = "none";

      if (!isFirstClick) {
        contentAbout.classList.add("new-bg");
        topContent.classList.add("new-color");
      }
    } else {
      img.src = "images/sun-solid.svg";
      body.style.backgroundColor = "white";
      body.style.color = "black";
      body.classList.remove("black-background");

      playImg.src = "images/play-solid.svg";
      fastforwardImg.src = "images/forward-solid.svg";
      backwardsImg.src = "images/backward-solid.svg";
      menuBlackImg.style.display = "block"; // Added this line
      menuWhiteImg.style.display = "none";
      volumeIcon.style.display = "block";
      volumeIconWhite.style.display = "none"; // hide white volume icon
      muteIconWhite.style.display = "none"; // hide white mute icon
      muteIcon.style.display = "none";

      if (!isFirstClick) {
        contentAbout.classList.remove("new-bg");
        topContent.classList.remove("new-color");
      }
    }

    audio.addEventListener("play", function () {
      if (body.style.backgroundColor === "black") {
        playImg.src = "images/pause-solid-white.svg";
      } else {
        playImg.src = "images/pause-solid.svg";
      }
    });

    audio.addEventListener("pause", function () {
      if (body.style.backgroundColor === "black") {
        playImg.src = "images/play-solid-white.svg";
      } else {
        playImg.src = "images/play-solid.svg";
      }
    });

    isFirstClick = false;
  });
});

var instagramBlackImg = document.getElementById("instagram-black");
var instagramWhiteImg = document.getElementById("instagram-white");
var twitterBlackImg = document.getElementById("twitter-black");
var twitterWhiteImg = document.getElementById("twitter-white");
var youtubeBlackImg = document.getElementById("youtube-black");
var youtubeWhiteImg = document.getElementById("youtube-white");

var menuImg = document.getElementById("menu");
var overlay = document.getElementById("overlay");
var closeButton = document.getElementById("close");
var closeBlackImg = document.getElementById("close-black");
var closeWhiteImg = document.getElementById("close-white");

menuImg.addEventListener("click", function () {
  if (overlay.style.visibility !== "visible") {
    overlay.style.visibility = "visible";
    if (document.body.classList.contains("black-background")) {
      // Changed this line
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      menuImg.src = "images/images/xmark-solid-white.svg";
      closeWhiteImg.style.display = "block";
      closeBlackImg.style.display = "none";
      instagramBlackImg.style.display = "none";
      instagramWhiteImg.style.display = "block";
      twitterBlackImg.style.display = "none";
      twitterWhiteImg.style.display = "block";
      youtubeBlackImg.style.display = "none";
      youtubeWhiteImg.style.display = "block";
    } else {
      overlay.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
      menuImg.src = "images/xmark-solid.svg";
      closeWhiteImg.style.display = "none";
      closeBlackImg.style.display = "block";
      instagramBlackImg.style.display = "block";
      instagramWhiteImg.style.display = "none";
      twitterBlackImg.style.display = "block";
      twitterWhiteImg.style.display = "none";
      youtubeBlackImg.style.display = "block";
      youtubeWhiteImg.style.display = "none";
    }
  } else {
    overlay.style.visibility = "hidden";
    if (document.body.classList.contains("black-background")) {
      // Changed this line
      menuImg.src = "images/bars-solid-white.svg";
    } else {
      menuImg.src = "images/bars-solid.svg";
    }
  }
});

closeButton.addEventListener("click", function () {
  overlay.style.visibility = "hidden";
  if (document.body.classList.contains("black-background")) {
    // Changed this line
    menuImg.src = "images/bars-solid-white.svg"; // Changed this line
    closeWhiteImg.style.display = "none"; // Hide white close icon
    closeBlackImg.style.display = "block";
  } else {
    menuImg.src = "images/bars-solid.svg";
    closeWhiteImg.style.display = "block"; // Show white close icon
    closeBlackImg.style.display = "none";
  }
});

var volumeIcon = document.getElementById("volume-icon");
var muteIcon = document.getElementById("mute-icon");
var volumeControl = document.getElementById("volume");

volumeIcon.addEventListener("click", function () {
  if (document.body.classList.contains("black-background")) {
    // if background is black
    volumeIcon.style.display = "none";

    console.log("clicked");
  } else {
    volumeIcon.style.display = "none";
    muteIcon.style.display = "block"; // show regular mute icon
  }
});

muteIcon.addEventListener("click", function () {
  if (document.body.classList.contains("black-background")) {
    // if background is black
    muteIcon.style.display = "none";
  } else {
    muteIcon.style.display = "none";
    volumeIcon.style.display = "block"; // show regular volume icon
  }
});

var volumeIconWhite = document.getElementById("volume-icon-white");
var muteIconWhite = document.getElementById("mute-icon-white");

// Add event listener to volumeIconWhite
volumeIconWhite.addEventListener("click", function () {
  volumeIconWhite.style.display = "none"; // hide volumeIconWhite
  muteIconWhite.style.display = "block"; // show muteIconWhite

  audio.volume = 0.0; // Mute the audio
});

// Add event listener to muteIconWhite
muteIconWhite.addEventListener("click", function () {
  muteIconWhite.style.display = "none"; // hide muteIconWhite
  volumeIconWhite.style.display = "block"; // show volumeIconWhite

  audio.volume = 1.0;
});

var audio = document.getElementById("audio");

// Add event listener to volumeIcon
volumeIcon.addEventListener("click", function () {
  // Mute the audio
  audio.volume = 0.0;

  // Rest of your code...
});

// Add event listener to muteIcon
muteIcon.addEventListener("click", function () {
  // Unmute the audio
  audio.volume = 1.0;

  // Rest of your code...
});

// Rest of your code...
