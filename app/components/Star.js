import {
    Sphere
} from '@whs+meshes';

import {
    SphereModule,
} from '@ammo:modules';

const STAR_SUN_MASS = 1.988435 * Math.pow(10,30);
const STAR_SUN_RADIUS = 695700;

/**
 * Star Class
 */
export class Star extends Sphere {

    constructor(params = {}) {

        let local_params = {
            geometry: {
                radius:         STAR_SUN_RADIUS,
                widthSegments:  128,
                heightSegments: 128
            },
            modules: [
                new SphereModule({
                    mass:        0,
                    restitution: 0.0001
                })
            ],

            material: new THREE.MeshNormalMaterial()
        };

        Object.assign(local_params, params);

        super(local_params);
    }

    getMass() {
        return STAR_SUN_MASS;
    }
}