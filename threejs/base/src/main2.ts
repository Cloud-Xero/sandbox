import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf3f3f3);
document.body.appendChild(renderer.domElement);

const POS_RANGE = 100;
const MAX_SCALE = 1.5;

// ランダムな値を生成する関数(範囲を引数)
const mapRand = (min: number, max: number, isInt = false) => {
  const rand = Math.random() * (max - min) + min;
  return isInt ? Math.round(rand) : rand;
};

// ランダムにメッシュを生成する関数
const randomMesh = () => {
  const geometries = [
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.PlaneGeometry(20, 20),
    new THREE.TorusGeometry(10, 3, 200, 20),
  ];

  const color = new THREE.Color(mapRand(0.7, 1), mapRand(0.7, 1), mapRand(0.7, 1));
  const pos = {
    x: mapRand(-POS_RANGE, POS_RANGE),
    y: mapRand(-POS_RANGE, POS_RANGE),
    z: mapRand(-POS_RANGE, POS_RANGE),
  };
  const material = new THREE.MeshBasicMaterial({ color });
  const gIndex = mapRand(0, geometries.length - 1, true);

  const mesh = new THREE.Mesh(geometries[gIndex], material);
  mesh.position.set(pos.x, pos.y, pos.z);

  const scale = mapRand(1, MAX_SCALE);
  mesh.geometry.scale(scale, scale, scale);

  return mesh;
};

const meshes = [...new Array(50)].map(() => {
  return randomMesh();
});
scene.add(...meshes);

const axis = new THREE.AxesHelper(20); // 引数は軸の長さ
scene.add(axis);

new OrbitControls(camera, renderer.domElement); // マウスで物体を動かせるようにする

camera.position.z = 50;

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
