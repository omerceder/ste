import {CelestialFoundry} from './CelestialFoundry';

import {
    PlaneModule
} from '@ammo:modules';

import {
    Plane
} from '@whs+meshes';

import {
    PointLight,
    HemisphereLight
} from '@whs+lights';

/**
 * StarSystem Class
 */
export class StarSystem {
    /**
     *
     * @param {CelestialFoundry} cf
     */
    constructor(cf) {

        // Star
        let star = cf.createStar(cf.findStar('Sun'));

        // Planets
        const planets = cf.createPlanets(star);

        // console.log(planets[5].planet.setAngularVelocity(new THREE.Vector3(0.0, 7.292115*Math.pow(10,-5), 0.0)));
        // console.log(planets[5].planet.applyForce(new THREE.Vector3(29800, 0.0, 29800 )));

        // Star Light
        // this.star_system_light = this.createStarLight();

        // System Plane
        this.system_helper_plane = StarSystem.createSystemHelperPlane(cf);

        // System Lights
        this.system_point_light = StarSystem.createSystemPointLight(cf);

        // Set CelestialFoundry
        Object.assign(this, {
            cf:      cf,
            star:    star,
            planets: planets
        });
    }

    au() {
        console.log(this);
        return this.cf.au();
    }

    addTo(game) {

        this.star.addTo(game);

        // this.star_system_light.addTo(game);
        this.system_helper_plane.addTo(game);
        this.system_point_light.addTo(game);

        for (const ps of this.planets) {
            ps.addTo(game);
        }
    }

    static createSystemHelperPlane(cf) {
        return new Plane({
            geometry: {
                width:  cf.au()*2,
                height: cf.au()*2,
                wSegments:  128,
                hSegments:  128
            },

            // modules: [
            //     new PlaneModule({
            //         mass: 0
            //     })
            // ],

            material: new THREE.MeshPhongMaterial({color: 0x447F8B, wireframe: true}),

            rotation: {
                x: -Math.PI / 2
            }
        });
    }

    static createSystemPointLight(cf) {
        return new PointLight({
            light: {
                intensity: 0.5,
                distance: cf.au()
            },

            shadow: {
                fov: 90
            },

            position: new THREE.Vector3(cf.au()/100, cf.au()/75, cf.au()/100)
        });
    }

    static createStarLight() {

        return new HemisphereLight( 0xffffff, 0xffffff, 1.6 );

        // hemiLight.color.setHSL( 0.6, 1, 0.6 );
        // hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        // hemiLight.position.set( this.au()/70, this.au()/70, this.au()/70 );

        // return hemiLight;
    }
}
