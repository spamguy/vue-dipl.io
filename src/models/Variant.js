import VariantMap from './VariantMap';

/**
 * Static information about a Diplomacy variant.
 * @class Variant
 */
export default (() => {
    /**
     * @constructs Variant
     * @param {Object} data The raw variant data.
     * @param {String} mapDefinition The variant map as a SVG+XML string.
     */
    function Variant(data, mapDefinition) {
        /**
         * @name Variant#Name
         * @type {String}
         */
        this.Name = data.Name;

        /**
         * A list of powers (i.e., player slots).
         * @name Variant#Nations
         * @type {Array<Object>}
         */
        this.Nations = data.Nations;

        this.Provinces = Object.freeze(data.Graph.Nodes);
    
        this.MapDefinition = Object.freeze(new VariantMap(data.Name, mapDefinition));
    }

    Variant.prototype = {
        /**
         * All provinces containing an SC.
         * @returns {Array<Object>} An array of provinces.
         */
        SCs() { _graph.Nodes.filter(n => n.SC) },

        get PlayerCount() { this.Nations.length }
    };

    return Variant;
})();
