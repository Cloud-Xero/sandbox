import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(7, 3, 200, 20);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const axis = new THREE.AxesHelper(20); // 引数は軸の長さ
scene.add(axis);

new OrbitControls(camera, renderer.domElement); // マウスで物体を動かせるようにする

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);

  // 回転
  // mesh.rotation.x += 0.01;  // mesh.rotateX(0.01)でも同様
  // mesh.rotation.y += 0.01;  // Y軸方向に回転

  // 平行移動
  mesh.position.x += 0.02;
  // mesh.position.set(10, 0, 0);
  // geometry.translate(0.01, 0.01, 0.01);

  // スケール
  mesh.scale.x = 1.1;
  // mesh.scale.x += 0.01;
  // geometry.scale(1.2, 1, 1);

  renderer.render(scene, camera);
}
animate();
