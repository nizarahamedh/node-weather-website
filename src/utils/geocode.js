const request = require("request")

const geocode = (address, callback) =>
{   
    const geoURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoibml6YXJtYiIsImEiOiJjazFoZzY1NnAwZDY3M2tqeXE4OXcwNDYwIn0.dxqB96T0jrtHJwAk_GU-EA&limit=1'


    request({ url: geoURL ,json: true }, (error, {body}) => {
        if(error)
        {
            callback('unable to Location Service', undefined)
        }
        else if(body.features.length ==0)
        {
            console.log('Location not valid. Please provide a valid location')
            callback('Location not valid. Please provide a valid location', undefined)
           
        }
        else
        {
            console.log('latitude',body.features[0].center[1])
            console.log('longitude',body.features[0].center[0])
            console.log('location',body.features[0].place_name)
            callback(undefined, {latitude:body.features[0].center[1],longitude:body.features[0].center[0] ,location:body.features[0].place_name})
            
        }
    })
}
module.exports =  geocode

// geocode('Titachery', (error, data) => {
//      console.log('Error', error)
//      console.log('Data',data)
    
// })