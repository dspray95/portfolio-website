import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import wasmModuleUrl from "../wasm-canyon-game/wasm_game_engine_bg.wasm?url";
import initWasm, {
  start as startWasmGameEngine,
} from "../wasm-canyon-game/wasm_game_engine";

export const WasmRunner: React.FC<{
  setWasmError: Dispatch<SetStateAction<Error | null>>;
}> = ({ setWasmError }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [wasmInitialized, setWasmInitialized] = useState(false);
  const [wasmStarted, setWasmStarted] = useState(false);

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
