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
            });

            const activeVideo = document.querySelector(`.front-view .room[data-room="${target}"] video`);
            if (activeVideo) activeVideo.play();

            this.classList.add('active');
            this.style.backgroundColor = 'var(--joy-red)';
            this.style.borderRadius = '10px';
            this.style.color = 'white';
            this.style.width = '90px';
        }
    });
});