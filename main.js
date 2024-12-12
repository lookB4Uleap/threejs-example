import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth/2) / (window.innerHeight), 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1, 4, 4 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinecap: true} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera( 75, (window.innerWidth / 2) / window.innerHeight, 0.1, 1000 );

const renderer2 = new THREE.WebGLRenderer();
renderer2.setSize( window.innerWidth/2, window.innerHeight );
renderer2.setAnimationLoop( animate2 );
document.body.appendChild( renderer2.domElement );

const geometry2 = new THREE.SphereGeometry( 1, 32 ,16);
const material2 = new THREE.MeshBasicMaterial(  { color: 0xffff00, wireframe: true }  );
const sphere = new THREE.Mesh( geometry2, material2 );
scene2.add( sphere );

camera.position.z = 5;
camera.position.x = 0;

camera2.position.z = 5;
camera2.position.x = 0;
// camera.position.x = initialPositionX;

let spherical = new THREE.Spherical(5, Math.PI / 2, Math.PI / 2);

function updateCameraPosition() {
    camera.position.setFromSpherical(spherical);
    camera.lookAt(0, 0, 0); // Ensure camera always looks at the center
    camera2.position.setFromSpherical(spherical);
    camera2.lookAt(0, 0, 0); // Ensure camera always looks at the center
  }

function animate() {

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
    // requestAnimationFrame(animate);
    updateCameraPosition(); // Update camera position based on spherical coordinates
    // renderer.render(scene, camera);
	renderer.render( scene, camera );

}

function animate2() {

	// sphere.rotation.x += 0.01;
	// sphere.rotation.y += 0.01;
    // requestAnimationFrame(animate2);
    updateCameraPosition();
	renderer2.render( scene2, camera2 );

}

function navigate(event) {
    if (event.key === "w") { 
        cube.position.y += 1
        sphere.position.y += 1
    } else if (event.key === "s") {
        cube.position.y -= 1
        sphere.position.y -= 1
    } else if (event.key === "a") {
        cube.position.x -= 1
        sphere.position.x -= 1
    } else if (event.key === "d") {
        cube.position.x += 1
        sphere.position.x += 1
    }
}

document.addEventListener("keydown", navigate);


let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Add event listeners for mouse controls
document.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", (event) => {
    console.log("Mouse move");
    if (!isDragging) return;

    const deltaX = event.movementX * 0.01; // Horizontal movement
    const deltaY = event.movementY * 0.01; // Vertical movement
  
    // Update spherical angles
    spherical.theta -= deltaX; // Azimuthal angle (horizontal rotation)
    spherical.phi -= deltaY;   // Polar angle (vertical rotation)
  
    // Clamp phi to prevent flipping
    // spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

  const rotationSpeed = 0.005;
//   camera.rotation.y -= deltaMove.x * rotationSpeed;
//   camera.rotation.x -= deltaMove.y * rotationSpeed;
//   camera2.rotation.y -= deltaMove.x * rotationSpeed;
//   camera2.rotation.x -= deltaMove.y * rotationSpeed;

//   // Clamp vertical rotation to prevent flipping
  camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
});


document.addEventListener("wheel", (event) => {
  spherical.radius += event.deltaY * 0.01; // Adjust zoom speed
  spherical.radius = Math.max(1, spherical.radius); // Clamp minimum radius
});

// [[cosx, -sinx, 0], [sinx, cosx, 0], [0, 0, 1]] * v --> z-axis
// [[cosx, sinx, 0], [-sinx, cosx, 0], [0, 0, 1]]

// R1*A = B
// R2*B = C
// (R2*R1)*A = C
// // [[1, 0, 0], [0, cosx, -sinx]]