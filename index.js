const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const port = 3000
const https = require('https')
const bodyParser = require('body-parser')
app.set('views engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))


app.post("/",(req,res)=>{
    const apiKey = "fdaef8719323472b8bf38c0273e1531e"
    const query = req.body.cityName
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + ""
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)//把其他格式转化为JSON格式
            const temp = weatherData.main.temp
            const city=weatherData.name
            const icon = weatherData.weather[0].icon
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write("<div> the temp of "+city+"is "+temp+" degree")
            // res.write(`<img src="${imageURL}">`)
            res.send()
        })
    })

})

app.listen({port}, () => {
    console.log(`server listening on ${port}`)
})