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

  let buttonBgColor = "bg-[#FCBA29]";

  if (hasGuessed) {
    buttonBgColor = guessedCorrect ? "bg-[#10A95B]" : "bg-[#EC5D49]"; 
  }

  const onGoingGameStyles = isGameOver === false ? "border-[#D7D7D7] cursor-pointer" : "";
  const gameOverStyles = isGameOver ? "border-[#A1A1A1] relative before:absolute before:inset-0 before:bg-black/50" : "";

  function handleClick() {
    if (isGameOver === false) {
      guessLetter(letter);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center w-[40px] h-[40px] border
                  rounded ${buttonBgColor} ${onGoingGameStyles} ${gameOverStyles}`}
    >
      {letter}
    </button>
  );
};

export default Key;
