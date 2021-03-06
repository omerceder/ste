import {
    Sphere
} from '@whs+meshes';

import {
    SphereModule,
} from '@ammo:modules';

/**
 * Star Class
 */
export class Star extends Sphere {
    /**
     * Real star mass
     * @type {Number}
     */
    realMass = 0.0;

    /**
     * Default constructor
     *
     * @param {Object} params
     * @param {Number} real_mass
     */
    constructor(params = {}, real_mass) {

        let local_params = {
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
        this.realMass = real_mass;
    }

    /**
     * Get real mass of star object since it's physics mass might be 0.0
     *
     * @return {Number}
     */
    getRealMass() {
        return this.realMass;
    }
}