// src/components/NeuralNetSVG.tsx

import React, { useMemo } from "react";

interface NeuralNetSVGProps {
  layerNeuronCounts: number[];
  canvasWidth: number;
  canvasHeight: number;
  neuronRadius?: number;
  connectionColor?: string;
  connectionStrokeWidth?: number;
  neuronColor?: string;
}

interface Neuron {
  key: string;
  cx: number;
  cy: number;
}

interface Connection {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const NeuralNetSVG: React.FC<NeuralNetSVGProps> = ({
  layerNeuronCounts,
  canvasWidth: width,
  canvasHeight: height,
  neuronRadius = 8,
  connectionColor = "rgba(230, 230, 230, 0.5)",
  connectionStrokeWidth = 1.5,
  neuronColor = "white",
}) => {
  const { neurons, connections } = useMemo(() => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];
    const padding = 40; // Padding around the entire network

    const drawableWidth = width - padding * 2;
    const drawableHeight = height - padding * 2;

    const layerCount = layerNeuronCounts.length;
    const horizontalSpacing =
      layerCount > 1 ? drawableWidth / (layerCount - 1) : 0;

    const neuronPositions: { x: number; y: number }[][] = [];

    // neuron positions
    layerNeuronCounts.forEach((neuronCount, layerIndex) => {
      const layerPositions: { x: number; y: number }[] = [];
      const verticalSpacing =
        neuronCount > 1 ? drawableHeight / (neuronCount - 1) : 0;
      const layerX = padding + layerIndex * horizontalSpacing;

      for (let neuronIndex = 0; neuronIndex < neuronCount; neuronIndex++) {
        const neuronY =
          neuronCount === 1
            ? padding + drawableHeight / 2 // Center if only one neuron
            : padding + neuronIndex * verticalSpacing;

        layerPositions.push({ x: layerX, y: neuronY });
        newNeurons.push({
          key: `n-${layerIndex}-${neuronIndex}`,
          cx: layerX,
          cy: neuronY,
        });
      }
      neuronPositions.push(layerPositions);
    });

    // connections between layers
    for (
      let layerIndex = 0;
      layerIndex < neuronPositions.length - 1;
      layerIndex++
    ) {
      const currentLayer = neuronPositions[layerIndex];
      const nextLayer = neuronPositions[layerIndex + 1];

      currentLayer.forEach((startNode, startIndex) => {
        nextLayer.forEach((endNode, endIndex) => {
          newConnections.push({
            key: `c-${layerIndex}-${startIndex}-${endIndex}`,
            x1: startNode.x,
            y1: startNode.y,
            x2: endNode.x,
            y2: endNode.y,
          });
        });
      });
    }

    return { neurons: newNeurons, connections: newConnections };
  }, [layerNeuronCounts, width, height]);

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className="connections">
        {connections.map((conn) => (
          <line
            key={conn.key}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke={connectionColor}
            strokeWidth={connectionStrokeWidth}
          />
        ))}
      </g>
      {/* Render neurons on top of connection lines */}
      <g className="neurons">
        {neurons.map((neuron) => (
          <circle
            key={neuron.key}
            cx={neuron.cx}
            cy={neuron.cy}
            r={neuronRadius}
            fill={neuronColor}
          />
        ))}
      </g>
    </svg>
  );
};
