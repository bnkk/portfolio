// add imports
import "./style.css";
import * as THREE from "three";
import { throttle } from "lodash-es";
// create adjustment for window resize
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

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

//renderer.render(scene, camera);

/*const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.castShadow = true;
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper)

ambientLight.shadow.mapSize.width = 512;
ambientLight.shadow.mapSize.height = 512;
ambientLight.shadow.camera.near = 0.5;
ambientLight.shadow.camera.far = 500;
*/

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

/*
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
};

Array(200).fill().forEach(addStar)
*/
//const controls = new OrbitControls(camera,renderer.domElement);

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

//const lightHelper = new THREE.SpotLightHelper(light)
//const gridHelper = new THREE.GridHelper(200, 50)
//scene.add(lightHelper)

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
      //setCanvasDimensions(renderer.domElement, width, height);
    },
    { trailing: true }
  )
);
/*
document.addEventListener("mousedown", onDocumentMouseDown, false);
var projector = new THREE.Projector();
function onDocumentMouseDown(event) {
  event.preventDefault();
  var vector = new THREE.Vector3(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  );
  projector.unprojectVector(vector, camera);
  var ray = new THREE.Ray(
    camera.position,
    vector.subSelf(camera.position).normalize()
  );
  var intersects = ray.intersectsObjects(cube);

  if (intersects.length > 0) {
  }
}
*/

let targetList = [cube];

/*
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
*/

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
/*
  setTimeout(() => {
    renderer.domElement.addEventListener('dblclick', null, false);
    scene = null;
    camera = null;
    empty(this.modelContainer);
  }, 500); */


  /*let div = document.querySelector('#secondPage');
  const newSection = document.createElement("section");
  const newHeader = document.createElement("h1");
  const newContent = document.createTextNode("test");

  newHeader.appendChild(newContent);
  newSection.appendChild(newHeader);

  div.appendChild(newSection);
  */

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

  //controls.update();

  //document.getElementById("footer-text").style.animation =
  //  "bounce 1s forwards 15s";
  renderer.render(scene, camera);
}

animate();
