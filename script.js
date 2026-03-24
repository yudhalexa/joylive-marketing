// toggle video icons

const front = document.querySelector('.front');
const ogFront = front.innerHTML;

document.querySelectorAll('.icon-room').forEach(icon => {
    icon.addEventListener('click', function() {
        const clicked = this.classList.contains('active');
        const target = this.dataset.room;

        document.querySelectorAll('.icon-room').forEach(el => {
            el.classList.remove('active');
            el.style.backgroundColor = '';
            el.style.borderRadius = '';
            el.style.color = '';
            el.style.width = '';
            el.querySelector('img').style.borderRadius = '30px';
        });

        const frontDiv = document.querySelector('.front');
        const allRooms = document.querySelectorAll('.front-view .room');

        if (clicked) {
            frontDiv.style.display = 'block';
            allRooms.forEach(s => {
                s.classList.remove('active');
                const v = s.querySelector('video');
                if (v) { v.pause(); v.currentTime = 0; }
            });
            this.style.color = 'var(--joy-teal)';
        } else {
            frontDiv.style.display = 'none';
            allRooms.forEach(s => {
                s.classList.toggle('active', s.dataset.room === target);
                const v = s.querySelector('video');
                if (v) { v.pause(); v.currentTime = 0; }
            });

            const activeVideo = document.querySelector(`.front-view .room[data-room="${target}"] video`);
            if (activeVideo) activeVideo.play();

            this.classList.add('active');
            this.style.backgroundColor = 'var(--joy-red)';
            this.style.borderRadius = '10px';
            this.style.color = 'white';
            this.style.width = '90px';

            document.querySelector('.front-view').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// play-pause button interaction
function playPause() {
    const video = document.querySelector('.front-view .room.active video');
    const playIcon = document.getElementById('play');
    const pauseIcon = document.getElementById('pause');

    if (!video) return;

    if (video.paused) {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        video.pause();
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
    }
}

// video controls
function fullscreen() {
    const roomVideo = document.querySelector('.front-view .room.active .room-video');
    const maxFullscreen = document.getElementById('maximize');
    const minFullscreen = document.getElementById('minimize');

    if (!roomVideo) return;

    if (!document.fullscreenElement) {
        roomVideo.requestFullscreen();
        maxFullscreen.style.display = 'none';
        minFullscreen.style.display = 'block';
    } else {
        document.exitFullscreen();
        minFullscreen.style.display = 'none';
        maxFullscreen.style.display = 'block';
    }
}

document.querySelectorAll('.room').forEach(room => {
    const video = room.querySelector('video');
    const bar = room.querySelector('progress');

    if (!video || !bar) return;

    video.addEventListener('loadedmetadata', () => {
        bar.max = video.duration;
    });

    video.addEventListener('timeupdate', () => {
        if (!isFinite(video.duration)) return;
        bar.max = video.duration;
        bar.value = video.currentTime;
    });
});

function skip(seconds) {
    const video = document.querySelector('.front-view .room.active video');
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
}