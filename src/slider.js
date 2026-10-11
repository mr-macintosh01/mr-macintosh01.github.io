const list = {
    '1': 'Бизнес-план для СЭЗ',
    '2': 'Инвестиционный бизнес-план',
    '3': 'Бизнес-план для получения кредита',
    '4': 'Food Cost & Beverage Cost',
    '5': 'Разработка финансово-экономической модели',
    '6': 'Актуализация бизнес-планов',
    '7': 'Бизнес-план развития'
}

const pages = {
    '1': 'biznes-plan-dlya-sez',
    '2': 'investicionnyj-biznes-plan',
    '3': 'biznes-plan-dlya-kredita',
    '4': 'food-cost-beverage-cost',
    '5': 'finansovo-ekonomicheskaya-model',
    '6': 'aktualizaciya-biznes-plana',
    '7': 'biznes-plan-razvitiya'
}

const VISIBLE = 3

const track = document.getElementById('slider-track')
const items = Array.from(track.querySelectorAll('.element'))
const moreLink = document.getElementById('more-link')
const infoTitle = document.getElementById('info-title')
const dropdown = document.getElementById('dropdown')
const up = document.getElementById('up')
const down = document.getElementById('down')

const STORAGE_KEY = 'products-slider'

let selectedId = 'Slider1'
let first = 0

track.addEventListener('click', onClick)

down.addEventListener('click', () => moveTo(first + 1))
up.addEventListener('click', () => moveTo(first - 1))

restoreState()

function moveTo(index) {
    const next = Math.max(0, Math.min(items.length - VISIBLE, index))
    if (next === first) return

    first = next
    track.style.setProperty('--first', first)

    items.forEach((item, i) => {
        const visible = i >= first && i < first + VISIBLE
        item.classList.toggle('is-out', !visible)
        item.inert = !visible
        item.tabIndex = visible ? 0 : -1
    })

    saveState()
}

function onClick(event) {
    const element = event.target.closest('.element')

    if (!element || element.id === selectedId) return

    select(element)
    showProduct(selectedId.replace('Slider', ''), true)
    saveState()
}

function select(element) {
    const prevElement = document.getElementById(selectedId)
    if (prevElement) prevElement.classList.remove('selected')

    element.classList.add('selected')
    selectedId = element.id
}

function showProduct(key, animate) {
    dropdown.selectedIndex = +key - 1
    moreLink.href = './' + pages[key] + '/'

    infoTitle.textContent = list[key]
    infoTitle.classList.remove('is-changing')
    if (!animate) return
    void infoTitle.offsetWidth
    infoTitle.classList.add('is-changing')
}

function saveState() {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ selected: selectedId, first }))
    } catch (err) {}
}

function restoreState() {
    let state = null
    try {
        state = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    } catch (err) {}
    if (!state) return

    const element = document.getElementById(state.selected)
    if (!element || !items.includes(element)) return

    track.style.transition = 'none'
    items.forEach(item => { item.style.transition = 'none' })

    moveTo(+state.first || 0)
    select(element)
    showProduct(selectedId.replace('Slider', ''), false)

    void track.offsetWidth
    track.style.transition = ''
    items.forEach(item => { item.style.transition = '' })
}
