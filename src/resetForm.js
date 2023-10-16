const resetForm = document.getElementById('resetForm')

resetForm.addEventListener('click', () => {
    document.getElementById('email').value = ''
    document.getElementById('name').value = ''
    document.getElementById('dropdown').selectedIndex = 0
    document.getElementById('tel').value = ''
    document.getElementById('message').value = ''
})