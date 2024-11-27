import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
