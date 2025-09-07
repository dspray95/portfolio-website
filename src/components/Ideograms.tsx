import { FretboardSVG } from "./svg/FretboardSVG";
import { MorseSVG } from "./svg/MorseSVG";
import { MountainRangeSVG } from "./svg/MountainRangeSVG";
import { NeuralNetSVG } from "./svg/NeuralNetSVG";

export const Ideograms: React.FC = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0">
        <MorseSVG
          ditDahList=".... .. .-. . / -- ." //hire me!
          width={300}
          height={800}
          stroke="white"
          strokeWidth={1.5}
        />
      </div>
      <div className="fixed top-0 left-0">
        <NeuralNetSVG
          layerNeuronCounts={[4, 6, 6, 3]}
          canvasWidth={300}
          canvasHeight={200}
          neuronRadius={5}
        />
      </div>
      <div className="fixed top-0 right-[5%]">
        <FretboardSVG
          width={300}
          height={50}
          fretCount={5}
          fretMarkers={[2, 4]}
        />
      </div>
      <div className="fixed right-0 bottom-[10%]">
        <MountainRangeSVG
          width={200}
          height={50}
          nPeaks={12}
          slopeDistance={30}
          peakHeight={50}
          alignment="right"
        />
      </div>
      <div className="fixed right-0 bottom-[15%]">
        <MountainRangeSVG
          width={225}
          height={50}
          nPeaks={14}
          slopeDistance={30}
          peakHeight={50}
          alignment="right"
        />
      </div>
    </>
  );
};
