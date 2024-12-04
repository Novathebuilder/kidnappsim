
// Basic Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Loading Screen
const loadingScreen = document.getElementById('loading-screen');
setTimeout(() => {
    loadingScreen.style.display = 'none';
}, 15000);

// Ground Plane
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
scene.add(ground);

// Player Vehicle (SUV)
const suvGeometry = new THREE.BoxGeometry(2, 1, 4);
const suvMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const suv = new THREE.Mesh(suvGeometry, suvMaterial);
suv.position.y = 0.5;
scene.add(suv);

// Camera Follow
camera.position.set(0, 5, 10);
camera.lookAt(suv.position);

// Simple Controls
const keys = {};
document.addEventListener('keydown', (event) => keys[event.key] = true);
document.addEventListener('keyup', (event) => keys[event.key] = false);

// NPCs
const npcs = [];
for (let i = 0; i < 5; i++) {
    const npcGeometry = new THREE.SphereGeometry(0.5);
    const npcMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const npc = new THREE.Mesh(npcGeometry, npcMaterial);
    npc.position.set(Math.random() * 50 - 25, 0.5, Math.random() * 50 - 25);
    scene.add(npc);
    npcs.push(npc);
}

// Game Loop
function animate() {
    requestAnimationFrame(animate);

    // SUV Movement
    if (keys['w']) suv.position.z -= 0.1;
    if (keys['s']) suv.position.z += 0.1;
    if (keys['a']) suv.position.x -= 0.1;
    if (keys['d']) suv.position.x += 0.1;

    // Update Camera
    camera.position.set(suv.position.x, 5, suv.position.z + 10);
    camera.lookAt(suv.position);

    renderer.render(scene, camera);
}
animate();
