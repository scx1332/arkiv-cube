import React, { useState, useEffect, useRef } from 'react';
import StyledRectangle from "./Cube";

interface CubeSettings {
  left: number;
  top: number;
}

function variableSpeedCubePosition(animationTime: number): CubeSettings {

  const timeStart = 2000;
  const duration = 3000;
  const maxDistance = 250;


  // Normalize time within the 20,000ms loop (results in a value from 0 to 1)
  let t;
  if (animationTime < timeStart) {
    t = 0;
  } else if (animationTime >= timeStart + duration) {
    t = 1;
  } else {
    t = (animationTime - timeStart) / duration;
  }

  // S-curve interpolation using Cosine
  const interpolation = (1 - Math.cos(Math.PI * t)) / 2;

  const left = interpolation * maxDistance;
  const top = 50;

  return { left, top };
}
const LoadingView = ({
                       width = '100%',
                       height = '100%',
                       color = 'white',
                     }) => {
  const [animationTime, setAnimationTime] = useState<number>(0);

  // Use a ref to track the animation frame ID so we can clean it up
// Initialize with null to satisfy the TypeScript compiler
  const requestRef = useRef<number | null>(null);

// Inside the animate function, check if it exists before canceling
  const animate = (time: number) => {
    setAnimationTime(time);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      // Standard cleanup pattern
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const loadingViewStyle: React.CSSProperties = {
    width: width,
    height: height,
    backgroundColor: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };


  const firstCube = variableSpeedCubePosition(animationTime);

  return (
    <div style={loadingViewStyle}>
      <div style={{
        position: "relative",
        width: "300px",
        height: "100px",
        borderRadius: '8px',
        border: "1px solid gray",
        overflow: "hidden" // Keeps the cube inside the bounds
      }}>
        <div style={{
          position: "absolute",
          left: `${firstCube.left}px`,
          top: `${firstCube.top}px`,
          transition: 'none' // Ensure React doesn't try to interpolate
        }}>
          <StyledRectangle />
        </div>
      </div>
    </div>
  );
};

export default LoadingView;