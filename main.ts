import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// Lowering the pixel ratio slightly can also save significant power
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Using MeshBasicMaterial: No lights needed, very low CPU overhead
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const main = new THREE.Mesh(geometry, material);
scene.add(main);

// OrbitControls allow mouse interaction
const controls = new OrbitControls(camera, renderer.domElement);

// --- THE CPU SAVER ---
// Only render when the camera moves (user drags mouse)
controls.addEventListener('change', render);

function render() {
  renderer.render(scene, camera);
  console.log('Rendered a frame!'); // You'll see this only when moving
}

// Initial render
render();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
});