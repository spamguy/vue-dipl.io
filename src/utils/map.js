export default class {
    constructor(definition) {
        this._variantDefinition = definition;
    }

    getDimensions() {
        let heightMatch = / height="([\d.]*)/.exec(this._variantDefinition),
            widthMatch = / width="([\d.]*)/.exec(this._variantDefinition);

        return { height: heightMatch[1], width: widthMatch[1] };
    }
}
