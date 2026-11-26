import React from 'react';
import {Composition} from 'remotion';
import {TestComp} from './TestComp';

export const Root: React.FC = () => {
  return (
    <Composition
      id="TestComp"
      component={TestComp}
      durationInFrames={300}
      fps={30}
      width={960}
      height={540}
    />
  );
};
