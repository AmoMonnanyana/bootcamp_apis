export default function wordLengths(sentence){
    let totalWords = 0;
    let wholeSentence = sentence.split(' ');
    for (let i = 0; i < wholeSentence.length; i++){
        let trimmedSentenceWord = wholeSentence[i].trim();
         totalWords = totalWords + trimmedSentenceWord.length;
     }
     return totalWords;
 }