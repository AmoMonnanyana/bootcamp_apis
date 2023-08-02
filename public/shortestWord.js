export default function shortestWord(sentence){
    let theWords = sentence.split(' ');
    let theShortWord = theWords[0];
     for ( let i = 0; i < theWords.length; i++){
     let trimmedShortWord = theWords[i].trim();
      if (trimmedShortWord.length <= theShortWord.length){
      theShortWord = trimmedShortWord;
      }
     }
      return theShortWord;
    }  