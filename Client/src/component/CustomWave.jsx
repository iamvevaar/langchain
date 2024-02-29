
import React from 'react';
import Wave from 'react-wavify';

const CustomWave = ({ top, fill, height, amplitude, speed, points }) => {
  return (
    <Wave fill={fill}
      paused={false}
      options={{
        height: height,
        amplitude: amplitude,
        speed: speed,
        points: points
      }}
      style={{
        position: "absolute",
        top: top,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",
        height: "120px",
      }}
    />
  );
};

export default CustomWave;
