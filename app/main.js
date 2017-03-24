// Core
import {App} from '@whs/core/App';

// Physics
import {
    WorldModule
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
    AmbientLight
} from '@whs+lights';

// Controls
import {OrbitModule} from '@whs:controls/orbit';

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

// Star System
const star_system = new StarSystem();

// Global light
const global_ambient_light = new AmbientLight({
    light: {
        intensity: 0.4
    }
}).addTo(game);

// Add star system to game
star_system.addTo(game);

// Start game
game.start();
