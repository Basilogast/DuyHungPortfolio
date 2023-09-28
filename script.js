let progress = document.getElementById('progress_bar');
window.onscroll = function() {
let progressHeight = window.pageYOffset*window.innerHeight/document.body.scrollHeight;
progress.style.height = (window.innerHeight/document.body.scrollHeight)*100 + "%";
progress.style.top = progressHeight + "px";
}

var typed = new Typed('.textDynamic', {
    strings: ["Developer", "Designer", "YouTuber", "Freelancer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1500,
    smartBackspace: true,
  });

const parallax_el = document.querySelectorAll(".parallax");
let x_value=0, y_value=0;
window.addEventListener("mousemove", (e) =>{
  x_value=e.clientX - window.innerWidth/2;
  y_value=e.clientY - window.innerHeight/2;
  
  
  parallax_el.forEach((el) =>{
    let speedx=el.dataset.speedx;
    let speedy=el.dataset.speedy;
    let z_value = (x_value*el.dataset.zvalue)/2;
    
    el.style.transform=`translateX(calc(0% - ${x_value*speedx}px)) translateY(calc(0% - ${y_value*speedy}px))`;
  });
});

let text = document.querySelector(".textContainer");
let building = document.querySelectorAll(".building");
let smoke = document.querySelectorAll(".smoke");
let bg_3D = document.querySelector(".bg_3D");
window.addEventListener("scroll", () => {
  let scroll_value = window.scrollY;
  building.forEach((el) => {
    el.style.top=window.innerHeight*(-0.1) + scroll_value*0.3 + "px";
  });
  smoke.forEach((el) => { 
    el.style.top=window.innerHeight*(-0.1) + scroll_value*0.5 + "px";
  });  
  text.style.top=scroll_value*0.6 + "px";
});
// Three set up
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".bg_3D"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const material = new THREE.MeshStandardMaterial( { color: 0xffff00} ); 
const torus = new THREE.Mesh( geometry, material ); 
scene.add( torus );

// Light
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5,5,5);
scene.add( pointLight, ambientLight );

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add( lightHelper, gridHelper);

const controls = new OrbitControls( camera, renderer.domElement );
// Animate
function animate(){
  requestAnimationFrame( animate );
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render( scene, camera );
}
animate();