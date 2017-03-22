// Core
import {App} from '@whs/core/App';

// Physics
import {WorldModule} from '../node_modules/physics-module-ammonext/src/modules/WorldModule';
import {SphereModule} from '../node_modules/physics-module-ammonext/src/modules/SphereModule';
import {PlaneModule} from '../node_modules/physics-module-ammonext/src/modules/PlaneModule';

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

// WHS Meshes
import {
    Sphere,
    Plane
} from '@whs+meshes';

// Controls
import {OrbitModule} from '@whs:controls/orbit';

// Game modules
import {FancyMaterialModule} from './modules/FancyMaterialModule';

// Components
import {BasicComponent} from './components/BasicComponent';

// Game Instance
const game = new App([
    new WorldModule({
        ammo: 'http://localhost:8080/node_modules/three/examples/js/libs/ammo.js'
    }),
    new ElementModule({
        container: document.getElementById('app')
    }),
    new SceneModule(),
    new CameraModule({
        position: {
          y: 60,
          z: 60,
        }
    }),
    new RenderingModule({bgColor: 0x000001}),
    new OrbitModule()
]);

new BasicComponent({
    modules: [
        new FancyMaterialModule(game)
    ],
    position: {
        x: 0,
        y: 10,
        x: 0
    },
}).addTo(game);

// Sphere + SphereModule
new Sphere({
    geometry: {
        radius: 4,
        widthSegments: 32,
        heightSegments: 24
    },
    position: {
        y: 70
    },
    modules: [
        new SphereModule({
            mass: 10,
            restitution: 2.5
        })
    ],

    material: new THREE.MeshNormalMaterial()
}).addTo(game);

// Plane
new Plane({
    geometry: {
        width:  100,
        height: 100
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
        distance: 100
    },

    shadow: {
        fov: 90
    },

    position: new THREE.Vector3(0, 10, 10)
}).addTo(game);

new AmbientLight({
    light: {
        intensity: 0.4
    }
}).addTo(game);

game.start();
