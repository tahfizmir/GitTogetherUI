import { useState } from "react";

const Abc = () => {
    const [sentence,setSentence]= useState("");

    const textlen=sentence.trim().length;
    const wordArray=sentence.split(/\s+/);
    const wordCount=wordArray.filter(word=>word.length>0).length;
    
    const useLongestWord=(wordArray)=>{
        if(!wordArray.length)return '';
        let longestWord='';
        for(const word of wordArray){
            if(word.length>longestWord.length){
                longestWord=word;
            }
        }
        return longestWord;
    }
    const longestWord=useLongestWord(wordArray);

    const handleText=(e)=>{
        setSentence(e.target.value);
    }
  return (
    <div>
   <textarea onChange={handleText} value={sentence}></textarea>
   <div className="count">
    <p>Character count:{textlen}</p>
    <p>Word Count:{wordCount}</p>
    <p>Longest Word: {longestWord}</p>
   </div>
    </div>
  )
}

export default Abc;

// Live Character Counter

// A text area where the user can type.


// Show the current:
// Character count

 
// Word count


// Longest word
// Display live statistics as the user types.


// Persist history and current text in localStorage so refreshing the page doesn’t clear the data. 
// Undo Functionality:
// Clicking Undo reverts the last auto-saved state.


// Allow undo only once per saved state (single level).