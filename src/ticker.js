const copy = document.querySelector(".logos-slide").cloneNode(true);
const logos = document.getElementById('logos')
const animation = 'slide 35s linear infinite'
logos.appendChild(copy);

logos.lastElementChild.setAttribute('id', 'logos-slide-1')

for (let i = 0; i < 2; i++) {
    const logosSlide = document.getElementById('logos-slide-' + i)

    logosSlide.style.animation = animation
} 

