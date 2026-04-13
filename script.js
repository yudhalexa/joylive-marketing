// floating jingle toggle

let jingleMp3 = new Audio('./marketing-assets/jingle.mp3');
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

            // setTimeout(() => {
            //     const floatingJingle = document.querySelector('.floating-jingle');
            //     if (floatingJingle) floatingJingle.classList.add('visible');
                
            //     if (jingleMp3.paused) {
            //         jingleMp3.play();
            //     }
            // }, 3000);
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
        roomVideo.requestFullscreen();
        maxIcon.style.display = 'none';
        minIcon.style.display = 'block';
    } else {
        document.exitFullscreen();
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
        image: ['superior_twin.jpg', 'superior_twin.jpeg']
    },
    'superior-double':{
        video: 'superior_double.mp4',
        image: ['superior_double.jpg', 'superior_double.jpeg']
    },
    'deluxe-room':{
        video: 'deluxe_room.mp4',
        image: ['deluxe_room.jpg', 'deluxe_room.jpeg']
    },
    'meet-space-a':{
        video: 'meet_space_a.mp4',
        image: ['meet_space_a.jpg', 'meet_space_a.jpeg']
    },
    'meet-space-b':{
        video: 'meet_space_b.mp4',
        image: ['meet_space_b.jpg', 'meet_space_b.jpeg']
    },
    'meet-space-c':{ 
        video: 'meet_space_c.mp4',
        image: ['meet_space_c.jpg', 'meet_space_c.jpeg']
    },
    'soul-kitchen':{ 
        video: 'soul_kitchen.mp4',
        image: ['soul_kitchen.jpg', 'soul_kitchen.jpeg']
    },
    'gym':{
        video: 'gym.mp4',
        image: ['gym.jpg', 'gym.jpeg']
    },
    'in-room-spa':{
        video: 'spa.mp4',
        image: ['spa.jpg', 'spa.jpeg']
    },
    'laundromat':{
        video: 'laundromat.mp4',
        image: ['laundromat.jpg', 'laundromat.jpeg']
    },
    'musholla':{
        video: 'musholla.mp4',
        image: ['musholla.jpg', 'musholla.jpeg']
    },
};

fetch('http://10.5.51.210:3000/api/media')
    .then(r => r.json())
    .then(files => {
    const fileIndex = {};
    files.forEach(f => {
        fileIndex[f.name] = f.id;
    });

    console.log('fileIndex:', fileIndex);
    console.log('video els:', document.querySelectorAll('.room video'));

    // Object.entries(roomFileMap).forEach(([room, names]) => {
    //     const videoEl = document.querySelector(`.room[data-room="${room}"] video`);
    //     if (videoEl && fileIndex[names.video]) {
    //         videoEl.src = `/api/file/${fileIndex[names.video]}`;
    //         videoEl.load();
    //     }

    //     const imgEl = document.querySelector(`.icon-room[data-room="${room}"] img`);
    //     const imgId = names.image.reduce((found, name) => found || fileIndex[name], null);
    //     console.log(room, '-> looking for:', names.image, '-> found:', imgId);
    //     if (imgEl && imgId) {
    //         imgEl.src = `/api/file/${imgId}`;
    //     }
    // });
    Object.entries(roomFileMap).forEach(([room, names]) => {
        const videoEl = document.querySelector(`.room[data-room="${room}"] video`);
        if (videoEl && fileIndex[names.video]) {
            const videoUrl = `/api/file/${fileIndex[names.video]}`;
            console.log(`[${room}] loading video:`, videoUrl);
            videoEl.src = videoUrl;
            videoEl.load();
        }

        const imgEl = document.querySelector(`.icon-room[data-room="${room}"] img`);
        const imgId = names.image.reduce((found, name) => found || fileIndex[name], null);
        const fallback = 'data:image/jpeg;base64,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';
        if (imgEl && imgId) {
            const imgUrl = `/api/file/${imgId}`;
            console.log(`[${room}] loading image:`, imgUrl);
            imgEl.src = imgUrl;
            imgEl.onerror = function() {
                this.onerror = null;
                this.src = fallback;
            };
        } else if (imgEl) {
            imgEl.src = fallback;
        }
    });
    })
    .catch(err => console.error('Drive fetch failed:', err));