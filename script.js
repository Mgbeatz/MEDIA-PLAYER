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

let currentTrackIndex = 0;
let isRepeatOn = false;
let isShuffleOn = false;

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
        playIcon.src = "imag/BUTTON-P.png";
    } else {
        audioPlayer.pause();
        playIcon.src = "imag/BUTTON-D.png";
    }
});

// Handle Next button
nextBtn.addEventListener('click', () => {
    playNextTrack();
});

// Handle Previous button
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlistItems.length) % playlistItems.length;
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

// Toggle repeat mode
repeatBtn.addEventListener('click', () => {
    isRepeatOn = !isRepeatOn;
    repeatBtn.style.color = isRepeatOn ? 'rgb(0, 119, 255)' : '#fff';
});

// Toggle shuffle mode
shuffleBtn.addEventListener('click', () => {
    isShuffleOn = !isShuffleOn;
    shuffleBtn.style.color = isShuffleOn ? 'rgb(0, 119, 255)' : '#fff';
});

// Initialize with the first track
updateTrackDisplay(currentTrackIndex);
