import type { FC } from "react";

type KeyProps = {
  guessLetter: (guessedLetter: string) => void;
  isGameOver: boolean;
  letter: string;
  hasGuessed: boolean;
  guessedCorrect: boolean;
};

// guessLetter: method to allow the user to make a guess
// letter: letter of the instance of the key
const Key: FC<KeyProps> = ({ guessLetter, isGameOver, letter, hasGuessed, guessedCorrect }) => {

  let keyBgColor = "bg-[#FCBA29]"; // Default yellow state

  if (hasGuessed) {
    // if the user guessed correct we use the green bg, otherwise we use the red bg
    keyBgColor = guessedCorrect ? "bg-[#10A95B]" : "bg-[#EC5D49]"; 
  }

  // If the game is over, we apply a dark overlay to indicate no more guesses can be made
  // otherwise we include the cursor pointer to indicate the key is still clickable 
  const keyStyles = isGameOver ? "border-[#A1A1A1] relative before:absolute before:inset-0 before:bg-black/50"
                               : `border-[#D7D7D7] ${hasGuessed === false ? "cursor-pointer" : ""}`;

  function handleClick() {
    // Allow guessing/clicking as long as the game isn't over and the user hasn't guessed this letter before
    if (isGameOver === false && hasGuessed === false) {
      guessLetter(letter);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] border
                  text-xs md:text-base rounded ${keyBgColor} ${keyStyles}`}
    >
      {letter}
    </button>
  );
};

export default Key;
