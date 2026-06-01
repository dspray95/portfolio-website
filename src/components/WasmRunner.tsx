import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import wasmModuleUrl from "../wasm-canyon-game/wasm_game_engine_bg.wasm?url";
import initWasm, {
  start as startWasmGameEngine,
} from "../wasm-canyon-game/wasm_game_engine";
import { fetchHighScores, submitHighScore } from "../lib/highScores";

declare global {
  interface Window {
    fetchHighScores?: (maxEntries: number) => Promise<string>;
    submitHighScore?: (initials: string, score: number) => Promise<unknown>;
    onGameStart?: () => void;
  }
}

export const WasmRunner: React.FC<{
  setWasmError: Dispatch<SetStateAction<Error | null>>;
  wasmStarted: boolean;
  setWasmStarted: Dispatch<SetStateAction<boolean>>;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
}> = ({ setWasmError, wasmStarted, setWasmStarted, setGameStarted }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [wasmInitialized, setWasmInitialized] = useState(false);

  // Init wasm once on component mount
  useEffect(() => {
    const initializWasm = async () => {
      try {
        await initWasm({ module_or_path: wasmModuleUrl });
        setWasmInitialized(true);
      } catch (e) {
        setWasmError(e as Error);
      }
    };

    initializWasm();
  }, []);

  useEffect(() => {
    if (!wasmInitialized || wasmStarted) {
      return;
    }

    const startWasmEngine = async () => {
      if (!canvasRef.current) {
        return;
      }

      try {
        window.fetchHighScores = fetchHighScores;
        window.submitHighScore = submitHighScore;
        window.onGameStart = () => setGameStarted(true);

        startWasmGameEngine();
        setWasmStarted(true);
      } catch (e) {
        setWasmError(e as Error);
      }
    };

    startWasmEngine();
  }, [wasmInitialized, wasmStarted, canvasRef.current]);

  return (
    <canvas
      id="wgpu-canvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};
