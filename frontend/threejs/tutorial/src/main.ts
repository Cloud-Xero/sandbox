import * as THREE from "three";
import "./tailwind.css";

let scene, camera, renderer;

// シーンの追加
scene = new THREE.Scene();

// カメラの追加：PerspectiveCamera(視野角, アスペクト比, 開始距離, 終了距離)
camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// レンダラーの追加
renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha は透明度（デフォルトではfalseなので、透明度を上げることで背景画像が表示される）
document.body.appendChild(renderer.domElement); // body要素内に表示
renderer.setSize(window.innerWidth, window.innerHeight); // 画面いっぱいに表示
renderer.render(scene, camera);

// ジオメトリ（３Dオブジェクト：地球の元となる球体）の作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32); // SphereGeometry(半径, wideセグメント, heightセグメント)

// マテリアル（材質）の作成
let ballMaterial = new THREE.MeshPhysicalMaterial(); // MeshPhysicalMaterial は光源を必要とするマテリアル

// メッシュ化
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

// シーンに追加
scene.add(ballMesh);
