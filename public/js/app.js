
console.log("Client Side Javascript file is loaded!!!");

// fetch is not part of javaascript 
// fetch is a browser based API but not accessible for nodejs
// this script is running on client-side so it is perfectly fine using here

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=Mumbai').then((response) => {
//     response.json().then((geocodeData) => {
//         if (geocodeData.error) {
//             return console.log(geocodeData.error)
//         }
//         console.log(geocodeData.forcast)
//         console.log(geocodeData.location)
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = ''; // textContent is used to set the value in html
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // preventDefault() prevents the default behaviour of browser which refreshes the page entirely. 
    const location = search.value;
    if (!location) {
        return console.log("you must provide location");
    }
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((geocodeData) => {
            if (geocodeData.error) {
                return messageOne.textContent = geocodeData.error
                // return console.log(geocodeData.error)
            }
            messageOne.textContent = geocodeData.location;
            messageTwo.textContent = geocodeData.forcast;
            // console.log(geocodeData.forcast)
            // console.log(geocodeData.location)
        })
    })
});