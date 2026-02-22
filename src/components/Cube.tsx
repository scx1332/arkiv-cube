import React from 'react';

const StyledRectangle = ({
                           width = '50px',
                           height = '50px',
                           color = 'orange',
                           shadowOpacity = 0.2,
                           borderRadius = '1px'
                         }) => {
  const rectangleStyle = {
    width: width,
    height: height,
    backgroundColor: color,
    borderRadius: borderRadius,
    boxShadow: `3px 3px 3px rgba(0, 0, 0, ${shadowOpacity})`,
    // Adding flexbox to easily handle any children content
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={rectangleStyle}>
      {/* This allows you to put text or other elements inside */}
    </div>
  );
};

export default StyledRectangle;