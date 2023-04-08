import * as THREE from "three";
import "./tailwind.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const animate = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(() => animate(renderer, scene, camera));
};

//ブラウザのリサイズに対応
const onWindowResize = (
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

/**
 * 初期化
 */
const init = () => {
  //シーン
  const scene = new THREE.Scene();

  //カメラ
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  //レンダラー
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  /**
   * マテリアルセクション
   */
  // 各ジオメトリ
  const SphereGeometry = new THREE.SphereGeometry(0.5, 16, 16); // SphereGeometry(半径, セグメント, セグメント)
  const planeGeometry = new THREE.PlaneGeometry(1, 1); // 平面：PlaneGeometry(縦, 横)
  const octahedronGeometry = new THREE.OctahedronGeometry(0.5);

  // マテリアル
  const material = new THREE.MeshBasicMaterial();

  // メッシュ化
  const sphere = new THREE.Mesh(SphereGeometry, material);
  const plane = new THREE.Mesh(planeGeometry, material);
  const octahedron = new THREE.Mesh(octahedronGeometry, material);

  // 位置調整
  sphere.position.x = -1.5;
  octahedron.position.x = 1.5;

  scene.add(sphere, plane, octahedron);

  //マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", () => onWindowResize(renderer, camera));

  animate(renderer, scene, camera);
};

window.addEventListener("load", init);
