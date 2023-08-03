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
            })
        },

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
            })
        },

        changeThePrice(){
            console.log(this.suggestedPrice);
            console.log(3);
             return axios.post(`/api/phonebill/price`, {
                 "billType" : this.type,
                  "price" : this.suggestedPrice
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
            }))
        },

      }
    })
})