"use client";

import { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import "@babylonjs/loaders"; // Nếu sau này load mô hình GLTF

export default function BabylonScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 4,
      4,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    new HemisphericLight("light", new Vector3(1, 1, 0), scene);
    MeshBuilder.CreateBox("box", {}, scene);

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    return () => {
      engine.dispose();
      window.removeEventListener("resize", () => engine.resize());
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-[500px] rounded-xl border" />
  );
}
