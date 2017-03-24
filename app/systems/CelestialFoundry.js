import {Star} from '../components/Star';
import {Planet} from '../components/Planet';

// Sun
const STAR_SUN_MASS = 1.988435 * Math.pow(10,30);
const STAR_SUN_RADIUS = 695700;

const DEFAULT_PLANET_RADIUS      = 6371.0088; // Earth
const DEFAULT_PLANET_MASS        = 5.972 * Math.pow(10, 24); // Earth
const DEFAULT_PLANET_RESTITUTION = 0.012; // Unknown ???

// Earth
const PLANET_EARTH_RADIUS      = 6371.0088;
const PLANET_EARTH_MASS        = 5.972 * Math.pow(10, 24);
const PLANET_EARTH_RESTITUTION = 0.012;

// Jupiter
const PLANET_JUPITER_RADIUS      = 69911.0;
const PLANET_JUPITER_MASS        = 1988550.0 * Math.pow(10, 24);
const PLANET_JUPITER_RESTITUTION = 0.012;

/**
 * CelestialFoundry Class
 */
export class CelestialFoundry {

    static getPlanetRadius(planet_name) {

        const planets = {
            'sun':   PLANET_EARTH_RADIUS,
            'earth': PLANET_EARTH_RADIUS
        };

        if( ! planets[planet_name]) {
            throw `[CelestialFoundry]: No such planet ${planet_name}`
        }

        return planets[planet_name];

    }

    static createPlanet(system_plane, x, z, radius = DEFAULT_PLANET_RADIUS) {
        return new Planet({
            position: {x: x, y: system_plane, z: z},
            geometry: {radius: radius}
        })
    }

    static createStar(system_plane) {
        return new Star({position:{x: .0, y: system_plane, z: .0 }});
    }
}