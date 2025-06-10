import { THREE, OrbitControls } from '../util.js'

export default function setThree(canvas, isOrbitControls=false){
    const renderer = new THREE.WebGLRenderer({ 'canvas': canvas});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight);

    const controls = isOrbitControls ? new OrbitControls(camera, renderer.domElement) : undefined;

    return { renderer, scene, camera, controls };
}
