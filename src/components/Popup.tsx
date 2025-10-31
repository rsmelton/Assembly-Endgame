import type { FC } from "react";

type PopupProps = {
  text: string;
  subText?: string;
  bgColor: string;
};

const Popup: FC<PopupProps> = ({ text, subText, bgColor }) => {
  return (
    <div
      className={`flex ${subText ? "flex-col" : ""} justify-center items-center text-white 
                  w-[300px] h-[50px] md:w-[360px] md:h-[60px] rounded-[4px] mb-8 ${bgColor}`}
    >
      <p className="text-xs md:text-base">{text}</p>
      {subText ? <p className="text-xs md:text-base">{subText}</p> : null}
    </div>
  );
};

export default Popup;
