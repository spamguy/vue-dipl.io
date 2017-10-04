export default class {
    constructor(definition, phase) {
        let parser = new DOMParser();
        this._mapDefinition = parser.parseFromString(definition, 'image/svg+xml').documentElement;
        this._phase = phase;
        this._svg = document.getElementById(this._phase.GameID);
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
            svg = this._svg;

        // HTMLCollection is not iterable, but it is with a spread operator.
        [...definitionGroups].forEach(g => {
            svg.append(g);
        });
    }

    replaceSupplyCentreIcons() {
        let supplyCentres = this._svg.getElementById('supply-centers').children;
        [...supplyCentres].forEach(sc => {
            // Get the supply centre's...centre.
            const bbox = sc.getBBox();
            const scX = bbox.x; // + (bbox.width / 2);
            const scY = bbox.y; // + (bbox.height / 2);

            const newPath = 'm 15.64,213.212 117.92,105.865 -33.174,154.959 c -1.035,4.834 0.876,9.824 4.876,12.729 3.999,2.906 9.335,3.181 13.613,0.704 l 137.124,-79.434 137.124,79.434 c 1.944,1.126 4.107,1.684 6.265,1.684 2.588,0 5.167,-0.802 7.348,-2.387 4,-2.906 5.911,-7.896 4.876,-12.729 L 378.44,319.077 496.359,213.212 c 3.679,-3.302 5.065,-8.462 3.538,-13.164 -1.528,-4.702 -5.683,-8.061 -10.6,-8.571 L 331.671,175.143 267.425,30.279 c -2.004,-4.519 -6.483,-7.432 -11.427,-7.432 -4.944,0 -9.423,2.914 -11.427,7.433 L 180.329,175.143 22.702,191.477 c -4.917,0.51 -9.072,3.869 -10.6,8.571 -1.528,4.702 -0.141,9.862 3.538,13.164 z';
            const transform = 'translate(' + scX + ',' + scY + ') scale(0.05)';

            // Overwrite attributes to fit tastes.
            sc.removeAttribute('style');
            sc.setAttribute('d', newPath);
            sc.setAttribute('transform', transform);
        });
    }
}
