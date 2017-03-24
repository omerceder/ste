import {CelestialFoundry} from './CelestialFoundry';
import {PlanetSystem} from './PlanetSystem';

import {
    PlaneModule
} from '@ammo:modules';

import {
    Plane
} from '@whs+meshes';

import {
    PointLight
} from '@whs+lights';

const AU = 1.496 * Math.pow(10,8);

const SYSTEM_PLANE = 0.0;

const cf = new CelestialFoundry();

/**
 * StarSystem Class
 */
export class StarSystem {

    constructor(starParams = {}, planets = []) {

        // Star
        this.star = CelestialFoundry.createStar(SYSTEM_PLANE);

        // Planets
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/30, AU/30)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/40, AU/40)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/50, AU/50)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/60, AU/60)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/70, AU/70)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/80, AU/80)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/90, AU/90)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/100, AU/100)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/110, AU/110)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/120, AU/120)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/130, AU/130)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/140, AU/140)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/150, AU/150)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/160, AU/160)));
        planets.push(new PlanetSystem(CelestialFoundry.createPlanet(SYSTEM_PLANE, AU/170, AU/170, 12000)));
        
        this.planets = planets;
    }

    addTo(game) {
        this.star.addTo(game);
        for (const ps of this.planets) {
            ps.addTo(game);
        }
    }

    static createSystemHelperPlane() {
        return new Plane({
            geometry: {
                width:  StarSystem.getAu()*2,
                height: StarSystem.getAu()*2,
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

    static createSystemPointLight() {
        return new PointLight({
            light: {
                intensity: 0.5,
                distance: StarSystem.getAu()
            },

            shadow: {
                fov: 90
            },

            position: new THREE.Vector3(StarSystem.getAu()/100, StarSystem.getAu()/75, StarSystem.getAu()/100)
        });
    }

    static getAu() {
        return AU;
    }
}
