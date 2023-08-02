export default function longestWord(sentence){
    let words = sentence.split(' ')
    let countedWord = '';
    for (let i = 0; i < words.length; i++){
    let trimmedWords = words[i].trim();
      if(trimmedWords.length >= countedWord.length){
      countedWord = trimmedWords;
      }
    }
      return countedWord;
    }

    
  
