import {Star} from '../components/Star';
import {Planet} from '../components/Planet';
import {PlanetSystem} from './PlanetSystem';

/**
 * CelestialFoundry Class
 */
export class CelestialFoundry {

    static parseNumberObject(number_object) {
        return number_object.baseValue * Math.pow(number_object.base, number_object.power);
    }

    /**
     * Default system schema key
     * @type {null|string}
     */
    defaultSystemKey = null;

    /**
     * System schemas container
     * @type {null|Object}
     */
    systemSchema = null;

    /**
     * Default constructor
     *
     * @param {null|Object} star_system_schema
     */
    constructor(star_system_schema = null) {

        this.systemSchema = {};

        if(star_system_schema !== null) {
            if( ! star_system_schema.name) {
                throw new Error(`[CelestialFoundry|ERROR]: Schema object does not contain name property!`);
            }

            this.systemSchema[star_system_schema.name] = star_system_schema;
            this.defaultSystemKey = star_system_schema.name;
        }
    }

    /**
     * Load system schema from object using 'name' property as key
     *
     * @param {null|Object} star_system_schema
     */
    loadSystemSchema(star_system_schema) {

        if( ! star_system_schema.name) {
            throw new Error(`[CelestialFoundry|ERROR]: Schema object does not contain name property!`);
        }

        this.systemSchema[star_system_schema.name] = star_system_schema;
    }

    /**
     * Get default system schema
     *
     * @return {*}
     */
    system() {
        if (! this.systemSchema[this.defaultSystemKey]) {
            throw new Error(`[CelestialFoundry|ERROR]: No schema for default system '${this.defaultSystemKey}'`);
        }

        return this.systemSchema[this.defaultSystemKey];
    }

    /**
     *
     * @return {*}
     */
    au() {
        return CelestialFoundry.parseNumberObject(this.system().AU);
    }

    star() {
        return this.system().stars[0];
    }

    /**
     * Get planet meta information at index from default system schema
     *
     * @param i
     * @return {*}
     */
    planets(i) {

        if ( ! this.system().planets[i]) {
            throw new Error(`[CelestialFoundry|ERROR]: No planet at index ${i} system schema '${this.defaultSystemKey}'`);
        }

        return this.system().planets[i];
    }

    /**
     * Get Y plane coordinate from default system schema
     *
     * @return {float}
     */
    getSystemPlaneY() {
        return this.system().location.y;
    }

    /**
     * Find planet in schema by name
     *
     * @param name
     * @return {*}
     */
    findPlanet(name) {
        let planetMap = this.system().planets.map((p) => {
            return p['name'];
        });

        let planetIndex = planetMap.indexOf(name);

        return this.planets(planetIndex);
    }

    /**
     * Create a planet system object with it's parent star
     *
     * @param {Star} star
     * @param planet_name
     * @return {PlanetSystem}
     */
    createPlanetSystem(star, planet_name) {
        let planet_schema = this.findPlanet(planet_name);

        let orbit_au = planet_schema.orbit * this.au();

        return new PlanetSystem(star, this.createPlanet(planet_schema, orbit_au, orbit_au));
    }

    /**
     * Create planet component
     *
     * @param planet_schema
     * @param x
     * @param z
     * @return {Planet}
     */
    createPlanet(planet_schema, x, z) {

        let radius = CelestialFoundry.parseNumberObject(planet_schema.radius)/1000; // to km
        let mass   = CelestialFoundry.parseNumberObject(planet_schema.mass);

        return new Planet({
            position: {x: x, y: this.getSystemPlaneY(), z: z},
            geometry: {
                radius:         radius,
                widthSegments:  128,
                heightSegments: 128
            },
            physics:  {mass: mass}
        })
    }

    /**
     * Create star component
     *
     * @return {Star}
     */
    createStar(star_schema) {

        let radius = CelestialFoundry.parseNumberObject(this.star().radius)/1000; // to km
        let mass   = CelestialFoundry.parseNumberObject(this.star().mass);

        return new Star({
                position: {x: .0, y: this.getSystemPlaneY(), z: .0 },
                geometry: {
                    radius:         radius,
                    widthSegments:  256,
                    heightSegments: 256
                }
            }, mass);
    }

    /**
     * Create planets from default system
     *
     * @param {Star} star
     * @return {Array}
     */
    createPlanets(star) {

        let planet_map = this.system().planets.map((p) => {
            return p['name'];
        });

        let planets = [];

        for(let planet_key of planet_map) {
            planets.push(this.createPlanetSystem(star, planet_key));
        }

        return planets;
    }
}
