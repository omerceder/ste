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

import SolSystemSchema from '../assets/st_sol.json';

const SUN_GRAVITY = 273.95; // m/s^2 (meters per second squared)

// Game Instance

const cf = new CelestialFoundry(SolSystemSchema);

const game = new App([
    new WorldModule({
        ammo: 'http://localhost:8080/node_modules/three/examples/js/libs/ammo.js',
        // wasmBuffer: 'http://localhost:8081/ammo.wasm',
        // ammo: 'http://localhost:8081/ammoloader.js',
        gravity: new THREE.Vector3(-SUN_GRAVITY, -SUN_GRAVITY, -SUN_GRAVITY)
    }),
    new ElementModule({
        container: document.getElementById('app')
    }),
    new SceneModule(),
    new CameraModule({
        position: {
          y: cf.au()/50,
          z: cf.au()/50,
        },
        far: cf.au()*3.0
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
