import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 场景
const scene = new THREE.Scene()

// 渲染
const render = new THREE.WebGLRenderer()
render.setClearColor('#f2f2f2')
render.setSize(window.innerWidth, window.innerHeight)
document.querySelector("#app").appendChild(render.domElement)


// 
scene.add(new THREE.AxesHelper(10000))

const light = new THREE.HemisphereLight("#000000", "#ffffff", 6 );
scene.add(light);
// object.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0) );

// fbxLoader
let action = [];
let mixer = null
const fbxLoader = new FBXLoader()
fbxLoader.load('../static/Waving Gesture.fbx', function (object) {
    console.log(object);
    object.geometry.computeBoundingBox();
    object.geometry.center()
    object.scale.set(0, 0, 0)
    
    mixer = new THREE.AnimationMixer(object)
    for (let i = 0; i < object.animations.length; i++) {
        action[i] = mixer.clipAction(object.animations[i])
        // console.log(mixer.clipAction(object.animations[i]));
        
    }
    action[0].play()

    scene.add(object)
})


// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)




// 摄像机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(100,50,300)

camera.lookAt(scene.position)

// 轨道控制器
const controls = new OrbitControls(camera, render.domElement)

// 渲染循环
const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate)
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    if (mixer) {
        mixer.update(clock.getDelta())
    }

    render.render(scene, camera)
}

animate()