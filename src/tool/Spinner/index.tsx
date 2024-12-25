import React from 'react';
import './index.css';
interface SpinnerProps{
  opacity?: number;
}
export default function Spinner({opacity=0.706}: SpinnerProps) {
  // const style = {};

  return (
    <div style={{opacity: opacity}} className="spinner-bg">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
