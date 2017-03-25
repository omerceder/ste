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
import {CelestialFoundry} from './systems/CelestialFoundry';

// System Schema
import SolSystemSchema from '../assets/st_sol.json';

// Celestial Foundry Object
const cf = new CelestialFoundry(SolSystemSchema, 'Sun');

// Game Instance
const game = new App([
    new WorldModule({
        ammo: 'http://localhost:8080/node_modules/three/examples/js/libs/ammo.js',
        // wasmBuffer: 'http://localhost:8081/ammo.wasm',
        // ammo: 'http://localhost:8081/ammoloader.js',
        gravity: new THREE.Vector3(-cf.g(), 0.0, -cf.g())
    }),
    new ElementModule({
        container: document.getElementById('app')
    }),
    new SceneModule(),
    new CameraModule({
        position: {
          y: cf.au()*1.0,
          z: cf.au()*1.0,
        },
        far: cf.au()*10.0
    }),
    new RenderingModule({bgColor: 0x000001}),
    new OrbitModule()
]);

// Star System
const star_system = new StarSystem(cf);

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
