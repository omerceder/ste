import {Star} from '../components/Star';
import {Planet} from '../components/Planet';

import {PlanetSystem} from './PlanetSystem';

const AU = 1.496 * Math.pow(10,8);

const SYSTEM_PLANE = AU/100;

/**
 * StarSystem Class
 */
export class StarSystem {

    constructor(starParams = {}, planets = []) {

        let star = new Star({position:{x: .0, y: SYSTEM_PLANE, z: .0 }});
        this.star = star;

        planets.push(new Planet({position: {x: AU/100, y: SYSTEM_PLANE, z: AU/100}}));

        let planet_system = new PlanetSystem();
        this.planetSystem = planet_system;

        // TODO: replace with planet system
        this.planets = planets;
    }

    static getAu() {
        return AU;
    }
}