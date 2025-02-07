const playBtn = document.querySelector('.play-btn');
const progressSlider = document.getElementById('progress-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        playBtn.textContent = '▶️';
        isPlaying = false;
        // Pause the audio logic here
    } else {
        playBtn.textContent = '⏸️';
        isPlaying = true;
        // Play the audio logic here
    }
});

progressSlider.addEventListener('input', (event) => {
    // Adjust audio progress based on slider value
    console.log('Slider Value:', event.target.value);
});
