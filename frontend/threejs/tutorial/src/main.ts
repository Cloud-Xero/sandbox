import * as THREE from "three";
import "./tailwind.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, pointLight: THREE.PointLight, controls;

// シーンの追加
scene = new THREE.Scene();

// カメラの追加：PerspectiveCamera(視野角, アスペクト比, 開始距離, 終了距離)
camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, +500); // z軸だけに+500動かす

// レンダラーの追加
renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha は透明度（デフォルトではfalseなので、透明度を上げることで背景画像が表示される）
document.body.appendChild(renderer.domElement); // body要素内に表示
renderer.setSize(window.innerWidth, window.innerHeight); // 画面いっぱいに表示
renderer.setPixelRatio(window.devicePixelRatio); // 画像の解像度をデバイスに合わせる
renderer.render(scene, camera);

// テクスチャの追加（オブジェクトに画像をペースト）
let textures = new THREE.TextureLoader().load("./earth.jpg");

// ジオメトリ（３Dオブジェクト：地球の元となる球体）の作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32); // SphereGeometry(半径, wideセグメント, heightセグメント)

// マテリアル（材質）の作成
let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures }); // MeshPhysicalMaterial は光源を必要とするマテリアル

// メッシュ化
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

// シーンに追加
scene.add(ballMesh);

// 平行光源を追加
let directionalLight = new THREE.DirectionalLight(0xffffff, 2); // DirectionalLight(色, 光源の強さ)
directionalLight.position.set(1, 1, 1); // 真上からではなく、x=1, y=1, z=1 の位置から光を当てる
scene.add(directionalLight);

// ポイント光源の追加
pointLight = new THREE.PointLight(0xffffff, 2); // PointLight(色, 光源の強さ)
pointLight.position.set(-200, -200, -200);
scene.add(pointLight);

// ポイント光源の場所を特定する
let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
scene.add(pointLightHelper);

// マウス操作を可能にする（拡大・縮小も可能）
controls = new OrbitControls(camera, renderer.domElement); // OrbitControls(カメラ, DOMエレメント)

// ポイント光源をオブジェクトの周りを巡回させる
const animate = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
) => {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  // レンダリング
  renderer.render(scene, camera); // camera のポジションを変更しないと画面上に表示されない
  requestAnimationFrame(() => animate(renderer, scene, camera));
};

animate(renderer, scene, camera);
