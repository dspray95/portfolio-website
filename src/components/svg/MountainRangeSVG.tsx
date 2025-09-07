// src/components/MountainRangeSVG.tsx

import React, { useMemo } from "react";

// Define the types for our component's props
interface MountainRangeSVGProps {
  /** The total width of the SVG canvas. */
  width: number;
  /** The total height of the SVG canvas. */
  height: number;
  /** The total number of points (peaks) in the range. */
  nPeaks: number;
  /** The horizontal distance between each point. */
  slopeDistance: number;
  /** The vertical distance between the high and low points. */
  peakHeight: number;
  /** The direction the mountain range should extend. */
  alignment?: "left" | "right";
  stroke?: string;
  strokeWidth?: number;
}

export const MountainRangeSVG: React.FC<MountainRangeSVGProps> = ({
  width,
  height,
  nPeaks,
  slopeDistance,
  peakHeight,
  alignment = "right",
  stroke = "white",
  strokeWidth = 3,
}) => {
  const pathData = useMemo(() => {
    const pathCommands: string[] = [];
    const direction = alignment === "right" ? 1 : -1;

    // Center the drawing vertically in the SVG canvas
    const centerY = height / 2;
    const startX = alignment === "right" ? 0 : width;

    for (let i = 0; i < nPeaks; i++) {
      const x = startX + i * slopeDistance * direction;

      // This logic now matches your original code:
      // Even points are high, odd points are low.
      const isHighPoint = i % 2 === 0;
      const y = isHighPoint
        ? centerY - peakHeight / 2
        : centerY + peakHeight / 2;

      if (i === 0) {
        // Start the path with "Move To"
        pathCommands.push(`M ${x} ${y}`);
      } else {
        // Continue the path with "Line To"
        pathCommands.push(`L ${x} ${y}`);
      }
    }

    return pathCommands.join(" ");
  }, [nPeaks, slopeDistance, peakHeight, width, height, alignment]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={pathData}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" // Explicitly set to "none" as requested
      />
    </svg>
  );
};
