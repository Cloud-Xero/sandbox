import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(7, 3, 200, 20);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

new OrbitControls(camera, renderer.domElement);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
