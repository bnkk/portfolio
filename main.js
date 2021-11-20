// add imports
import "./style.css";
import * as THREE from "three";
import { throttle } from "lodash-es";
// create adjustment for window resize

// create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true
});

// enable shadow map and set type
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// set screen size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// set background to dark blue
scene.background = new THREE.Color(0x030e2f);

// create cube and enable shadows
const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 10);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0x0a39bc
});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.castShadow = true;
cube.receiveShadow = false;
cube.cursor = "pointer";
scene.add(cube);

// create floor and receives shadows
const planeGeometry = new THREE.PlaneGeometry(300, 300);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x0a39bc,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.castShadow = false;
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.set(1.57, 0, 0);
plane.position.set(0, -10, 0);

// create dim ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// create spotlight and point at the cube
const light = new THREE.SpotLight(0xffffff, 1, 100, 90);
light.position.set(30, 20, 0);
light.target = cube;
light.castShadow = true;
scene.add(light);

// set high shadow map size for the spotlight
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

// when window is resized, change renderer size and camera fov
window.addEventListener(
  "resize",
  throttle(
    () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    },
    { trailing: true }
  )
);

let targetList = [cube];

const interval = setInterval(function () {
  let text = document.getElementById('footer-text');
  text.outerHTML = '<p id="footer-text" style="animation: bounce 1s forwards;">Click the cube to continue!</p>';
  setTimeout(() => {
    document.getElementById("footer-text").removeAttribute('style')
  }, 1000)
}, 5000); 

document.addEventListener("mousedown", documentOnMouseDown);
document.addEventListener("mousemove", documentOnMouseMove);

// when cube is clicked, execute function 'clicker'
function documentOnMouseDown(event) {
  console.log("click heard");
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  console.log("raycaster set");
  var intersects = raycaster.intersectObjects(targetList);

  if (intersects.length > 0) {
    console.log("clicker called");
    clicker(intersects[0].object);
  }
}

// when mouse is over cube, change cursor to pointer **BROKEN**
function documentOnMouseMove(event) {
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(targetList);

  if (intersects.length > 0) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "default";
  }
}

function clicker(obj) {
  targetList = [];
  clearInterval(interval);
  document.getElementById("title").style.animation = "fadeOutLeft 1s forwards";
  document.getElementById("subtitle").style.animation =
    "fadeOutLeft 1s forwards 0.3s";
  document.getElementById("subtitle").style.animationFillMode = "backwards";
  document.getElementById("bg").style.animation =
    "fadeOut 1s forwards 1s 1 normal";
  document.getElementById("bg").style.animationFillMode = "backwards";
  document.getElementById("footer").style.animation = "fadeOut 1s forwards";
  document.getElementById("footer").style.animationFillMode = "backwards";

  document.getElementById("secondPage").style.animation =
    "fadeIn 1s forwards 3s";

  changePage();
}

function empty(elem) {
  while (elem.lastChild) elem.removeChild(elem.lastChild);
}

function changePage() {
  let div = document.querySelector('#secondPage');
  const Section = document.createElement("section");
  const Header = document.createElement("h1");
  const HeaderText = document.createTextNode('About Me');

  Header.appendChild(HeaderText);
  Section.appendChild(Header);

  div.appendChild(Section);
}

// run animations infinitely
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.003;
  cube.rotation.y += 0.003;
  cube.rotation.z += 0.003;
  
  camera.position.set(27, 7, -5);
  camera.rotation.set(179.6, 0.9, 90.7);

  renderer.render(scene, camera);
}

animate();
