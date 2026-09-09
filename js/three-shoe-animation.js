/**
 * ShoeSure - Real Shoe Photo 3D Interactive Viewer & Animation Module using Three.js
 */

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('three-shoe-canvas-container');
    if (!container) return;

    // 1. Scene, Camera & Renderer Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(4, 5, 5);
    scene.add(dirLight);

    const pinkLight = new THREE.PointLight(0xff007a, 3, 10);
    pinkLight.position.set(-3, 2, 3);
    scene.add(pinkLight);

    const cyanLight = new THREE.PointLight(0x00dfd8, 3, 10);
    cyanLight.position.set(3, -2, 3);
    scene.add(cyanLight);

    // 3. Texture Loader & Real Shoe Image Maps
    const textureLoader = new THREE.TextureLoader();

    const textures = {
        sport: textureLoader.load('../assets/images/shoesure-hero.png'),
        leather: textureLoader.load('../assets/images/shoe-renovation.png'),
        custom: textureLoader.load('../assets/images/custom-design.png')
    };

    // Configure high quality texture filtering
    Object.values(textures).forEach(tex => {
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });

    // 4. 3D Real Shoe Display Plane with Bevel Frame
    const shoeGroup = new THREE.Group();

    // Front Real Shoe Image Mesh
    const planeGeo = new THREE.PlaneGeometry(3.6, 2.4, 32, 32);
    
    // Add subtle 3D curvature to plane
    const pos = planeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 0.8) * 0.15 + Math.cos(y * 0.8) * 0.1);
    }
    planeGeo.computeVertexNormals();

    const shoeMat = new THREE.MeshStandardMaterial({
        map: textures.sport,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide
    });

    const shoeMesh = new THREE.Mesh(planeGeo, shoeMat);
    shoeGroup.add(shoeMesh);

    // Glowing Frame Border Backing
    const frameGeo = new THREE.BoxGeometry(3.7, 2.5, 0.1);
    const frameMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.2,
        metalness: 0.8
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.06;
    shoeGroup.add(frameMesh);

    scene.add(shoeGroup);

    // 5. Floating Dust Particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 10;
        particlePositions[i + 1] = (Math.random() - 0.5) * 6;
        particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
        color: 0xff007a,
        size: 0.07,
        transparent: true,
        opacity: 0.7
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive 3D Parallax & Mouse Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isAutoRotating = true;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationY = mouseX * 0.8;
        targetRotationX = mouseY * 0.4;
    });

    // 7. Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        if (isAutoRotating) {
            shoeGroup.rotation.y += 0.008;
        } else {
            shoeGroup.rotation.y += (targetRotationY - shoeGroup.rotation.y) * 0.08;
        }

        shoeGroup.rotation.x += (targetRotationX - shoeGroup.rotation.x) * 0.08;
        shoeGroup.position.y = Math.sin(Date.now() * 0.002) * 0.12; // Smooth floating bob

        particles.rotation.y += 0.0015;

        renderer.render(scene, camera);
    }
    animate();

    // 8. Handle Window Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // 9. Real Shoe Texture Switcher Function
    window.switchShoeMaterial = function (type) {
        if (!textures[type]) return;

        shoeMat.map = textures[type];
        shoeMat.needsUpdate = true;

        // Bounce animation trigger
        shoeGroup.scale.set(0.85, 0.85, 0.85);
        setTimeout(() => {
            shoeGroup.scale.set(1, 1, 1);
        }, 180);
    };

    window.toggle3DRotation = function () {
        isAutoRotating = !isAutoRotating;
    };
});
