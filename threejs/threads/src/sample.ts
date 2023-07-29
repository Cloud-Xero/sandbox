import * as THREE from "three";
import { color, MeshStandardNodeMaterial, PointsNodeMaterial, toneMapping } from "three/nodes";
import { lights } from "three/examples/jsm/nodes/lighting/LightsNode.js";
import LightingModel from "three/examples/jsm/nodes/core/LightingModel.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import WebGPU from "three/addons/capabilities/WebGPU.js";
import WebGPURenderer from "three/addons/renderers/webgpu/WebGPURenderer.js";

class CustomLightingModel extends LightingModel {
  direct({ lightColor, reflectedLight }: { lightColor: THREE.Color; reflectedLight: any }) {
    reflectedLight.directDiffuse.addAssign(lightColor);
  }
}

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: InstanceType<typeof WebGPURenderer>;

let light1: THREE.PointLight, light2: THREE.PointLight, light3: THREE.PointLight;

init();

function init() {
  if (WebGPU.isAvailable() === false) {
    document.body.appendChild(WebGPU.getErrorMessage());

    throw new Error("No WebGPU support");
  }

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
  camera.position.z = 2;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  const sphereGeometry = new THREE.SphereGeometry(0.02, 16, 8);

  const addLight = (hexColor: number, intensity = 2, distance = 1) => {
    const material = new MeshStandardNodeMaterial();

    material.colorNode = color(hexColor);
    material.lightsNode = lights(); // ShaderNodeElements.d.tsのlightsの引数をオプショナルにする

    const mesh = new THREE.Mesh(sphereGeometry, material);

    const light = new THREE.PointLight(hexColor, intensity, distance);
    light.add(mesh);

    scene.add(light);

    return light;
  };

  light1 = addLight(0xffaa00);
  light2 = addLight(0x0040ff);
  light3 = addLight(0x80ff80);

  const allLightsNode = lights([light1, light2, light3]);

  const points = [];

  for (let i = 0; i < 3000; i++) {
    const point = new THREE.Vector3().random().subScalar(0.5).multiplyScalar(2);
    points.push(point);
  }

  const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
  const materialPoints = new PointsNodeMaterial();

  const lightingModel = new CustomLightingModel();
  const lightingModelContext = allLightsNode.context({ lightingModel });

  // materialPoints.lights = lightingModelContext;
  materialPoints.lightNode = lightingModelContext;

  const pointCloud = new THREE.Points(geometryPoints, materialPoints);
  scene.add(pointCloud);

  renderer = new WebGPURenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  renderer.toneMappingNode = toneMapping(THREE.LinearToneMapping, 1);
  // renderer.toneMapping = THREE.LinearToneMapping;
  // renderer.toneMappingExposure = 1;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 0;
  controls.maxDistance = 4;

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  const time = Date.now() * 0.0005;
  const scale = 0.5;

  light1.position.x = Math.sin(time * 0.7) * scale;
  light1.position.y = Math.cos(time * 0.5) * scale;
  light1.position.z = Math.cos(time * 0.3) * scale;

  light2.position.x = Math.cos(time * 0.3) * scale;
  light2.position.y = Math.sin(time * 0.5) * scale;
  light2.position.z = Math.sin(time * 0.7) * scale;

  light3.position.x = Math.sin(time * 0.7) * scale;
  light3.position.y = Math.cos(time * 0.3) * scale;
  light3.position.z = Math.sin(time * 0.5) * scale;

  renderer.render(scene, camera);
}
