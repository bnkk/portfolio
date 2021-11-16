import "./style.css";
import * as THREE from "three";
import { throttle } from "lodash-es";
// create adjustment for window resize
// finish animations and other things
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
scene.background = new THREE.Color(0x030e2f);

const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 10);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0x0a39bc
});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.castShadow = true;
cube.receiveShadow = false;
scene.add(cube);

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

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const light = new THREE.SpotLight(0xffffff, 1, 100, 90);
light.position.set(30, 20, 0);
light.target = cube;
light.castShadow = true;
scene.add(light);

light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

//const lightHelper = new THREE.SpotLightHelper(light)
//const gridHelper = new THREE.GridHelper(200, 50)
//scene.add(lightHelper)

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

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.003;
  cube.rotation.y += 0.003;
  cube.rotation.z += 0.003;

  camera.position.set(27, 7, -5);
  camera.rotation.set(179.6, 0.9, 90.7);

  //controls.update();

  renderer.render(scene, camera);
}

animate();
