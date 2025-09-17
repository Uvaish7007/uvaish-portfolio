
  const canvasContainer = document.getElementById('canvas-container');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvasContainer.appendChild(renderer.domElement);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x00ff9d,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Torus Knot
  const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  const torusKnotMaterial = new THREE.MeshBasicMaterial({
    color: 0x00b7ff,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
  scene.add(torusKnot);

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

