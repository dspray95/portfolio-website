import React, { useMemo } from "react";

interface MorseSVGProps {
  ditDahList: string;
  width: number;
  height: number;
  spacing?: number;
  leadLength?: number;
  trailLength?: number;
  stroke?: string;
  strokeWidth?: number;
}

export const MorseSVG: React.FC<MorseSVGProps> = ({
  ditDahList,
  width,
  height,
  spacing = 17,
  leadLength = 40,
  trailLength = 40,
  stroke = "white",
  strokeWidth = 2,
}) => {
  const pathData = useMemo(() => {
    return generateMorseSVGPath(
      ditDahList,
      spacing,
      leadLength,
      trailLength,
      width / 2,
      height
    );
  }, [ditDahList, width, height, spacing, leadLength, trailLength]);

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <path
        d={pathData}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

const generateMorseSVGPath = (
  ditDahList: string,
  spacing: number,
  leadLength: number,
  trailLength: number,
  xPos: number,
  yPos: number
): string => {
  const pathCommands: string[] = [];
  let totalDistance = 0;

  // Lead-in line
  pathCommands.push(`M ${xPos} ${yPos} L ${xPos} ${yPos - leadLength}`);
  totalDistance += leadLength;

  // dits, dahs, and spaces
  for (let i = 0; i < ditDahList.length; i++) {
    let length = spacing;
    let xOffset = 0;
    let isSpace = false;
    const char = ditDahList.charAt(i);

    if (char === "-") {
      length = spacing;
    } else if (char === ".") {
      length = spacing * 0.2;
    } else if (char === "/") {
      xOffset = spacing * 0.8;
      length = spacing * 0.4;
    } else {
      isSpace = true;
    }

    if (!isSpace) {
      const startY = yPos - totalDistance - spacing;
      const endY = startY - length;
      const startX = xPos - xOffset;
      const endX = xPos + xOffset;
      pathCommands.push(`M ${startX} ${startY} L ${endX} ${endY}`);
    }
    totalDistance += length + spacing;
  }

  // Trail-out line
  const trailStartY = yPos - totalDistance - spacing;
  const trailEndY = trailStartY - trailLength;
  pathCommands.push(`M ${xPos} ${trailStartY} L ${xPos} ${trailEndY}`);
  totalDistance += trailLength + spacing;

  // Arrowhead
  const arrowBaseY = yPos - totalDistance;
  const arrowTipY = arrowBaseY - spacing;
  const arrowXOffset = spacing * 0.8;
  pathCommands.push(
    `M ${xPos} ${arrowBaseY} L ${xPos - arrowXOffset} ${arrowTipY}`
  );
  pathCommands.push(
    `M ${xPos} ${arrowBaseY} L ${xPos + arrowXOffset} ${arrowTipY}`
  );

  return pathCommands.join(" ");
};
