document.addEventListener('alpine:init', () => {
    Alpine.data('greetApi', function() {
      return {
        sentence: '',
        longestWord: '',
        shortestWord: '',
        wordLength: '',
        sentenceData: [],
        longWord: false,
        shortWord: false,
        totalWords: false,
        totalBill: "",
        bill: '',
        sms_cost: 0,
        call_cost: 0,
        type: '',
        suggestedPrice: 0,
        projectedUsage: "",
        airtimeAmount: 0,
        remainingBalance: "",
        airtimeAvailability: "",
        available: false,
        message: '',
        confirmation: '',
        showPrice: false,
        showTotal: false,
        showAmount: false,

        //Wordgame widget//
        showLongWord(){
            this.longWord = !this.longWord
            
        },

        showShortWord(){
            this.shortWord = !this.shortWord
        },

        showWordLength(){
            this.totalWords = !this.totalWords
        },
    
        analyseSentence(){
           return  axios.get(`/api/word_game?sentence=${this.sentence}`)
            .then((result) => {
                //this.longestWord = result.data.longestWord
                console.log(result.data.shortestWord)
                this.sentenceData = result.data
                console.log(this.sentenceData)
                this.longestWord = this.sentenceData.longestWord
                this.shortestWord = this.sentenceData.shortestWord
                this.wordLength = this.sentenceData.sum
                this.available = true
                setTimeout(() => {
                    this.sentence = ''
                    this.available = false
                    this.longestWord = ''
                    this.shortestWord = ''
                    this.wordLength = ''
                  }, 10000)
            })
        },

        //Total PhoneBill Widget
        getPhoneBill(){
            
            return axios.post(`/api/phonebill/total`, {
                "bill" : this.bill 
        })
        },

        fetchPhoneBill(){
            console.log(this.bill);
            this.getPhoneBill()
            return axios.get(`/api/phonebill/total`)
            .then((result) => {
                this.totalBill = result.data.total
                this.showTotal = true
                setTimeout(() => {
                    this.totalBill = ''
                    this.bill = ''
                    this.showTotal = false
                  }, 3000)
            })
        },

        changeThePrice(){
            console.log(this.suggestedPrice);
            console.log(3);
             return axios.post(`/api/phonebill/price`, {
                 "billType" : this.type,
                  "price" : this.suggestedPrice
                 }).then((result) => {
                    this.confirmation = result.data.message
                    setTimeout(() => {
                        this.type = ''
                        this.suggestedPrice = 0
                        this.confirmation = ''
                      }, 3000)
                 })

                },

        getPriceOfEachBill(){
            //this.changeThePrice()
            console.log(this.suggestedPrice);
            return axios.get(`/api/phonebill/prices`)
            .then((result => {
                this.sms_cost = result.data.sms
                this.call_cost = result.data.call
                console.log(result.data.call)
                this.showPrice = !this.showPrice
            }))
        },

        // Enough Airtime Widget
        checkAirtime(){
            axios.post(`/api/enough`,{
            "usage" : this.projectedUsage,
            "available" : this.airtimeAmount
        })
        },

        showResult(){
            this.checkAirtime()
            return axios.get(`/api/enough`)
            .then((result) => {
                this.remainingBalance = result.data.result
                this.showAmount = true
                if(Number(this.remainingBalance) > 0 ){
                    this.message = "The airtime is enough for the projected usage"
                } else {
                    this.message = "Not enough airtime! Please recharge."
                }
                console.log(this.remainingBalance)
                console.log(Number(this.remainingBalance))
                setTimeout(() => {
                    this.remainingBalance = 0
                    this.message = ''
                    this.projectedUsage = ''
                    this.airtimeAmount = 0
                    this.showAmount = false
                  }, 3000)
            })
        },

      }
    })
})