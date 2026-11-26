import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Test composition for the parallel render workflow:
// - background hue rotates with the frame (chunk order errors become visible)
// - a box glides left -> right across the whole duration
// - a big frame counter is burned into every frame
// - a tone track from public/ plays underneath (audio is muted in chunk
//   renders by design and muxed back in the merge job)
export const TestComp: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, width} = useVideoConfig();

  const hue = (frame * 2) % 360;
  const boxX = interpolate(frame, [0, durationInFrames - 1], [40, width - 160]);
  const progress = Math.round((frame / (durationInFrames - 1)) * 100);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `hsl(${hue}, 65%, 45%)`,
        fontFamily: 'sans-serif',
        color: 'white',
      }}
    >
      <Audio src={staticFile('tone.wav')} />
      <div
        style={{
          position: 'absolute',
          top: 190,
          left: boxX,
          width: 120,
          height: 120,
          backgroundColor: 'white',
          borderRadius: 16,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 72,
          fontWeight: 'bold',
        }}
      >
        FRAME {frame}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 36,
        }}
      >
        parallel render test — {progress}%
      </div>
    </AbsoluteFill>
  );
};
