const modes = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']
const roads = [1, 2, 3].map(i => document.getElementById('road' + i))

for (let preload = 0; preload < 6; preload++) {
    const forward = new Image()
    const reverse = new Image()
    forward.decoding = 'async'
    reverse.decoding = 'async'
    forward.src = `./images/Ship${preload}.svg`
    reverse.src = `./images/Ship${preload}Reverse.svg`
}

let shipsStarted = false
let shipsVisible = true

function shipsPerRoad() {
    const width = window.innerWidth
    if (width > 1300) return 9
    if (width >= 1000) return 7
    return 4
}

function beginShips() {
    if (shipsStarted) return
    shipsStarted = true
    syncShips()
}

if (!document.getElementById('loader')) beginShips()
else window.addEventListener('loaderhidden', beginShips)

function shipSrc(ship, side) {
    return `./images/Ship${ship}${side === 'Backward' ? 'Reverse' : ''}.svg`
}

function runShip(img) {
    if (!img.parentNode) return

    const [ship, velocity, side, delay, mode] = generateValues()
    const src = shipSrc(ship, side)
    const from = side === 'Backward' ? '110vw' : '-20vw'
    const to = side === 'Backward' ? '-20vw' : '110vw'

    img.className = side === 'Backward' ? `Ship${ship}Reverse` : `Ship${ship}`
    if (img.getAttribute('src') !== src) img.src = src

    if (img._shipAnim) img._shipAnim.cancel()

    if (typeof img.animate === 'function') {
        const anim = img.animate(
            [
                { transform: `translate3d(${from}, 0, 0)` },
                { transform: `translate3d(${to}, 0, 0)` }
            ],
            {
                duration: velocity * 1000,
                delay: delay * 1000,
                easing: mode,
                fill: 'backwards'
            }
        )

        img._shipAnim = anim
        anim.onfinish = () => runShip(img)
        if (!shipsVisible) anim.pause()
        return
    }

    if (!img._cssBound) {
        img._cssBound = true
        img.addEventListener('animationend', () => runShip(img))
    }

    img.style.animation = 'none'
    requestAnimationFrame(() => {
        if (!img.parentNode) return
        img.style.animation = `move${side} ${velocity}s ${mode} ${delay}s 1 backwards`
    })
}

function syncShips() {
    const perRoad = shipsPerRoad()

    roads.forEach(road => {
        const ships = road.getElementsByTagName('img')

        while (ships.length > perRoad) {
            const ship = ships[ships.length - 1]
            if (ship._shipAnim) ship._shipAnim.cancel()
            ship.remove()
        }

        while (ships.length < perRoad) {
            const img = document.createElement('img')
            img.alt = ''
            img.decoding = 'async'
            img.style.transform = 'translate3d(-20vw, 0, 0)'
            road.appendChild(img)
            runShip(img)
        }
    })
}

function setShipsVisible(visible) {
    if (visible === shipsVisible) return
    shipsVisible = visible

    roads.forEach(road => {
        Array.from(road.getElementsByTagName('img')).forEach(ship => {
            if (!ship._shipAnim) return
            if (visible) ship._shipAnim.play()
            else ship._shipAnim.pause()
        })
    })
}

if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
        setShipsVisible(entries[0].isIntersecting)
    }).observe(roads[0].parentElement)
}

function generateValues() {
    const ship = Math.floor(Math.random() * 6)
    const velocity = Math.random() * 3 + 5 + Math.random()
    const side = (Math.floor(Math.random() * 2) && 'Forward') || 'Backward'
    const delay = Math.random() * 3
    const mode = modes[Math.floor(Math.random() * 5)]

    return [ship, velocity, side, delay, mode]
}

let resizeTimer = 0

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        if (shipsStarted) syncShips()
    }, 200)
})
