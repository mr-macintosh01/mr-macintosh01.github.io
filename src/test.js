const shipsNumber = 30
const mods = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']

for (let i = 0; i < shipsNumber; i++) {
    const [roadId, ship, velocity, side, delay, mode] = generateValues()
    
    const road = document.getElementById(roadId)

    const object = document.createElement('object')
    object.addEventListener('animationend', event => shipOperatingSystem(event))

    object.setAttribute('data', `./images/Ship${ship}${(side === 'Backward' && 'Reverse') || ''}.svg`)
    object.setAttribute('id', i)

    object.style.position = 'absolute'
    object.style.animation = `move${side} ${velocity}s ${mode} ${delay}s 1 backwards`

    road.appendChild(object)
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

    road.appendChild(object)
}

function generateValues() {
    const road = `road${Math.floor(Math.random() * 3 + 1)}`
    const ship = Math.floor(Math.random() * 6)
    const velocity = Math.random() * 3 + 5 + Math.random()
    const side = (Math.floor(Math.random() * 2) && 'Forward') || 'Backward'
    const delay = Math.random() * 3
    const mod = mods[Math.floor(Math.random() * 5)]

    return [road, ship, velocity, side, delay, mod]
}

