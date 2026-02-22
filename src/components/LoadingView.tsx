import React, { useState, useEffect, useRef } from 'react';
import StyledRectangle from "./Cube";

interface CubeSettings {
  left: number;
  top: number;
  shadowBlur: number;
  shadowOpacity: number;
  shadowDistance: number;
}

function variableSpeedCubePosition(animationTime: number): CubeSettings {
  const timeStart = 2000;
  const duration = 2000;
  const shadowFadeDuration = 300;
  const maxDistance = 10;
  const maxBlur = 0;     // Shadow gets softer as it lifts
  const maxOpacity = 0.6; // Shadow gets lighter as it lifts

  let t = 0;
  let shadowFactor = 0; // 0 to 1 multiplier for all shadow properties

  // 1. Movement Logic (unchanged)
  if (animationTime >= timeStart && animationTime < timeStart + duration) {
    t = (animationTime - timeStart) / duration;
  } else if (animationTime >= timeStart + duration) {
    t = 1;
  }

  // 2. Shadow Factor Logic (The "Lift" multiplier)
  const timeEnd = timeStart + duration;

  if (animationTime >= timeStart && animationTime < timeEnd) {
    const elapsed = animationTime - timeStart;
    const remaining = timeEnd - animationTime;
    const distFromEdge = Math.min(elapsed, remaining);
    shadowFactor = Math.min(distFromEdge / shadowFadeDuration, 1);
  }

  // Calculate final values using the float-friendly shadowFactor
  const currentDistance = shadowFactor * maxDistance;
  const currentBlur = shadowFactor * maxBlur;
  const currentOpacity = shadowFactor * maxOpacity;

  const interpolation = (1 - Math.cos(Math.PI * t)) / 2;

  return {
    left: (interpolation * 250) + 10,
    top: 50 + 10 - currentDistance,
    shadowDistance: currentDistance,
    shadowBlur: currentBlur,
    shadowOpacity: currentOpacity
  };
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
        width: "400px",
        margin: "200px 0px",
        height: "200px",
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
          <StyledRectangle shadowDistance={firstCube.shadowDistance} />
        </div>
      </div>
    </div>
  );
};

export default LoadingView;