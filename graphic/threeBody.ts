import { setModal, hslToRGB, THREE, setThree, OrbitControls } from '../modules/util.js'

import { Matrix, Vector } from '../modules/calc/classes.js'
import { add, sub, mul, div, neg } from '../modules/calc/operators.js'
import { rungeKutta } from '../modules/calc/differentialEquation.js'
import { NearestMipMapNearestFilter, NeverStencilFunc } from '../modules/three/build/three.core.js';

const initalValues = await fetch('./graphic/threeBody/initialValues.json').then(res=> res.json());
const val = initalValues[1];

const intervalTime = 20; 
const dx = 1.0e-3, nStep = 200;

const { wrapper, modal } = setModal(document.getElementById('modal-wrapper-3D'), stopInterval);

const { renderer, scene, camera, controls } = setThree(modal, true);
camera.position.set(2.0, 2.0, Math.hypot(2.0, 2.0));
camera.lookAt(0, 0, 0);
const light = new THREE.PointLight(0xFFFFFF);
light.position.set(0, 0, 2.0);
scene.add(light);

const N=3;
const masses = [ 1, 1, 1 ];
const x = [ new Vector( ...val.positions[0] ),
            new Vector( ...val.positions[1] ),
            new Vector( ...val.positions[2] ) ];

const v = [ new Vector( ...val.velocities[0] ),
            new Vector( ...val.velocities[1] ),
            new Vector( ...val.velocities[2] ) ];

let arg = new Matrix(...x, ...v);
let t = 0;

const func = (arg: Matrix, t: number): Matrix => {
    const result = new Matrix(2*N, 3);
    for( let i=0; i<N; i++ ){ // dx/dt = v;
        result[i] = arg[N+i];
        for( let j=N; j<2*N; j++ ){
            if( j === N+i ) continue; 
            result[j] = result[j] - masses[i]/(arg[j-N] - arg[i]).abs2()*(arg[j-N] - arg[i]).normalize();
        }
    }
    return result;
}

const balls=[];
for( let i=0; i<N; i++ ){
    balls.push(new THREE.Mesh( new THREE.SphereGeometry(0.05), 
               new THREE.MeshStandardMaterial({ color: hslToRGB(i*360/N, 100, 50) })));
    balls[i].position.set(...x[i]);
    scene.add(balls[i]);
}

function addObject(data, scene){
    for( let i=0; i<N; i++ ){
        balls[i].position.set(...data[data.length-1][i]);

        const material=new THREE.LineBasicMaterial({ color: hslToRGB(i*360/N, 100, 50) });
        const geometry=new THREE.BufferGeometry().setFromPoints(data.map(a=> new THREE.Vector3(...a[i])));
        const line=new THREE.Line(geometry, material);
        scene.add(line);
    }
}

const intervalID = setInterval(()=>{
    const result =rungeKutta(func, arg, t, dx, nStep); 
//    for( let i=0; i<N; i++ ) console.log(i, ...result.y[i]);
    t = result.x[result.x.length-1];
    arg = result.y[result.y.length-1];

    addObject(result.y, scene);
    renderer.render(scene, camera);
}, intervalTime);
function stopInterval(){ window.clearInterval(intervalID) };
