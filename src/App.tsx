import { useState } from "react";
import Popup from "./components/Popup";
import ProgrammingLanguage from "./components/ProgrammingLanguage";
import Key from "./components/Key";
import words from "./words";
import "./App.css";

/* Application Overview:
 * 
 * State used in the application:
 *  word: A random word generated for the user to try and guess correct
 * 
 *  wordArray: An array built from the letters in word, is used to check the users guess and to also
 *             fill in the remaining slots in guessArray at the end of the game if the user runs out
 *             of programming languages or lives. 
 * 
 *  guessArray: An array of length:word.length that gets filled with empty strings at the start of the game.
 *              This is the array that gets filled over time when the user guesses letters correctly or gets
 *              filled at the end if the user runs out of programming languages or lives.
 * 
 *  popup: An object that holds three properties: text, subText, and bgColor. They all start out as empty strings
 *         until we need to use the popup in our game. It will only ever be used if the user guesses incorrectly, 
 *         wins the game, or loses the game.
 * 
 *  programmingLanguages: An array of objects where each object holds the different properties for how each 
 *                        language gets displayed on the screen. It is also used to indicate when the user 
 *                        runs out of lives i.e. when the second to last language is no longer alive. 
 * 
 *  keys: An array of objects built from a string containing all uppercase letters. Each object has a string
 *        containing one of the letters, a hasGuessed boolean to indicate if this letter has been guessed before,
 *        and a guessedCorrect boolean to indicate whether the key that clicked was correct or not.  
 * 
 *  isGameOver: A boolean that acts as a flag to be used for a few different things: When the game is over we want
 *              the keyboard to be dark and unclickable, we want the remaining letters to be filled into the
 *              guessArray if the user lost, we want to update our popup state to reflect winning or losing, and
 *              lastly we want to render our new game button.  
 *  
 *
 * How the game works:
 *  The user clicks a key on the keyboard
 *   If they made a correct guess:
 *     - Change the bg color of the key to green
 *     - Fill in the correct position of the guessArray where the letter should be
 *   If they made an incorrect guess:
 *     - Change the bg color of the key to red
 *     - Display popup that alerts the user they have made a mistake
 *     - Update the programmingLanguages state to reflect losing a language
 * 
 *  Every render of the page we are checking to see if the game is over or not
 *   If the game is over we always gray out the keyboard to ensure users can't make
 *   anymore guesses. We also display a new game button and a popup indicating if the user won or not. 
 *   If the user lost, we fill in the remaining slots of the guessArray to show the 
 *   user what letters of the word they missed in red.
 */

function App() {
  // Here we use lazy initialization so we don't run these methods over and over again for no reason
  const [word, setWord] = useState(() => getFreshWord());
  const [wordArray, setWordArray] = useState(() => getFreshWordArray());
  const [guessArray, setGuessArray] = useState(() => getFreshGuessArray());
  const [popup, setPopup] = useState(() => getFreshPopup());
  const [programmingLanguages, setProgrammingLanguages] = useState(() => getFreshProgrammingLanguages());
  const [keys, setKeys] = useState(() => getFreshKeys());
  const [isGameOver, setIsGameOver] = useState(false);

  /*** 
   * Start of Win or Lose conditions 
   * 
   * The player wins if they fill up all the slots in the guessArray
   * The player loses if they run out of languages/lives
   * 
   * */

  // Win
  if (guessArray.includes("") === false && isGameOver === false) {
    setIsGameOver(true);
    setPopup({
      text: "You win!",
      subText: "Well done! 🎉",
      bgColor: "bg-[#10A95B]"
    });
  } 

  // Lose
  if (programmingLanguages[programmingLanguages.length - 2].isAlive === false && isGameOver === false) {
    // We do length - 2 above to get the second to last language since that is the last language/life
    setIsGameOver(true);
    setPopup({
      text: "Game over!",
      subText: "You lose! Better start learning Assembly 😭",
      bgColor: "bg-[#BA2A2A]"
    });
  }

  /*** 
   * Start of accessor methods
   * 
   * These methods allow us to get fresh data at the beginning of the game
   * and also when the user clicks the new game button
   * 
   * */

  function getFreshWord() {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
  }

  function getFreshWordArray(newWord: string = word) {
    return newWord.split("");
  }

  function getFreshGuessArray(newWord: string = word) {
    return Array(newWord.length).fill("");
  }

  function getFreshPopup() {
    return {text: "", subText: "", bgColor: ""}
  }

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

  function getFreshKeys() {
    return Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => ({
      letter: letter,
      hasGuessed: false,
      guessedCorrect: false,
    }));
  }

  /*** 
   * Start of display methods
   * 
   * Simply displays different aspects of the game
   * 
   * */

  function displayGuessArray() {
    return guessArray.map((letter, index) => {

      const shouldReveal = isGameOver === true && letter === "";

      const letterToDisplay = shouldReveal ? wordArray[index] : letter;

      const textColor = shouldReveal ? "text-[#EC5D49]" : "text-white";

      return (
        <div
          key={index}
          className="flex justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
                     bg-[#323232] border-b border-[#F9F4DA] uppercase"
        >
          <span className={`text-xs md:text-base ${textColor}`}>
            {letterToDisplay}
          </span>
        </div>
      );
    });
  }

  function displayPopup() {
    return <Popup text={popup.text} subText={popup.subText} bgColor={popup.bgColor} />
  }

  function displayProgrammingLanguages() {
    return programmingLanguages.map((language) => (
      <ProgrammingLanguage 
        key={language.languageText}
        languageText={language.languageText}
        isAlive={language.isAlive}
        bgColor={language.bgColor}
        textColor={language.textColor}
      />
    ));
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

  /*** 
   * Start of game functionality 
   * 
   * Checks if the letter the user guesses is correct,
   * updates the popup upon incorrect guesses, updates the programming lanugages
   * state so we know how many languages/lives we have left, and updates
   * the state of the keys to reflect correct/incorrect guesses.
   * 
   * */

  // When the user clicks a key this method runs the main functionality of the game
  function guessLetter(guessedLetter: string) {
    
    // We know the user guessed correct if the letter exists in the wordArray
    const guessedCorrect = wordArray.includes(guessedLetter);

    if (guessedCorrect) {
      wordArray.map((letter, index) => {
        // If correct, update the guessArray with the correct letter guessed
        if (guessedLetter === letter) {
          setGuessArray((prevGuessArray) =>
            // guessPlaceholder refers to the "" in every slot of the original array
            // This updates every slot in the guessArray where the guessedLetter matches the letter from wordArray
            prevGuessArray.map((guessPlaceholder, i) => (i === index ? guessedLetter : guessPlaceholder))
          );
        }
      });
    } else {
      // Eliminate a programming language & update Popup state
      setProgrammingLanguages((prevProgrammingLanguages) => {
        const updatedLanguages = [...prevProgrammingLanguages];
        const farewells = [
          "Farewell ",
          "It was nice knowing you ",
          "Goodbye ",
        ];
        const randomFarewell = farewells[Math.floor(Math.random() * farewells.length)];

        // Find the first language that is alive and update its isAlive property to false
        // Change popup to reflect language lost
        for (let i = 0; i < updatedLanguages.length; i++) {
          if (updatedLanguages[i].isAlive) {
            setPopup(
              { 
                text: `"${randomFarewell} ${updatedLanguages[i].languageText}" 🫡`, 
                subText: "", 
                bgColor: "bg-[#7A5EA7]"
              }
            );

            updatedLanguages[i] = { ...updatedLanguages[i], isAlive: false };
            break;
          }
        }

        return updatedLanguages;
      });
    }

    // Update keyboard
    setKeys((prevKeys) =>
      prevKeys.map((key) =>
        key.letter === guessedLetter
          ? { ...key, hasGuessed: true, guessedCorrect: guessedCorrect }
          : key
      )
    );
  }

  /*** Start of game reset process */

  function startNewGame() {
    // Get the new values immediately to avoid getting an old word
    const newWord = getFreshWord();
    const newWordArray = getFreshWordArray(newWord);
    const newGuessArray = getFreshGuessArray(newWord);

    setWord(newWord);
    setWordArray(newWordArray);
    setGuessArray(newGuessArray);
    setPopup(getFreshPopup());
    setProgrammingLanguages(getFreshProgrammingLanguages());
    setKeys(getFreshKeys());
    setIsGameOver(false);
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <section className="flex flex-col items-center mb-8">
        <h1 className="text-base md:text-[20px] text-[#F9F4DA]">Assembly: Endgame</h1>
        <p className="text-[12px] md:text-[14px] text-[#8E8E8E] max-w-sm mx-auto text-center text-balance">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </section>
      <section>{displayPopup()}</section>
      <section className="flex justify-center gap-0.5 flex-wrap max-w-[200px] md:max-w-[300px] mb-8 relative">{displayProgrammingLanguages()}</section>
      <section className="flex gap-0.5 mb-16">{displayGuessArray()}</section>
      <section className="flex flex-col gap-1.5 mb-8">{displayKeyboard()}</section>
      {isGameOver === true && 
        <button className="rounded px-8 py-1 md:px-16 md:py-2 text-xs md:text-base bg-[#11B5E5] border border-[#D7D7D7] cursor-pointer" onClick={startNewGame}>
          New Game
        </button>
      }
    </main>
  );
}

export default App;
