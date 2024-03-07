console.log('Client side  javascript file is loaded!');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const location = search.value;

    messageOne.textContent = 'Loading...';
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((response) => {
        if (response.error) {
            throw new Error(response.error);
        }
        messageOne.textContent = JSON.stringify(response);
    })
    .catch((error) => {
        messageOne.textContent = error;
    });
});