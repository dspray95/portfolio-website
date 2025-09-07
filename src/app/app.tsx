import { SocialIcon } from "components/SocialIcon";
import { Title } from "components/Title";
import { WasmRunner } from "components/WasmRunner";
import { useState } from "react";
import { Ideograms } from "components/Ideograms";
import { EngineRenderer } from "../raw-js-canyon-game/Renderer";

function App() {
  const [wasmError, setWasmError] = useState<Error | null>(null);

  return (
    <main>
      <WasmRunner setWasmError={setWasmError} />
      {wasmError && <EngineRenderer />}
      <div
        id="centerpiece"
        className="relative w-full min-h-svh flex flex-col items-center text-white text-4xl z-10"
      >
        <Title />
        <div className="flex items-center justify-center w-full gap-12">
          <SocialIcon type="linkedin" />
          <SocialIcon type="github" />
        </div>
        <Ideograms />
      </div>
    </main>
  );
}

export default App;
