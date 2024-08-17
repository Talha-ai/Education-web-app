import React from 'react';

const ProgressBar = ({ percentage }) => {
  const progressBarStyles = {
    width: '100%',
    height: '3px',
    // backgroundColor: 'lightgray', // Set the background color for the entire progress bar
    borderRadius: '5px',
    position: 'relative',
  };

  const completedStyles = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: 'black', // Set the color for the completed portion
    borderRadius: '5px',
    position: 'absolute',
    top: '0',
    left: '0',
  };

  const incompleteStyles = {
    width: `${100 - percentage}%`,
    height: '100%',
    backgroundColor: 'lightgray', // Set the color for the incomplete portion
    borderRadius: '5px',
    position: 'absolute',
    top: '0',
    right: '0',
    opacity: 0.5, // Set the desired opacity for the incomplete portion
  };

  return (
    <div style={progressBarStyles}>
      <div style={completedStyles}></div>
      <div style={incompleteStyles}></div>
    </div>
  );
};

export default ProgressBar;
