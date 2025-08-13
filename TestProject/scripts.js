let camera, scene, renderer, controller;

init();
function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    document.getElementById('enter-ar').addEventListener('click', () => {
        document.body.appendChild(THREE.ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));
    });

    // Light
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Load model
    const loader = new THREE.GLTFLoader();
    loader.load('model.glb', gltf => {
        gltf.scene.scale.set(0.2, 0.2, 0.2); // adjust size
        scene.add(gltf.scene);
    });

    renderer.setAnimationLoop(render);
}

function render(timestamp, frame) {
    renderer.render(scene, camera);
}
