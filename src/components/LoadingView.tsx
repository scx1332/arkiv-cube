import React, { useState, useEffect, useRef } from 'react';
import StyledRectangle from "./Cube";

interface CubeSettings {
  left: number;
  top: number;
}

const LoadingView = ({
                       width = '100%',
                       height = '100%',
                       color = 'white',
                     }) => {
  const [firstCube, setFirstCube] = useState<CubeSettings>({ left: 0, top: 0 });

  // Use a ref to track the animation frame ID so we can clean it up
// Initialize with null to satisfy the TypeScript compiler
  const requestRef = useRef<number | null>(null);

// Inside the animate function, check if it exists before canceling
  const animate = (time: number) => {
    setFirstCube((prev) => {
      const newLeft = prev.left > 280 ? 0 : prev.left + 2;
      return { ...prev, left: newLeft };
    });

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