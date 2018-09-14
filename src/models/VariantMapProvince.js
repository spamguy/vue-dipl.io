import getBounds from 'svg-path-bounds';

const EL_SYM = Symbol();

export class VariantMapProvince {
    constructor(el, centreEl) {
        this[EL_SYM] = el;
        this.name = this[EL_SYM].id;

        // 'xyzCenter' elements can refer to either unit position or SC position.
        this.isSC = centreEl.parentElement.id === 'supply-centers';

        // Convert path into single point.
        let [left, top, right, bottom] = getBounds(centreEl.getAttribute('d'));
        this.centreCoordinates = {
            x: left + (right - left) / 2,
            y: bottom + (top - bottom) / 2
        };
    }

    get d() { return this[EL_SYM].getAttribute('d'); }
}
