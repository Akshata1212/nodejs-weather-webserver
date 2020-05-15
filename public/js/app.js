
console.log("Client Side Javascript file is loaded!!!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = ''; 
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const location = search.value;
    if (!location) {
        return console.log("you must provide location");
    }
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((geocodeData) => {
            if (geocodeData.error) {
                return messageOne.textContent = geocodeData.error
            }
            messageOne.textContent = geocodeData.location;
            messageTwo.textContent = geocodeData.forcast;
        })
    })
});