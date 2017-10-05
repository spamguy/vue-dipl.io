export default class {
    constructor(definition, game) {
        let parser = new DOMParser();
        this._mapDefinition = parser.parseFromString(definition, 'image/svg+xml').documentElement;
        this._game = game;
        this._svg = document.getElementById(this._game.ID);
    }

    /**
     * Extracts the height/width from the base SVG.
     * @return {Object} The SVG's dimensions.
     */
    getDimensions() {
        return {
            height: this._mapDefinition.getAttribute('height'),
            width: this._mapDefinition.getAttribute('width')
        };
    }

    /**
     * Gets the map's bounding box within the page.
     * @return {DOMRect} The bounding box.
     */
    getYShift() {
        return this._svg.getBoundingClientRect();
    }

    /**
     * Copies <g> elements from the base SVG to the page.
     */
    copyGroups() {
        let definitionGroups = this._mapDefinition.getElementsByTagName('g'),
            svg = this._svg;
        const supplyCentreNode = this._svg.getElementById('supplyCentres');

        /*
         * HTMLCollection is not iterable, but it is with a spread operator.
         * Append groups before those declared explicitly in Map.vue.
         */
        [...definitionGroups].forEach(g => svg.insertBefore(g, supplyCentreNode));
    }

    getSupplyCentreCoordinates() {
        let supplyCentres = this._svg.getElementById('supply-centers'),
            supplyCentreCoordinates = { };

        // Get each supply centre's coordinates.
        [...supplyCentres.children].forEach(sc => (supplyCentreCoordinates[sc.id] = sc.getBoundingClientRect()));

        // Nuke the original group.
        supplyCentres.remove();

        return supplyCentreCoordinates;
    }
}
