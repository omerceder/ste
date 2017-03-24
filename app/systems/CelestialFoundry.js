import {Planet} from '../components/Planet';

/**
 * CelestialFoundry Class
 */
export class CelestialFoundry {
    createPlanet(system_plane, x, z) {
        return new Planet({position: {x: x, y: system_plane, z: z}})
    }
}