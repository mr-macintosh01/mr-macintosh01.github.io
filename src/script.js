let shipsNumber = 25
const modes = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']

for (let preload = 0; preload < 6; preload++) {
    const forward = new Image()
    const reverse = new Image()
    forward.decoding = 'async'
    reverse.decoding = 'async'
    forward.src = `./images/Ship${preload}.svg`
    reverse.src = `./images/Ship${preload}Reverse.svg`
}

if (window.innerWidth <= 1300 && window.innerWidth >= 1000) {
    shipsNumber = 20
} else if (window.innerWidth < 1000) {
    shipsNumber = 10
}

let shipsStarted = false

function beginShips() {
    if (shipsStarted) return
    shipsStarted = true
    initializeShips()
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

function initializeShips() {
    for (let i = 0; i < 3; i++) {
        const road = document.getElementById('road' + (i + 1))

        for (let j = 0; j < shipsNumber / 3; j++) {
            const img = document.createElement('img')

            img.id = String(shipsNumber / 3 * i + j)
            img.alt = ''
            img.decoding = 'async'
            img.style.transform = 'translate3d(-20vw, 0, 0)'
            road.appendChild(img)
            runShip(img)
        }
    }
}

function generateValues() {
    const ship = Math.floor(Math.random() * 6)
    const velocity = Math.random() * 3 + 5 + Math.random()
    const side = (Math.floor(Math.random() * 2) && 'Forward') || 'Backward'
    const delay = Math.random() * 3
    const mode = modes[Math.floor(Math.random() * 5)]

    return [ship, velocity, side, delay, mode]
}

window.addEventListener('resize', () => {
    for (let i = 0; i < shipsNumber; i++) {
        const ship = document.getElementById(i)
        if (!ship) continue
        if (ship._shipAnim) ship._shipAnim.cancel()
        ship.remove()
    }

    if (window.innerWidth <= 1300 && window.innerWidth >= 1000) {
        shipsNumber = 15
    } else if (window.innerWidth < 1000) {
        shipsNumber = 9
    } else {
        shipsNumber = 30
    }

    if (shipsStarted) initializeShips()
})
