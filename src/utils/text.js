import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

let cubesConfig = {
  count: 100
};

const matcapOne = new THREE.TextureLoader().load('/matcaps/1.png');
const matcapTwo = new THREE.TextureLoader().load('/matcaps/2.png');
const matcapThree = new THREE.TextureLoader().load('/matcaps/3.png');
const matcapFour = new THREE.TextureLoader().load('/matcaps/4.png');
const matcapFive = new THREE.TextureLoader().load('/matcaps/5.png');
const matcapSix = new THREE.TextureLoader().load('/matcaps/6.png');
const matcapSeven = new THREE.TextureLoader().load('/matcaps/7.png');
const matcapEight = new THREE.TextureLoader().load('/matcaps/8.png');

const matcapArray = [
  matcapOne,
  matcapTwo,
  matcapThree,
  matcapFour,
  matcapFive,
  matcapSix,
  matcapSeven,
  matcapEight
];

export const main = () => {
  const canvas = document.querySelector('canvas.webgl');

  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#FFFAFA');

  // Load a font
  const fontLoader = new FontLoader();
  fontLoader.load('/font/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Cubes', {
      font: font,
      size: 1,
      height: 0.2,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5
    });
    textGeometry.center();
    const material = new THREE.MeshStandardMaterial({
      color: '#FFFAFA'
    });
    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);
  });

  const cubes = [];

  for (let i = 0; i < cubesConfig.count; i++) {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

    const matCapTexture =
      matcapArray[Math.floor(Math.random() * matcapArray.length)];
    const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
    const cube = new THREE.Mesh(cubeGeometry, material);
    cube.position.z = (Math.random() - 0.5) * 30;
    cube.position.y = (Math.random() - 0.5) * 30;
    cube.position.x = (Math.random() - 0.5) * 30;

    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    cube.scale.set(scale, scale, scale);

    cubes.push(cube);
    scene.add(cube);
  }

  const pointLight = new THREE.PointLight('white', 0.5);
  pointLight.position.set(3, 3, 5);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
  camera.position.z = 10;
  camera.position.x = 4;

  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.render(scene, camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.render(scene, camera);
  });

  const clock = new THREE.Clock();

  const loop = () => {
    controls.update();

    const elapsedTime = clock.getElapsedTime();

    cubes.forEach((cube) => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    });

    if (elapsedTime < 5) {
      camera.position.z = -10 + elapsedTime * 5;
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  };

  loop();
};
