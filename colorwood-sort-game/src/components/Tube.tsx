import React from 'react';
import '../App.css';

interface TubeProps {
  liquids: string[];
  onClick: () => void;
  isSelected: boolean;
}

const Tube: React.FC<TubeProps> = ({ liquids, onClick, isSelected }) => {
  return (
    <div className={`tube ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <div className="liquids-container">
        {liquids.map((color, index) => {
          const isMoveable = index === liquids.length - 1;
          const liquidClasses = `liquid ${isMoveable && isSelected ? 'moveable selected' : ''}`;
          return <div key={index} className={liquidClasses} style={{ backgroundColor: color }}></div>;
        })}
      </div>
    </div>
  );
};

export default Tube;
