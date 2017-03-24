import {
    Sphere
} from '@whs+meshes';

import {
    SphereModule,
} from '@ammo:modules';

const DEFAULT_PLANET_RADIUS      = 6371.0088; // Earth
const DEFAULT_PLANET_MASS        = 5.972 * Math.pow(10, 24); // Earth
const DEFAULT_PLANET_RESTITUTION = 0.012; // Unknown ???

/**
 * Planet Class
 */
export class Planet extends Sphere {

    constructor(params = {}) {

        let local_params = {
            geometry: {
                radius:         DEFAULT_PLANET_RADIUS,
                widthSegments:  128,
                heightSegments: 128
            },
            modules: [
                new SphereModule({
                    mass:        DEFAULT_PLANET_MASS,
                    restitution: DEFAULT_PLANET_RESTITUTION
                })
            ],

            material: new THREE.MeshNormalMaterial()
        };

        Object.assign(local_params, params);

        super(local_params);

    }
}