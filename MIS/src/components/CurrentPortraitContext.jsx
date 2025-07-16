import React, { createContext, useState, useContext } from 'react';

const CurrentPortraitContext = createContext();

export const CurrentPortraitProvider = ({ children }) => {
  const [currentPortrait, setCurrentPortrait] = useState(null);

  return (
    <CurrentPortraitContext.Provider value={{ currentPortrait, setCurrentPortrait }}>
      {children}
    </CurrentPortraitContext.Provider>
  );
};

export const useCurrentPortrait = () => useContext(CurrentPortraitContext);
