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
type Geometry =
  | THREE.BoxGeometry
  | THREE.SphereGeometry
  | THREE.PlaneGeometry
  | THREE.TorusGeometry
  | THREE.BufferGeometry;

type Material = THREE.MeshNormalMaterial | THREE.MeshBasicMaterial;

const createMaterial = () => {
  return new THREE.MeshNormalMaterial();
  // return new THREE.MeshNormalMaterial({ wireframe: true }); // ワイヤーフレームを確認する場合
};

const createBasicMaterial = () => {
  // return new THREE.MeshBasicMaterial();
  return new THREE.MeshBasicMaterial({ wireframe: true }); // ワイヤーフレームを確認する場合
};

const doMesh = (geometry: Geometry, material: Material) => {
  return new THREE.Mesh(geometry, material);
};

// 立方体
const getBoxGeometry = (): void => {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const material = createMaterial(); // マテリアル
  const box = doMesh(boxGeometry, material); // メッシュ化
  // scene.add(box); // シーンに追加
};

// 球体
const getSphereGeometry = (): void => {
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
  const material = createMaterial(); // マテリアル
  const sphere = doMesh(sphereGeometry, material); // メッシュ化
  sphere.position.x = 1.5; // 重なってしまうので球体の位置を変更
  // scene.add(sphere); // シーンに追加
};

// 平面
const getPlaneGeometry = (): void => {
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const material = createMaterial(); // マテリアル
  const plane = doMesh(planeGeometry, material); // メッシュ化
  plane.rotation.x = -Math.PI * 0.5; // x軸に対して90度回転させて裏面ではなく表面が見えるようにする
  plane.position.y = -0.5; // 平面を縦に0.5だけ下げることで、BOXの底に平面が接地する
  // scene.add(plane); // シーンに追加
};

// ドーナツ型
const getTorusGeometry = (): void => {
  const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 15, 100, Math.PI * 2);
  const material = createMaterial(); // マテリアル
  const torus = doMesh(torusGeometry, material); // メッシュ化
  torus.position.x = -1.5;
  // scene.add(torus); // シーンに追加
};

// バッファジオメトリ（任意の図形を生成できる：今回は二等辺三角形）
const getBufferGeometry = () => {
  const bufferGeometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9); // 小数点の情報しか入らない配列に与えた引数が、所有する情報数になる

  // 頂点の情報を指定する
  positionArray[0] = 0; // 頂点A：X座標
  positionArray[1] = 0; // 頂点A：Y座標
  positionArray[2] = 0; // 頂点A：Z座標

  positionArray[3] = 0; // 頂点B：X座標
  positionArray[4] = 1; // 頂点B：Y座標
  positionArray[5] = 0; // 頂点B：Z座標

  positionArray[6] = 1; // 頂点C：X座標
  positionArray[7] = 0; // 頂点C：Y座標
  positionArray[8] = 0; // 頂点C：Z座標

  console.log(positionArray); // [0, 0, 0, 0, 1, 0, 1, 0, 0]

  const positionAttribute = new THREE.BufferAttribute(positionArray, 3); // １つの頂点に対して３つの座標が指定されている
  bufferGeometry.setAttribute("position", positionAttribute); // positionの属性をジオメトリに組み込む

  const material = createBasicMaterial(); // マテリアル（光源を必要としない）
  const buffer = doMesh(bufferGeometry, material); // メッシュ化
  scene.add(buffer); // シーンに追加
};

getBoxGeometry();
getSphereGeometry();
getPlaneGeometry();
getTorusGeometry();
getBufferGeometry();

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
