const list = {
    '1': 'Бизнес-план для СЭЗ',
    '2': 'Инвестиционный Бизнес-план',
    '3': 'Бизнес-план для получения кредита',
    '4': 'Food Cost & Baverage Cost',
    '5': 'Разработка Финансово-экономичесекой модели',
    '6': 'Актуализация Бизнес-планов',
    '7': 'Бизнес-план развития'
}

const slider = document.getElementById('slider')
const con = document.getElementById('con')
const dropdown = document.getElementById('dropdown')
const up = document.getElementById('up')
const down = document.getElementById('down')

let selectedId = 'Slider1'
let firstId = 1
let lastId = 3
let animationStart = false

let initialElements = [document.getElementById('Slider1'), document.getElementById('Slider2'), document.getElementById('Slider3')]

initialElements.forEach(item => item.addEventListener('click', event => onClick(event)))

down.addEventListener('click', () => {
    if (lastId < 7 && !animationStart) {
        animationStart = true
        lastId++;
        
        const element = document.createElement('div')
        const p = document.createElement('p')


        element.classList.add('element')
        element.setAttribute('id', 'Slider' + lastId)
        element.setAttribute('tabindex', '0')

        element.style.display = 'none'

        p.innerHTML = list[lastId]

        element.appendChild(p)

        if (lastId == 4) {
            let newP = document.createElement('p')
            newP.innerHTML = '(Расчет рентабельности для рестаранов и баров)'
            newP.style.marginTop = '0'
            
            element.appendChild(newP)
        }

        element.addEventListener('click', event => onClick(event))

        slider.appendChild(element)

        for (let i = firstId; i < lastId + 1; i++) {
            const elem = document.getElementById('Slider' + i)

            if (('Slider' + i) == selectedId) {
                elem.classList.add('selected')
            }

            if (firstId == i) {
                elem.style.animation = 'moveUp 300ms ease'
                elem.addEventListener('animationend', event => removeElem(event))

            } else if (lastId == i) {
                elem.style.display = 'flex'
                elem.style.animation = 'moveLast 300ms ease'
                ++firstId;
            } else {
                elem.addEventListener('animationend', event => removeAnimation(event))
                elem.style.animation = 'moveNext 300ms ease'
            }
        }
    }
})

up.addEventListener('click', () => {
    if (firstId > 1 && !animationStart) {
        animationStart = true
        firstId--;
        const element = document.createElement('div')
        const p = document.createElement('p')

        element.classList.add('element')
        element.setAttribute('id', 'Slider' + firstId)
        element.setAttribute('tabindex', '0')
        element.style.display = 'none'

        p.innerHTML = list[firstId]
       
        element.appendChild(p)
       
        if (firstId == 4) {
            let newP = document.createElement('p')
            newP.innerHTML = '(Расчет рентабельности для рестаранов и баров)'
            newP.style.marginTop = '0'

            element.appendChild(newP)
        }

        element.addEventListener('click', event => onClick(event))

        slider.prepend(element)

        for (let i = lastId; i > firstId - 1; i--) {
            const elem = document.getElementById('Slider' + i)

            if ('Slider' + i === selectedId) {
               elem.classList.add('selected')
            }

            if (lastId == i) {
                elem.style.animation = 'moveDown 300ms ease'
                elem.addEventListener('animationend', event => removeElem(event))
            } else if (firstId == i) {
                elem.style.display = 'flex'
                elem.style.animation = 'moveFirst 300ms ease'
                --lastId;
            } else {
                elem.addEventListener('animationend', event => removeAnimation(event))
                elem.style.animation = 'moveNextDown 300ms ease'
            }
        }
    }
})

function onClick(event) {
    console.log(selectedId)

    if (!event.target.id) {
        const elementId = event.target.parentElement.id

        const element = document.getElementById(elementId)

        if (!element.classList[1]) {

            element.classList.add('selected')

            if (selectedId && document.getElementById(selectedId)) {
                const prevElement = document.getElementById(selectedId)
                prevElement.classList.remove('selected')
            }
            
            dropdown.selectedIndex = +elementId[elementId.length - 1] - 1
            
            selectedId = elementId
        } else {
            element.classList.remove('selected')
           
            dropdown.selectedIndex = 0
            selectedId = ''
        }
    } else {
        const element = document.getElementById(event.target.id)
        
        if (!element.classList[1]) {
            element.classList.add('selected')
            
            if (selectedId && document.getElementById(selectedId)) {
                const prevElement = document.getElementById(selectedId)
                prevElement.classList.remove('selected')
            }
            
            dropdown.selectedIndex = +event.target.id[event.target.id.length - 1] - 1

            selectedId = event.target.id

        } else {
            element.classList.remove('selected')
            
            dropdown.selectedIndex = 0
            selectedId = ''
        }
    }
}

function removeElem(event) {
    const elem = document.getElementById(event.target.id)
    elem.remove()
}

function removeAnimation(event) {
    const elem = document.getElementById(event.target.id)
    elem.style.animation = ''
    animationStart = false
}