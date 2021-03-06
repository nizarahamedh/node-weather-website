const request = require("request")
const forecast = (latitude,longitude, callback) =>
{   
   

    const url = 'https://api.darksky.net/forecast/abaad1a392024994c7e8cc5144f2d530/'+latitude+','+longitude
    request({ url ,json: true }, (error, {body}) =>
     {
        if(error)
        {
            callback('unable to connect to Weather Service', undefined)
        }
        else if(body.error)
        {
            callback('Coordinates not valid. Please provide a valid Coordinates', undefined)
           
        }
        else
        { 
            const highTemp = body.daily.data[0].temperatureHigh
            const lowTemp = body.daily.data[0].temperatureLow
            console.log('highTemp ',highTemp)
            console.log('lowTemp ',lowTemp)           
            const data = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. '+
            'High Temperature is '+highTemp+' and Low Temperature is '+lowTemp+
            '. There is a ' + body.currently.precipProbability + '% chance of rain.'
            console.log(data)
            
            callback(undefined, data)
            
        }
    })
}
module.exports =  forecast
