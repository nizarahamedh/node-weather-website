const path = require('path')
const express = require('express')
const  hbs =  require('hbs')

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath )

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nizar Ahamed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nizar Ahamed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Nizar Ahamed'
    })
})

app.get('/weather', (req, res) => {
    console.log('Qrystring'+req)
    //console.log('Qrystring'+req.query.search)
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log('Qrystring'+req.query.address)
        callgeocode(req.query.address,  (error, {location,forecastdata}={}) => {
            if(error)
            {
                return   res.send({
                    error
                })
            }
        //if(query.search[0])
        res.send({
            forecast: forecastdata,
            location
        })
    })  
})

app.get('/products', (req, res) => {
    console.log('Qrystring'+req.query)

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log('Qrystring'+req.query.search)
    res.send({
        products: []
    })
})

app.get('/form', (req, res) => {
    res.render('form', {
        title: 'Form Example',
        name: 'Nizar Ahamed',
        errorMessage: 'Form Examplenot found.'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nizar Ahamed',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nizar Ahamed',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
 
const callgeocode = (address, callback) =>
{ 
    if(!address)
    {
        callback("Please provide location to run the program", undefined)
    }
    
    geocode(address, (error, {latitude,longitude,location}={}) => {
        //console.log('Error', error)
        //console.log('Data',data)
        if(error)
        {
            callback(error, undefined)
        }
        else
        {        
            forecast(latitude,longitude, (error, forecastdata) => {
                if(error)
                {
                    callback(error, undefined)
                }
                else 
                {
                    //const location = data.location
                    console.log("location app",location)
                    callback (undefined, {location,forecastdata})
                }
                
            })
        }
        
        
       
    })
}