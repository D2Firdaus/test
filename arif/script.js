//Import Three.js and loaders
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a scene
const scene = new THREE.Scene();

//Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

//Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

//Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

//OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//GLTF Loader
const loader = new GLTFLoader();

//Path ke model domba
loader.load(
  './eye/scene.gltf',
  function (gltf) {
    const object = gltf.scene;
    object.scale.set(1, 1, 1);  // bisa kamu sesuaikan kalau model terlalu besar/kecil
    scene.add(object);
    console.log('Model domba berhasil dimuat');
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100).toFixed(2) + '% loaded');
  },
  function (error) {
    console.error('Error loading model domba:', error);
  }
);

//Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
