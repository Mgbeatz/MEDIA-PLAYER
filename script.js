const menuBtn = document.querySelector('.menu-btn');
const playlistContainer = document.getElementById('playlist-container');
const artistNameEl = document.getElementById('artist-name');
const songNameEl = document.getElementById('song-name');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const playlistItems = document.querySelectorAll('.playlist li');
const playBtn = document.querySelector('.play-btn');
const playIcon = document.getElementById('play-icon');
const audioPlayer = document.getElementById('audio-player');
const volumeSlider = document.getElementById('volume-slider');
const progressSlider = document.getElementById('progress-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const imageContainer = document.getElementById('image-container');

const repeatBtn = document.getElementById('repeat-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const mediaPlayer = document.querySelector('.media-player');

let currentTrackIndex = 0;
let isRepeatOn = false;
let isShuffleOn = false;




// Keep screen on when playing
if ('wakeLock' in navigator) {
    let wakeLock = null;
    async function requestWakeLock() {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.error(`Wake Lock error: ${err.message}`);
        }
    }
    audioPlayer.addEventListener('play', requestWakeLock);
    audioPlayer.addEventListener('pause', () => {
        if (wakeLock !== null) {
            wakeLock.release().then(() => {
                wakeLock = null;
            });
        }
    });
}

// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}








// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update track display and play the selected file
function updateTrackDisplay(index) {
    const currentTrack = playlistItems[index];
    const artist = currentTrack.dataset.artist;
    const song = currentTrack.dataset.song;
    const src = currentTrack.dataset.src;

    artistNameEl.textContent = artist;
    songNameEl.textContent = song;

    audioPlayer.src = src;
    audioPlayer.play();
    playIcon.src = "imag/BUTTON-P.png"; // Update play icon to pause
}

// Toggle playlist visibility
menuBtn.addEventListener('click', () => {
    playlistContainer.classList.toggle('show');
});

// Handle track selection
playlistItems.forEach((track, index) => {
    track.addEventListener('click', () => {
        currentTrackIndex = index;
        updateTrackDisplay(currentTrackIndex);
        playlistContainer.classList.remove('show');
    });
});

// Play/Pause button functionality
playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.src = "imag/BUTTON-P.png"; // Update to pause icon
    } else {
        audioPlayer.pause();
        playIcon.src = "imag/BUTTON-D.png"; // Update to play icon
    }
});

// Handle Next button
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlistItems.length;
    updateTrackDisplay(currentTrackIndex);
});

// Handle Previous button
prevBtn.addEventListener('click', () => {
    currentTrackIndex =
        (currentTrackIndex - 1 + playlistItems.length) % playlistItems.length;
    updateTrackDisplay(currentTrackIndex);
});





// Play next track automatically or loop to first track
function playNextTrack() {
    if (isShuffleOn) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playlistItems.length);
        } while (randomIndex === currentTrackIndex);
        currentTrackIndex = randomIndex;
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlistItems.length;
    }
    updateTrackDisplay(currentTrackIndex);
}

// Auto play next track when the current one ends
audioPlayer.addEventListener('ended', () => {
    if (isRepeatOn) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        playNextTrack();
    }
});







// Volume control
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Progress bar and timing
audioPlayer.addEventListener('timeupdate', () => {
    progressSlider.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration || 0);
});

progressSlider.addEventListener('input', () => {
    audioPlayer.currentTime = (progressSlider.value / 100) * audioPlayer.duration;
});

// Initialize with the first track
updateTrackDisplay(currentTrackIndex);











// Toggle repeat mode
repeatBtn.addEventListener('click', () => {
    isRepeatOn = !isRepeatOn;
    repeatBtn.style.color = isRepeatOn ? 'rgb(0, 119, 255)' : '#fff'; // Highlight when active
});

// Restart track when it ends if repeat is on
audioPlayer.addEventListener('ended', () => {
    if (isRepeatOn) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        nextBtn.click(); // Move to the next track
    }
});





// Override the next button behavior if shuffle is on
nextBtn.addEventListener('click', () => {
    if (isShuffleOn) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playlistItems.length);
        } while (randomIndex === currentTrackIndex);

        currentTrackIndex = randomIndex;
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlistItems.length;
    }
    updateTrackDisplay(currentTrackIndex);
});





let isRepeatOn = false;
let isShuffleOn = false;
let isProfileVisible = false;

const repeatBtn = document.getElementById('repeat-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const faceBtn = document.querySelector('.player-icons button'); // The button with the face icon
const profileContainer = document.getElementById('profile-container');






// Toggle repeat mode
repeatBtn.addEventListener('click', () => {
    isRepeatOn = !isRepeatOn;
    repeatBtn.style.transform = isRepeatOn ? 'scale(0.9)' : 'scale(1)'; // Shrink when pressed
    repeatBtn.style.color = isRepeatOn ? 'rgb(0, 119, 255)' : '#fff'; // Highlight when active
});

// Toggle shuffle mode
shuffleBtn.addEventListener('click', () => {
    isShuffleOn = !isShuffleOn;
    shuffleBtn.style.transform = isShuffleOn ? 'scale(0.9)' : 'scale(1)'; // Shrink when pressed
    shuffleBtn.style.color = isShuffleOn ? 'rgb(0, 119, 255)' : '#fff'; // Highlight when active
});

// Toggle profile visibility
faceBtn.addEventListener('click', () => {
    isProfileVisible = !isProfileVisible;
    profileContainer.style.display = isProfileVisible ? 'block' : 'none';
});



// Toggle playlist visibility
menuBtn.addEventListener('click', () => {
    playlistContainer.classList.toggle('show');
    imageContainer.classList.toggle('show'); // Toggle the image container as well
});     
