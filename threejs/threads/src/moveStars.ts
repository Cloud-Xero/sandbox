import "./style.css";
import * as THREE from "three";

/**
 * ウィンドウサイズが変更された時に呼び出され、カメラとレンダラーを更新する
 * @param camera
 * @param renderer
 */
const onWindowResize = (camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) => {
  // カメラのアスペクト比（視野の幅と高さの比率）を、新しいウィンドウの幅と高さの比率に設定
  camera.aspect = window.innerWidth / window.innerHeight;

  // アスペクト比の変更を反映するために、カメラの投影行列（3D空間でのオブジェクトの位置を2D画面上の位置に変換するための行列）を更新する
  camera.updateProjectionMatrix();

  // レンダラー（描画領域）のサイズを、新しいウィンドウの幅と高さに設定
  renderer.setSize(window.innerWidth, window.innerHeight);
};

/**
 * 星の動きのアニメーションを制御
 * @param scene  // 描画するべき全てのオブジェクトを含むTHREE.Sceneインスタンス
 * @param camera  // ビューポートの視点を定義するTHREE.PerspectiveCamera インスタンス
 * @param renderer  // 3D シーンを 2D レンダリングに変換する THREE.Renderer インスタンス
 * @param starVelocities  // 星の速度を保持する配列
 * @param starAccelerations  // 星の加速度を保持する配列
 * @param stars  // 星の 3D ポイントを表現する THREE.Points インスタンス
 */
const animate = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.Renderer,
  starVelocities: number[],
  starAccelerations: number[],
  stars: THREE.Points
) => {
  // 各星の座標データを含む配列を取得
  const positions = stars.geometry.attributes.position.array;

  // 各星に対する処理
  for (let i = 0; i < 6000 * 3; i += 3) {
    // 星の速度に加速度を加えて、星の新しい速度を計算
    starVelocities[i / 3] += starAccelerations[i / 3];

    // 星のy座標から新しい速度を引くことで、星の新しい位置を計算
    positions[i + 1] -= starVelocities[i / 3];

    // 星が画面の下部（y座標が-200以下）に達した場合、星の位置を画面の上部（y座標200）に戻し、速度を0にリセットする
    if (positions[i + 1] < -200) {
      positions[i + 1] = 200;
      starVelocities[i / 3] = 0;
    }
  }

  // geometryの頂点データが変更されたことをThree.jsに伝え、次のレンダリングサイクルでGPUに新しいデータを送信するように指示（星の位置が更新されたため、フラグをtrueに）
  stars.geometry.attributes.position.needsUpdate = true;
  // 星のy軸周りの回転角度を徐々に増加させることで、星の群れ全体がゆっくりとy軸周りに回転するアニメーションが実現できる
  stars.rotation.y += 0.002;

  // シーンをカメラから見た視点でレンダリング（アニメーションループの各ステップで一度だけ呼び出され、画面に新しいフレームを描画）
  renderer.render(scene, camera);

  // 次のアニメーションフレームが描画されるようにブラウザにリクエストする（引数として次のフレームを描画するためのコールバック関数を受け取る）
  requestAnimationFrame(() => animate(scene, camera, renderer, starVelocities, starAccelerations, stars));
};

const init = () => {
  // シーン（レンダリングするためのオブジェクト、ライト、カメラなど全てを含むコンテナ）の作成
  const scene = new THREE.Scene();

  // カメラの作成：PerspectiveCamera(視野角が60度, アスペクト比が画面の幅と高さの比, 開始距離1で終了距離が1000の描画範囲)
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

  //  カメラの位置と回転の設定
  camera.position.z = 1; // z軸上に1単位移動
  camera.rotation.x = Math.PI / 2; // x軸周りに180度回転

  // WebGLを使用してレンダリングする新しいレンダラの作成
  const renderer = new THREE.WebGLRenderer();

  // レンダラの出力キャンバスのサイズをブラウザのウィンドウサイズに設定
  renderer.setSize(window.innerWidth, window.innerHeight);

  // レンダラが生成したキャンバス要素をHTMLのbody要素に追加
  document.body.appendChild(renderer.domElement);

  // 星の速度を格納する配列を作成し、初期値を0に設定
  const starVelocities: number[] = new Array(6000).fill(0);

  // 星の加速度を格納する配列を作成し、初期値を0.02に設定
  const starAccelerations: number[] = new Array(6000).fill(0.02);

  // 星の位置を格納するためのTypesArrayを作成（総数は、星の数6000 × 座標の数3）
  let positions = new Float32Array(6000 * 3); // 3 vertices per point

  // 各星の初期位置をランダムに設定
  for (let i = 0; i < 6000 * 3; i += 3) {
    positions[i] = Math.random() * 600 - 300;
    positions[i + 1] = Math.random() * 600 - 300;
    positions[i + 2] = Math.random() * 600 - 300;
  }

  // 効率的な描画のためのジオメトリデータを保持するBufferGeometryオブジェクトを作成
  let starGeo = new THREE.BufferGeometry();

  // BufferGeometryに新しいattribute（'position'）を設定（各星の位置情報を持つ）
  starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // TextureLoaderを使用してテクスチャを読み込む
  let sprite = new THREE.TextureLoader().load("/star.png");

  // THREE.PointsMaterialオブジェクトを生成（点=頂点を描画するためのマテリアルを定義）し、PointsMaterialは点の材質を定義するためのクラス
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite,
  });

  // Pointsオブジェクトを作成（星の集合=ポイントクラウドを表現）
  const stars = new THREE.Points(starGeo, starMaterial);

  // シーンに星の集合を追加
  scene.add(stars);

  window.addEventListener("resize", () => onWindowResize(camera, renderer), false);

  animate(scene, camera, renderer, starVelocities, starAccelerations, stars);
};

window.addEventListener("load", init);
