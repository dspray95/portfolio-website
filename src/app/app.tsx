import { SocialIcon } from "components/SocialIcon";
import { Title } from "components/Title";
import { WasmRunner } from "components/WasmRunner";
import { useEffect, useState } from "react";
import { Ideograms } from "components/Ideograms";
import { EngineRenderer } from "../raw-js-canyon-game/Renderer";
import { LoadingIndicator } from "components/LoadingSpinner";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import { getToast } from "components/Toast";

function App() {
  const [wasmError, setWasmError] = useState<Error | null>(null);
  const [wasmStarted, setWasmStarted] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [spinnerTimerActive, setSpinnerTimerActive] = useState(true);

  const MIN_LOADING_TIME_MS = 1500;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (spinnerTimerActive) {
      timer = setTimeout(() => {
        setSpinnerTimerActive(false);
        if (wasmStarted || wasmError) {
          setShowSpinner(false);
        }
      }, MIN_LOADING_TIME_MS);
    } else {
      if (wasmStarted || wasmError) {
        setShowSpinner(false);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [wasmStarted, wasmError, spinnerTimerActive]);

  useEffect(() => {
    if (!spinnerTimerActive && (wasmStarted || wasmError)) {
      setShowSpinner(false);
    }
  }, [spinnerTimerActive, wasmStarted, wasmError]);

  useEffect(() => {
    if (showSpinner === false) {
      toast.custom((t) =>
        getToast(
          t,
          "Oof, WebAssembly isn't enabled in your browser. Enjoy a slightly different pure js experience."
        )
      );
    }
  }, [showSpinner]);

  return (
    <main>
      <Toaster position="bottom-center" />
      <div
        className={classNames(
          "fixed w-full h-full bg-space-blue z-20 transition-opacity duration-500 pointer-events-none",
          {
            "opacity-100": showSpinner,
            "opacity-0": !showSpinner,
          }
        )}
      ></div>
      <div className="fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        {showSpinner && <LoadingIndicator />}
      </div>
      {!wasmError && (
        <WasmRunner
          setWasmError={setWasmError}
          setWasmStarted={setWasmStarted}
          wasmStarted={wasmStarted}
        />
      )}
      {wasmError && <EngineRenderer /> /** Fallback to old pure js renderer */}
      <div
        id="centerpiece"
        className="relative w-full min-h-svh flex flex-col items-center text-white text-4xl z-30 pointer-events-none"
      >
        <Title />
        <div className="flex items-center justify-center w-full gap-12 pointer-events-auto">
          <SocialIcon type="linkedin" />
          <SocialIcon type="github" />
        </div>
        <Ideograms />
      </div>
    </main>
  );
}

export default App;
