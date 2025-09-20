import { useMemo, useRef } from "react";

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="animate-spin relative w-24 h-24">
      <LoadingSpinnerSVG />
    </div>
  );
};

export const LoadingSpinnerSVG: React.FC<{ numBars?: number }> = ({
  numBars = 12,
}) => {
  const [spinnerBarsWhite, spinnerBarsBlue, spinnerBarsPink] = useMemo(() => {
    const angleStep = 360 / numBars;
    const barsWhite = [];
    const barsBlue = [];
    const barsPink = [];
    for (let i = 0; i < numBars; i++) {
      barsBlue.push(
        <rect
          key={i}
          className="fill-current text-electric-blue"
          x="47"
          y="10"
          width="6"
          height="20"
          rx="3"
          transform={`rotate(${i * angleStep}, 50, 50)`}
        />
      );
      barsPink.push(
        <rect
          key={i}
          className="fill-current text-hot-pink"
          x="47"
          y="10"
          width="6"
          height="20"
          rx="3"
          transform={`rotate(${i * angleStep}, 50, 50)`}
        />
      );
      barsWhite.push(
        <rect
          key={i}
          className="fill-current text-white"
          x="47"
          y="10"
          width="6"
          height="20"
          rx="3"
          transform={`rotate(${i * angleStep}, 50, 50)`}
        />
      );
    }
    return [barsWhite, barsBlue, barsPink];
  }, [numBars]);

  return (
    <>
      <svg
        className="absolute top-0 left-0 loader-svg w-24 h-24 animate-glitch-flicker-late"
        viewBox="0 0 100 100"
      >
        {spinnerBarsPink}
      </svg>
      <svg
        className="absolute top-0 left-0 loader-svg w-24 h-24 animate-glitch-flicker"
        viewBox="0 0 100 100"
      >
        {spinnerBarsBlue}
      </svg>
      <svg className="absolute   loader-svg w-24 h-24" viewBox="0 0 100 100">
        {spinnerBarsWhite}
      </svg>
    </>
  );
};
