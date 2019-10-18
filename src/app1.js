const express = require('express')

const app = express()
let reqCntr = 1

app.get('', (req, res) => {
   
    res.send('<h1>Weather</h1>')
    console.log('Request No'+reqCntr)
    reqCntr++
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Nizar'
    }, {
        name: 'Afrin'
    }])
    console.log('Request No'+reqCntr)
    reqCntr++
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
    console.log('Request No'+reqCntr)
    reqCntr++
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
    console.log('Request No'+reqCntr)
    reqCntr++
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})