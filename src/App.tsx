import { useState } from "react";
import Key from "./components/Key";
import Popup from "./components/Popup";
import words from "./words";
import "./App.css";



/*

  The problem occurs when we win the game and click the new game button.
  When clicking the new game button, what happens?
  1. State of the game is being changed, but whats causing the problem is we 
     are setting the state of the isGameOver boolean to false and then when the 
     page re-renders, the condition for winning the game runs because we had set
     the guessArray back to empty strings after clicking the new game button. Inside
     this condition, we set the isGameOver boolean to true and this is what causes 
     displayGuessArray to fill in the array with the correct letters.

*/




// Might need to install nanoid to get random ids
// for everywhere that I use index when mapping

function App() {
  const [word, setWord] = useState(() => getFreshWord());
  const [wordArray, setWordArray] = useState(() => getFreshWordArray());
  const [keys, setKeys] = useState(() => getFreshKeys());
  const [guessArray, setGuessArray] = useState(() => getFreshGuessArray());
  const [programmingLanguages, setProgrammingLanguages] = useState(() => getFreshProgrammingLanguages());
  const [popup, setPopup] = useState(() => getFreshPopup());
  const [isGameOver, setIsGameOver] = useState(false);

  // When the game is over we want to do the following: 
  // - Make the keyboard unclickable and grayed out (Can use flag for Key component)
  // - If the user lost, we need to fill in the remaining letters in the guess array and make them red
  // - Display popup that says You Win or Game Over
  // - Display new game button at bottom of screen


  // This means the user has filled up all the slots in the word, so they win the game
  if (guessArray.includes("") === false && isGameOver === false) {
    console.log("Inside win condition")
    setIsGameOver(true);
    setPopup({
      text: "You win!",
      subText: "Well done! 🎉",
      bgColor: "bg-[#10A95B]"
    });
  } 

  // Player runs out of languages, so they lose the game
  // We are doing -2 so we can skip past Assembly and get the second to last language
  // This is completely fine to do since we will always have Assembly at the end
  if (programmingLanguages[programmingLanguages.length - 2].isAlive === false && isGameOver === false) {
    setIsGameOver(true);
    setPopup({
      text: "Game over!",
      subText: "You lose! Better start learning Assembly 😭",
      bgColor: "bg-[#BA2A2A]"
    });
  }

  function getFreshWord() {
    const word = words[Math.floor(Math.random() * words.length)];
    console.log("Fresh Word: ", word);
    return word;
    // return words[Math.floor(Math.random() * words.length)];
  }

  function getFreshWordArray(newWord: string = word) {
    const wordArray = newWord.split("").map((letter) => letter.toUpperCase());
    console.log("Fresh Word Array: ", wordArray);
    return wordArray;
    // return word.split("").map((letter) => letter.toUpperCase());
  }

  function getFreshKeys() {
    return Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => ({
      letter: letter,
      hasGuessed: false,
      guessedCorrect: false,
    }));
  }

  function getFreshGuessArray(newWord: string = word) {
    const guessArray = Array(newWord.length).fill("");
    console.log("Guess Array: ", guessArray);
    return guessArray;
    // return Array(word.length).fill("");
  }

  // Could maybe pull the data in from a separate file
  function getFreshProgrammingLanguages() {
    return [
      { languageText: "HTML", isAlive: true, bgColor: "bg-[#E2680F]", textColor: "text-[#FFFFFF]" },
      { languageText: "CSS", isAlive: true, bgColor: "bg-[#328AF1]", textColor: "text-[#FFFFFF]" },
      { languageText: "JavaScript", isAlive: true, bgColor: "bg-[#F4EB13]", textColor: "text-[#000000]" },
      { languageText: "React", isAlive: true, bgColor: "bg-[#2ED3E9]", textColor: "text-[#000000]" },
      { languageText: "TypeScript", isAlive: true, bgColor: "bg-[#298EC6]", textColor: "text-[#FFFFFF]" },
      { languageText: "Node.js", isAlive: true, bgColor: "bg-[#599137]", textColor: "text-[#FFFFFF]" },
      { languageText: "Python", isAlive: true, bgColor: "bg-[#FFD742]", textColor: "text-[#000000]" },
      { languageText: "Ruby", isAlive: true, bgColor: "bg-[#D02B2B]", textColor: "text-[#FFFFFF]" },
      { languageText: "Assembly", isAlive: true, bgColor: "bg-[#2D519F]", textColor: "text-[#FFFFFF]" },
    ];
  }

  function getFreshPopup() {
    return {text: "", subText: "", bgColor: ""}
  }

  function displayGuessArray() {
    console.log("Inside displayGuessArray, is the game over?: ", isGameOver);
    // If the game is over, reveal the remaining letters
    if (isGameOver === true) {
      return guessArray.map((guessedLetter, index) => {
        return (
          <div
            key={index}
            className="flex justify-center items-center w-[40px] h-[40px] bg-[#323232] border-b border-[#F9F4DA] uppercase"
          >
            {guessedLetter === "" ? 
              <span className="text-[#EC5D49]">{wordArray[index]}</span> :
              <span className="text-white">{guessedLetter}</span>            
            }
          </div>
        )});

    }

    // Otherwise only reveal the letters they've guessed
    return guessArray.map((guessedLetter, index) => (
      <div
        key={index}
        className="flex justify-center items-center w-[40px] h-[40px] bg-[#323232] border-b border-[#F9F4DA] uppercase"
      >
        <span className="text-white">{guessedLetter}</span>
      </div>
    ));
  }

  function displayProgrammingLanguages() {
    return programmingLanguages.map((language) => (
      <div key={language.languageText} 
           className={`relative text-[12px] p-1 rounded-[3px]
                       ${language.isAlive === false ? 
                       "before:flex before:justify-center before:items-center before:absolute before:inset-0 before:bg-black/50 before:content-['💀']" 
                       : ""} 
                       ${language.bgColor} ${language.textColor}`}
      >
        {language.languageText}
      </div>
    ));
  }

  function displayPopup() {
    return <Popup text={popup.text} subText={popup.subText} bgColor={popup.bgColor} />
  }

  function displayKeyboard() {
    const keyboardRows = [
      keys.slice(0, 10),
      keys.slice(10, 20),
      keys.slice(20, 26),
    ];

    return keyboardRows.map((row, index) => (
      <div key={index} className="flex justify-center items-center gap-1.5">
        {row.map((key) => {
          return (
            <Key
              key={key.letter} // will always be A-Z so works fine
              guessLetter={guessLetter}
              isGameOver={isGameOver}
              letter={key.letter}
              hasGuessed={key.hasGuessed}
              guessedCorrect={key.guessedCorrect}
            />
          );
        })}
      </div>
    ));
  }

  // When the user clicks a key this method runs the main functionality of the game
  function guessLetter(guessedLetter: string) {
    let guessedCorrect = false;

    wordArray.map((letter, index) => {
      // If we guess correctly
      if (guessedLetter === letter) {
        // Update guessArray with correct letter guessed
        setGuessArray((prevGuessArray) =>
          // guessPlaceholder refers to the "" in every slot of the original array
          prevGuessArray.map((guessPlaceholder, i) => 
            (i === index ? guessedLetter : guessPlaceholder))
        );
        guessedCorrect = true;
      }
    });

    // If we didn't guess correct
    if (guessedCorrect === false) {
      // Eliminate a programming language & update Popup state
      setProgrammingLanguages((prevProgrammingLanguages) => {
        const updatedLanguages = [...prevProgrammingLanguages];
        const farewells = [
          "Farewell ",
          "It was nice knowing you ",
          "Goodbye ",
        ]
        const randomFarewell = farewells[Math.floor(Math.random() * farewells.length)];

        // Find the first language that is alive and update its isAlive property to false
        for (let i = 0; i < updatedLanguages.length; i++) {
          if (updatedLanguages[i].isAlive) {
            // Update popup state
            setPopup(
              { 
                text: `"${randomFarewell} ${updatedLanguages[i].languageText}" 🫡`, 
                subText: "", 
                bgColor: "bg-[#7A5EA7]"
              }
            );

            // Update languages state
            updatedLanguages[i] = { ...updatedLanguages[i], isAlive: false };
            break;
          }
        }

        return updatedLanguages;
      });
    }

    // Set keys state
    setKeys((prevKeys) =>
      prevKeys.map((key) =>
        key.letter === guessedLetter
          ? { ...key, hasGuessed: true, guessedCorrect: guessedCorrect }
          : key
      )
    );
  }

  // Simply resets the state of the entire game
  function startNewGame() {
    setPopup(getFreshPopup());
    setProgrammingLanguages(getFreshProgrammingLanguages());
    setKeys(getFreshKeys());
    setIsGameOver(false);
    console.log("Inside startNewGame, is the game over?: ", isGameOver);

    // Get the new values immediately
    const newWord = getFreshWord();
    // Since the wordArray and guessArray both depend on the fresh word, 
    // we have to get those immediately, otherwise it gets the old word.
    const newWordArray = getFreshWordArray(newWord);
    const newGuessArray = getFreshGuessArray(newWord);

    setWord(newWord);
    setWordArray(newWordArray);
    setGuessArray(newGuessArray);
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <section className="flex flex-col items-center mb-8">
        <h1 className="text-[20px] text-[#F9F4DA]">Assembly: Endgame</h1>
        <p className="text-[14px] text-[#8E8E8E] max-w-sm mx-auto text-center">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </section>
      <section>{displayPopup()}</section>
      <section className="flex justify-center gap-0.5 flex-wrap max-w-[300px] mb-8 relative">{displayProgrammingLanguages()}</section>
      <section className="flex gap-0.5 mb-16">{displayGuessArray()}</section>
      <section className="flex flex-col gap-1.5 mb-8">{displayKeyboard()}</section>
      {isGameOver && 
        <button className="rounded px-16 py-2 bg-[#11B5E5] border border-[#D7D7D7] cursor-pointer" onClick={startNewGame}>
          New Game
        </button>
      }
    </main>
  );
}

export default App;
