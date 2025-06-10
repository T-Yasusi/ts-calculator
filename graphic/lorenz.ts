import { setModal, hslToRGB, THREE, OrbitControls } from '../modules/util.js'

import { Vector } from '../modules/calc/classes.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'
import { rungeKutta } from '../modules/calc/differentialEquation.js'

const { wrapper, modal } = setModal(document.getElementById('modal-wrapper-3D'), stopInterval);
const { renderer, scene, camera, controls } = setThree(modal);

const intervalTime=50; 

const sigma=10, rho=28, beta=8/3;
let t=0;
let x=new Vector(1.0, 0, 0);
const func=(x: Vector, t: number): Vector => 
     new Vector(sigma*(x[1]-x[0]), x[0]*(rho-x[2])-x[1], x[0]*x[1]-beta*x[2]);

let iColor=0;

const intervalID = setInterval(()=>{
     const result =rungeKutta(func, x, t, 0.01, 100); 
     t = result.x[result.x.length-1];
     x = result.y[result.y.length-1];

     addLine(result.y, scene);
     renderer.render(scene, camera);
}, intervalTime);
function stopInterval(){ window.clearInterval(intervalID) };

function addLine(data, scene){
     const material = new THREE.LineBasicMaterial({ color: hslToRGB(iColor, 100, 50) });
     const geometry = new THREE.BufferGeometry().setFromPoints(data.map(a => new THREE.Vector3(...a)));
     const line = new THREE.Line(geometry, material);
     iColor += 10;
     if( iColor>360 ) iColor=0;
     scene.add(line);
}

function setThree(canvas){
     const renderer = new THREE.WebGLRenderer({ 'canvas': canvas});
     renderer.setSize(canvas.clientWidth, canvas.clientHeight);
     renderer.setPixelRatio(window.devicePixelRatio);

     const scene = new THREE.Scene();

     const camera=new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight);
     camera.position.set(50, 50, 50);
     camera.lookAt(0, 0, 0);

     const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
     directionalLight.position.set(-1, -1, -1);
     scene.add(directionalLight);

     const controls = new OrbitControls(camera, renderer.domElement);
     controls.enableDamping=true;

     return { renderer, scene, camera, controls };
}