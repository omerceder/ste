import {Star} from '../components/Star';
import {Planet} from '../components/Planet';
import {PlanetSystem} from './PlanetSystem';

/**
 * CelestialFoundry Class
 */
export class CelestialFoundry {
    /**
     * Parse an object represented by base value, baseValue, power.
     *
     * @param number_object
     * @return {Number}
     */
    static parseNumberObject(number_object) {
        return number_object.baseValue * Math.pow(number_object.base, number_object.power);
    }

    /**
     * Default system schema key
     * @type {null|String}
     */
    defaultSystemKey = null;

    /**
     * Default star schema key
     * @type {null|String}
     */
    defaultStarKey = null;

    /**
     * System schemas container
     * @type {null|Object}
     */
    systemSchema = null;

    /**
     * Default constructor
     *
     * @param {null|Object} star_system_schema
     * @param {null|String} default_star_key
     */
    constructor(star_system_schema = null, default_star_key = null) {

        this.systemSchema = {};

        if(star_system_schema !== null) {
            if( ! star_system_schema.name) {
                throw new Error(`[CelestialFoundry|ERROR]: Schema object does not contain name property!`);
            }

            this.systemSchema[star_system_schema.name] = star_system_schema;
            this.defaultSystemKey = star_system_schema.name;

            if(default_star_key !== null) {
                this.defaultStarKey = default_star_key;
            }
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
     * @return {Object}
     */
    system() {
        if (! this.systemSchema[this.defaultSystemKey]) {
            throw new Error(`[CelestialFoundry|ERROR]: No schema for default system '${this.defaultSystemKey}'`);
        }

        return this.systemSchema[this.defaultSystemKey];
    }

    /**
     * Return default system AU unit
     *
     * @return {Number}
     */
    au() {
        return CelestialFoundry.parseNumberObject(this.system().AU);
    }

    /**
     * Return default star gravity
     *
     * @return {Vector3|THREE.Vector3|p.Vector3|*}
     */
    g() {
        return this.findStar(this.defaultStarKey).gravity;
    }

    /**
     * Get planet meta information at index from default system schema
     *
     * @param i
     * @return {Object}
     */
    planets(i) {

        if ( ! this.system().planets[i]) {
            throw new Error(`[CelestialFoundry|ERROR]: No planet at index ${i} system schema '${this.defaultSystemKey}'`);
        }

        return this.system().planets[i];
    }

    /**
     * Get star meta information at index from default system schema
     *
     * @param i
     * @return {Object}
     */
    stars(i) {
        if ( ! this.system().stars[i]) {
            throw new Error(`[CelestialFoundry|ERROR]: No stars at index ${i} system schema '${this.defaultSystemKey}'`);
        }

        return this.system().stars[i];
    }

    /**
     * Get Y plane coordinate from default system schema
     *
     * @return {Number}
     */
    getSystemPlaneY() {
        return this.system().location.y;
    }

    /**
     * Find star in schema by name
     *
     * @param name
     * @return {Object}
     */
    findStar(name) {
        let star_map = this.system().stars.map((p) => {
            return p['name'];
        });

        let planetIndex = star_map.indexOf(name);

        return this.stars(planetIndex);
    }

    /**
     * Find planet in schema by name
     *
     * @param name
     * @return {Object}
     */
    findPlanet(name) {
        let planet_map = this.system().planets.map((p) => {
            return p['name'];
        });

        let planetIndex = planet_map.indexOf(name);

        return this.planets(planetIndex);
    }

    /**
     * Create a planet system object with it's parent star
     *
     * @param {Star} star
     * @param {String} planet_name
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
     * @param {String} planet_schema
     * @param {Number} x
     * @param {Number} z
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

        let radius = CelestialFoundry.parseNumberObject(star_schema.radius)/1000; // to km
        let mass   = CelestialFoundry.parseNumberObject(star_schema.mass);

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
