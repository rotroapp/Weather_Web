const request = require("request")

const forecast = (latitude, longitude , callback) =>
{
   const url = 'http://api.weatherstack.com/current?access_key=842e213fd5d1ef081897053c55f87dd5&query=' + latitude + ','+ longitude

   request({url, json : true}, (error, {body})=>{

      if(error)
      {
        callback('Unable to connect to weather service!', undefined)     
      }
      else if(body.error)
      {
        callback('Unable to find location!', undefined)
      }
      else{
        callback(undefined, body.current.weather_descriptions[0]  + ". It is currently " + body.current.temperature + " degrees out there, It feels like "+ body.current.feelslike + " degrees" , body.current.weather_icons[0] )
      }  
   }) 
  
}


module.exports = forecast