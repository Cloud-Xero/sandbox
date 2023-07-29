import "./style.css";
import * as THREE from "three";
import WebGPU from "three/addons/capabilities/WebGPU.js";
import WebGPURenderer from "three/addons/renderers/webgpu/WebGPURenderer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// let controls;

/**
 * ウィンドウサイズが変更された時に呼び出され、カメラとレンダラーを更新する
 * @param camera
 * @param renderer
 */
const onWindowResize = (camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) => {
  // カメラのアスペクト比（視野の幅と高さの比率）を、新しいウィンドウの幅と高さの比率に設定
  camera.aspect = window.innerWidth / window.innerHeight;

  // アスペクト比の変更を反映するために、カメラの投影行列（3D空間でのオブジェクトの位置を2D画面上の位置に変換するための行列）を更新する
  camera.updateProjectionMatrix();

  // レンダラー（描画領域）のサイズを、新しいウィンドウの幅と高さに設定
  renderer.setSize(window.innerWidth, window.innerHeight);
};

/**
 * 星の動きのアニメーションを制御
 * @param scene  // 描画するべき全てのオブジェクトを含むTHREE.Sceneインスタンス
 * @param camera  // ビューポートの視点を定義するTHREE.PerspectiveCamera インスタンス
 * @param renderer  // 3D シーンを 2D レンダリングに変換する THREE.Renderer インスタンス
 */
const animate = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.Renderer,
  light1: THREE.PointLight,
  light2: THREE.PointLight,
  light3: THREE.PointLight,
  controls: OrbitControls
) => {
  controls.update();
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
};

const addLight = (scene: THREE.Scene, hexColor: number, intensity = 2, distance = 1) => {
  const sphereGeometry = new THREE.SphereGeometry(0.02, 16, 8);
  const material = new THREE.MeshStandardMaterial({ color: hexColor });
  const mesh = new THREE.Mesh(sphereGeometry, material);
  const light = new THREE.PointLight(hexColor, intensity, distance);
  light.add(mesh);
  scene.add(light);

  return light;
};

const init = () => {
  if (!WebGPU.isAvailable()) {
    document.body.appendChild(WebGPU.getErrorMessage());

    throw new Error("No WebGPU support");
  }

  // シーン（レンダリングするためのオブジェクト、ライト、カメラなど全てを含むコンテナ）の作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  // カメラの作成：PerspectiveCamera(視野角が60度, アスペクト比が画面の幅と高さの比, 開始距離0.1で終了距離が10の描画範囲)
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);

  //  カメラの位置と回転の設定
  camera.position.z = 2; // z軸上に2単位移動

  const light1 = addLight(scene, 0xffaa00);
  const light2 = addLight(scene, 0x0040ff);
  const light3 = addLight(scene, 0x80ff80);

  // const allLightsNode = lights([light1, light2, light3]);

  const points: THREE.Vector3[] = [];
  [...new Array(3000)].map(() => {
    const point = new THREE.Vector3().random().subScalar(0.5).multiplyScalar(2);
    points.push(point);
  });

  const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
  const materialPoints = new THREE.PointsMaterial({ color: 0xffffff });
  // const materialPoints = new PointsNodeMaterial({ color: 0xffffff });

  // const customLightingModel = tslFn(({ lightColor, reflectedLight }) => {
  //   reflectedLight.directDiffuse.addAssign(lightColor);
  // });

  // const lightingModelContext = allLightsNode.context({ lightingModelNode: { direct: customLightingModel } });

  // const customLightingModel = new LightingModel();
  // const lightingModelContext = allLightsNode.context({ LightingModel: customLightingModel });

  // materialPoints.lightsNode = lightingModelContext;

  const pointCloud = new THREE.Points(geometryPoints, materialPoints);
  scene.add(pointCloud);

  const renderer = new WebGPURenderer();

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 0;
  // controls.maxDistance = 4;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(() => animate(scene, camera, renderer, light1, light2, light3, controls));
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", () => onWindowResize(camera, renderer), false);

  animate(scene, camera, renderer, light1, light2, light3, controls);
};

window.addEventListener("load", init);
