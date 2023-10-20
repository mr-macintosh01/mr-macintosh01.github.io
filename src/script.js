let shipsNumber = 30
const modes = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']

if (window.innerWidth <= 1300 && window.innerWidth >= 1000) {
    shipsNumber = 15
} else if (window.innerWidth < 1000) {
    shipsNumber = 9
}

initializeShips()

function initializeShips() {
    for (let i = 0; i < 3; i++) {
        const road = document.getElementById('road' + (i + 1))
    
        for (let j = 0; j < shipsNumber / 3; j++) {
            const img = document.createElement('img')
            const [ship, velocity, side, delay, mode] = generateValues()
            const animation = `move${side} ${velocity}s ${mode} ${delay}s 1 backwards`
    
            img.setAttribute('id', shipsNumber / 3 * i + j)
    
            if (side === 'Backward') {
                img.classList.add(`Ship${ship}Reverse`)
            } else {
                img.classList.add(`Ship${ship}`)
            }
    
            img.style.animation = animation
    
            img.addEventListener('animationend', (event) => shipOperatingSystem(event))
    
            road.appendChild(img)
        }
    }    
}


function shipOperatingSystem(event) {
    const img = document.getElementById(event.target.id)

    img.className = ''

    const [ship, velocity, side, delay, mode] = generateValues()
    const animation = `move${side} ${velocity}s ${mode} ${delay}s 1 backwards`

    if (side === 'Backward') {
        img.classList.add(`Ship${ship}Reverse`)
    } else {
        img.classList.add(`Ship${ship}`)
    }
    
    img.style.animation = 'none'
    img.offsetHeight;
    img.style.animation = animation
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
    for(let i = 0; i < shipsNumber; i++) {
        const ship = document.getElementById(i)

        ship.remove()
    }
    
    if (window.innerWidth <= 1300 && window.innerWidth >= 1000) {
        shipsNumber = 15
    } else if (window.innerWidth < 1000) {
        shipsNumber = 9
    } else {
        shipsNumber = 30
    }

    initializeShips()
})
