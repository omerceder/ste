import {Planet} from '../components/Planet';

const PLANET_EARTH_RADIUS      = 6371.0088;
const PLANET_EARTH_MASS        = 5.972 * Math.pow(10, 24);
const PLANET_EARTH_RESTITUTION = 0.012;

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