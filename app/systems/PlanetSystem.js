import {Planet} from '../components/Planet';

/**
 * PlanetSystem Class
 */
export class PlanetSystem {

    constructor(planet) {
        const G = 6.67384e-11; // m3 kg-1 s-2
        this.G = G;

        this.planet = planet;
    }

    addTo(game) {
        this.planet.addTo(game);
    }

    getAcceleration(distance, starMass) {
        return this.G * starMass / (Math.pow(distance, 2));
    }
}