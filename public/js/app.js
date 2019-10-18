    //console.log('Client side javascript file is loaded!')
    // fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    //     response.json() .then((data)=> {
    //         console.log(data)
    //     })
    // })
// const address = 'kumbakonam'
// const geoURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoibml6YXJtYiIsImEiOiJjazFoZzY1NnAwZDY3M2tqeXE4OXcwNDYwIn0.dxqB96T0jrtHJwAk_GU-EA&limit=1'
// fetch(geoURL).then((response)=>{
//         response.json() .then((data)=> {
//         console.log(data)
//         const latitude = body.features[0].center[1]
//         const longitude = body.features[0].center[0]
//         console.log(latitude,longitude)

//         const url = 'https://api.darksky.net/forecast/abaad1a392024994c7e8cc5144f2d530/'+latitude+','+longitude
//         fetch(url).then((response)=>{
//                 response.json() .then((datai)=> {
//                 const innerdata = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.'
//                 console.log(innerdata)
//             })
//         })
//     
// })



const weatherForm = document.querySelector('form')
const search  = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
msg1.textContent=''
msg2.textContent=''
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log('testing3')
    console.log(search)
    const location = search.value
    console.log(location)
    msg1.textContent="....Loading"
    msg2.textContent=''
    if(!location)
    {
        msg1.textContent= 'Searched without location'
        return console.log("Searched without location")
    }
    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{
        response.json() .then((data)=> {
        if(data.error)
        {
            console.log(data.error)
            msg1.textContent= data.error
        }
        else
        {
            msg1.textContent= data.location
            msg2.textContent= data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})
        



