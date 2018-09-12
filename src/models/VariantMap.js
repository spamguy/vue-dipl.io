import { VariantMapProvince } from "./VariantMapProvince";

const VARIANT_NAME_SYM = Symbol();
const DOCUMENT_SYM = Symbol();

const SUPPLY_CENTER_GROUP_NAME = 'supply-centers';

export class VariantMap {
    constructor(name, definition) {
        const parser = new DOMParser();

        try {
            this[VARIANT_NAME_SYM] = name;
            this[DOCUMENT_SYM] = parser.parseFromString(definition, 'image/svg+xml')
            .getElementsByTagName('svg')[0];

            const provinceGroup = this[DOCUMENT_SYM].getElementById('provinces');
            this.provinces = [...provinceGroup.children].map(el => Object.freeze(new VariantMapProvince(el)));

            this.viewBox = this[DOCUMENT_SYM].getAttribute('viewBox');
        }
        catch (ex) {
            throw new Error(`The variant map supplied by Diplicity is invalid:
${definition}`);
        }
    }

    // STATIC CONSTANTS

    get supplyCenterGroupName() { return SUPPLY_CENTER_GROUP_NAME; }

    province(name) {
        const result = this.provinces.find(p => p.name === name);
        if (!result)
            console.warn(`Province '${name}' was listed in variant '${this[VARIANT_NAME_SYM]}' but not found in corresponding map!`);
        return result;
    }

    unknownSVGGroups() {
        const knownGroupIDs = [
            this.supplyCenterGroupName
        ];
        const groups = Array.from(this[DOCUMENT_SYM].getElementsByTagName('g'));
        return groups.filter(g => knownGroupIDs.indexOf(g.id) === -1);
    }
}
