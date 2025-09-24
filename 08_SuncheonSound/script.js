// Audio player elements
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const langBtn = document.getElementById('langBtn');
const albumImageEl = document.getElementById('albumImage');
const playlistEl = document.getElementById('playlist');
const progressBar = document.querySelector('.progress-bar');

// Player state
let isPlaying = false;
let currentTrackIndex = 0;
let playlist = [];

// Initialize playlist (you can modify this based on your MP3 files)
const tracks = [
    { 
        nameKo: '흑두루미의 노래', 
        nameEn: 'Song of Hooded Cranes',
        file: '2024.12.03 doorumi.mp3' 
    },
    { 
        nameKo: '갈대의 속삭임', 
        nameEn: 'Whispers of Reeds',
        file: '2024.12.03 reed.mp3' 
    }
];

// Language state
let currentLang = 'ko';

// Initialize player
async function initPlayer() {
    // Create playlist from tracks
    playlist = tracks.map((track, index) => ({
        id: index,
        nameKo: track.nameKo,
        nameEn: track.nameEn,
        mp3: `mp3/${encodeURIComponent(track.file)}`,
        img: `img/${encodeURIComponent(track.file.replace('.mp3', '.jpg'))}`,
        duration: '00:00'
    }));

    renderPlaylist();
    
    // Load durations for all tracks
    playlist.forEach((track, index) => {
        const tempAudio = new Audio(track.mp3);
        tempAudio.addEventListener('loadedmetadata', () => {
            playlist[index].duration = formatTime(tempAudio.duration);
            // Update the playlist item duration display
            const durationEl = document.querySelector(`.playlist-item[data-index="${index}"] .playlist-item-duration`);
            if (durationEl) {
                durationEl.textContent = playlist[index].duration;
            }
        });
    });
    
    if (playlist.length > 0) {
        loadTrack(0);
        // Autoplay the first track with user interaction handling
        setTimeout(() => {
            audioPlayer.play().then(() => {
                isPlaying = true;
                updatePlayButton();
            }).catch(err => {
                console.log('Autoplay prevented:', err);
                // Add click handler to start playback on first user interaction
                document.addEventListener('click', function startPlayback() {
                    if (!isPlaying && audioPlayer.paused) {
                        playTrack();
                        document.removeEventListener('click', startPlayback);
                    }
                }, { once: true });
            });
        }, 500);
    }
}

// Render playlist
function renderPlaylist() {
    playlistEl.innerHTML = playlist.map((track, index) => {
        const name = currentLang === 'ko' ? track.nameKo : track.nameEn;
        return `
            <div class="playlist-item ${index === currentTrackIndex ? 'active' : ''}" data-index="${index}">
                <img src="${track.img}" alt="${name}" onerror="this.src='img/default.jpg'">
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${name}</div>
                    <div class="playlist-item-duration">${track.duration || '--:--'}</div>
                </div>
            </div>
        `;
    }).join('');

    // Add click listeners to playlist items
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            loadTrack(index);
            playTrack();
        });
    });
}

// Load track
function loadTrack(index) {
    currentTrackIndex = index;
    const track = playlist[index];
    
    audioPlayer.src = track.mp3;
    
    // Update album image
    albumImageEl.src = track.img;
    albumImageEl.onerror = () => {
        albumImageEl.src = 'img/default.jpg';
    };
    
    // Update playlist active state
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    // Reset progress
    progressFill.style.width = '0%';
    currentTimeEl.textContent = '00:00';
    
    // Update play button
    updatePlayButton();
}

// Play/Pause functionality
function togglePlay() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function playTrack() {
    audioPlayer.play();
    isPlaying = true;
    updatePlayButton();
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButton();
}

function updatePlayButton() {
    playBtn.innerHTML = isPlaying ? '❚❚' : '▶';
}

// Previous track
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

// Next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

// Format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update progress
function updateProgress() {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${percent}%`;
    
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
}

// Seek functionality
function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener('ended', nextTrack);

progressBar.addEventListener('click', seek);

// Language toggle functionality
function toggleLanguage() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    langBtn.textContent = currentLang === 'ko' ? 'EN' : 'KO';
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-ko][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
    
    // Re-render playlist with new language
    renderPlaylist();
}

// Initialize the player when page loads
document.addEventListener('DOMContentLoaded', () => {
    initPlayer();
    langBtn.addEventListener('click', toggleLanguage);
});