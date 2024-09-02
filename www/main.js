import * as THREE from "three";

const fcElem = document.getElementById("frame-count");
const rendererParent = document.getElementById("canvas-container");
const screenSize = Math.min(
  rendererParent.clientWidth,
  rendererParent.clientHeight
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 1.0, 0.1, 1000);
let fc = 0;
let rotVelX = 0;
let rotVelY = 0;
let rotVelZ = 0;
let clicked = false;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardNodeMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.matrixAutoUpdate = false;
cube.matrix = new THREE.Matrix4().makeRotationFromEuler(
  new THREE.Euler(Math.PI / 4, Math.PI / 4, 0)
);

var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

camera.position.z = 5;

const renderer = new THREE.WebGPURenderer();
// console.log(rendererParent.clientWidth);
renderer.setSize(screenSize, screenSize);
// renderer.shadowMap.enabled = true;

window.onresize = () => {
  camera.updateProjectionMatrix();
  const screenSize = Math.min(
    rendererParent.clientWidth,
    rendererParent.clientHeight
  );
  renderer.setSize(screenSize, screenSize);
};

function animate() {
  cube.material.color = new THREE.Color(`hsl(${fc % 360}, 100%, 50%)`);

  // https://stackoverflow.com/questions/37903979/set-an-objects-absolute-rotation-around-the-world-axis
  var rotation = cube.matrix;
  var worldXAxis = new THREE.Vector3(1, 0, 0).applyMatrix4(
    rotation.clone().invert()
  );
  var rotationWorldX = new THREE.Matrix4().makeRotationAxis(
    worldXAxis,
    rotVelX
  );
  rotation.multiply(rotationWorldX);
  var worldYAxis = new THREE.Vector3(0, 1, 0).applyMatrix4(
    rotation.clone().invert()
  );
  var rotationWorldY = new THREE.Matrix4().makeRotationAxis(
    worldYAxis,
    rotVelY
  );
  rotation.multiply(rotationWorldY);
  var worldZAxis = new THREE.Vector3(0, 0, 1).applyMatrix4(
    rotation.clone().invert()
  );
  var rotationWorldZ = new THREE.Matrix4().makeRotationAxis(
    worldZAxis,
    rotVelZ
  );
  rotation.multiply(rotationWorldZ);

  cube.matrix = rotation;

  renderer.render(scene, camera);
  fc++;
  fcElem.innerText = fc;

  if (rotVelX < -0.01) {
    rotVelX += 0.01;
  } else if (rotVelX > 0.01) {
    rotVelX -= 0.01;
  } else {
    rotVelX = 0;
  }

  if (rotVelY < -0.01) {
    rotVelY += 0.01;
  } else if (rotVelY > 0.01) {
    rotVelY -= 0.01;
  } else {
    rotVelY = 0;
  }

  if (rotVelZ < -0.01) {
    rotVelZ += 0.01;
  } else if (rotVelZ > 0.01) {
    rotVelZ -= 0.01;
  } else {
    rotVelZ = 0;
  }
}

renderer.setAnimationLoop(animate);
document.getElementById("canvas-container").appendChild(renderer.domElement);

document.onwheel = (e) => {
  rotVel += e.deltaY / 10000;
};

function clickStart() {
  clicked = true;
}

function clickEnd() {
  clicked = false;
}

function onDrag(e) {
  if (clicked) {
    console.log(e.movementX);
    console.log(e.movementY);
    console.log(e);
    rotVelX += e.movementY / 1000;
    rotVelY += e.movementX / 1000;
  }
}

document.body.onpointerdown = clickStart;
document.body.onpointerup = clickEnd;
// document.body.onpointercancel = clickEnd;
// document.body.onpointerleave = clickEnd;
// document.body.onmouseleave = clickEnd;
document.body.onpointermove = onDrag;
// document.body.onmousemove = onDrag;
