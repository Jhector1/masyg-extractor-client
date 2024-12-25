import React from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {setIsOpen(true);
   // alert(isOpen);
  };
  const closeModal = () =>{setIsOpen(false);
    //alert(isOpen);
  };

  return { isOpen, openModal, closeModal };
};
