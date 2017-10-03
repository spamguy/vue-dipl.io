export default class {
    constructor(definition, phase) {
        let parser = new DOMParser();
        this._mapDefinition = parser.parseFromString(definition, 'image/svg+xml').documentElement;
        this._phase = phase;
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
     * Copies <g> elements from the base SVG to the page.
     */
    copyGroups() {
        let definitionGroups = this._mapDefinition.getElementsByTagName('g'),
            svg = document.getElementById(this._phase.GameID);

        // HTMLCollection is not iterable, but it is with a spread operator.
        [...definitionGroups].forEach(g => {
            svg.append(g);
        });
    }
}
