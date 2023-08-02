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

      }
    })
})