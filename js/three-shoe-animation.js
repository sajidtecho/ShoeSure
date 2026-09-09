/**
 * ShoeSure - Interactive 3D Shoe Viewer & Animation Module using Three.js
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
    camera.position.set(0, 1.5, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Studio Dual Rim Lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Neon Pink Rim Light
    const pinkLight = new THREE.PointLight(0xff007a, 2.5, 12);
    pinkLight.position.set(-4, 3, 2);
    scene.add(pinkLight);

    // Neon Cyan Rim Light
    const cyanLight = new THREE.PointLight(0x00dfd8, 2.5, 12);
    cyanLight.position.set(4, -2, 2);
    scene.add(cyanLight);

    // 3. 3D Shoe Group Assembly
    const shoeGroup = new THREE.Group();

    // Material Definitions
    const materials = {
        sport: {
            sole: new THREE.MeshStandardMaterial({ color: 0x00dfd8, roughness: 0.2, metalness: 0.1 }),
            upper: new THREE.MeshStandardMaterial({ color: 0xff007a, roughness: 0.4, metalness: 0.2 }),
            accent: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.8 }),
            lace: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 })
        },
        leather: {
            sole: new THREE.MeshStandardMaterial({ color: 0x271910, roughness: 0.6, metalness: 0.1 }),
            upper: new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.3, metalness: 0.05 }),
            accent: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.2, metalness: 0.7 }),
            lace: new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.7 })
        },
        custom: {
            sole: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 }),
            upper: new THREE.MeshStandardMaterial({ color: 0x7928ca, roughness: 0.3, metalness: 0.3 }),
            accent: new THREE.MeshStandardMaterial({ color: 0x00ffcc, roughness: 0.1, metalness: 0.9 }),
            lace: new THREE.MeshStandardMaterial({ color: 0xff007a, roughness: 0.8 })
        }
    };

    let activeMatSet = materials.sport;

    // --- Sole Geometry ---
    const soleGeo = new THREE.BoxGeometry(3.6, 0.4, 1.4, 16, 4, 8);
    const soleMesh = new THREE.Mesh(soleGeo, activeMatSet.sole);
    soleMesh.position.set(0, -0.6, 0);
    soleMesh.castShadow = true;
    soleMesh.receiveShadow = true;
    shoeGroup.add(soleMesh);

    // --- Midsole Layer ---
    const midSoleGeo = new THREE.BoxGeometry(3.4, 0.25, 1.3);
    const midSoleMesh = new THREE.Mesh(midSoleGeo, activeMatSet.accent);
    midSoleMesh.position.set(0, -0.35, 0);
    shoeGroup.add(midSoleMesh);

    // --- Upper Shoe Body (Curved Extrusion) ---
    const upperGeo = new THREE.ConeGeometry(1.3, 2.4, 16, 8, false, 0, Math.PI * 2);
    upperGeo.rotateZ(-Math.PI / 3);
    upperGeo.scale(1.2, 0.8, 0.9);
    const upperMesh = new THREE.Mesh(upperGeo, activeMatSet.upper);
    upperMesh.position.set(-0.2, 0.3, 0);
    upperMesh.castShadow = true;
    shoeGroup.add(upperMesh);

    // --- Toe Cap ---
    const toeGeo = new THREE.SphereGeometry(0.75, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    toeGeo.scale(1.2, 0.6, 0.9);
    const toeMesh = new THREE.Mesh(toeGeo, activeMatSet.accent);
    toeMesh.position.set(1.1, 0.05, 0);
    toeMesh.rotation.z = -0.15;
    shoeGroup.add(toeMesh);

    // --- Heel Counter ---
    const heelGeo = new THREE.CylinderGeometry(0.65, 0.75, 1.2, 16);
    const heelMesh = new THREE.Mesh(heelGeo, activeMatSet.upper);
    heelMesh.position.set(-1.1, 0.4, 0);
    shoeGroup.add(heelMesh);

    // --- Laces Strips ---
    for (let i = 0; i < 4; i++) {
        const laceGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8);
        laceGeo.rotateX(Math.PI / 2);
        const laceMesh = new THREE.Mesh(laceGeo, activeMatSet.lace);
        laceMesh.position.set(-0.3 + i * 0.35, 0.45 + i * 0.1, 0);
        shoeGroup.add(laceMesh);
    }

    // --- Swoosh / Branding Stripe ---
    const stripeGeo = new THREE.TorusGeometry(0.8, 0.06, 8, 24, Math.PI * 0.8);
    stripeGeo.rotateZ(0.4);
    const stripeMesh = new THREE.Mesh(stripeGeo, activeMatSet.accent);
    stripeMesh.position.set(-0.1, 0.2, 0.68);
    shoeGroup.add(stripeMesh);

    const stripeMeshLeft = stripeMesh.clone();
    stripeMeshLeft.position.set(-0.1, 0.2, -0.68);
    shoeGroup.add(stripeMeshLeft);

    scene.add(shoeGroup);

    // 4. Floating Particles Field
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 12;
        particlePositions[i + 1] = (Math.random() - 0.5) * 8;
        particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
        color: 0xff007a,
        size: 0.08,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Interactive Mouse Rotation Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isAutoRotating = true;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationY = mouseX * 1.2;
        targetRotationX = mouseY * 0.6;
    });

    // 6. Animation Loop (Smooth Framer-Motion Lerp)
    function animate() {
        requestAnimationFrame(animate);

        if (isAutoRotating) {
            shoeGroup.rotation.y += 0.012;
        } else {
            shoeGroup.rotation.y += (targetRotationY - shoeGroup.rotation.y) * 0.05;
        }

        shoeGroup.rotation.x += (targetRotationX - shoeGroup.rotation.x) * 0.05;
        shoeGroup.position.y = Math.sin(Date.now() * 0.002) * 0.15; // Floating animation

        particles.rotation.y += 0.002;

        renderer.render(scene, camera);
    }
    animate();

    // 7. Handle Window Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // 8. Material Switcher Controls
    window.switchShoeMaterial = function (type) {
        const selected = materials[type];
        if (!selected) return;

        isAutoRotating = true;
        soleMesh.material = selected.sole;
        midSoleMesh.material = selected.accent;
        upperMesh.material = selected.upper;
        toeMesh.material = selected.accent;
        heelMesh.material = selected.upper;
        stripeMesh.material = selected.accent;
        stripeMeshLeft.material = selected.accent;

        // Animate scale bounce
        shoeGroup.scale.set(0.8, 0.8, 0.8);
        setTimeout(() => {
            shoeGroup.scale.set(1, 1, 1);
        }, 150);
    };

    window.toggle3DRotation = function () {
        isAutoRotating = !isAutoRotating;
    };
});
