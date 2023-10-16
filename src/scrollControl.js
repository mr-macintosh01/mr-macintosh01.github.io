const hamburger = document.getElementById('hamburger')
const body = document.getElementById('body')
const Nav = document.getElementById('Nav')

hamburger.addEventListener('change', event => {
    if (event.target.checked) {
        body.classList.add('stop-scrolling')
    } else {
        body.classList.remove('stop-scrolling')
    }
})

window.addEventListener('scroll', event => {
    if (window.innerWidth >= 1050) {
        if (window.scrollY > 0) {
            Nav.classList.add('nav-wrap')
            Nav.classList.remove('reset-wrap')
        } else {
            Nav.classList.remove('nav-wrap')
            Nav.classList.add('reset-wrap')
        }
    } else {
        Nav.classList.remove('nav-wrap')
    }
    
})