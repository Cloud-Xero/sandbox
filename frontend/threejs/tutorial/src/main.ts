import * as THREE from "three";
import './tailwind.css'

let scene, camera, renderer;

// シーンの追加
scene = new THREE.Scene();

// カメラの追加：PerspectiveCamera(視野角, アスペクト比, 開始距離, 終了距離)
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

// レンダラーの追加
renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);  // body要素内に表示
renderer.setSize(window.innerWidth, window.innerHeight);  // 画面いっぱいに表示
renderer.render(scene, camera);
