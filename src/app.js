const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
// console.log(path.join(__dirname, '../public'))
const publicDir  = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//setup handler view engine & view path
app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialpath)


app.get('', (req,res) =>{

    res.render('index', {

        title: 'Weather App',
        name: 'Rajat'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About us..',
        name: 'Rajat'
    })
})

app.get('/help',(req,res) =>{

    res.render('help', {
        title : 'Help Page',
        name: 'Rajat'

    })
})

// app.get('/help/*',(req,res) =>{

//     res.render('404', {
//         title : '404',
//         name: 'Rajat',
//         errortext: 'Help article not found!'
//     })
// })


// app.com
// app.com/help
// app.com/about

// app.get('' , (req, res) =>{

//     res.send('Hello express!')
// })

// app.get('/help', (req,res) =>{

//     res.send('Help Page!')
// })

// app.get('/about', (req,res) =>{

//     res.send('<h1>About Page!</h1>')
// })

app.get('/weather', (req, res) =>{

    if(!req.query.address)
    {
       return res.send({
        error: 'Please provide address first!'
       })
    }
    

        geocode(req.query.address, (error, {latitude, longitude, location} ={} ) =>
        {
            if(error)
            {
                return res.send({error})
            }
            forecast(latitude,longitude, (error,forecastdata , Url ={})  =>{

                if(error)
                {
                    return res.send({error})
                }

                      res.send({forecast: forecastdata, 
                                 location,
                                 address: req.query.address,
                                 url : Url
                     })
            })
        
        // forecast: 'It is smoke',
        // location: 'Noida',
        // address: req.query.address
    })
})


app.get('*' , (req,res) =>{

    res.render('404',{

        title: '404',
        name: 'Rajat',
        errortext: 'Page do not exist!'
    })
})

app.listen(3000, () =>{
    console.log('server is up on port 3000')
})

