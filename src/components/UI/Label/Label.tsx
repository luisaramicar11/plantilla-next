import React from 'react';
import { LabelStyle } from './LabelStyle'; 

interface LabelProps {
  text: string; 
  htmlFor?: string;
  className?: string; 
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, className }) => {
  return (
    <LabelStyle htmlFor={htmlFor} className={className}>
      {text}
    </LabelStyle>
  );
};

export default Label;