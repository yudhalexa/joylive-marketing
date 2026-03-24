// toggle video icons

const front = document.querySelector('.front');
const ogFront = front.innerHTML;

document.querySelectorAll('.icon-room').forEach(icon => {
    icon.addEventListener('click', function() {
        const clicked = this.classList.contains('active');
        const videoSrc = this.dataset.video;

        document.querySelectorAll('.icon-room').forEach(el => {
            el.classList.remove('active');
            el.style.backgroundColor = '';
            el.style.borderRadius = '';
            el.style.color = '';
            el.style.width = '';
            el.querySelector('img').style.borderRadius = '30px';
        });

        if (!clicked) {
            this.classList.add('active');
            this.style.backgroundColor = 'var(--joy-red)';
            this.style.borderRadius = '10px';
            this.style.color = 'white';
            this.style.width = '90px';
            this.querySelector('img').style.borderRadius = '30px';
            front.innerHTML = `<video src="${videoSrc}" autoplay controls loop style="width: 100%; height: 100%;"></video>`;
        }

        if(clicked) {
            this.style.backgroundColor = '';
            this.style.color = 'var(--joy-teal)';
            this.style.width = '';
            front.innerHTML = ogFront;
        }
    });
});