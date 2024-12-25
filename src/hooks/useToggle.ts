import React from 'react';

export const useToggle = (initialState = false) => {
  const [isToggled, setIsToggled] = React.useState(initialState);

  const toggleOn = () => {
    setIsToggled(true);
  };

  const toggleOff = () => {
    setIsToggled(false);
  };

  const toggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  return { isToggled, toggleOn, toggleOff, toggle };
};
