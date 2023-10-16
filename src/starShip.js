const starShip = document.getElementById('star-ship')
const start = document.getElementById('start')
const reset = document.getElementById('reset')
const flame = document.getElementById('flame')

let launched = false

starShip.addEventListener('animationend', showRocket)

start.addEventListener('click', () => {
    if (!launched) {
        const rocketAnimation = 'rocketLaunch 15s ease-in-out'
        const flameAnimation = 'flameOutput 15s ease'

        starShip.style.background = 'none'
        starShip.style.visibility = 'visible'
        starShip.style.animation = rocketAnimation  

        flame.style.visibility = 'visible'
        flame.style.animation = flameAnimation
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                const beem = document.getElementById(`beem${i * 8 + j}`)
                
                if (i == 2) {
                    beem.style.animation = `scaling${i}-${Math.floor(Math.random() * 4)} 1s ease-in-out ${Math.floor(Math.random() * 700)}ms infinite  alternate`

                } else if (i == 1) {
                    beem.style.animation = `scaling${i}-${Math.floor(Math.random() * 4)} 1s ease-in-out ${Math.floor(Math.random() * 850)}ms infinite alternate`
                } else {
                    beem.style.animation = `scaling${i}-${Math.floor(Math.random() * 4)} 1s ease-in-out ${Math.floor(Math.random() * 1000)}ms infinite alternate`
                }
            }
        }

        launched = true

    } else {
        console.log('already launched ship must be reset')
    }
})

reset.addEventListener('click', () => {
    if (launched) {
        const animation = 'rocketReset 5s ease'

        starShip.style.visibility = 'visible'
        starShip.style.animation = animation

        flame.style.visibility = 'hidden'
        flame.style.animation = ''

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                const beem = document.getElementById(`beem${i * 8 + j}`)

                beem.style.animation = ''

            }
        }
        
        launched = false

    } else {
        console.log('ship is not launched')
    }
})

function showRocket() {
    if (launched) {
        starShip.style.visibility = 'hidden'
        flame.style.visibility = 'hidden'
        flame.style.animation = ''
    } else {
        starShip.style.background = 'black'
        starShip.style.visibility = 'visible'
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 1300) {
        starShip.style.animation = ''
        flame.style.animation = ''
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                const beem = document.getElementById(`beem${i * 8 + j}`)

                beem.style.animation = ''
            }
        }
        
        showRocket()
        launched = false 
    }
})