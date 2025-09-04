import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Title } from "./components/Title";
import { Icons } from "./components/Icons";
import { EngineRenderer } from "./raw-js-canyon-game/Renderer";
import { IdeogramContainer } from "./components/Ideograms";
import initWasm, { start } from "./wasm-canyon-game/wasm_game_engine.js";

function App() {
  const canvasRef = useRef(null);
  const [wasmInitialized, setWasmInitialized] = useState(false);
  const [wasmStarted, setWasmStarted] = useState(false);
  const [wasmError, setWasmError] = useState(null);

  useEffect(() => {
    const initializeWasm = async () => {
      try {
        console.log("Calling initWasm...");
        await initWasm();
        console.log("WASM module initialized.");
        setWasmInitialized(true);
      } catch (e) {
        console.error("Error during WASM initialization:", e);
        setWasmError(e);
      }
    };

    initializeWasm();
  }, []); // runs once on mount

  useEffect(() => {
    if (!wasmInitialized || wasmStarted) {
      return;
    }

    const startWasmGame = async () => {
      if (!canvasRef.current) {
        console.warn("Canvas ref is still null, delaying WASM game start.");
        return;
      }

      try {
        console.log("Calling WASM start with canvas ID:", canvasRef.current.id);

        start(canvasRef.current.id);

        console.log("WASM game engine started.");
        setWasmStarted(true);
      } catch (e) {
        console.error("Error during WASM game start:", e);
        setWasmError(e);
      }
    };

    startWasmGame();
  }, [wasmInitialized, wasmStarted, canvasRef.current]);

  if (!wasmInitialized) {
    return (
      <div className="App">
        <p>Initializing game engine resources...</p>
      </div>
    );
  }

  if (!wasmStarted) {
    return (
      <div className="App">
        <p>Starting game engine...</p>
        <canvas id="wgpu-canvas" ref={canvasRef}></canvas>{" "}
        {/* Render canvas here too */}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="wrapper">
        <canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
          id="wgpu-canvas"
          ref={canvasRef}
        />
        {wasmError && <EngineRenderer />}
        <div
          id="centrepiece"
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
          }}
        >
          <Title />
          <Icons />
        </div>
        <IdeogramContainer />
      </div>
    </div>
  );
}

export default App;
