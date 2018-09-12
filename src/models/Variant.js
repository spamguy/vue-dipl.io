import { VariantMap } from './VariantMap';

const GRAPH_SYM = Symbol();
/**
 * Static information about a Diplomacy variant.
 * @class Variant
 */
export class Variant {
    /**
     * @constructs Variant
     * @param {Object} data The raw variant data.
     * @param {String} mapDefinition The variant map as a SVG+XML string.
     */
    constructor(data, mapDefinition) {
        this[GRAPH_SYM] = data.Graph;
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

        this.Provinces = Object.freeze(this[GRAPH_SYM].Nodes);
    
        this.MapDefinition = Object.freeze(new VariantMap(data.Name, mapDefinition));
    }

    /**
     * All provinces containing an SC.
     * @returns {Array<Object>} An array of provinces.
     */
    SCs() { this[GRAPH_SYM].Nodes.filter(n => n.SC) }

    get PlayerCount() { this.Nations.length }
}
