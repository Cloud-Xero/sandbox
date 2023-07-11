import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(20, 10);

const texLoader = new THREE.TextureLoader();
const texture1 = await texLoader.loadAsync("../landscape.avif");
const texture2 = await texLoader.loadAsync("../sand.avif");

const material = new THREE.MeshBasicMaterial({ map: texture1 });

setTimeout(() => {
  material.map = texture2;
}, 2000);

const plane = new THREE.Mesh(geometry, material);

scene.add(plane);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);

  plane.rotation.x += 0.01;
  plane.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
