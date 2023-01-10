// const { response } = require("express")

console.log('Hello this is js file running!')

///fetch 

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const msgThree = document.querySelector('#msg-3')
let gif = document.getElementById('gif');

weatherform.addEventListener('submit', (e) =>
{
    e.preventDefault()
    const location = search.value
    
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    gif.style.opacity = 0

    fetch('http://localhost:3000/weather?address='+location).then((response) =>
{
    response.json().then((data) =>{

        if(data.error){
            msgOne.textContent = data.error
            gif.style.opacity = 0
    
        }
        else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
            gif.style.opacity = 1
            gif.src = data.url
        }
    })
})

}) 