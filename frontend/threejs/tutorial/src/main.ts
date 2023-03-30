import * as THREE from "three";

let scene, camera;

// シーンの追加
scene = new THREE.Scene();

// カメラの追加：PerspectiveCamera(視野角, アスペクト比, 開始距離, 終了距離)
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
