// const form = document.getElementById('form')

// form.addEventListener('submit', () => {
//     sendEmail()
//     reset()
//     return false
// })

// function sendEmail() {
//     const body = `НОВЫЙ КЛИЕНТ<br>---------------------------<br>Email: ${document.getElementById('email').value}<br>Имя: ${document.getElementById('name').value}<br>Продукт: ${document.getElementById('dropdown').value}<br>Телефон: ${document.getElementById('tel').value}<br>Сообщение: ${document.getElementById('message').value}`

//     Email.send({
//         Host : "smtp.elasticemail.com",
//         Username : "varepaken2003@gmail.com",
//         Password : "8155EA9A6A7C7E95B3A4661E0F0D7413E880",
//         To : 'varepaken2003@gmail.com',
//         From : 'varepaken2003@gmail.com',
//         Subject : "This is the subject",
//         Body : body
//     }).then(
//       message => alert(message)
//     );
// }
