// Core
import {App} from '@whs/core/App';

// Physics
import {
    WorldModule,
    PlaneModule
} from '@ammo:modules';

// WHS Core Modules
import {
  ElementModule,
  SceneModule,
  CameraModule,
  RenderingModule
} from '@whs:app';

// WHS Lights
import {
    PointLight,
    AmbientLight
} from '@whs+lights';

// Controls
import {OrbitModule} from '@whs:controls/orbit';

// Components
import {
    Plane
} from '@whs+meshes';

// Systems
import {StarSystem} from './systems/StarSystem';

// Game Instance
const game = new App([
    new WorldModule({
        ammo: 'http://localhost:8080/node_modules/three/examples/js/libs/ammo.js',
        // wasmBuffer: 'http://localhost:8081/ammo.wasm',
        // ammo: 'http://localhost:8081/ammoloader.js',
        gravity: new THREE.Vector3(0, 0, 0)
    }),
    new ElementModule({
        container: document.getElementById('app')
    }),
    new SceneModule(),
    new CameraModule({
        position: {
          y: StarSystem.getAu()/50,
          z: StarSystem.getAu()/50,
        },
        far: StarSystem.getAu()*3.0
    }),
    new RenderingModule({bgColor: 0x000001}),
    new OrbitModule()
]);

// Plane
new Plane({
    geometry: {
        width:  StarSystem.getAu()*2,
        height: StarSystem.getAu()*2
    },

    modules: [
        new PlaneModule({
            mass: 0
        })
    ],

    material: new THREE.MeshPhongMaterial({color: 0x447F8B}),

    rotation: {
        x: -Math.PI / 2
    }
}).addTo(game);

// Lights
new PointLight({
    light: {
        intensity: 0.5,
        distance: StarSystem.getAu()
    },

    shadow: {
        fov: 90
    },

    position: new THREE.Vector3(StarSystem.getAu()/2, StarSystem.getAu()/2, StarSystem.getAu()/2)
}).addTo(game);

new AmbientLight({
    light: {
        intensity: 0.4
    }
}).addTo(game);

const star_system = new StarSystem();

star_system.star.addTo(game);
star_system.planets[0].addTo(game);



game.start();
