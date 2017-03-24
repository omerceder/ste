/**
 * PlanetSystem Class
 */
export class PlanetSystem {
    /**
     * Default constructor
     *
     * @param {Star} parentStar
     * @param {Planet} planet
     */
    constructor(parentStar, planet) {
        const G = 6.67384e-11; // m3 kg-1 s-2
        this.G = G;

        this.planet = planet;
        this.parentStar = parentStar;
    }

    /**
     * Add planet system to game
     *
     * @param game
     */
    addTo(game) {
        this.planet.addTo(game);
    }

    /**
     * Get acceleration relative to parent star mass
     *
     * @return {number}
     */
    getStarAcceleration() {
        let planet_star_distance = this.planet.position.distanceTo(this.parentStar.position);
        return this.G * this.parentStar.getMass() / (Math.pow(planet_star_distance, 2));
    }
}