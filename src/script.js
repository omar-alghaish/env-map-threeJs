
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector("canvas.webgl");

const cubeTextureLoader = new THREE.CubeTextureLoader();
const a = new THREE.CubeTextureLoader();

const enviromentMap = cubeTextureLoader.load([
    "./Standard-Cube-Map/px.png",
    "./Standard-Cube-Map/nx.png",
    "./Standard-Cube-Map/py.png",
    "./Standard-Cube-Map/ny.png",
    "./Standard-Cube-Map/pz.png",
    "./Standard-Cube-Map/nz.png",
])


const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial();
const axesHelper = new THREE.AxesHelper(5)
const group = new THREE.Group()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const controls = new OrbitControls(camera, canvas)

scene.environment = enviromentMap;
scene.background = enviromentMap;
material.envMap = enviromentMap;

const box1 = new THREE.Mesh(geometry, material);
box1.position.set(3, 0, 0)
const box2 = new THREE.Mesh(geometry, material);
box2.position.set(-3, 0, 0)
const box3 = new THREE.Mesh(geometry, material)

camera.position.set(0, .1, 4)

scene.add(camera)
// scene.add(axesHelper)
group.add(box3)
scene.add(group)

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera)


window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

})

const clock = new THREE.Clock()

const tick = () => {
    const time = clock.getElapsedTime();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}
tick()


const fullscreenButton = document.getElementById('myButton');

let isFullscreen = false;

fullscreenButton.addEventListener('click', () => {
    if (!isFullscreen) {
        // Enter fullscreen mode
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }

        fullscreenButton.textContent = 'Close Fullscreen'; 
    } else {
        // Exit fullscreen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }

        fullscreenButton.textContent = 'Fullscreen'; 
    }

    isFullscreen = !isFullscreen; 
});

document.addEventListener('fullscreenchange', () => {
    isFullscreen = !!document.fullscreenElement;
    updateButtonText();
});

document.addEventListener('mozfullscreenchange', () => {
    isFullscreen = !!document.mozFullScreenElement;
    updateButtonText();
});

document.addEventListener('webkitfullscreenchange', () => {
    isFullscreen = !!document.webkitFullscreenElement;
    updateButtonText();
});

document.addEventListener('msfullscreenchange', () => {
    isFullscreen = !!document.msFullscreenElement;
    updateButtonText();
});

function updateButtonText() {
    fullscreenButton.textContent = isFullscreen ? 'Close Fullscreen' : 'Fullscreen';
}

//Equirectangular images
