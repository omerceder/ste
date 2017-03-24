import {
    Sphere
} from '@whs+meshes';

import {
    SphereModule,
} from '@ammo:modules';

const DEFAULT_PLANET_RESTITUTION = 0.012; // Unknown ???

/**
 * Planet Class
 */
export class Planet extends Sphere {

    constructor(params = {}) {

        let local_params = {
            modules: [
                new SphereModule({
                    mass:        params.physics.mass,
                    restitution: DEFAULT_PLANET_RESTITUTION
                })
            ],

            material: new THREE.MeshNormalMaterial()
        };

        Object.assign(local_params, params);

        super(local_params);

    }
}