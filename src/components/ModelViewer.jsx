import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function ModelViewer({
  modelPath,
  autoRotate = true,
  rotationSpeed = 0.005,
  cameraZ = 3,
  className = '',
  ambientIntensity = 1.2,
  lightColor = '#ff6b00',
  enableControls = true,
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, cameraZ)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.4
    mount.appendChild(renderer.domElement)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, ambientIntensity)
    scene.add(ambient)

    const mainLight = new THREE.DirectionalLight(lightColor, 2)
    mainLight.position.set(5, 5, 5)
    scene.add(mainLight)

    const rimLight = new THREE.DirectionalLight('#4488ff', 1)
    rimLight.position.set(-5, -2, -5)
    scene.add(rimLight)

    const fillLight = new THREE.PointLight('#ff4400', 1.5, 10)
    fillLight.position.set(0, -3, 2)
    scene.add(fillLight)

    // Controls
    let controls
    if (enableControls) {
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.enableZoom = false
      controls.autoRotate = autoRotate
      controls.autoRotateSpeed = 2
    }

    // Load GLB
    const loader = new GLTFLoader()
    let model = null

    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene

        // Center model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.0 / maxDim
        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))

        scene.add(model)
      },
      undefined,
      (err) => console.error('GLB load error:', err)
    )

    // Animate
    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (controls) controls.update()
      if (model && !enableControls) {
        model.rotation.y += rotationSpeed
      }
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      if (controls) controls.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [modelPath, autoRotate, rotationSpeed, cameraZ, ambientIntensity, lightColor, enableControls])

  return <div ref={mountRef} className={`w-full h-full ${className}`} />
}