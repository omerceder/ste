// Core
import {App} from '@whs/core/App';
import {Sphere} from '@whs+meshes/Sphere';

// Physics
import {WorldModule} from '../node_modules/physics-module-ammonext/src/modules/WorldModule';
import {SphereModule} from '../node_modules/physics-module-ammonext/src/modules/SphereModule';

// THREE
import {MeshBasicMaterial} from '../node_modules/three/src/materials/MeshBasicMaterial.js';

// Whitestorm
import {
  ElementModule,
  SceneModule,
  CameraModule,
  RenderingModule
} from '@whs:app';

// Controls
import {OrbitModule} from '@whs:controls/orbit';

// Game modules
import {FancyMaterialModule} from './modules/FancyMaterialModule';

// Components
import {Plane} from '@whs+meshes/Plane';
import {BasicComponent} from './components/BasicComponent';

// Game Instance
// const game = new App([
//   new ElementModule({
//     container: document.getElementById('app')
//   }),
//   new SceneModule(),
//   new CameraModule({
//     position: {
//       z: -15
//     }
//   }),
//   new RenderingModule({bgColor: 0x000001}),
//   new OrbitModule()
// ]);
//
// game.add(new BasicComponent({
//   modules: [
//     new FancyMaterialModule(game)
//   ]
// }));
//
// game.start();

const app = new App([
    // Other modules...
    new WorldModule()
]);

const sphere = new Sphere({
    geometry: {
        radius: 3
    },

    modules: [
        new SphereModule({
            mass: 10
        })
    ],

    material: new MeshBasicMaterial({color: 0xff0000}) // red material
});

app.start(); // run animation