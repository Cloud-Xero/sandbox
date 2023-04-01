import * as THREE from "three";
import "./tailwind.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//シーン
const scene = new THREE.Scene();

// カメラ
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
 * ジオメトリの作成
 **/
type Geometry = THREE.BoxGeometry | THREE.SphereGeometry | THREE.PlaneGeometry;

const createMaterial = () => {
  return new THREE.MeshNormalMaterial();
  // return new THREE.MeshNormalMaterial({ wireframe: true }); // ワイヤーフレームを確認する場合
};

const doMesh = (geometry: Geometry, material: THREE.MeshNormalMaterial) => {
  return new THREE.Mesh(geometry, material);
};

// 立方体
const getBoxGeometry = (): void => {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const material = createMaterial(); // マテリアル
  const box = doMesh(boxGeometry, material); // メッシュ化
  scene.add(box); // シーンに追加
};

// 球体
const getSphereGeometry = (): void => {
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
  const material = createMaterial(); // マテリアル
  const sphere = doMesh(sphereGeometry, material); // メッシュ化
  sphere.position.x = 1.5; // 重なってしまうので球体の位置を変更
  scene.add(sphere); // シーンに追加
};

// 平面
const getPlaneGeometry = (): void => {
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const material = createMaterial(); // マテリアル
  const plane = doMesh(planeGeometry, material); // メッシュ化
  plane.rotation.x = -Math.PI * 0.5; // x軸に対して90度回転させて裏面ではなく表面が見えるようにする
  plane.position.y = -0.5; // 平面を縦に0.5だけ下げることで、BOXの底に平面が接地する
  scene.add(plane); // シーンに追加
};

getBoxGeometry();
getSphereGeometry();
getPlaneGeometry();

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);

  //オブジェクトの回転
  // sphere.rotation.x = elapsedTime;
  // plane.rotation.x = elapsedTime;
  // octahedron.rotation.x = elapsedTime;
  // torus.rotation.x = elapsedTime;

  // sphere.rotation.y = elapsedTime;
  // plane.rotation.y = elapsedTime;
  // octahedron.rotation.y = elapsedTime;

  // torus.rotation.y = elapsedTime;

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

animate();
