import express from 'express'
import longestWord from './public/longesWord.js'
import shortestWord from './public/shortestWord.js'
import wordLengths from './public/wordlengths.js'
import totalPhoneBill from './public/totalPhoneBill.js'


const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(express.static('public'))

app.get('/', function(req, res){
    res.send("Amo's API")
})


app.get('/api/word_game/', function (req, res){
const sentence = req.query.sentence;

const longWordResult = longestWord(`${sentence}`)
const shortWordResult = shortestWord(`${sentence}`)
const totalWordsResult = wordLengths(`${sentence}`)

res.json({
    longestWord: longWordResult,
    shortestWord: shortWordResult,
    sum:totalWordsResult
})
})

//post requests that returns the total cost of a phone log.
const bill = ""
let total = totalPhoneBill(bill)
const phonebill = {}
phonebill[bill] = 0.00

app.post('/api/phonebill/total', function(req,res){
    res.json({
        status: "success"
    })
    const bill = req.body.bill
    const cost = totalPhoneBill(bill)

        total = cost
        phonebill[bill] = total
    
    console.log(req.body)
})

app.get('/api/phonebill/total', function(req,res){
const bill = req.query.bill

res.json({
    bill: `${bill}`,
    total: total
})
})

//get request that returns the prices of calls or sms
app.get('/api/phonebill/prices', function(req,res){
    
    res.json({
       call : 2.75,
       sms: 0.65
    })

})

//Post request that sets the price of a call or sms
const prices = {
    sms : 0.65,
    call: 2.75
}

app.post('/api/phonebill/price', function(req,res){
const type = req.body.type
const price = req.body.price

res.json({
    status: "success"
})

prices[type] = price

})

app.get('/api/phonebill/price', function(req, res){
const logType = req.query.logType

const type = `${logType}`
const price = prices[type]

res.json({
    
        status : 'success',
        message : `The ${type} was set to R${price}`
     
})
})

//example//
/*const  greetings = {
    english: 'good morning',
    xhosa: 'molo'
}


//example//
app.post('/api/phonebill/total', function(req,res){
console.log(req.body)

res.json({
    status: "success"
})

const language = req.body.language
const greeting = req.body.greeting
console.log(language)
console.log(greeting)

if(language && !greeting[language]){
    greetings[language] = greeting
}
})

app.get('/api/phonebill/total', function(req,res){
    const language = req.query.language
    const username = req.query.username

    const greeting = greetings[language]
    const message = `${greeting}, ${username}`

    if(!greeting){
        res.json({
            message : 'language not supported'
        })
        
    } else{
        res.json({
            message
    })
    }
    
})*/
//example//

const PORT = process.env.PORT || 3011;

app.listen(PORT, function() {
    console.log("app started")
    
   
    
});