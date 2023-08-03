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

app.get('/', function (req, res) {
    res.send("Amo's API")
})


app.get('/api/word_game/', function (req, res) {
    const sentence = req.query.sentence;

    const longWordResult = longestWord(`${sentence}`)
    const shortWordResult = shortestWord(`${sentence}`)
    const totalWordsResult = wordLengths(`${sentence}`)

    res.json({
        longestWord: longWordResult,
        shortestWord: shortWordResult,
        sum: totalWordsResult
    })
})

const prices = {
    sms: 0.65,
    call: 2.75
}

let calls = prices.call
let smses = prices.sms

//update prices of calls and smses
app.post('/api/phonebill/price', function (req, res) {
    const billType = req.body.billType
    const price = Number(req.body.price);
    console.log("PRICE: ", price);
    res.json({
        status: "success",
        message: `the ${billType} was set to ${price}`
    })
    prices[billType] = price

    if (billType == 'call') {
        prices.call = price;
    } else if (billType == 'sms') {
        smses = prices[billType]
    }
    console.log("PRICES: ", prices);

})

/*app.get('/api/phonebill/price', function(req, res){
    const billType = req.query.billType
   
    if (billType == 'call'){
        res.json({
          bill: `${billType}`,
          price: calls
        })
        
    } else if (billType == 'sms'){
        res.json({
            bill:`${billType}`,
            price: smses
        })
    }

    
})*/

//calculate the total cost of phonebill
let bill = ""
let total = 0 //totalPhoneBill(bill, calls, smses)
const phonebill = {}
phonebill[bill] = total

app.post('/api/phonebill/total', function (req, res) {
    console.log("BODY: ", req.body);
    const bill = req.body.bill
    const cost = totalPhoneBill(bill, prices.call, prices.sms)

    total = cost
    phonebill[bill] = total

    res.json({
        status: "success",
        total: total
    })
    // console.log(req.body)
})

app.get('/api/phonebill/total', function (req, res) {
    res.json({
        total: total
    })
})

//get the updated prices

app.get('/api/phonebill/prices', function (req, res) {

    res.json({
        call: prices.call,
        sms: prices.sms
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

app.listen(PORT, function () {
    console.log("app started")
    console.log(prices)
    console.log(smses)
    console.log(calls)

});