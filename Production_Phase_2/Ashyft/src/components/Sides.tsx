import React from 'react';

interface SidesProps {
  location: string;
  label: string;
  state: string;
}

const Sides: React.FC<SidesProps> = ({ location, label, state }) => {

  const normal = 'invert(63%) sepia(0%) saturate(6664%) hue-rotate(161deg) brightness(79%) contrast(86%)'
  const active = 'invert(66%) sepia(85%) saturate(613%) hue-rotate(314deg) brightness(89%) contrast(99%)'
  const filterbg = (state === "true")? active : normal
  const widthIcon = (state === "true")? "25px" : "20px"
  const sideTxt = (state === "true")? "#fdfdfd" : "#808080" 

  return (
    <div className="justify-self-center rounded-lg flex flex-col items-center gap-2 cursor-pointer">
      <img src={location} alt="Icon" style={{filter: filterbg, width: widthIcon}}  className="w-[25px] h-full" id="SideIcon" />
      <h3 id="SiderText" style={{color: sideTxt}}>{label.toUpperCase()}</h3>
    </div>
  );
};

export default Sides;
