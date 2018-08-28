import VariantMapProvince from "./VariantMapProvince";

export default (() => {
    let _document = null,
        _variantName = '';

    function VariantMap(name, definition) {
        const parser = new DOMParser();

        try {
            _variantName = name;
            _document = parser.parseFromString(definition, 'image/svg+xml')
            .getElementsByTagName('svg')[0];

            const provinceGroup = _document.getElementById('provinces');
            this.provinces = [...provinceGroup.children].map(el => Object.freeze(new VariantMapProvince(el)));

            this.viewBox = _document.getAttribute('viewBox');
        }
        catch (ex) {
            throw new Error(`The variant map supplied by Diplicity is invalid:
${definition}`);
        }
    }

    VariantMap.prototype = {
        province(name) {
            const result = this.provinces.find(p => p.name === name);
            if (!result)
                console.warn(`Province '${name}' was listed in variant '${_variantName}' but not found in corresponding map!`);
            return result;
        }
    }

    return VariantMap;
})();
