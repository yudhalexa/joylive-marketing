// floating jingle toggle
let jingleMp3 = new Audio('./assets/jingle.mp3');
jingleMp3.loop = true;

function jingle() {
    const muteIcon = document.getElementById('mute');
    const unmuteIcon = document.getElementById('unmute');

    if (!jingleMp3) return;

    if (jingleMp3.paused) {
        jingleMp3.play();
        muteIcon.style.display = 'none';
        unmuteIcon.style.display = 'block';
    } else {
        jingleMp3.pause();
        unmuteIcon.style.display = 'none';
        muteIcon.style.display = 'block';
    }
}

// toggle video icons & page titles
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

                const playIcon = s.querySelector('.icon-play');
                const pauseIcon = s.querySelector('.icon-pause');
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
            });
            this.style.color = 'var(--joy-teal)';

            document.title = "Step Inside - JOYLIVE BSD CITY"
        } else {
            frontDiv.style.display = 'none';
            allRooms.forEach(s => {
                s.classList.toggle('active', s.dataset.room === target);
                const v = s.querySelector('video');
                if (v) { v.pause(); v.currentTime = 0; }
            });

            const activeVideo = document.querySelector(`.front-view .room[data-room="${target}"] video`);
            if (activeVideo) activeVideo.play();

            const roomName = document.querySelector(`.front-view .room[data-room="${target}"] .room-text span`);
            document.title = `${roomName.textContent.trim()} - JOYLIVE BSD CITY`

            this.classList.add('active');
            this.style.transition = '0.3s ease-out';
            this.style.backgroundColor = 'var(--joy-red)';
            this.style.borderRadius = '10px';
            this.style.color = 'white';
            this.style.width = '90px';

            setTimeout(() => {
                document.querySelector('.front-view').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
            const floatingJingle = document.querySelector('.floating-jingle');
            if (floatingJingle) floatingJingle.classList.add('visible');

            const unmute = document.getElementById('unmute');
            if (jingleMp3.paused && unmute.style.display !== 'none') {
                jingleMp3.play();
            }
    });
});

// video controls
function playPause() {
    const activeRoom = document.querySelector('.front-view .room.active');
    const video = activeRoom?.querySelector('video');
    const playIcon = activeRoom?.querySelector('.icon-play');
    const pauseIcon = activeRoom?.querySelector('.icon-pause');

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

function fullscreen() {
    const activeRoom = document.querySelector('.front-view .room.active');
    const roomVideo = activeRoom?.querySelector('.room-video');
    const maxIcon = activeRoom?.querySelector('.icon-maximize');
    const minIcon = activeRoom?.querySelector('.icon-minimize');

    if (!roomVideo) return;

    if (!document.fullscreenElement) {
        roomVideo.requestFullscreen().then(() => {
            if (screen.orientation?.lock) {
                screen.orientation.lock('portrait').catch(() => {

                });
            }
        });
        maxIcon.style.display = 'none';
        minIcon.style.display = 'block';
    } else {
        document.exitFullscreen().then(() => {
            if (screen.orientation?.unlock) {
                screen.orientation.unlock();
            }
        });
        minIcon.style.display = 'none';
        maxIcon.style.display = 'block';
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
    if (!isFinite(video.duration)) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
}

// google drive API
const roomFileMap = {
    'superior-twin':{
        video: 'superior_twin.mp4',
        image: ['superior_twin.jpg', 'superior_twin.jpeg'],
        alt: "Joylive's twenty-eight square meters hotel room with twin beds."
    },
    'superior-double':{
        video: 'superior_double.mp4',
        image: ['superior_double.jpg', 'superior_double.jpeg'],
        alt: "Joylive's twenty-eight square meters room with a double-sized bed."
    },
    'deluxe-room':{
        video: 'deluxe_room.mp4',
        image: ['deluxe_room.jpg', 'deluxe_room.jpeg'],
        alt: "Joylive's thirty-two square meters room with a double sized bed and an extra desk space."
    },
    'meet-space-a':{
        video: 'meet_space_a.mp4',
        image: ['meet_space_a.jpg', 'meet_space_a.jpeg'],
        alt: "One of Joylive's meeting rooms, set up with arranged chairs and a slideshow presentation on the stage."
    },
    'meet-space-b':{
        video: 'meet_space_b.mp4',
        image: ['meet_space_b.jpg', 'meet_space_b.jpeg'],
        alt: "One of Joylive's meeting rooms, set up with a podium on the stage and chairs arranged in separate tables."
    },
    'meet-space-c':{ 
        video: 'meet_space_c.mp4',
        image: ['meet_space_c.jpg', 'meet_space_c.jpeg'],
        alt: "One of Joylive's meeting rooms, smaller than the other two, with arranged sets of tables and chairs and whiteboards inside."
    },
    'soul-kitchen':{ 
        video: 'soul_kitchen.mp4',
        image: ['soul_kitchen.jpg', 'soul_kitchen.jpeg'],
        alt: "Soul Kitchen, Joylive's restaurant, sat on the mezzanine floor of the lobby. The tour shows the wider dining area of Soul Kitchen."
    },
    'gym':{
        video: 'gym.mp4',
        image: ['gym.jpg', 'gym.jpeg'],
        alt: "Joylive's small gym, with various fitness equipments and semi-mirrored walls inside."
    },
    'laundromat':{
        video: 'laundromat.mp4',
        image: ['laundromat.jpg', 'laundromat.jpeg'],
        alt: "Joylive's laundromat, indicated by the sign outside of the room that says 'Laundromat.' The video shows it's small laundry room with multiple washing machines and an ironing board guests can use."
    },
    'musholla':{
        video: 'musholla.mp4',
        image: ['musholla.jpg', 'musholla.jpeg'],
        alt: "Joylive's prayer room, indicated by the sign outside of it that says 'Musholla.' The video shows religious rugs sprawled on the floor, along with praying equipments."
    },
};

const API_BASE = (window.location.hostname === 'joylive.test' || window.location.hostname === 'localhost') 
  ? 'http://localhost:3000' 
  : '';

fetch('/api/media')
    .then(r => r.json())
    .then(files => {
    const fileIndex = {};
    files.forEach(f => {
        fileIndex[f.name] = f.id;
    });

    console.log('fileIndex:', fileIndex);
    console.log('video els:', document.querySelectorAll('.room video'));

    Object.entries(roomFileMap).forEach(([room, names]) => {
        const videoEl = document.querySelector(`.room[data-room="${room}"] video`);

        if (videoEl && fileIndex[names.video]) {
            const videoUrl = `${API_BASE}/api/file/${fileIndex[names.video]}`;
            console.log(`[${room}] loading video:`, videoUrl);
            videoEl.src = videoUrl;
            videoEl.setAttribute('poster', './assets/video-poster.png');
            videoEl.load();
        }

        const imgEl = document.querySelector(`.icon-room[data-room="${room}"] img`);
        const imgId = names.image.reduce((found, name) => found || fileIndex[name], null);

        if (imgEl && imgId) {
            const imgUrl = `${API_BASE}/api/file/${imgId}`;
            console.log(`[${room}] loading image:`, imgUrl);
            imgEl.src = imgUrl;
            imgEl.alt = names.alt || '';
            imgEl.onerror = function() {
                this.onerror = null;
                this.src = "./assets/fallback-img.jpg";
            };
        } else if (imgEl) {
            imgEl.src = "./assets/fallback-img.jpg";
        }
    });
    })
    .catch(err => console.error('Drive fetch failed:', err));