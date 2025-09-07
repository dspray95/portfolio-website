import React, { useMemo } from "react";

interface FretboardSVGProps {
  width: number;
  height: number;
  fretCount?: number;
  fretMarkers?: number[];
  fretColor?: string;
  fretStrokeWidth?: number;
  markerColor?: string;
  markerRadius?: number;
}

interface Line {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Circle {
  key: string;
  cx: number;
  cy: number;
}

export const FretboardSVG: React.FC<FretboardSVGProps> = ({
  width,
  height,
  fretCount = 5,
  fretMarkers = [2, 4],
  fretColor = "white",
  fretStrokeWidth = 2,
  markerColor = "white",
  markerRadius = 5,
}) => {
  const { frets, markers } = useMemo(() => {
    const newFrets: Line[] = [];
    const newMarkers: Circle[] = [];

    const fretSpacing = width / fretCount;

    // Frets
    for (let i = 0; i <= fretCount; i++) {
      const x = i * fretSpacing;
      newFrets.push({
        key: `fret-${i}`,
        x1: x,
        y1: 0,
        x2: x,
        y2: height,
      });
    }

    // Fret Markers
    const markerY = height / 2;
    fretMarkers.forEach((fretNumber, index) => {
      if (fretNumber > fretCount || fretNumber <= 0) return;

      const xPos = (fretNumber - 1) * fretSpacing + fretSpacing / 2;

      newMarkers.push({
        key: `marker-${index}`,
        cx: xPos,
        cy: markerY,
      });
    });

    return { frets: newFrets, markers: newMarkers };
  }, [width, height, fretCount, fretMarkers]);

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className="frets">
        {frets.map((fret) => (
          <line
            key={fret.key}
            x1={fret.x1}
            y1={fret.y1}
            x2={fret.x2}
            y2={fret.y2}
            stroke={fretColor}
            strokeWidth={fretStrokeWidth}
            strokeLinecap="round"
          />
        ))}
      </g>
      <g className="markers">
        {markers.map((marker) => (
          <circle
            key={marker.key}
            cx={marker.cx}
            cy={marker.cy}
            r={markerRadius}
            fill={markerColor}
          />
        ))}
      </g>
    </svg>
  );
};
