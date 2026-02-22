import React from 'react';

const StyledRectangle = ({
                           width = '50px',
                           height = '50px',
                           color = 'orange',
                           shadowOpacity = 0.2,
                           shadowBlur = 4,
                           shadowDistance = 4,
                           borderRadius = '1px'
                         }) => {

  const boxShadow = `${shadowDistance}px ${shadowDistance}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;
  const rectangleStyle = {
    width: width,
    height: height,
    backgroundColor: color,
    borderRadius: borderRadius,
    boxShadow,
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