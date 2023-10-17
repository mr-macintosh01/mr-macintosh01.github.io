let initialWindowHeight = window.innerHeight
let initialWindowWidth = window.innerWidth

let shipsNumber = 20

if (window.innerWidth <= 1300 && window.innerWidth > 1000) {
    shipsNumber = 10
} else if (window.innerWidth <= 1000) {
    shipsNumber = 5
} else {
    shipsNumber = 20
}

const modes = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']

let starShip2 = document.getElementById('star-ship')
let flame2 = document.getElementById('flame')

startAnimation()

function startAnimation() {
    for (let i = 0; i < shipsNumber; i++) {
        const [roadId, ship, velocity, side, delay, mode] = generateValues()
        
        const road = document.getElementById(roadId)
    
        const object = document.createElement('object')
        object.addEventListener('animationend', event => shipOperatingSystem(event))
    
        object.setAttribute('data', `./images/Ship${ship}${(side === 'Backward' && 'Reverse') || ''}.svg`)
        object.setAttribute('id', i)
    
        object.style.position = 'absolute'
        object.style.animation = `move${side} ${velocity}s ${mode} ${delay}s 1 backwards`
    
        if (window.innerHeight != initialWindowHeight || window.innerWidth != initialWindowWidth) {
            return
        }

        road.appendChild(object)
    }
}

function shipOperatingSystem(event) {
    const [roadId, ship, velocity, side, delay, mode] = generateValues()
    
    const prevObj = document.getElementById(event.target.id)
    prevObj.remove()

    const object = document.createElement('object')
    object.addEventListener('animationend', event => shipOperatingSystem(event))

    const road = document.getElementById(roadId)
    
    object.setAttribute('data', `./images/Ship${ship}${(side === 'Backward' && 'Reverse') || ''}.svg`)
    object.setAttribute('id', event.target.id)

    object.style.position = 'absolute'
    object.style.animation = `move${side} ${velocity}s ${mode} ${delay}s 1 backwards`

    if (window.innerHeight != initialWindowHeight || window.innerWidth != initialWindowWidth) {
        return
    }

    road.appendChild(object)
}
 
function generateValues() {    
    return [`road${Math.floor(Math.random() * 3 + 1)}`, Math.floor(Math.random() * 6), Math.random() * 6 + 5 + Math.random(), (Math.floor(Math.random() * 2) && 'Forward') || 'Backward', Math.random() * 3, modes[Math.floor(Math.random() * 5)]]
}

window.addEventListener('resize', () => {
    for (let i = 0; i < shipsNumber; i++) {
        const object = document.getElementById(i)
        
        if (object) {
            object.remove()
        }
    }

    setTimeout(() => console.log('Timeout'), 150)

    initialWindowHeight = window.innerHeight
    initialWindowWidth = window.innerWidth

    if (initialWindowWidth <= 1300 && initialWindowWidth > 1000) {
        shipsNumber = 15
    } else if (initialWindowWidth <= 1000) {
        shipsNumber = 5
    } else {
        shipsNumber = 25
    }

    startAnimation()
})
