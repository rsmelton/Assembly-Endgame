import type { FC } from "react";

type PopupProps = {
  text: string;
  subText?: string;
  bgColor: string;
};

const Popup: FC<PopupProps> = ({ text, subText, bgColor }) => {
  return (
    <div
      className={`flex ${subText ? "flex-col" : ""} justify-center items-center text-white w-[360px] h-[60px] rounded-[4px] mb-8 ${bgColor}`}
    >
      <p>{text}</p>
      {subText ? <p>{subText}</p> : null}
    </div>
  );
};

export default Popup;
