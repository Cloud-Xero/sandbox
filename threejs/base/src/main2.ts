import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry1 = new THREE.BoxGeometry(10, 10, 10);
const geometry2 = new THREE.PlaneGeometry(20, 20);
const geometry3 = new THREE.TorusGeometry(10, 3, 200, 20);

const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material2 = material1.clone();
material2.color = new THREE.Color(0x00ff00);
const material3 = material1.clone();
material3.color = new THREE.Color(0x0000ff);

const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.x -= 25;
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x += 25;
const mesh3 = new THREE.Mesh(geometry3, material3);
scene.add(mesh1, mesh2, mesh3);

const axis = new THREE.AxesHelper(20); // 引数は軸の長さ
scene.add(axis);

new OrbitControls(camera, renderer.domElement); // マウスで物体を動かせるようにする

camera.position.z = 50;

function animate() {
  requestAnimationFrame(animate);

  // 回転
  mesh1.rotation.x += 0.01;
  mesh1.rotation.y += 0.01;
  mesh2.rotation.z += 0.01;
  mesh3.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
