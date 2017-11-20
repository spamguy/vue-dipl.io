import Phase from '@/api/phase';

export default class {
    constructor(game, variant) {
        this._variant = variant;
        this._game = game;
        this._svg = document.getElementById(this._game.ID);

        let parser = new DOMParser();
        this._mapDefinition = parser.parseFromString(this._variant.MapString, 'image/svg+xml').getElementsByTagName('svg')[0];
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
        const supplyCentreNode = this._svg.getElementById('provinceLayer');

        /*
         * HTMLCollection is not iterable, but it is with a spread operator.
         * Append groups before those declared explicitly in Map.vue.
         */
        [...definitionGroups].forEach(g => {
            let clone = document.importNode(g, true);
            svg.insertBefore(clone, supplyCentreNode);
        });
    }

    getProvinceData() {
        let supplyCentres = this._svg.getElementById('supply-centers'),
            otherProvinces = this._svg.getElementById('province-centers'),
            provincePathsNode = this._svg.getElementById('provinces'),
            provinceCoordinates = { },
            provincePaths = { };

        // Get each supply centre's coordinates.
        [...supplyCentres.children].forEach(sc => {
            const bbRect = sc.getBoundingClientRect();
            provinceCoordinates[sc.id.substring(0, sc.id.length - 6)] = {
                x: bbRect.x,
                y: bbRect.y,
                height: bbRect.height,
                width: bbRect.width,
                isSC: true
            };
        });

        // Get the physical centre of all other provinces.
        [...otherProvinces.children].forEach(sc => {
            const bbRect = sc.getBoundingClientRect();
            provinceCoordinates[sc.id.substring(0, sc.id.length - 6)] = {
                x: bbRect.x + (bbRect.width / 2),
                y: bbRect.y + (bbRect.height / 2),
                height: bbRect.height,
                width: bbRect.width
            };
        });

        // Get each province's d (SVG path).
        [...provincePathsNode.children].forEach(p => {
            (provincePaths[p.id] = p.getAttribute('d'));
        });

        // Nuke the original groups.
        supplyCentres.remove();
        otherProvinces.remove();
        provincePathsNode.remove();

        return { coords: provinceCoordinates, paths: provincePaths };
    }

    async inputOrder(id) {
        await Phase.inputOrder(id);
    }
}
