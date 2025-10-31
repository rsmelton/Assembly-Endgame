import type { FC } from "react";

type ProgrammingLanguageProps = {
  languageText: string;
  isAlive: boolean;
  bgColor: string;
  textColor: string;
};

const ProgrammingLanguage: FC<ProgrammingLanguageProps> = ({
  languageText,
  isAlive,
  bgColor,
  textColor,
}) => {
  return (
    <div
      className={
        `relative text-[12px] p-1 rounded-[3px] ${bgColor} ${textColor}
         ${isAlive === false ? 
            "before:flex before:justify-center before:items-center before:absolute before:inset-0 before:bg-black/50 before:content-['💀']"
            : "" } 
        `}
    >
      {languageText}
    </div>
  );
};

export default ProgrammingLanguage;
