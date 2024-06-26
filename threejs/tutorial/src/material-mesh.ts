import * as THREE from "three";
import "./tailwind.css";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Material = THREE.MeshBasicMaterial | THREE.MeshNormalMaterial;

type Figures = {
  sphere: THREE.Mesh<THREE.SphereGeometry, Material>;
  plane: THREE.Mesh<THREE.PlaneGeometry, Material>;
  octahedron: THREE.Mesh<THREE.OctahedronGeometry, Material>;
};

// animate関数の外部でインスタンス化を行う（animate関数が再帰的にう呼び出されるため）
const clock = new THREE.Clock();

const animate = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  figures: Figures
) => {
  const { sphere, plane, octahedron } = figures;

  const elapsedTime = clock.getElapsedTime(); // animate関数が呼ばれてからどれくらい時間が経過したかを計測
  // console.log(elapsedTime);

  // オブジェクトを回転
  sphere.rotation.x = elapsedTime;
  plane.rotation.x = elapsedTime;
  octahedron.rotation.x = elapsedTime;
  sphere.rotation.y = elapsedTime;
  plane.rotation.y = elapsedTime;
  octahedron.rotation.y = elapsedTime;

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(() => animate(renderer, scene, camera, figures));
};

//ブラウザのリサイズに対応
const onWindowResize = (
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

/**
 * 初期化
 */
const init = () => {
  //シーン
  const scene = new THREE.Scene();

  //カメラ
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
   * マテリアルセクション
   */
  // 各ジオメトリ
  const SphereGeometry = new THREE.SphereGeometry(0.5, 16, 16); // SphereGeometry(半径, セグメント, セグメント)
  const planeGeometry = new THREE.PlaneGeometry(1, 1); // 平面：PlaneGeometry(縦, 横)
  const octahedronGeometry = new THREE.OctahedronGeometry(0.5);

  // テキスチャ
  // const texture = new THREE.TextureLoader().load("./textures/brick.jpg"); // ファイルは public 内に置くこと

  // マテリアル

  // MeshBasicMaterial（光源を必要とするマテリアル）
  // const material = new THREE.MeshBasicMaterial();
  // material.map = texture;
  // material.color.set("red");
  // material.wireframe = true;  // ワイヤーフレームが表示される
  // material.side = THREE.DoubleSide; // 裏側にも適用される
  // material.opacity = 0.5;
  // material.transparent = true; // opacityとtransparentで透過させることができる

  // MeshNormalMaterial（光源を必要としないマテリアル）
  // const material = new THREE.MeshNormalMaterial();
  // material.flatShading = true; // 平坦を表現できる

  // MeshStandardMaterial（光と影を要する = 物理の法則に従っている）
  // const material = new THREE.MeshStandardMaterial();
  // material.color.set("#049ef4");
  // material.roughness = 0.14; // 光沢を表現（値が小さいほど粗さが少なくなり輝く）
  // material.metalness = 0.44; // 反射を表現

  // MeshPhongMaterial（反射の光を表現する）
  const material = new THREE.MeshPhongMaterial();
  material.shininess = 100;
  material.specular = new THREE.Color("red");

  // 明かりを追加
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 0.3);
  pointLight.position.set(1, 2, 3);
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add(pointLightHelper);

  // メッシュ化
  const sphere = new THREE.Mesh(SphereGeometry, material);
  const plane = new THREE.Mesh(planeGeometry, material);
  const octahedron = new THREE.Mesh(octahedronGeometry, material);

  const figures = {
    sphere,
    plane,
    octahedron,
  };

  // 位置調整
  sphere.position.x = -1.5;
  octahedron.position.x = 1.5;

  scene.add(sphere, plane, octahedron);

  //マウス操作
  // const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", () => onWindowResize(renderer, camera));

  animate(renderer, scene, camera, figures);
};

window.addEventListener("load", init);
