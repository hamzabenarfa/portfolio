import React from "react";
import { Composition } from "remotion";
import { DtalkDemo, DTALK_DURATION, FPS } from "./DtalkDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DtalkDemo"
      component={DtalkDemo}
      durationInFrames={DTALK_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
