// Core
import {App} from '@whs/core/App';

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
const game = new App([
  new ElementModule({
    container: document.getElementById('app')
  }),
  new SceneModule(),
  new CameraModule({
    position: {
      z: -15
    }
  }),
  new RenderingModule({bgColor: 0x000001}),
  new OrbitModule()
]);

game.add(new BasicComponent({
  modules: [
    new FancyMaterialModule(game)
  ]
}));

game.start();
