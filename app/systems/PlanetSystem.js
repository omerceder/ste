/**
 * PlanetSystem Class
 */
export class PlanetSystem {

    constructor(parentStar, planet) {
        const G = 6.67384e-11; // m3 kg-1 s-2
        this.G = G;

        this.planet = planet;
        this.parentStar = parentStar;
    }

    addTo(game) {
        this.planet.addTo(game);
    }

    getStarAcceleration() {
        let planet_star_distance = this.planet.position.distanceTo(this.parentStar.position);
        return this.G * this.parentStar.getMass() / (Math.pow(planet_star_distance, 2));
    }
}